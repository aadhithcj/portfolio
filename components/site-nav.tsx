"use client"

import { contact, profile } from "@/lib/portfolio-data"
import { motion, useScroll, useSpring } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

export default function SiteNav() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b-[1px] border-foreground/10 bg-background/95 backdrop-blur-sm hidden md:block">
      <motion.div
        className="absolute bottom-[-1px] left-0 right-0 h-[1px] origin-left bg-primary z-50"
        style={{ scaleX }}
      />
      <nav className="flex items-stretch h-10 w-full" aria-label="Main">
        {/* Name / Branding Cell */}
        <div className="flex items-center px-6 border-r-[1px] border-foreground/10">
          <a
            href="#top"
            className="cursor-target font-mono text-[10px] font-bold uppercase tracking-widest text-foreground hover:text-primary transition-colors"
          >
            {profile.name}
          </a>
        </div>
        
        {/* Spacer Cell */}
        <div className="flex-1 border-r-[1px] border-foreground/10 flex items-center px-6">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
             SOFTWARE ENGINEER // PORTFOLIO '26
          </span>
        </div>

        {/* Global Links Cells */}
        <div className="flex items-stretch">
          <a
            href={contact.github}
            target="_blank"
            rel="noreferrer"
            className="cursor-target flex items-center justify-center px-6 border-r-[1px] border-foreground/10 font-mono text-[9px] font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
          >
            GITHUB
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className="cursor-target flex items-center justify-center px-6 border-r-[1px] border-foreground/10 font-mono text-[9px] font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
          >
            LINKEDIN
          </a>
          <a
            href={contact.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="cursor-target flex items-center justify-center px-6 font-mono text-[9px] font-bold uppercase tracking-widest bg-primary text-primary-foreground hover:bg-primary/90 transition-colors gap-2"
          >
            RÉSUMÉ <ArrowUpRight size={12} />
          </a>
        </div>
      </nav>
    </header>
  )
}

