"use client"

import SectionHeading from "@/components/section-heading"
import { profile } from "@/lib/portfolio-data"
import { Mail, GitBranch, Briefcase, FileText, ArrowUpRight, Instagram } from "lucide-react"

const contact = {
  email: "aadhithcj9@gmail.com",
  github: "https://github.com/aadhithcj",
  linkedin: "https://linkedin.com/in/aadhithcj",
  instagram: "https://www.instagram.com/aaaaadhith",
  resumeUrl: "/Resumee.pdf",
}

const links = [
  { key: "email", label: "Email", icon: Mail, href: contact.email ? `mailto:${contact.email}` : "", bg: "bg-primary" },
  { key: "github", label: "GitHub", icon: GitBranch, href: contact.github, bg: "bg-card" },
  { key: "linkedin", label: "LinkedIn", icon: Briefcase, href: contact.linkedin, bg: "bg-secondary" },
  { key: "instagram", label: "Instagram", icon: Instagram, href: contact.instagram, bg: "bg-card" },
  { key: "resume", label: "Résumé", icon: FileText, href: contact.resumeUrl, bg: "bg-card" },
]

export default function ContactSection() {
  return (
    <section id="contact">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <SectionHeading index="05" title="Contact" kicker="Let's build something" />

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="nb-border nb-shadow-lg bg-foreground p-6 text-background md:p-8">
            <p className="text-balance text-3xl font-extrabold uppercase leading-tight md:text-4xl">
              Open to software engineering and full stack roles.
            </p>
            <p className="mt-4 max-w-xl leading-relaxed text-background/75">
              {profile.summary} If you are working on something that needs an engineer who enjoys owning a product from
              concept to deployment, I would like to hear about it.
            </p>
            <p className="mt-6 font-mono text-[11px] font-bold uppercase tracking-widest text-primary">
              {profile.name} · {profile.role}
            </p>
          </div>

          <ul className="grid content-start gap-3">
            {links.map((link) => {
              const Icon = link.icon
              const disabled = !link.href
              return (
                <li key={link.key}>
                  {disabled ? (
                    <span className="nb-border flex w-full items-center gap-3 bg-muted px-4 py-4 font-mono text-sm font-bold uppercase tracking-wide text-muted-foreground">
                      <Icon className="size-4" />
                      {link.label}
                      <span className="ml-auto text-[10px]">coming soon</span>
                    </span>
                  ) : (
                    <a
                      href={link.href}
                      target={link.key === "email" ? undefined : "_blank"}
                      rel={link.key === "email" ? undefined : "noreferrer"}
                      className={`cursor-target nb-border nb-shadow nb-press flex w-full items-center gap-3 ${link.bg} px-4 py-4 font-mono text-sm font-bold uppercase tracking-wide`}
                    >
                      <Icon className="size-4" />
                      {link.label}
                      <ArrowUpRight className="ml-auto size-4" />
                    </a>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <footer className="border-t-[3px] border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-6">
          <div className="flex flex-col gap-2">
            <p className="font-mono text-[11px] font-bold uppercase tracking-widest">
              © {new Date().getFullYear()} {profile.name}
            </p>
            <div className="flex gap-2">
              {['#0A0A0A', '#FFD60A', '#FF3B3B', '#0066FF', '#00C853', '#f7f0dd'].map((c) => (
                <span key={c} className="size-3 border-[2px] border-border" style={{ background: c }} />
              ))}
            </div>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            Built with Next.js · React · Tailwind CSS
          </p>
          <a
            href="#top"
            className="cursor-target nb-border nb-shadow-sm nb-press bg-primary px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-widest text-primary-foreground"
          >
            Back to top
          </a>
        </div>
      </footer>
    </section>
  )
}
