import SectionHeading from "@/components/section-heading"
import { interests, philosophy, traits } from "@/lib/portfolio-data"

export default function AboutSection() {
  return (
    <section id="about" className="border-b-[3px] border-border">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <SectionHeading index="00" title="About" kicker="Who is behind the commits" />

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="nb-border nb-shadow bg-card p-5 lg:col-span-2">
            <p className="text-pretty text-lg font-bold leading-relaxed">
              I am a developer who enjoys turning ideas into practical software solutions.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              I have experience developing web applications, desktop applications, Android applications, and AI-powered
              systems. I enjoy working across the full development lifecycle — from planning and designing an
              application to implementing features, integrating databases, and deploying complete solutions.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              I enjoy continuously improving my skills, experimenting with new technologies, and taking on challenging
              projects that combine modern software engineering with intelligent systems.
            </p>

            <div className="mt-6 border-t-[3px] border-border pt-5">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest">Interests</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {interests.map((item) => (
                  <li
                    key={item}
                    className="cursor-target nb-border nb-shadow-sm nb-press bg-background px-2.5 py-1 font-mono text-[11px] font-bold uppercase"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid content-start gap-6">
            <div className="nb-border nb-shadow bg-secondary p-5 text-secondary-foreground">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest">How I build</h3>
              <ul className="mt-3 grid gap-3">
                {philosophy.map((line) => (
                  <li key={line} className="text-sm leading-relaxed">
                    <span className="font-mono font-bold">{"> "}</span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            <div className="nb-border nb-shadow bg-card p-5">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest">Traits</h3>
              <ul className="mt-3 grid gap-2">
                {traits.map((t) => (
                  <li key={t} className="flex items-start gap-2 text-sm font-bold leading-relaxed">
                    <span className="mt-1 inline-block size-2.5 shrink-0 border-[3px] border-border bg-primary" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
