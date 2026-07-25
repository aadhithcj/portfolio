"use client"

import { useState } from "react"
import SectionHeading from "@/components/section-heading"
import { projects } from "@/lib/portfolio-data"
import { Plus, Minus, Star } from "lucide-react"

export default function ProjectsSection() {
  const [openId, setOpenId] = useState<string | null>(projects[0].id)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <section id="work" className="border-b-[3px] border-border">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <SectionHeading index="03" title="Work" kicker="Concept to deployment" />

        <ul className="mt-8 grid gap-5">
          {projects.map((project) => {
            const open = openId === project.id
            const hovered = hoveredId === project.id
            return (
              <li key={project.id}>
                <article
                  className={`nb-border nb-shadow transition-colors duration-300 ${project.flagship && !hovered ? "bg-primary" : "bg-card"} ${
                    open ? "" : "nb-press"
                  }`}
                  style={{ backgroundColor: hovered ? project.accent : undefined, color: hovered ? "#0a0a0a" : undefined }}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(open ? null : project.id)}
                    aria-expanded={open}
                    className="cursor-target flex w-full items-start gap-4 p-5 text-left"
                  >
                    <span className="nb-border bg-background px-2.5 py-1 font-mono text-sm font-bold">
                      {project.index}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <h3 className="text-2xl font-extrabold uppercase tracking-tight md:text-3xl">
                          {project.title}
                        </h3>
                        {project.flagship && (
                          <span className="nb-border flex items-center gap-1 bg-foreground px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-background">
                            <Star className="size-3" /> Flagship
                          </span>
                        )}
                      </span>
                      <span className="mt-1 block font-mono text-[11px] font-bold uppercase tracking-widest opacity-70">
                        {project.kind}
                      </span>
                    </span>
                    <span className="nb-border nb-shadow-sm bg-background p-1.5">
                      {open ? <Minus className="size-4" /> : <Plus className="size-4" />}
                    </span>
                  </button>

                  {open && (
                    <div className="border-t-[3px] border-border p-5">
                      <p className="max-w-2xl text-pretty leading-relaxed">{project.blurb}</p>

                      <div className="mt-5 grid gap-5 md:grid-cols-2">
                        <div className="nb-border bg-background p-4">
                          <h4 className="font-mono text-[11px] font-bold uppercase tracking-widest">Features</h4>
                          <ul className="mt-3 grid gap-2">
                            {project.features.map((f) => (
                              <li key={f} className="flex items-start gap-2 text-sm font-bold">
                                <span className="mt-1.5 inline-block size-2 shrink-0 bg-accent" />
                                {f}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="nb-border bg-background p-4">
                          <h4 className="font-mono text-[11px] font-bold uppercase tracking-widest">Tech</h4>
                          <ul className="mt-3 flex flex-wrap gap-2">
                            {project.tech.map((t) => (
                              <li key={t} className="nb-border px-2 py-1 font-mono text-[11px] font-bold">
                                {t}
                              </li>
                            ))}
                          </ul>
                          {project.note && (
                            <p className="mt-4 border-t-[3px] border-border pt-3 text-sm leading-relaxed text-muted-foreground">
                              {project.note}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
