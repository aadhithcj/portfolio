"use client"

import { useEffect, useState } from "react"
import { sections } from "@/lib/portfolio-data"
import { Menu, X } from "lucide-react"

export default function SiteNav() {
  const [active, setActive] = useState("about")
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: "-45% 0px -50% 0px" },
    )
    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-border bg-background/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3" aria-label="Main">
        <a
          href="#top"
          className="cursor-target nb-border nb-shadow-sm nb-press bg-primary px-3 py-1.5 font-mono text-sm font-bold uppercase tracking-tight text-primary-foreground"
        >
          ACJ<span className="text-accent">_</span>
        </a>

        <ul className="hidden items-center gap-2 md:flex">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`cursor-target nb-border nb-press block px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wide ${
                  active === s.id ? "bg-foreground text-background" : "bg-card nb-shadow-sm"
                }`}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation"
          className="cursor-target nb-border nb-shadow-sm nb-press bg-secondary p-2 md:hidden"
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </nav>

      {open && (
        <ul className="grid gap-2 border-t-[3px] border-border bg-card px-4 py-3 md:hidden">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={() => setOpen(false)}
                className="nb-border nb-shadow-sm block px-3 py-2 font-mono text-sm font-bold uppercase"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
