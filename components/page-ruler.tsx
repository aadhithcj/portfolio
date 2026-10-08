"use client"
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import { sections } from "@/lib/portfolio-data"

export default function PageRuler() {
  const { scrollY, scrollYProgress } = useScroll()
  const [mounted, setMounted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  
  const yTransform = useTransform(scrollY, v => -v)
  const progressTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const [percent, setPercent] = useState("000%")
  const [sectionPercents, setSectionPercents] = useState<Record<string, number>>({})

  useEffect(() => {
    setMounted(true)
    
    // Calculate section scroll percentages for the minimap
    const updatePercents = () => {
      const scrollHeight = document.body.scrollHeight - window.innerHeight
      if (scrollHeight <= 0) return
      
      const percents: Record<string, number> = {}
      sections.forEach(s => {
        const el = document.getElementById(s.id)
        if (el) {
          percents[s.id] = (el.offsetTop / scrollHeight) * 100
        }
      })
      setSectionPercents(percents)
    }
    
    // Slight delay to ensure DOM is fully rendered
    setTimeout(updatePercents, 500)
    window.addEventListener('resize', updatePercents)
    return () => window.removeEventListener('resize', updatePercents)
  }, [])

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setPercent(`${Math.round(latest * 100).toString().padStart(3, '0')}%`)
  })

  if (!mounted) return null

  const ticks = Array.from({ length: 250 }) // Standard scrolling ticks
  const minimapTicks = Array.from({ length: 101 }) // 0 to 100 percent

  return (
    <div 
      className="fixed right-0 top-0 bottom-0 pointer-events-auto z-50 mix-blend-difference text-white flex justify-end transition-all duration-500 ease-out"
      style={{ width: isHovered ? '240px' : '60px' }}
      onMouseEnter={() => {
        setIsHovered(true)
        window.dispatchEvent(new Event('rulerHoverStart'))
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        window.dispatchEvent(new Event('rulerHoverEnd'))
      }}
    >
      {/* Background overlay when hovered */}
      <div 
        className={`absolute inset-0 bg-background/5 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} 
      />

      <div className="relative w-full h-full overflow-hidden border-l-[1px] border-current/20">
        
        {/* State 1: Scrolling Track (!isHovered) */}
        <motion.div 
          className="absolute inset-x-0 top-0 w-full transition-opacity duration-500"
          style={{ y: yTransform, opacity: isHovered ? 0 : 1 }}
        >
          {ticks.map((_, i) => {
            const isMajor = i % 5 === 0
            const label = isMajor ? i.toString() : ""
            return (
              <div key={`tick-${i}`} className="absolute right-0 flex items-center" style={{ top: i * 71.33 }}>
                {isMajor && (
                  <span className="absolute right-[24px] font-mono text-[9px] tracking-[0.08em] opacity-50 -translate-y-1/2">
                    {label}
                  </span>
                )}
                <div 
                  className="bg-current"
                  style={{ width: isMajor ? 20 : 10, height: 1, opacity: isMajor ? 0.8 : 0.4 }}
                />
              </div>
            )
          })}
        </motion.div>

        {/* State 2: Minimap Zoomed Out Track (isHovered) */}
        <div 
          className="absolute inset-0 w-full transition-opacity duration-500"
          style={{ opacity: isHovered ? 1 : 0, pointerEvents: isHovered ? 'auto' : 'none' }}
        >
          {/* Minimap Ticks 0-100% */}
          {minimapTicks.map((_, i) => {
            const isMajor = i % 5 === 0
            if (!isMajor && i % 1 !== 0) return null // Draw fewer minor ticks if needed, but 100 is fine
            
            return (
              <div key={`mini-${i}`} className="absolute right-0 flex items-center" style={{ top: `${i}%` }}>
                {isMajor && (
                  <span className="absolute right-[24px] font-mono text-[9px] tracking-[0.08em] opacity-50 -translate-y-1/2">
                    {i}
                  </span>
                )}
                <div 
                  className="bg-current"
                  style={{ width: isMajor ? 20 : 10, height: 1, opacity: isMajor ? 0.8 : 0.4 }}
                />
              </div>
            )
          })}

          {/* Section Labels in Minimap */}
          {sections.map(section => {
            const topPercent = sectionPercents[section.id] ?? 0
            return (
              <button
                key={`label-${section.id}`}
                onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" })}
                className="absolute right-[60px] font-bold uppercase tracking-tighter hover:text-primary transition-colors origin-right -translate-y-1/2 text-[12px] md:text-[14px]"
                style={{ top: `${topPercent}%` }}
              >
                {section.label}
              </button>
            )
          })}
        </div>

        {/* Blue line and percentage moving DOWN as we scroll down */}
        <motion.div 
          className="absolute right-0 flex flex-col items-end transition-all duration-500 z-10"
          style={{ top: progressTop, y: "-50%", width: isHovered ? '100%' : '100%' }}
        >
          <div className="w-full h-[1.5px] bg-[#3B82F6] shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
          <span className="font-mono text-[9px] font-bold tracking-[0.08em] text-[#3B82F6] opacity-100 mr-[4px] mt-[4px]">
            {percent}
          </span>
        </motion.div>

      </div>
    </div>
  )
}
