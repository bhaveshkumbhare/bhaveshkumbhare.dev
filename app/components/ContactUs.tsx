"use client"
import { useRef, useState } from "react"
import { motion } from "framer-motion"
import emailjs from "@emailjs/browser"

function RollingText({ text, color }: { text: string; color?: string }) {
  const ref = useRef(null)
  
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
            whileInView={{ y: "0%", opacity: 1, rotateX: 0 }}
            viewport={{ once: true, margin: "-5% 0px" }}
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

const socials = [
  { label: "GitHub",    href: "https://github.com/bhaveshkumbhare" },
  { label: "LinkedIn",  href: "https://linkedin.com/in/bhaveshkumbhare" },
  { label: "Twitter",   href: "https://twitter.com" },
  { label: "Instagram", href: "https://instagram.com" },
]

const services = ["Web Development", "UI Engineering", "API Design", "Consulting"]

// ── EmailJS config (store these in .env.local) ─────────────────────────────
const SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!
const PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!

type Status = "idle" | "sending" | "sent" | "error"

export function ContactUs() {
  const formRef = useRef<HTMLFormElement>(null)
  const [hoveredSocial, setHoveredSocial] = useState<number | null>(null)
  const [copied, setCopied]   = useState(false)
  const [status, setStatus]   = useState<Status>("idle")
  const email = "kumbharebhavesh88@gmail.com"

  function copyEmail() {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // ── Form submit ────────────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formRef.current) return
    setStatus("sending")

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      setStatus("sent")
      formRef.current.reset()
    } catch (err) {
      console.error("EmailJS error:", err)
      setStatus("error")
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    padding: "12px 14px",
    color: "#f5f5f0",
    fontSize: 13,
    outline: "none",
    fontFamily: "inherit",
    transition: "border-color 0.2s",
  }

  return (
    <section id="contact" style={{ padding: "120px 40px 0", borderTop: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>

      {/* Label */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ fontSize: 11, color: "rgba(245,245,240,0.3)", letterSpacing: "3px", textTransform: "uppercase", marginBottom: 48 }}
      >
        Contact
      </motion.p>

      {/* Big rolling headline */}
      <div style={{ marginBottom: 64 }}>
        <h2 style={{ fontSize: "clamp(48px, 8vw, 120px)", fontWeight: 700, letterSpacing: "-4px", lineHeight: 0.9 }}>
          <RollingText text="Let's work" />
          <br />
          <RollingText text="together." color="rgba(245,245,240,0.18)" />
        </h2>
      </div>

      {/* Main grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, marginBottom: 80 }}>

        {/* LEFT */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: 14, color: "rgba(245,245,240,0.4)", lineHeight: 1.8, marginBottom: 40, maxWidth: 400 }}
          >
            Open to freelance projects, full-time roles, and interesting collaborations. Let build something great together.
          </motion.p>

          {/* Email with copy */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 10, color: "rgba(245,245,240,0.25)", letterSpacing: "3px", textTransform: "uppercase", marginBottom: 12 }}>Email</p>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <a
                href={`mailto:${email}`}
                style={{ fontSize: "clamp(16px, 2vw, 24px)", color: "#f5f5f0", textDecoration: "none", borderBottom: "1px solid rgba(245,245,240,0.25)", paddingBottom: 4, letterSpacing: "-0.5px", transition: "border-color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#f5f5f0")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(245,245,240,0.25)")}
              >
                {email}
              </a>
              <motion.button
                onClick={copyEmail}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ fontSize: 10, color: copied ? "#4ade80" : "rgba(245,245,240,0.35)", background: "transparent", border: "1px solid", borderColor: copied ? "#4ade80" : "rgba(255,255,255,0.1)", padding: "5px 12px", cursor: "pointer", letterSpacing: "1px", transition: "all 0.2s", fontFamily: "inherit" }}
              >
                {copied ? "Copied!" : "Copy"}
              </motion.button>
            </div>
          </motion.div>

          {/* Availability */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} style={{ marginBottom: 48 }}>
            <p style={{ fontSize: 10, color: "rgba(245,245,240,0.25)", letterSpacing: "3px", textTransform: "uppercase", marginBottom: 12 }}>Availability</p>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", display: "inline-block", boxShadow: "0 0 8px #4ade80" }} />
              <span style={{ fontSize: 13, color: "rgba(245,245,240,0.55)", letterSpacing: "0.3px" }}>Available for work — Starting immediately</span>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <p style={{ fontSize: 10, color: "rgba(245,245,240,0.25)", letterSpacing: "3px", textTransform: "uppercase", marginBottom: 12 }}>Services</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {services.map(s => (
                <span key={s} style={{ fontSize: 11, color: "rgba(245,245,240,0.4)", border: "1px solid rgba(255,255,255,0.09)", padding: "6px 14px", letterSpacing: "0.5px" }}>{s}</span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT: contact form */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <p style={{ fontSize: 10, color: "rgba(245,245,240,0.25)", letterSpacing: "3px", textTransform: "uppercase", marginBottom: 24 }}>Send a message</p>

          {/* ── Success state ───────────────────────────────────────────────── */}
          {status === "sent" ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ border: "1px solid rgba(74,222,128,0.3)", padding: "40px 32px", textAlign: "center" }}
            >
              <p style={{ fontSize: 28, marginBottom: 12 }}>✅</p>
              <p style={{ fontSize: 16, color: "#4ade80", fontWeight: 600, marginBottom: 8 }}>Message sent!</p>
              <p style={{ fontSize: 13, color: "rgba(245,245,240,0.4)" }}>Thanks for reaching out. I will reply to your email shortly.</p>
              <motion.button
                onClick={() => setStatus("idle")}
                whileHover={{ opacity: 0.8 }}
                style={{ marginTop: 24, fontSize: 11, color: "rgba(245,245,240,0.35)", background: "transparent", border: "1px solid rgba(255,255,255,0.1)", padding: "6px 16px", cursor: "pointer", fontFamily: "inherit", letterSpacing: "1px" }}
              >
                Send another
              </motion.button>
            </motion.div>
          ) : (
            // ── Form ──────────────────────────────────────────────────────────
            <form ref={formRef} onSubmit={handleSubmit}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 10, color: "rgba(245,245,240,0.25)", letterSpacing: "1.5px", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Name</label>
                    <input
                      type="text"
                      name="from_name"          // ← matches EmailJS template
                      placeholder="Your name"
                      required
                      style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor = "rgba(245,245,240,0.3)")}
                      onBlur={e  => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 10, color: "rgba(245,245,240,0.25)", letterSpacing: "1.5px", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Email</label>
                    <input
                      type="email"
                      name="from_email"         // ← matches EmailJS template
                      placeholder="your@email.com"
                      required
                      style={inputStyle}
                      onFocus={e => (e.currentTarget.style.borderColor = "rgba(245,245,240,0.3)")}
                      onBlur={e  => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: 10, color: "rgba(245,245,240,0.25)", letterSpacing: "1.5px", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Subject</label>
                  <input
                    type="text"
                    name="subject"              // ← matches EmailJS template
                    placeholder="Project inquiry"
                    style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = "rgba(245,245,240,0.3)")}
                    onBlur={e  => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 10, color: "rgba(245,245,240,0.25)", letterSpacing: "1.5px", textTransform: "uppercase", display: "block", marginBottom: 8 }}>Message</label>
                  <textarea
                    name="message"              // ← matches EmailJS template
                    placeholder="Tell me about your project..."
                    rows={5}
                    required
                    style={{ ...inputStyle, resize: "none" }}
                    onFocus={e => (e.currentTarget.style.borderColor = "rgba(245,245,240,0.3)")}
                    onBlur={e  => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                  />
                </div>

                {/* Error message */}
                {status === "error" && (
                  <p style={{ fontSize: 12, color: "#f87171", letterSpacing: "0.3px" }}>
                    ❌ Something went wrong. Please email me directly at {email}
                  </p>
                )}

                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  whileHover={{ opacity: status === "sending" ? 1 : 0.88 }}
                  whileTap={{ scale: status === "sending" ? 1 : 0.98 }}
                  style={{
                    background: status === "sending" ? "rgba(245,245,240,0.5)" : "#f5f5f0",
                    color: "#0d0d0d",
                    fontSize: 13,
                    fontWeight: 600,
                    padding: "14px 28px",
                    border: "none",
                    cursor: status === "sending" ? "not-allowed" : "pointer",
                    letterSpacing: "0.5px",
                    fontFamily: "inherit",
                    textAlign: "left",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "background 0.2s",
                  }}
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                  <span style={{ fontSize: 16 }}>
                    {status === "sending" ? "⏳" : "→"}
                  </span>
                </motion.button>

              </div>
            </form>
          )}
        </motion.div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "32px 0 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <p style={{ fontSize: 11, color: "rgba(245,245,240,0.18)", letterSpacing: "0.5px" }}>
            © 2026 bhaveshkumbhare.dev — Designed & built with Next.js
          </p>
          <div style={{ display: "flex", gap: 24 }}>
            {socials.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredSocial(i)}
                onMouseLeave={() => setHoveredSocial(null)}
                animate={{ color: hoveredSocial === i ? "#f5f5f0" : "rgba(245,245,240,0.28)" }}
                style={{ fontSize: 12, textDecoration: "none", letterSpacing: "0.5px" }}
              >
                {s.label}
              </motion.a>
            ))}
          </div>
          <p style={{ fontSize: 11, color: "rgba(245,245,240,0.18)", letterSpacing: "0.5px" }}>Surat, India</p>
        </div>
      </div>

    </section>
  )
}