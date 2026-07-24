"use client"

import CursorGrid from "@/components/fx/cursor-grid"
import Magnet from "@/components/fx/magnet"
import TextPressure from "@/components/fx/text-pressure"
import { profile } from "@/lib/portfolio-data"
import { ArrowDown, Terminal, Gamepad2 } from "lucide-react"

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b-[3px] border-border">
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

      <div className="relative mx-auto max-w-6xl px-4 py-14 md:py-20">
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

        <div className="mt-6 grid gap-6 md:grid-cols-[1.4fr_1fr]">
          <div className="nb-border nb-shadow bg-card p-5 md:p-6">
            <p className="text-pretty text-xl font-bold leading-relaxed md:text-2xl">{profile.tagline}</p>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{profile.summary}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {profile.focus.map((f) => (
                <span key={f} className="nb-border bg-background px-2 py-1 font-mono text-[11px] font-bold uppercase">
                  {f}
                </span>
              ))}
            </div>
          </div>

          <div className="grid content-start gap-3">
            <Magnet padding={80} magnetStrength={6} wrapperClassName="w-full">
              <a
                href="#work"
                className="cursor-target nb-border nb-shadow nb-press flex w-full items-center justify-between gap-3 bg-primary px-4 py-4 font-mono text-sm font-bold uppercase tracking-wide text-primary-foreground"
              >
                See the work
                <ArrowDown className="size-4" />
              </a>
            </Magnet>

            <Magnet padding={80} magnetStrength={6} wrapperClassName="w-full">
              <a
                href="#terminal"
                className="cursor-target nb-border nb-shadow nb-press flex w-full items-center justify-between gap-3 bg-foreground px-4 py-4 font-mono text-sm font-bold uppercase tracking-wide text-background"
              >
                Open terminal
                <Terminal className="size-4" />
              </a>
            </Magnet>

            <Magnet padding={80} magnetStrength={6} wrapperClassName="w-full">
              <a
                href="#arcade"
                className="cursor-target nb-border nb-shadow nb-press flex w-full items-center justify-between gap-3 bg-accent px-4 py-4 font-mono text-sm font-bold uppercase tracking-wide text-accent-foreground"
              >
                Play a game
                <Gamepad2 className="size-4" />
              </a>
            </Magnet>

            <p className="nb-border bg-card px-3 py-2 font-mono text-[11px] leading-relaxed">
              TIP: move your cursor around — the grid reacts. Click anywhere for a pulse.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
