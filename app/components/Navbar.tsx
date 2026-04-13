"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const links = ["Work", "About","Skill", "Contact"]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  return (
    <motion.nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent", background: scrolled ? "rgba(13,13,13,0.85)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", transition: "all 0.3s ease" }}>
      <a href="#" style={{ color: "#f5f5f0", fontSize: 14, fontWeight: 500, letterSpacing: "0.5px", textDecoration: "none" }}>bhaveshkumbhare.dev</a>
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        {links.map(link => (
          <a key={link} href={`#${link.toLowerCase()}`} style={{ color: "rgba(245,245,240,0.5)", fontSize: 13, textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => (e.currentTarget.style.color = "#f5f5f0")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,245,240,0.5)")}>{link}</a>
        ))}
        <a href="#contact"  style={{ color: "#0d0d0d", background: "#f5f5f0", fontSize: 12, fontWeight: 500, padding: "8px 18px", textDecoration: "none", letterSpacing: "0.5px", transition: "opacity 0.2s" }} onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")} onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>Hire Me</a>
      </div>
    </motion.nav>
  )
}
