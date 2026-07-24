type MarqueeProps = {
  items: string[]
  speed?: number
  className?: string
}

export default function Marquee({ items, speed = 28, className = "" }: MarqueeProps) {
  const track = [...items, ...items]
  return (
    <div
      className={`relative overflow-hidden border-y-[3px] border-border bg-foreground py-2 ${className}`}
      aria-hidden="true"
    >
      <div
        className="flex w-max items-center gap-8 whitespace-nowrap"
        style={{ animation: `nb-marquee ${speed}s linear infinite` }}
      >
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-8 font-mono text-sm font-bold uppercase tracking-widest text-background"
          >
            {item}
            <span className="text-primary">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
