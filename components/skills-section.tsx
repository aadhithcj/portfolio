"use client"

import { useState } from "react"
import SectionHeading from "@/components/section-heading"
import Magnet from "@/components/fx/magnet"
import { skillGroups } from "@/lib/portfolio-data"

const ACCENTS = ["bg-primary", "bg-secondary", "bg-card", "bg-primary", "bg-secondary", "bg-card", "bg-primary"]

export default function SkillsSection() {
  const [activeId, setActiveId] = useState(skillGroups[0].id)
  const active = skillGroups.find((g) => g.id === activeId) ?? skillGroups[0]

  return (
    <section id="skills" className="border-b-[3px] border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <SectionHeading index="01" title="Stack" kicker="Tools I build with" />

        <div className="mt-8 grid gap-6 md:grid-cols-[240px_1fr]">
          <ul className="grid content-start gap-2">
            {skillGroups.map((group, i) => (
              <li key={group.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(group.id)}
                  aria-pressed={activeId === group.id}
                  className={`cursor-target nb-border nb-press flex w-full items-center justify-between px-3 py-2.5 font-mono text-xs font-bold uppercase tracking-widest ${
                    activeId === group.id
                      ? "bg-foreground text-background nb-shadow"
                      : `${ACCENTS[i % ACCENTS.length]} nb-shadow-sm`
                  }`}
                >
                  {group.label}
                  <span className="tabular-nums opacity-70">{String(group.items.length).padStart(2, "0")}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="nb-border nb-shadow bg-card p-5 md:p-6">
            <div className="flex items-center justify-between gap-4 border-b-[3px] border-border pb-4">
              <h3 className="text-2xl font-extrabold uppercase tracking-tight">{active.label}</h3>
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                hover the chips
              </span>
            </div>

            <ul className="mt-6 flex flex-wrap gap-3">
              {active.items.map((item) => (
                <li key={item}>
                  <Magnet padding={40} magnetStrength={4}>
                    <span className="cursor-target nb-border nb-shadow-sm block bg-background px-3 py-2 font-mono text-sm font-bold">
                      {item}
                    </span>
                  </Magnet>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
