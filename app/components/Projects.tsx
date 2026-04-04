"use client"
import { useRef, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

const projects = [
  {
    num: "01",
    title: "Uber Clone",
    Image : "https://i.pinimg.com/1200x/2e/04/cf/2e04cf4657c70e2394e7da9dfe119e0d.jpg",
    category: "Full-Stack / React",
    year: "2024",
    desc: "A full-stack ride-booking app inspired by Uber. Features real-time location tracking, ride requests, driver-passenger matching, and a live map interface built with React and Node.js.",
    tags: ["React", "Node.js", "Socket.io", "Maps API"],
    accent: "rgba(255,255,255,0.02)",
    github: "https://github.com/bhaveshkumbhare/Uber-clone-frontend",
    live: "",
  },
  {
    num: "02",
    title: "Food Delivery App",
    Image : "https://i.pinimg.com/736x/de/37/57/de3757fcb63f6e201dde0cdafe0e74c9.jpg",
    category: "Frontend / React",
    year: "2024",
    desc: "A food delivery web app with restaurant listings, menu browsing, cart management, and order tracking. Clean UI with smooth interactions built entirely in React.",
    tags: ["React", "JavaScript", "CSS"],
    accent: "rgba(255,255,255,0.02)",
    github: "https://github.com/bhaveshkumbhare/food-delivery-web-app-frontend",
    live: "",
  },
  {
    num: "03",
    title: "Chess.io",
    Image : "https://i.pinimg.com/736x/b3/8a/47/b38a47a5744b1c325340d5bd8c1a20f4.jpg",
    category: "Real-time / Multiplayer",
    year: "2024",
    desc: "A real-time multiplayer chess game built with Socket.io. Two players can connect and play live against each other in the browser with full chess rules and move validation.",
    tags: ["React", "Socket.io", "Node.js", "Chess.js"],
    accent: "rgba(255,255,255,0.02)",
    github: "https://github.com/bhaveshkumbhare/chess.io",
    live: "",
  },
  {
    num: "04",
    title: "Agency AI",
    Image : "https://i.pinimg.com/1200x/51/4c/10/514c1055fecaf674c4f9eb95928fa42b.jpg",
    category: "AI / Next.js",
    year: "2024",
    desc: "A modern AI agency landing page with animated sections, service showcases, and interactive UI elements. Built to demonstrate design and frontend skills with a focus on motion and polish.",
    tags: ["Next.js", "Framer Motion", "Tailwind"],
    accent: "rgba(255,255,255,0.02)",
    github: "https://github.com/bhaveshkumbhare/Agency-ai",
    live: "",
  },
  {
    num: "05",
    title: "BG Remover AI",
    Image : "https://i.pinimg.com/1200x/ff/6a/c7/ff6ac7cda4f3e545fe9aca71c0df5d05.jpg",
    category: "AI Tool / Full-Stack",
    year: "2024",
    desc: "An AI-powered background removal tool. Upload any image and the app instantly removes the background using an AI API. Built with React, Vite, and a Node.js backend. Deployed on Vercel.",
    tags: ["React", "Vite", "Node.js", "AI API"],
    accent: "rgba(255,255,255,0.02)",
    github: "https://github.com/bhaveshkumbhare/Bg_remover_ai",
    live: "https://bg-remover-ai-rosy.vercel.app",
  },
]

function TiltCard({ p, i }: { p: typeof projects[0]; i: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })
  const [hovered, setHovered] = useState(false)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const cx = (e.clientX - (rect.left * .2)) / rect.width
    const cy = (e.clientY - (rect.top * .2)) / rect.height
    setTilt({ x: (cy - 0.5) * -20, y: (cx - 0.5) * 20 })
    setGlare({ x: cx * 100, y: cy * 100, opacity: 0.12 })
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 })
    setGlare({ x: 50, y: 50, opacity: 0 })
    setHovered(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      style={{ perspective: 1000 }}
      className="h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: hovered ? 1.03 : 1,
          z: hovered ? 40 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{
          position: "relative",
          borderRadius: 16,
          overflow: "hidden",
          cursor: "pointer",
          transformStyle: "preserve-3d",
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: hovered
            ? "0 30px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)"
            : "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
          transition: "box-shadow 0.4s ease",
        }}
        className="h-full"
      >
        {/* Accent color bg */}
        <div style={{ position: "absolute", inset: 0, background: p.accent, pointerEvents: "none" }} />

        {/* Glare effect */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", borderRadius: 16,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 60%)`,
          transition: "opacity 0.2s",
        }} />

        {/* Image area */}
        
        <div
        style={{
          width: "100%",
          height: 200,
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <motion.div
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          style={{ position: "absolute", inset: 0 }}
        >
          {p.Image ? (
            <Image
              src={p.Image}
              alt={p.title}
              fill
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "rgba(255,255,255,0.03)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  color: "rgba(245,245,240,0.12)",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                }}
              >
                Project Image
              </span>
            </div>
          )}
        </motion.div>
      </div>

        {/* Content */}
        <div style={{ padding: "24px 28px 28px", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <span style={{ fontSize: 10, color: "rgba(245,245,240,0.25)", fontFamily: "monospace", letterSpacing: "1px" }}>{p.num}</span>
            <span style={{ fontSize: 10, color: "rgba(245,245,240,0.2)", fontFamily: "monospace" }}>{p.year}</span>
          </div>

          <h3 style={{ fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 700, letterSpacing: "-0.8px", color: "#f5f5f0", marginBottom: 8, lineHeight: 1.1 }}>{p.title}</h3>
          <p style={{ fontSize: 11, color: "rgba(245,245,240,0.35)", letterSpacing: "1px", marginBottom: 12, textTransform: "uppercase" }}>{p.category}</p>
          <p style={{ fontSize: 13, color: "rgba(245,245,240,0.45)", lineHeight: 1.7, marginBottom: 20 }}>{p.desc}</p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
            {p.tags.map(t => (
              <span key={t} style={{
                fontSize: 10, color: "rgba(245,245,240,0.4)",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "10px 20px", borderRadius: 20, letterSpacing: "0.5px",
              }}>{t}</span>
            ))}
          </div>

         <div style={{ display: "flex", gap: 12 }}>

  <a
    href={p.live || p.github}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      fontSize: 11,
      color: "#0d0d0d",
      background: "#f5f5f0",
      padding: "9px 18px",
      textDecoration: "none",
      fontWeight: 600,
      letterSpacing: "0.5px",
      borderRadius: 4
    }}
  >
    {p.live ? "Live Demo" : "View Project"}
  </a>

  <a
    href={p.github}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      fontSize: 11,
      color: "rgba(245,245,240,0.4)",
      textDecoration: "none",
      border: "1px solid rgba(255,255,255,0.1)",
      padding: "9px 18px",
      borderRadius: 4,
      background: "rgba(255,255,255,0.04)"
    }}
  >
    GitHub
  </a>

</div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Projects() {
  return (
    <section id="work" style={{ padding: "120px 40px" }}>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ fontSize: 11, color: "rgba(245,245,240,0.3)", letterSpacing: "3px", textTransform: "uppercase", marginBottom: 60 }}
      >
        Selected Work
      </motion.p>

      <div className="container mx-auto">
        <div 
        // style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 30 }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-9"
        >
        {projects.map((p, i) => (
          <TiltCard key={p.num} p={p} i={i} />
        ))}
      </div>
      </div>
    </section>
  )
}