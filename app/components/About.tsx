"use client"
import { useEffect, useRef, useState } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"



function RollingText({ text, color }: { text: string; color?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-5% 0px" })
  const letters = text.split("")
  const mid = Math.floor(letters.length / 2)
  return (
    <span ref={ref} style={{ display: "inline-flex", flexWrap: "wrap", color: color || "#f5f5f0" }}>
      {letters.map((l, i) => {
        const dist = Math.abs(i - mid)
        return (
          <motion.span
            key={i}
            initial={{ y: "110%", opacity: 0, rotateX: -90 }}
            animate={isInView ? { y: "0%", opacity: 1, rotateX: 0 } : {}}
            transition={{ duration: 0.55, delay: dist * 0.035, ease: [0.76, 0, 0.24, 1] }}
            style={{ display: "inline-block", transformOrigin: "bottom", whiteSpace: l === " " ? "pre" : "normal" }}
          >
            {l === " " ? "\u00A0" : l}
          </motion.span>
        )
      })}
    </span>
  )
}

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    if (!isInView) return
    const dur = 1600
    const t0 = performance.now()
    function tick(now: number) {
      const t = Math.min((now - t0) / dur, 1)
      const ease = 1 - Math.pow(1 - t, 4)
      setDisplay(Math.round(ease * value))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isInView, value])
  return <span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }}>{display}{suffix}</span>
}

function ScrollMarquee({ items }: { items: string[] }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"])
  return (
    <div ref={ref} style={{ overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "13px 0" }}>
      <motion.div style={{ x, display: "flex", gap: 28, whiteSpace: "nowrap" }}>
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} style={{ fontSize: 10, color: "rgba(245,245,240,0.22)", letterSpacing: "2.5px", textTransform: "uppercase", flexShrink: 0 }}>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

const stats = [
  { value: 10, suffix: "+", label: "Project Build" },
  { value: 2, suffix: "+", label: "Years of Learning" },
  { value: 5, suffix: "k+", label: "Commits pushed" },
  { value: "∞ ", suffix: "+", label: "Cups of Chai" },
]



const skills = ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Docker", "Tailwind CSS", "Framer Motion", "GraphQL", "AWS", "Prisma", "Redis"]

const services = [
  { title: "Web Development", desc: "Full-stack apps built with Next.js, TypeScript and modern tooling." },
  { title: "UI Engineering", desc: "Pixel-perfect interfaces with smooth animations and great UX." },
  { title: "API Design", desc: "Scalable REST and GraphQL APIs built for performance." },
]

export function About() {
  return (
    <section id="about" style={{ padding: "120px 40px", borderTop: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>

      {/* Label */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ fontSize: 11, color: "rgba(245,245,240,0.3)", letterSpacing: "3px", textTransform: "uppercase", marginBottom: 48 }}
      >
        About
      </motion.p>

      {/* Rolling headline */}
      <div style={{ marginBottom: 0 }}>
        <h2 style={{ fontSize: "clamp(36px, 5.5vw, 82px)", fontWeight: 700, letterSpacing: "-3px", lineHeight: 0.92 }}>
          <RollingText text="The combination of" />
          <br />
          <RollingText text="design, code & motion" />
          <br />
          <RollingText text="is where I live." color="rgba(245,245,240,0.18)" />
        </h2>
      </div>

      {/* Skill marquee */}
      <div style={{ margin: "48px -40px" }}>
        <ScrollMarquee items={skills} />
      </div>

      {/* Main grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 72, alignItems: "start" }}>

        {/* LEFT */}
        <div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid rgba(255,255,255,0.1)", padding: "6px 14px", marginBottom: 28 }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block", boxShadow: "0 0 8px #4ade80" }} />
            <span style={{ fontSize: 11, color: "rgba(245,245,240,0.5)", letterSpacing: "1.5px" }}>Available for work</span>
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 15, color: "rgba(245,245,240,0.45)", lineHeight: 1.85, marginBottom: 48, maxWidth: 500 }}
          >
            I am a full-stack developer with 3+ years of experience building fast, accessible, and visually precise web applications. I care deeply about the craft from pixel-level details to system architecture.
          </motion.p>

          {/* Animated stats grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderTop: "1px solid rgba(255,255,255,0.08)", borderLeft: "1px solid rgba(255,255,255,0.08)", marginBottom: 56 }}>
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08 }}
                style={{ padding: "20px 14px", borderRight: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div style={{ fontSize: "clamp(24px, 2.5vw, 38px)", fontWeight: 700, letterSpacing: "-2px", color: "#f5f5f0", marginBottom: 4 }}>
                 <AnimatedNumber value={Number(s.value)} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: 10, color: "rgba(245,245,240,0.28)", letterSpacing: "0.5px", lineHeight: 1.4 }}>{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Services */}
          <p style={{ fontSize: 10, color: "rgba(245,245,240,0.25)", letterSpacing: "3px", textTransform: "uppercase", marginBottom: 16 }}>What I do</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24, padding: "18px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}
              >
                <span style={{ fontSize: 13, fontWeight: 600, color: "#f5f5f0", flexShrink: 0, letterSpacing: "-0.3px" }}>{s.title}</span>
                <span style={{ fontSize: 12, color: "rgba(245,245,240,0.35)", lineHeight: 1.6, textAlign: "right", maxWidth: 260 }}>{s.desc}</span>
              </motion.div>
            ))}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} />
          </div>
        </div>

        {/* RIGHT */}
        <div>
          {/* Photo */}
        

          {/* Experience timeline */}
          
          <div>
            
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} />
          </div>
        </div>

      </div>

      {/* Bottom full-width stack strip */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 32 }}
      >
        <p style={{ fontSize: 10, color: "rgba(245,245,240,0.25)", letterSpacing: "3px", textTransform: "uppercase", marginBottom: 16 }}>Stack</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {skills.map((s, i) => (
            <motion.span
              key={s}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ borderColor: "rgba(245,245,240,0.4)", color: "#f5f5f0" }}
              style={{ fontSize: 11, color: "rgba(245,245,240,0.35)", border: "1px solid rgba(255,255,255,0.09)", padding: "6px 14px", letterSpacing: "0.5px", cursor: "default", transition: "all 0.2s" }}
            >
              {s}
            </motion.span>
          ))}
        </div>
      </motion.div>

    </section>
  )
}