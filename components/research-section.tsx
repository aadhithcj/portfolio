"use client"

import { motion } from "framer-motion"
import { BookOpen, MapPin, CalendarDays } from "lucide-react"
import SectionHeading from "@/components/section-heading"

export default function ResearchSection() {
  return (
    <section id="research" className="border-b-[3px] border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <SectionHeading index="05" title="Research" kicker="Academic Contributions" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="cursor-target nb-border nb-shadow bg-card mt-8 p-6 md:p-8 relative overflow-hidden group hover:border-primary transition-colors duration-500"
        >
          {/* Decorative background element */}
          <div className="absolute -right-20 -top-20 opacity-5 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-10 pointer-events-none">
            <BookOpen size={300} />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row gap-8 justify-between items-start md:items-center">
            <div className="max-w-2xl">
              <span className="inline-block bg-primary px-3 py-1 text-xs font-mono font-bold uppercase text-primary-foreground mb-4 border-[3px] border-border">
                Published Paper
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">
                RETINA: An AI Powered Assistive System for the Visually Impaired
              </h3>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 font-mono text-xs text-muted-foreground uppercase tracking-wide font-bold">
                <div className="flex items-center gap-2">
                  <CalendarDays size={16} className="text-primary" />
                  <span>March 24-25, 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-primary" />
                  <span>ICFISN 2026, Alappuzha</span>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-auto">
               <div className="border-[3px] border-border p-4 font-mono text-sm text-muted-foreground max-w-sm bg-background">
                 Co-authored and presented research detailing the architecture and performance of multiple on-device ML models for accessibility.
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
