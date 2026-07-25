import SectionHeading from "@/components/section-heading"
import { interests, philosophy, traits } from "@/lib/portfolio-data"
import HoverKeyword from "@/components/ui/hover-keyword"
export default function AboutSection() {
  return (
    <section id="about" className="border-b-[3px] border-border">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <SectionHeading index="01" title="About" kicker="Who is behind the commits" />
        <p className="mt-4 max-w-xl text-lg font-bold italic leading-relaxed">
          "Curiosity led me here. Building things keeps me here."
        </p>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="nb-border nb-shadow bg-card p-5 lg:col-span-2">
            <p className="text-pretty text-xl font-bold leading-relaxed">
              I'm a Computer Science graduate who enjoys turning ideas into software that solves real-world problems.
            </p>
            <p className="mt-5 max-w-prose leading-8 text-muted-foreground">
              I have experience developing <HoverKeyword text="web applications">
                <div className="space-y-2">
                  <p className="border-b-2 border-border pb-2 font-bold">
                    CV Management System
                  </p>

                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p>React • Next.js</p>
                    <p>Supabase • PostgreSQL</p>
                  </div>
                </div>
              </HoverKeyword>, <HoverKeyword text="desktop applications">
                <div className="space-y-2">
                  <p className="border-b-2 border-border pb-2 font-bold">
                    Motorbike Inventory System
                  </p>

                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p>PyQt6 • SQLite</p>
                    <p>Inventory • Billing • Purchases</p>
                  </div>
                </div>
              </HoverKeyword>, <HoverKeyword text="Android applications">
                <div className="space-y-2">
                  <p className="border-b-2 border-border pb-2 font-bold">
                    RETINA
                  </p>

                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p>Jetpack Compose • CameraX</p>
                    <p>TensorFlow Lite • ML Kit</p>
                  </div>
                </div>
              </HoverKeyword>, and <HoverKeyword text="AI-powered systems">
                <div className="space-y-2">
                  <p className="border-b-2 border-border pb-2 font-bold">
                    RETINA
                  </p>

                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p>Object Detection • OCR</p>
                    <p>Currency Recognition</p>
                    <p>Depth Estimation</p>
                  </div>
                </div>
              </HoverKeyword>. I enjoy working across the full development lifecycle — from planning and designing an
              application to implementing features, integrating databases, and deploying complete solutions.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              I enjoy continuously improving my skills, experimenting with new technologies, and taking on challenging
              projects that combine modern software engineering with intelligent systems.
            </p>

            <div className="mt-6 border-t-[3px] border-border pt-5">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest">Interests</h3>
              <ul className="mt-3 flex flex-wrap gap-3">
                {interests.map((item) => (
                  <li
                    key={item}
                    className="
                                group
                                cursor-target
                                nb-border
                                nb-shadow-sm
                                bg-background
                                px-3
                                py-1.5
                                font-mono
                                text-[11px]
                                font-bold
                                uppercase
                                transition-transform
                                duration-200
                                hover:-translate-y-1
                                "                  >
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
                  <li key={line} className="flex items-start gap-3 text-sm leading-relaxed">
                    <span className="font-mono font-bold text-#ffffff">{">"}</span>
                    <span>{line}</span>
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
    </section >
  )
}
