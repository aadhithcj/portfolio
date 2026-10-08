"use client";
import DecryptedText from "@/components/fx/DecryptedText"
type SectionHeadingProps = {
  index: string
  title: string
  kicker?: string
  lowercase?: boolean
  inverted?: boolean
}

export default function SectionHeading({ index, title, kicker, lowercase, inverted }: SectionHeadingProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="flex items-center gap-4">
        <span className={`nb-border nb-shadow-sm px-3 py-1.5 font-mono text-sm font-bold ${inverted ? 'bg-background text-foreground' : 'bg-foreground text-background'}`}>
          {index}
        </span>
        <h2 className={`text-4xl font-extrabold uppercase tracking-tight md:text-5xl ${inverted ? 'text-background' : ''}`}>
          <DecryptedText
            text={title}
            animateOn="view"
            sequential
            revealDirection="center"
            speed={70}
            className="text-current"
            encryptedClassName="text-neutral-400"
          />
        </h2>
      </div>
      {kicker && (
        <p className={`nb-border px-3 py-1.5 font-mono text-[11px] font-bold tracking-widest ${lowercase ? "normal-case" : "uppercase"} ${inverted ? "bg-background text-foreground" : "bg-card text-foreground"}`}>
          {kicker}
        </p>
      )}
    </div>
  )
}
