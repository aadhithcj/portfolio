"use client"

import { motion, Variants } from "framer-motion"
import SectionHeading from "@/components/section-heading"
import { Camera, MonitorPlay, Palette, Trophy } from "lucide-react"

export default function BentoSection() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  }

  return (
    <section id="interests" className="border-b-[3px] border-border bg-foreground text-background">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <SectionHeading index="06" title="Beyond Code" kicker="Creative Pursuits" inverted />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {/* Main big block */}
          <motion.div variants={item} className="cursor-target nb-border nb-shadow bg-secondary p-6 md:col-span-2 flex flex-col justify-between min-h-[220px]">
            <MonitorPlay className="size-8 text-secondary-foreground mb-4" />
            <div>
              <h3 className="text-2xl font-extrabold uppercase tracking-tight text-secondary-foreground mb-2">
                Videography & Motion Graphics
              </h3>
              <p className="text-secondary-foreground/80 font-mono text-sm leading-relaxed max-w-md">
                Using Adobe Premiere Pro and After Effects to create cinematic edits, vintage film looks, and UI animations.
              </p>
            </div>
          </motion.div>

          {/* Small top right block */}
          <motion.div variants={item} className="cursor-target nb-border nb-shadow bg-background p-6 flex flex-col justify-between min-h-[220px]">
            <Palette className="size-8 text-foreground mb-4" />
            <div>
              <h3 className="text-xl font-extrabold uppercase tracking-tight text-foreground mb-2">
                UI / UX Design
              </h3>
              <p className="text-muted-foreground font-mono text-xs leading-relaxed">
                Figma & Framer. Crafting clean interfaces and design systems.
              </p>
            </div>
          </motion.div>

          {/* Small bottom left block */}
          <motion.div variants={item} className="cursor-target nb-border nb-shadow bg-background p-6 flex flex-col justify-between min-h-[220px]">
            <Camera className="size-8 text-foreground mb-4" />
            <div>
              <h3 className="text-xl font-extrabold uppercase tracking-tight text-foreground mb-2">
                Photography
              </h3>
              <p className="text-muted-foreground font-mono text-xs leading-relaxed">
                Color grading, image restoration, and editing with Lightroom.
              </p>
            </div>
          </motion.div>

          {/* Medium bottom right block */}
          <motion.div variants={item} className="cursor-target nb-border nb-shadow bg-primary p-6 md:col-span-2 flex flex-col justify-between min-h-[220px]">
            <Trophy className="size-8 text-primary-foreground mb-4" />
            <div>
              <h3 className="text-2xl font-extrabold uppercase tracking-tight text-primary-foreground mb-2">
                Recreational Football
              </h3>
              <p className="text-primary-foreground/80 font-mono text-sm leading-relaxed max-w-md">
                Stepping away from the screen to play recreational football and stay active.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
