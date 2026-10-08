"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { sections } from "@/lib/portfolio-data"

export default function SectionNavigation() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [isRulerHovered, setIsRulerHovered] = useState(false)

  useEffect(() => {
    setMounted(true)
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting)
        if (visibleEntries.length > 0) {
          visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio)
          const id = visibleEntries[0].target.id
          const index = sections.findIndex(s => s.id === id)
          if (index !== -1) setActiveIndex(index)
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

    const handleHoverStart = () => setIsRulerHovered(true)
    const handleHoverEnd = () => setIsRulerHovered(false)
    window.addEventListener('rulerHoverStart', handleHoverStart)
    window.addEventListener('rulerHoverEnd', handleHoverEnd)

    return () => {
      observer.disconnect()
      window.removeEventListener('rulerHoverStart', handleHoverStart)
      window.removeEventListener('rulerHoverEnd', handleHoverEnd)
    }
  }, [])

  if (!mounted) return null

  return (
    <div 
      className="fixed right-[80px] top-[15vh] bottom-[15vh] w-64 flex flex-col items-end z-40 pointer-events-none mix-blend-difference text-white transition-opacity duration-500"
      style={{ opacity: isRulerHovered ? 0 : 1 }}
    >
      {sections.map((section, index) => {
        const isActive = index === activeIndex
        const isNext = index === activeIndex + 1

        return (
          <motion.div
            layout
            key={section.id}
            className={`relative flex justify-end origin-right ${isActive ? 'mb-auto mt-6' : 'mb-3'}`}
            initial={false}
          >
            <button 
              onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" })}
              className="absolute inset-0 z-10 w-full h-full cursor-target pointer-events-auto"
              aria-label={`Scroll to ${section.label}`}
            />
            
            <motion.div 
              layout
              className={`flex ${isNext ? 'flex-col items-center gap-[2px]' : 'flex-row items-center'} font-bold uppercase tracking-tighter`} 
            >
              {section.label.toUpperCase().split("").map((char, i) => (
                <motion.span
                  layout
                  key={`${section.id}-${i}`}
                  className="inline-block"
                  initial={false}
                  animate={{
                    fontSize: isActive ? 34 : 14,
                    lineHeight: 1,
                    opacity: isActive ? 1 : 0.35,
                  }}
                  transition={{
                    layout: { type: "spring", stiffness: 300, damping: 30 },
                    fontSize: { duration: 0.4 },
                    opacity: { duration: 0.4 }
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}
