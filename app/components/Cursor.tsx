"use client"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [dotPos, setDotPos] = useState({ x: -100, y: -100 })
  const [hovered, setHovered] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [label, setLabel] = useState("")
  const rafRef = useRef<number>(0)
  const target = useRef({ x: -100, y: -100 })

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return

    document.body.style.cursor = "none"

    function onMove(e: MouseEvent) {
      target.current = { x: e.clientX, y: e.clientY }
      setDotPos({ x: e.clientX, y: e.clientY })

      const el = document.elementFromPoint(e.clientX, e.clientY)
      if (!el) return

      const hoverable = el.closest("a, button, [data-cursor]")
      setHovered(!!hoverable)
      setLabel(hoverable?.getAttribute("data-cursor-label") || "")
    }

    function onLeave() { setHidden(true) }
    function onEnter() { setHidden(false) }

    // Smooth lag for outer ring
    function lerp(a: number, b: number, t: number) { return a + (b - a) * t }
    let lx = -100, ly = -100

    function loop() {
      lx = lerp(lx, target.current.x, 0.12)
      ly = lerp(ly, target.current.y, 0.12)
      setPos({ x: lx, y: ly })
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)

    window.addEventListener("mousemove", onMove)
    document.addEventListener("mouseleave", onLeave)
    document.addEventListener("mouseenter", onEnter)

    return () => {
      document.body.style.cursor = ""
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", onLeave)
      document.removeEventListener("mouseenter", onEnter)
    }
  }, [])

  return (
    <>
      {/* Outer ring — lags behind */}
      <motion.div
        animate={{
          x: pos.x - (hovered ? 24 : 16),
          y: pos.y - (hovered ? 24 : 16),
          width: hovered ? 48 : 32,
          height: hovered ? 48 : 32,
          opacity: hidden ? 0 : 1,
          backgroundColor: hovered ? "rgba(245,245,240,0.08)" : "transparent",
        }}
        transition={{ type: "tween", duration: 0 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          borderRadius: "50%",
          border: "1px solid rgba(245,245,240,0.4)",
          pointerEvents: "none",
          zIndex: 99999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {label && (
          <span style={{ fontSize: 9, color: "var(--text)", letterSpacing: "1px", textTransform: "uppercase", whiteSpace: "nowrap" }}>
            {label}
          </span>
        )}
      </motion.div>

      {/* Inner dot — follows exactly */}
      <motion.div
        animate={{
          x: dotPos.x - 3,
          y: dotPos.y - 3,
          opacity: hidden ? 0 : hovered ? 0 : 1,
        }}
        transition={{ type: "tween", duration: 0 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "var(--text)",
          pointerEvents: "none",
          zIndex: 99999,
        }}
      />
    </>
  )
}