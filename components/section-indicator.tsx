"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { sections } from "@/lib/portfolio-data"

export default function SectionIndicator() {
  const [activeSection, setActiveSection] = useState(sections[0].id)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry that is intersecting the most
        const visibleEntries = entries.filter((entry) => entry.isIntersecting)
        if (visibleEntries.length > 0) {
          // Sort by intersection ratio to find the most prominent section
          visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio)
          setActiveSection(visibleEntries[0].target.id)
        }
      },
      {
        rootMargin: "-20% 0px -20% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    )

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed right-16 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-6 z-50 pointer-events-none mix-blend-difference text-white">
      {sections.map((section, index) => {
        const isActive = activeSection === section.id
        return (
          <div key={section.id} className="relative flex items-center justify-end h-4">
            <span
              className={`font-mono text-[9px] font-bold uppercase tracking-widest transition-all duration-300 mr-4 ${
                isActive ? "opacity-100 scale-100" : "opacity-30 scale-95"
              }`}
            >
              {String(index + 1).padStart(2, '0')} {section.label}
            </span>
            <div className="w-1 h-1 bg-current opacity-30 rounded-full" />
            {isActive && (
              <motion.div
                layoutId="activeSectionIndicator"
                className="absolute right-0 w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_rgba(var(--primary),0.8)]"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
