"use client"
import { motion , Variants } from "framer-motion"
import { Marquee } from "../components/Marquee"
import Image from "next/image"


const container = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } } }
const line : Variants = { hidden: { y: 80, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } } }

export function Hero() {
  return (
    <section style={{
      minHeight: "100vh",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "100px 40px 60px",
    }}>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1px auto",
        alignItems: "center",
        gap: 60,
      }}>

        {/* LEFT: text */}
        <motion.div variants={container} initial="hidden" animate="show">

          {/* Label */}
          <div style={{ overflow: "hidden", marginBottom: 28 }}>
            <motion.div variants={line} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80", display: "inline-block" }} />
              <p style={{ fontSize: 11, color: "rgba(245,245,240,0.35)", letterSpacing: "3px", textTransform: "uppercase", margin: 0 }}>
                Final year student · Open to internships & freelance
              </p>
            </motion.div>
          </div>

          {/* Headline */}
          {[
            { text: "I'm Bhavesh —", color: "#f5f5f0" },
            { text: "design & code.", color: "rgba(245,245,240,0.22)" },
          ].map((item, i) => (
            <div key={i} style={{ overflow: "hidden" }}>
              <motion.h1
                variants={line}
                style={{
                  fontSize: "clamp(48px, 7vw, 110px)",
                  fontWeight: 800,
                  letterSpacing: "-4px",
                  lineHeight: 0.92,
                  margin: 0,
                  color: item.color,
                }}
              >
                {item.text}
              </motion.h1>
            </div>
          ))}

          {/* Bio line */}
          <div style={{ overflow: "hidden", marginTop: 24, marginBottom: 40 }}>
            <motion.p
              variants={line}
              style={{
                fontSize: 14,
                color: "rgba(245,245,240,0.35)",
                lineHeight: 1.7,
                maxWidth: 420,
                margin: 0,
              }}
            >
              Building fast, beautiful web experiences with React & Next.js.
              Based in Surat, India.
            </motion.p>
          </div>

          {/* Buttons */}
          <div style={{ overflow: "hidden" }}>
            <motion.div variants={line} style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <a
                href="#work"
                style={{
                  color: "#0d0d0d",
                  background: "#f5f5f0",
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "13px 32px",
                  textDecoration: "none",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                }}
              >
                View Work
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                style={{
                  color: "rgba(245,245,240,0.45)",
                  fontSize: 11,
                  textDecoration: "none",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  borderBottom: "1px solid rgba(245,245,240,0.15)",
                  paddingBottom: 2,
                  transition: "color 0.2s, border-color 0.2s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = "#f5f5f0"
                  e.currentTarget.style.borderColor = "rgba(245,245,240,0.5)"
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = "rgba(245,245,240,0.45)"
                  e.currentTarget.style.borderColor = "rgba(245,245,240,0.15)"
                }}
              >
                Resume
              </a>

              {/* Social links */}
              <div style={{ display: "flex", gap: 16, marginLeft: 8 }}>
                {[
                  { label: "GH", href: "https://github.com/bhaveshkumbhare" },
                  { label: "LI", href: "https://linkedin.com" },
                ].map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: 10,
                      color: "rgba(245,245,240,0.25)",
                      textDecoration: "none",
                      letterSpacing: "1px",
                      border: "1px solid rgba(255,255,255,0.08)",
                      padding: "6px 10px",
                      transition: "color 0.2s, border-color 0.2s",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = "#f5f5f0"
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = "rgba(245,245,240,0.25)"
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"
                    }}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* DIVIDER line */}
        <div style={{ width: 1, height: "55%", background: "rgba(255,255,255,0.06)", alignSelf: "center" }} />

        {/* RIGHT: photo */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}
        >
          {/* Photo */}
          <div style={{
            width: "300px",
            height: "380px",
            flexShrink: 0,
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            position: "relative",
            background: "rgba(255,255,255,0.04)",
          }}>
            <Image
              src="/bhavesh.jpg"
              alt="Bhavesh Kumbhare"
              fill
              priority
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />
            {/* Gradient overlay bottom */}
            <div style={{
              position: "absolute",
              bottom: 0, left: 0, right: 0,
              height: "40%",
              background: "linear-gradient(to top, rgba(13,13,13,0.7), transparent)",
              pointerEvents: "none",
            }} />
            {/* Name tag on photo */}
            <div style={{
              position: "absolute",
              bottom: 16, left: 16, right: 16,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <span style={{ fontSize: 11, color: "rgba(245,245,240,0.7)", fontWeight: 500, letterSpacing: "0.5px" }}>Bhavesh Kumbhare</span>
              <span style={{ fontSize: 10, color: "rgba(245,245,240,0.4)", letterSpacing: "1px" }}>Surat, IN</span>
            </div>
          </div>

          {/* Stats below photo */}
          <div style={{ display: "flex", gap: 0, width: "300px", border: "1px solid rgba(255,255,255,0.08)" }}>
            {[
              { num: "10+", label: "Projects" },
              { num: "2+", label: "Years" },
              { num: "5+", label: "Tools" },
            ].map((s, i) => (
              <div
                key={s.label}
                style={{
                  flex: 1,
                  padding: "12px 0",
                  textAlign: "center",
                  borderRight: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none",
                }}
              >
                <div style={{ fontSize: 18, fontWeight: 700, color: "#f5f5f0", letterSpacing: "-1px" }}>{s.num}</div>
                <div style={{ fontSize: 9, color: "rgba(245,245,240,0.3)", letterSpacing: "1.5px", textTransform: "uppercase", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Marquee */}
      <div style={{ marginTop: 60 }}>
        <Marquee />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          cursor: "pointer",
        }}
        onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span style={{ fontSize: 9, color: "rgba(245,245,240,0.2)", letterSpacing: "3px", textTransform: "uppercase" }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}
        >
          <span style={{ width: 1, height: 20, background: "rgba(245,245,240,0.15)", display: "block" }} />
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1L5 5L9 1" stroke="rgba(245,245,240,0.25)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </motion.div>

    </section>
  )
}