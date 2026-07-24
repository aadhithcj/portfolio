"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import SectionHeading from "@/components/section-heading"
import Magnet from "@/components/fx/magnet"
import { Banknote, Box, TriangleAlert, Type, Play, RotateCcw } from "lucide-react"

const GRID = 16
const ROUND_MS = 30_000
const LIFETIME = 1150
const TICK = 120

type Kind = "object" | "currency" | "text" | "obstacle"

type Target = {
  id: number
  cell: number
  kind: Kind
  born: number
}

const KIND_META: Record<Kind, { label: string; icon: typeof Box; bg: string; points: number }> = {
  object: { label: "Object", icon: Box, bg: "bg-primary", points: 10 },
  currency: { label: "Currency", icon: Banknote, bg: "bg-secondary", points: 15 },
  text: { label: "Text", icon: Type, bg: "bg-card", points: 20 },
  obstacle: { label: "Obstacle", icon: TriangleAlert, bg: "bg-accent", points: -25 },
}

const KIND_POOL: Kind[] = ["object", "object", "currency", "currency", "text", "obstacle"]

export default function ArcadeSection() {
  const [running, setRunning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(ROUND_MS)
  const [targets, setTargets] = useState<Target[]>([])
  const [score, setScore] = useState(0)
  const [hits, setHits] = useState(0)
  const [misses, setMisses] = useState(0)
  const [streak, setStreak] = useState(0)
  const [best, setBest] = useState(0)
  const [log, setLog] = useState<string[]>([])
  const idRef = useRef(0)

  const pushLog = useCallback((entry: string) => {
    setLog((prev) => [entry, ...prev].slice(0, 6))
  }, [])

  const start = () => {
    setRunning(true)
    setTimeLeft(ROUND_MS)
    setTargets([])
    setScore(0)
    setHits(0)
    setMisses(0)
    setStreak(0)
    setLog(["round started — detect objects, avoid obstacles"])
  }

  useEffect(() => {
    if (!running) return
    const interval = setInterval(() => {
      const now = performance.now()

      setTimeLeft((t) => {
        const next = t - TICK
        return next <= 0 ? 0 : next
      })

      setTargets((prev) => {
        const alive = prev.filter((t) => now - t.born < LIFETIME)
        const occupied = new Set(alive.map((t) => t.cell))
        const maxActive = 3
        if (alive.length < maxActive && Math.random() < 0.55) {
          const free: number[] = []
          for (let i = 0; i < GRID; i++) if (!occupied.has(i)) free.push(i)
          if (free.length) {
            const cell = free[Math.floor(Math.random() * free.length)]
            const kind = KIND_POOL[Math.floor(Math.random() * KIND_POOL.length)]
            idRef.current += 1
            return [...alive, { id: idRef.current, cell, kind, born: now }]
          }
        }
        return alive
      })
    }, TICK)

    return () => clearInterval(interval)
  }, [running])

  useEffect(() => {
    if (running && timeLeft <= 0) {
      setRunning(false)
      setTargets([])
      setBest((b) => Math.max(b, score))
      pushLog(`round over — final score ${score}`)
    }
  }, [running, timeLeft, score, pushLog])

  const handleCell = (cell: number) => {
    if (!running) return
    const target = targets.find((t) => t.cell === cell)

    if (!target) {
      setMisses((m) => m + 1)
      setStreak(0)
      setScore((s) => Math.max(0, s - 5))
      pushLog("false positive — empty frame")
      return
    }

    setTargets((prev) => prev.filter((t) => t.id !== target.id))

    if (target.kind === "obstacle") {
      setMisses((m) => m + 1)
      setStreak(0)
      setScore((s) => Math.max(0, s + KIND_META.obstacle.points))
      pushLog("obstacle tapped — penalty applied")
      return
    }

    const nextStreak = streak + 1
    const multiplier = 1 + Math.floor(nextStreak / 5) * 0.5
    const gained = Math.round(KIND_META[target.kind].points * multiplier)
    setStreak(nextStreak)
    setHits((h) => h + 1)
    setScore((s) => s + gained)
    pushLog(`${KIND_META[target.kind].label.toLowerCase()} detected +${gained}`)
  }

  const accuracy = hits + misses === 0 ? 0 : Math.round((hits / (hits + misses)) * 100)
  const seconds = (timeLeft / 1000).toFixed(1)

  return (
    <section id="arcade" className="border-b-[3px] border-border">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <SectionHeading index="04" title="Arcade" kicker="Detector — a nod to RETINA" />

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_300px]">
          <div className="nb-border nb-shadow-lg bg-card p-4 md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b-[3px] border-border pb-4">
              <div className="flex flex-wrap gap-2 font-mono text-[11px] font-bold uppercase tracking-widest">
                <span className="nb-border bg-foreground px-2.5 py-1 text-background">score {score}</span>
                <span className="nb-border bg-background px-2.5 py-1">streak {streak}</span>
                <span className="nb-border bg-background px-2.5 py-1">acc {accuracy}%</span>
                <span className="nb-border bg-primary px-2.5 py-1 tabular-nums text-primary-foreground">
                  {seconds}s
                </span>
              </div>

              <Magnet padding={50} magnetStrength={5}>
                <button
                  type="button"
                  onClick={start}
                  className="cursor-target nb-border nb-shadow-sm nb-press flex items-center gap-2 bg-accent px-3 py-2 font-mono text-xs font-bold uppercase tracking-widest text-accent-foreground"
                >
                  {running ? <RotateCcw className="size-4" /> : <Play className="size-4" />}
                  {running ? "Restart" : "Start round"}
                </button>
              </Magnet>
            </div>

            <div className="mx-auto mt-5 grid max-w-[460px] grid-cols-4 gap-2 md:gap-3">
              {Array.from({ length: GRID }).map((_, cell) => {
                const target = targets.find((t) => t.cell === cell)
                const meta = target ? KIND_META[target.kind] : null
                const Icon = meta?.icon
                return (
                  <button
                    key={cell}
                    type="button"
                    onClick={() => handleCell(cell)}
                    disabled={!running}
                    aria-label={target ? `${meta?.label} detected in frame ${cell + 1}` : `Empty frame ${cell + 1}`}
                    className={`nb-border relative flex aspect-square items-center justify-center transition-colors duration-75 ${
                      target ? `${meta?.bg} nb-shadow-sm` : "bg-background"
                    } ${running ? "cursor-target" : "opacity-60"}`}
                  >
                    {Icon && <Icon className="size-6 md:size-8" strokeWidth={2.5} />}
                    {target && (
                      <span className="absolute bottom-1 left-1 font-mono text-[9px] font-bold uppercase">
                        {meta?.label}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            {!running && (
              <p className="mt-5 border-t-[3px] border-border pt-4 font-mono text-xs leading-relaxed">
                {best > 0 ? `BEST THIS SESSION: ${best} PTS · ` : ""}
                Tap objects, currency and text as they appear. Skip the obstacle warnings — tapping one costs you
                points. Every 5 clean detections raises your multiplier.
              </p>
            )}
          </div>

          <div className="grid content-start gap-3">
            <div className="nb-border nb-shadow bg-secondary p-4 text-secondary-foreground">
              <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest">Scoring</h3>
              <ul className="mt-3 grid gap-2 font-mono text-xs font-bold">
                {(Object.keys(KIND_META) as Kind[]).map((k) => {
                  const meta = KIND_META[k]
                  const Icon = meta.icon
                  return (
                    <li key={k} className="flex items-center gap-2">
                      <span className={`nb-border ${meta.bg} p-1`}>
                        <Icon className="size-3.5" strokeWidth={2.5} />
                      </span>
                      {meta.label}
                      <span className="ml-auto">
                        {meta.points > 0 ? "+" : ""}
                        {meta.points}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="nb-border nb-shadow bg-foreground p-4">
              <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-primary">Detection log</h3>
              <ul className="mt-3 grid gap-1.5 font-mono text-[11px] text-background">
                {log.length === 0 ? (
                  <li className="text-background/50">awaiting first round…</li>
                ) : (
                  log.map((entry, i) => (
                    <li key={`${entry}-${i}`} className={i === 0 ? "text-secondary" : "text-background/70"}>
                      {"> "}
                      {entry}
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
