"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import SectionHeading from "@/components/section-heading"
import { interests, philosophy, profile, projects, skillGroups, traits } from "@/lib/portfolio-data"

type Line = { text: string; tone?: "in" | "out" | "accent" | "dim" }

const HELP: Line[] = [
  { text: "AVAILABLE COMMANDS", tone: "accent" },
  { text: "  help            list every command" },
  { text: "  whoami          quick identity dump" },
  { text: "  about           longer bio" },
  { text: "  skills          all stack groups" },
  { text: "  skills <group>  e.g. skills ai" },
  { text: "  projects        list projects" },
  { text: "  open <id>       project detail, e.g. open retina" },
  { text: "  interests       areas I like working in" },
  { text: "  philosophy      how I approach building software" },
  { text: "  traits          how people describe me" },
  { text: "  contact         how to reach me" },
  { text: "  goto <section>  scroll the page, e.g. goto arcade" },
  { text: "  neofetch        system card" },
  { text: "  sudo            try it" },
  { text: "  clear           wipe the screen" },
  { text: "", tone: "dim" },
  { text: "↑ / ↓ cycles history · Tab autocompletes", tone: "dim" },
]

const WELCOME: Line[] = [
  { text: "aadhith.sh — interactive resume shell v1.0", tone: "accent" },
  { text: "Type 'help' to see what this thing can do.", tone: "dim" },
]

function bar(value: number) {
  const filled = Math.round(value / 10)
  return `[${"#".repeat(filled)}${".".repeat(10 - filled)}]`
}

