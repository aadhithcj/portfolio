"use client"
import { motion } from "framer-motion";
import DecryptedText from "@/components/fx/DecryptedText";
import { useState } from "react"
import {
  Code2, Globe, Database, Brain, Smartphone, Wrench
} from 'lucide-react';

const SKILLS = [
  {
    icon: Code2, label: 'Languages',
    items: ['Python', 'Java', 'C', 'TypeScript', 'JavaScript', 'SQL', 'Kotlin'],
    color: '#FFD60A',
  },
  {
    icon: Globe, label: 'Frontend',
    items: ['React', 'Vite', 'HTML5', 'CSS3', 'Tailwind CSS'],
    color: '#FF3B3B',
  },
  {
    icon: Database, label: 'Backend',
    items: ['Flask', 'REST APIs', 'Firebase', 'PostgreSQL', 'SQLite'],
    color: '#0066FF',
  },
  {
    icon: Brain, label: 'AI / ML',
    items: ['TensorFlow Lite', 'OpenCV', 'YOLO', 'EfficientDet', 'Google ML Kit', 'OCR'],
    color: '#00C853',
  },
  {
    icon: Smartphone, label: 'Mobile',
    items: ['Android Studio', 'Kotlin', 'Jetpack Compose'],
    color: '#FF7A00',
  },
  {
    icon: Wrench, label: 'Tools',
    items: ['Git', 'GitHub', 'Figma', 'Framer', 'Firebase'],
    color: '#A855F7',
  },
];

export default function SkillsSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="skills" className="border-b-[3px] border-border bg-foreground text-background">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">

        {/* Adjusted Section Heading to look like the normal headings but styled correctly for a dark bg */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
          <div className="flex items-center gap-4">
            <span className="nb-border nb-shadow-sm bg-background px-3 py-1.5 font-mono text-sm font-bold text-foreground">
              02
            </span>
            <h2 className="text-4xl font-extrabold uppercase tracking-tight md:text-5xl text-background">
              <DecryptedText
                text="Skills"
                animateOn="view"
                sequential
                revealDirection="center"
                speed={75}
                className="text-current"
                encryptedClassName="text-neutral-400"
              />
            </h2>
          </div>
          <p className="nb-border bg-card px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-widest text-foreground">
            The tools I reach for
          </p>
        </div>

        <p className="mb-12 font-mono text-sm leading-relaxed max-w-sm opacity-80">
          A curated stack built through hands-on projects across web, mobile, AI, and systems development.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILLS.map((skill, i) => {
            const Icon = skill.icon;
            const isHovered = hovered === i;
            return (
              <motion.div
                key={skill.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  x: -4,
                  y: -4,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 20,
                  },
                }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.4,
                  ease: "easeOut",
                }}
                className="border-[3px] p-6 cursor-target bg-[#121212]"
                style={{
                  borderColor: isHovered ? skill.color : "rgba(245,240,232,0.15)",
                  boxShadow: isHovered ? `6px 6px 0 0 ${skill.color}` : "none",
                }}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
              >
                <div
                  className="flex items-center gap-3 border-b-[3px] pb-3 transition-colors duration-200"
                  style={{ borderColor: isHovered ? skill.color : 'rgba(245, 240, 232, 0.15)' }}
                >
                  <Icon size={22} style={{ color: isHovered ? skill.color : '#f5f0e8' }} className="transition-colors duration-200" />
                  <span className="font-mono text-lg font-bold uppercase tracking-tight text-[#f5f0e8]">{skill.label}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="border-[3px] px-2 py-1 font-mono text-[11px] font-bold uppercase transition-all duration-200"
                      style={{
                        borderColor: isHovered ? skill.color : 'rgba(245,240,232,0.15)',
                        color: isHovered ? skill.color : '#b0aa9f'
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  )
}
