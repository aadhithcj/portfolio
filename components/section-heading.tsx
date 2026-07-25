"use client";
import DecryptedText from "@/components/fx/DecryptedText"
type SectionHeadingProps = {
  index: string
  title: string
  kicker?: string
  lowercase?: boolean
}

export default function SectionHeading({ index, title, kicker, lowercase }: SectionHeadingProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="flex items-center gap-4">
        <span className="nb-border nb-shadow-sm bg-foreground px-3 py-1.5 font-mono text-sm font-bold text-background">
          {index}
        </span>
        <h2 className="text-4xl font-extrabold uppercase tracking-tight md:text-5xl">
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
        <p className={`nb-border bg-card px-3 py-1.5 font-mono text-[11px] font-bold tracking-widest ${lowercase ? "normal-case" : "uppercase"}`}>
          {kicker}
        </p>
      )}
    </div>
  )
}
