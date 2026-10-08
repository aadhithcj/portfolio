"use client"
import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useState } from "react"

export default function TechnicalRuler() {
  const { scrollYProgress } = useScroll()
  const [mounted, setMounted] = useState(false)

  // Map scroll progress (0-1) to percentage string
  const percentage = useTransform(scrollYProgress, [0, 1], [0, 100])
  const yTransform = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"])
  
  const [displayPercent, setDisplayPercent] = useState("000%")

  useEffect(() => {
    setMounted(true)
    return percentage.on("change", (v) => {
      setDisplayPercent(`${Math.round(v).toString().padStart(3, '0')}%`)
    })
  }, [percentage])

  if (!mounted) return null

  return (
    <div className="fixed right-0 top-0 h-screen w-12 border-l-[1px] border-foreground/10 hidden md:flex flex-col z-50 pointer-events-none mix-blend-difference text-white">
      {/* Top Section */}
      <div className="flex-1 relative overflow-hidden">
        {/* Animated tick marks Container */}
        <motion.div
          className="absolute inset-0 flex flex-col items-end"
          style={{ y: yTransform }}
        >
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="w-full flex justify-end items-center h-24 relative opacity-40">
              <div className="h-[1px] w-2 bg-current" />
              {i % 2 === 0 && (
                <span className="absolute right-4 font-mono text-[8px] font-bold">
                  {(i * 5).toString().padStart(2, '0')}
                </span>
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Progress Indicator */}
      <div className="h-16 w-full flex items-center justify-center border-t-[1px] border-current/20 relative opacity-80">
        <div className="absolute right-0 top-0 h-[2px] w-full bg-primary" />
        <span className="font-mono text-[9px] font-bold tracking-widest text-primary mt-2">
          {displayPercent}
        </span>
      </div>
    </div>
  )
}
