"use client"

import { motion } from "framer-motion"
import { timelineItems } from "@/lib/portfolio-data"

export default function TimelineSection() {
  return (
    <section id="journey" className="border-b-[3px] border-border bg-foreground text-background">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
          <div className="flex items-center gap-4">
            <span className="nb-border nb-shadow-sm bg-background px-3 py-1.5 font-mono text-sm font-bold text-foreground">
              04
            </span>
            <h2 className="text-4xl font-extrabold uppercase tracking-tight md:text-5xl text-background">
              Journey
            </h2>
          </div>
          <p className="nb-border bg-card px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-widest text-foreground">
            Development Timeline
          </p>
        </div>

        <div className="relative pl-6 md:pl-8 ml-2">
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute left-0 top-0 bottom-0 w-[3px] bg-background/20"
          />
          {timelineItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              whileHover={{ x: 5 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.15, duration: 0.5, type: "spring", stiffness: 100 }}
              className="relative mb-10 last:mb-0 cursor-target group"
            >
              <div className="absolute -left-[37px] md:-left-[45px] top-1 h-4 w-4 rounded-full border-[3px] border-background bg-foreground transition-colors duration-300 group-hover:bg-primary group-hover:border-primary" />
              
              <div className="nb-border bg-[#121212] p-5 border-[3px] border-background/10 hover:border-primary transition-colors duration-300 shadow-lg">
                <span className="inline-block bg-primary px-2 py-0.5 text-[10px] font-mono font-bold uppercase text-primary-foreground mb-3">
                  {item.year}
                </span>
                <h3 className="text-xl font-bold uppercase text-[#f5f0e8] mb-2">{item.title}</h3>
                <p className="text-[#b0aa9f] text-sm leading-relaxed max-w-prose">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