export default function TerminalSection() {
  const [lines, setLines] = useState<Line[]>(WELCOME)
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  const push = (newLines: Line[]) => setLines((prev) => [...prev, ...newLines])

  const commands: Record<string, (arg?: string) => Line[] | "clear"> = {
    help: () => HELP,
    whoami: () => [
      { text: profile.name, tone: "accent" },
      { text: profile.role },
      { text: "CSE graduate · builds web, desktop, Android and AI-powered systems" },
    ],
    about: () => [
      { text: profile.tagline },
      { text: "" },
      { text: profile.summary },
    ],
    skills: (arg) => {
      if (arg) {
        const group = skillGroups.find(
          (g) => g.id === arg.toLowerCase() || g.label.toLowerCase() === arg.toLowerCase(),
        )
        if (!group) {
          return [
            { text: `no group named "${arg}"`, tone: "accent" },
            { text: `try: ${skillGroups.map((g) => g.id).join(", ")}`, tone: "dim" },
          ]
        }
        return [
          { text: `${group.label.toUpperCase()}`, tone: "accent" },
          ...group.items.map((i) => ({ text: `  · ${i}` })),
        ]
      }
      return skillGroups.flatMap((g) => [
        { text: `${g.label.toUpperCase()} ${bar(Math.min(100, g.items.length * 16))}`, tone: "accent" as const },
        { text: `  ${g.items.join(" · ")}` },
      ])
    },
    projects: () => [
      { text: "PROJECTS", tone: "accent" },
      ...projects.map((p) => ({ text: `  ${p.index}  ${p.id.padEnd(14)} ${p.title} — ${p.kind}` })),
      { text: "", tone: "dim" },
      { text: "run: open <id>", tone: "dim" },
    ],
    open: (arg) => {
      if (!arg) return [{ text: "usage: open <project-id>", tone: "dim" }]
      const p = projects.find((x) => x.id === arg.toLowerCase() || x.title.toLowerCase() === arg.toLowerCase())
      if (!p) return [{ text: `no project "${arg}". run 'projects' for the list.`, tone: "accent" }]
      return [
        { text: `${p.title} — ${p.kind}`, tone: "accent" },
        { text: p.blurb },
        { text: "" },
        { text: "features:", tone: "dim" },
        ...p.features.map((f) => ({ text: `  ✔ ${f}` })),
        { text: "" },
        { text: `tech: ${p.tech.join(", ")}`, tone: "dim" },
        ...(p.note ? [{ text: "" }, { text: p.note, tone: "dim" as const }] : []),
      ]
    },
    interests: () => [{ text: "AREAS OF INTEREST", tone: "accent" }, ...interests.map((i) => ({ text: `  · ${i}` }))],
    philosophy: () => [
      { text: "DEVELOPMENT PHILOSOPHY", tone: "accent" },
      ...philosophy.map((p) => ({ text: `  ${p}` })),
    ],
    traits: () => [{ text: "TRAITS", tone: "accent" }, ...traits.map((t) => ({ text: `  · ${t}` }))],
    contact: () => [
      { text: "CONTACT", tone: "accent" },
      { text: "  Scroll to the contact block, or use the buttons there." },
      { text: "  Open to software engineering and full stack roles." },
    ],
    neofetch: () => [
      { text: "aadhith@portfolio", tone: "accent" },
      { text: "-----------------" },
      { text: `role     : ${profile.role}` },
      { text: "shell    : aadhith.sh" },
      { text: "runtime  : Next.js + React + Tailwind" },
      { text: `projects : ${projects.length} shipped end-to-end` },
      { text: `stack    : ${skillGroups.reduce((n, g) => n + g.items.length, 0)} tools tracked` },
      { text: "theme    : neobrutalism / paper + acid" },
    ],
    goto: (arg) => {
      const id = (arg || "").toLowerCase()
      const valid = ["about", "skills", "work", "terminal", "arcade", "contact", "top"]
      if (!valid.includes(id)) return [{ text: `usage: goto ${valid.join("|")}`, tone: "dim" }]
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
      return [{ text: `→ scrolling to ${id}`, tone: "accent" }]
    },
    sudo: () => [
      { text: "nice try.", tone: "accent" },
      { text: "this shell only serves resumes.", tone: "dim" },
    ],
    ls: () => [{ text: "about  skills  projects  arcade  contact  resume.txt" }],
    date: () => [{ text: new Date().toString() }],
    echo: (arg) => [{ text: arg || "" }],
    clear: () => "clear",
  }

  const run = (raw: string) => {
    const trimmed = raw.trim()
    if (!trimmed) return
    const [name, ...rest] = trimmed.split(/\s+/)
    const arg = rest.join(" ")
    const cmd = commands[name.toLowerCase()]

    setHistory((prev) => [trimmed, ...prev])
    setHistoryIndex(-1)

    if (!cmd) {
      push([
        { text: `$ ${trimmed}`, tone: "in" },
        { text: `command not found: ${name}`, tone: "accent" },
        { text: "type 'help' for the list", tone: "dim" },
      ])
      return
    }

    const result = cmd(arg)
    if (result === "clear") {
      setLines([])
      return
    }
    push([{ text: `$ ${trimmed}`, tone: "in" }, ...result, { text: "" }])
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (e.nativeEvent.isComposing || e.keyCode === 229) return
      run(input)
      setInput("")
      return
    }
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (!history.length) return
      const next = Math.min(historyIndex + 1, history.length - 1)
      setHistoryIndex(next)
      setInput(history[next])
      return
    }
    if (e.key === "ArrowDown") {
      e.preventDefault()
      const next = historyIndex - 1
      if (next < 0) {
        setHistoryIndex(-1)
        setInput("")
        return
      }
      setHistoryIndex(next)
      setInput(history[next])
      return
    }
    if (e.key === "Tab") {
      e.preventDefault()
      const match = Object.keys(commands).find((c) => c.startsWith(input.trim().toLowerCase()) && input.trim())
      if (match) setInput(match + " ")
    }
  }

  const quick = ["help", "whoami", "projects", "skills ai", "open retina", "neofetch"]

  return (
    <section id="terminal" className="border-b-[3px] border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <SectionHeading index="03" title="Terminal" kicker="A real shell, type in it" />

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_260px]">
          <div
            className="nb-border nb-shadow-lg cursor-target bg-foreground"
            onClick={() => inputRef.current?.focus()}
          >
            <div className="flex items-center gap-2 border-b-[3px] border-border bg-primary px-3 py-2">
              <span className="size-3 border-[2px] border-border bg-accent" />
              <span className="size-3 border-[2px] border-border bg-card" />
              <span className="size-3 border-[2px] border-border bg-secondary" />
              <span className="ml-2 font-mono text-[11px] font-bold uppercase tracking-widest text-primary-foreground">
                aadhith.sh
              </span>
            </div>

            <div ref={scrollRef} className="h-[420px] overflow-y-auto p-4 font-mono text-[13px] leading-relaxed">
              {lines.map((line, i) => (
                <pre
                  key={i}
                  className={`whitespace-pre-wrap break-words ${
                    line.tone === "in"
                      ? "font-bold text-primary"
                      : line.tone === "accent"
                        ? "text-secondary"
                        : line.tone === "dim"
                          ? "text-background/55"
                          : "text-background"
                  }`}
                >
                  {line.text}
                </pre>
              ))}

              <div className="flex items-center gap-2">
                <span className="font-bold text-primary">$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="Terminal input"
                  className="w-full bg-transparent font-mono text-[13px] text-background caret-transparent outline-none"
                />
                <span
                  className="pointer-events-none -ml-2 inline-block h-4 w-2 bg-primary"
                  style={{ animation: "nb-blink 1s steps(1) infinite" }}
                />
              </div>
            </div>
          </div>

          <div className="grid content-start gap-3">
            <p className="nb-border nb-shadow-sm bg-card px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-widest">
              Quick commands
            </p>
            {quick.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  run(c)
                  inputRef.current?.focus()
                }}
                className="cursor-target nb-border nb-shadow-sm nb-press bg-secondary px-3 py-2 text-left font-mono text-xs font-bold text-secondary-foreground"
              >
                $ {c}
              </button>
            ))}
            <p className="nb-border bg-card px-3 py-2 font-mono text-[11px] leading-relaxed">
              Everything in this shell reads from the same data that renders the page.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
