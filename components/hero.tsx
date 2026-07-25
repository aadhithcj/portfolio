"use client"

import CursorGrid from "@/components/fx/cursor-grid"
import TextPressure from "@/components/fx/text-pressure"
import { profile } from "@/lib/portfolio-data"
import { ArrowDown } from "lucide-react"
import { useState } from "react"
import HeroStatCard from "@/components/ui/hero-stat-card"

export default function Hero() {
  const [curiosityClicks, setCuriosityClicks] = useState(0)
  const [revealed, setRevealed] = useState(false)

  function handleCuriosityClick() {
    if (revealed) return

    const next = curiosityClicks + 1

    setCuriosityClicks(next)

    if (next >= 5) {
      setTimeout(() => {
        setRevealed(true)
      }, 150)
    }
  }
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b-[3px] border-border"
    >
      <div className="pointer-events-none absolute inset-0">
        <CursorGrid
          cellSize={64}
          color="#1a1a1a"
          radius={150}
          falloff="smooth"
          holdTime={350}
          fadeDuration={900}
          lineWidth={1.4}
          maxOpacity={0.85}
          fillOpacity={0.06}
          gridOpacity={0.06}
          clickPulse
          pulseSpeed={700}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pt-14 pb-8 md:pt-20 md:pb-8">        {/* Top badges */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="nb-border nb-shadow-sm bg-primary px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-primary-foreground">
            CSE Graduate
          </span>

          <span className="nb-border nb-shadow-sm bg-secondary px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-secondary-foreground">
            Available for work
          </span>

          <span className="nb-border nb-shadow-sm bg-card px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest">
            India
          </span>
        </div>

        {/* Name */}
        <div className="mt-6 h-[16vw] min-h-24 w-full md:h-[13vw]">
          <TextPressure
            text="AADHITH CJ"
            flex
            alpha={false}
            stroke={false}
            width
            weight
            italic
            textColor="#141414"
            minFontSize={44}
          />
        </div>

        <h1 className="sr-only">
          {profile.name} — {profile.role}
        </h1>

        {/* Main Grid */}
        <div className="mt-6 grid gap-6 md:grid-cols-[1.4fr_1fr]">
          {/* Left Card */}
          <div className="nb-border nb-shadow bg-card p-5 md:p-6">
            <p className="text-pretty text-xl font-bold leading-relaxed md:text-2xl">
              {profile.tagline}
            </p>

            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              {profile.summary}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {profile.focus.map((f) => (
                <span
                  key={f}
                  className="nb-border bg-background px-2 py-1 font-mono text-[11px] font-bold uppercase"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <HeroStatCard
                id="projects"
                num="5"
                label="Major Projects"
                bg="#C6FF00"
                text="#111111"
                curiosityClicks={curiosityClicks}
                revealed={revealed}
              />

              <HeroStatCard
                id="tech"
                num="6+"
                label="Tech Stacks"
                bg="#FF5228"
                text="#ffffff"
                curiosityClicks={curiosityClicks}
                revealed={revealed}
              />

              <HeroStatCard
                id="ai"
                num="AI"
                label="Powered Apps"
                bg="#111111"
                text="#ffffff"
                curiosityClicks={curiosityClicks}
                revealed={revealed}
              />

              <HeroStatCard
                id="curiosity"
                num="∞"
                label="Curiosity"
                bg="#ffffff"
                text="#111111"
                curiosityClicks={curiosityClicks}
                revealed={revealed}
                onCuriosityClick={handleCuriosityClick}
              />
            </div>

            <p className="nb-border bg-card px-3 py-2 font-mono text-[11px] leading-relaxed">
              TIP: move your cursor around — the grid reacts. Click anywhere
              for a pulse.
            </p>
          </div>
        </div>

        {/* Scroll Button */}
        <div className="mt-10 flex justify-center">
          <button
            className="cursor-target nb-border nb-shadow-sm bg-card p-3 transition-all duration-200 hover:-translate-y-1 hover:nb-shadow"
            onClick={() =>
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            aria-label="Scroll to about"
          >
            <ArrowDown size={20} />
          </button>
        </div>
      </div>
    </section>
  )
}