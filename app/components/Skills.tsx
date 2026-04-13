"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const categories = [
  {
    id: "languages",
    label: "Programming Languages",
    skills: [
      { name: "JavaScript", level: 90 },
      { name: "TypeScript", level: 10 },
      { name: "Python", level: 10 },
      { name: "HTML & CSS", level: 95 },
      { name: "SQL", level: 65 },
    ],
  },
  {
    id: "frameworks",
    label: "Frameworks",
    skills: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 10 },
      { name: "Tailwind", level: 92 },
      { name: "Framer Motion", level: 30 },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    skills: [
      { name: "Git", level: 85 },
      { name: "Figma", level: 10 },
      { name: "VS Code", level: 95 },
      { name: "Docker", level: 10},
    ],
  },
]

export function Skills() {

  const [active, setActive] = useState(categories[0])

  return (
    <section id="skills" className="py-32 px-8 border-t border-white/10">

      <p className="text-xs tracking-[3px] text-white/30 uppercase mb-16">
        Skills
      </p>

      <div className="grid md:grid-cols-2 gap-20">

        {/* LEFT */}
        <div className="space-y-2">

          {categories.map((cat) => (

            <motion.div
              key={cat.id}
              whileHover={{ x: 6 }}
              onClick={() => setActive(cat)}
              className={`cursor-pointer py-6 border-b border-white/10 flex justify-between items-center transition
              ${active.id === cat.id ? "text-white" : "text-white/50"}`}
            >

              <div>
                <p className="text-lg font-semibold tracking-tight">
                  {cat.label}
                </p>
                <p className="text-xs text-white/30">
                  {cat.skills.length} skills
                </p>
              </div>

              <motion.span
                animate={{ rotate: active.id === cat.id ? 45 : 0 }}
                className="text-xl"
              >
                +
              </motion.span>

            </motion.div>

          ))}

        </div>


        {/* RIGHT */}
        <div className="sticky top-32">

          <AnimatePresence mode="wait">

            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="p-10 bg-[#111418] border border-white/10 rounded-xl"
            >

              <h3 className="text-xl font-semibold mb-10">
                {active.label}
              </h3>


              <div className="space-y-6">

                {active.skills.map((skill) => (

                  <div key={skill.name}>

                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white/80">
                        {skill.name}
                      </span>
                      <span className="text-white/30 font-mono text-xs">
                        {skill.level}%
                      </span>
                    </div>

                    <div className="h-[2px] bg-white/10">

                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                        className="h-full bg-white"
                      />

                    </div>

                  </div>

                ))}

              </div>

            </motion.div>

          </AnimatePresence>

        </div>

      </div>

    </section>
  )
}