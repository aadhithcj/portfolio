"use client"

import type React from "react"
import { useEffect, useRef, useState, KeyboardEvent } from "react"
import SectionHeading from "@/components/section-heading"

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'system';
  content: string;
}

const COMMANDS: Record<string, () => string[]> = {
  help: () => [
    '  <span class="text-secondary font-bold">Available commands:</span>',
    '  <span class="text-background/55">whoami</span>        — Who is Aadhith?',
    '  <span class="text-background/55">about</span>         — About & background',
    '  <span class="text-background/55">skills</span>        — Technical skills',
    '  <span class="text-background/55">projects</span>      — View all projects',
    '  <span class="text-background/55">project [n]</span>   — Details on project 1-5',
    '  <span class="text-background/55">contact</span>       — Contact information',
    '  <span class="text-background/55">philosophy</span>    — Development philosophy',
    '  <span class="text-background/55">interests</span>     — Areas of interest',
    '  <span class="text-background/55">neofetch</span>      — System info (fun)',
    '  <span class="text-background/55">clear</span>         — Clear the terminal',
    '  <span class="text-background/55">ls</span>            — List sections',
    '  <span class="text-background/55">sudo hire aadhith</span> — ...',
  ],
  whoami: () => [
    '  <span class="text-secondary font-bold">Aadhith C J</span>',
    '  Computer Science Engineering Graduate',
    '  Full-Stack Developer · AI/ML Enthusiast · Problem Solver',
    '',
    '  Building software that solves real-world problems.',
    '  From concept to deployment — end to end.',
  ],
  about: () => [
    '  <span class="text-secondary font-bold">// About Aadhith</span>',
    '',
    '  A developer who turns ideas into practical software solutions.',
    '  Experienced in web, desktop, Android, and AI-powered systems.',
    '',
    '  Interests: Full-Stack Dev · AI · Machine Learning · Computer Vision',
    '             Backend Systems · Mobile Apps · Database Design',
    '',
    '  Traits: Curious · Adaptable · Detail-oriented · Continuous Learner',
  ],
  skills: () => [
    '  <span class="text-secondary font-bold">// Technical Skills</span>',
    '',
    '  <span class="text-primary font-bold">Languages</span>    Python · Java · C · TypeScript · JavaScript',
    '  <span class="text-primary font-bold">Frontend</span>     React · Vite · HTML5 · CSS3 · Tailwind CSS',
    '  <span class="text-primary font-bold">Backend</span>      Flask · REST APIs · Supabase · PostgreSQL · SQLite',
    '  <span class="text-primary font-bold">AI/ML</span>        TensorFlow Lite · OpenCV · YOLO · EfficientDet · OCR',
    '  <span class="text-primary font-bold">Mobile</span>       Android Studio · Kotlin · Jetpack Compose',
    '  <span class="text-primary font-bold">Tools</span>        Git · GitHub · Figma · Framer · Firebase',
  ],
  projects: () => [
    '  <span class="text-secondary font-bold">// Major Projects</span>',
    '',
    '  <span class="text-primary font-bold">[1]</span> RETINA          — AI Assistive System for the Visually Impaired',
    '  <span class="text-primary font-bold">[2]</span> CV Management    — Web-based Recruitment Platform',
    '  <span class="text-primary font-bold">[3]</span> Motorbike IMS    — Desktop Inventory Management System',
    '  <span class="text-primary font-bold">[4]</span> Crop Intelligence — ML-powered Agricultural Web App',
    '  <span class="text-primary font-bold">[5]</span> LinePlanner       — Garment Manufacturing Line Planner',
    '',
    '  Type <span class="text-secondary font-bold">project 1</span> through <span class="text-secondary font-bold">project 5</span> for details.',
  ],
  project1: () => [
    '  <span class="text-secondary font-bold">// RETINA — AI Assistive Android App</span>',
    '',
    '  Flagship academic project. Helps visually impaired users',
    '  perform everyday tasks using AI and computer vision.',
    '',
    '  Features: Real-time Object Detection · Currency Recognition',
    '            OCR Text Reader · TTS · Obstacle Detection · Object Locator',
    '',
    '  Stack: Kotlin · Jetpack Compose · TensorFlow Lite · YOLOv8',
    '         EfficientDet Lite · Google ML Kit · OpenCV',
  ],
  project2: () => [
    '  <span class="text-secondary font-bold">// CV Management System</span>',
    '',
    '  Web-based recruitment and candidate management platform.',
    '',
    '  Features: Resume Management · Candidate Scoring',
    '            Interview Scheduling · Role-Based Access · Dashboard',
    '',
    '  Stack: React · Vite · Supabase · PostgreSQL',
  ],
  project3: () => [
    '  <span class="text-secondary font-bold">// Motorbike Inventory Management System</span>',
    '',
    '  Desktop software for motorcycle dealerships.',
    '',
    '  Features: Inventory · Billing · Purchase Management',
    '            Customer Records · Database Management',
    '',
    '  Stack: Python · PyQt6 · SQLite',
  ],
  project4: () => [
    '  <span class="text-secondary font-bold">// Crop Intelligence Platform</span>',
    '',
    '  ML-powered agricultural web application.',
    '',
    '  Features: Crop Recommendation · Rainfall Analysis',
    '            Crop & Yield Prediction · Interactive Maps',
    '',
    '  Stack: React · Flask · Machine Learning',
  ],
  project5: () => [
    '  <span class="text-secondary font-bold">// LinePlanner</span>',
    '',
    '  Web application for garment manufacturing.',
    '',
    '  Features: Production Line Planning · Capacity Planning',
    '            Interactive Layout Management',
  ],
  contact: () => [
    '  <span class="text-secondary font-bold">// Contact Aadhith</span>',
    '',
    '  He\'s open to opportunities in software development,',
    '  full-stack engineering, and AI/ML projects.',
    '',
    '  Reach out through the contact section below',
    '  or connect on GitHub / LinkedIn.',
  ],
  philosophy: () => [
    '  <span class="text-secondary font-bold">// Development Philosophy</span>',
    '',
    '  Great software = Functionality + Performance',
    '                 + Accessibility + Thoughtful UX',
    '',
    '  "I enjoy building applications that solve meaningful',
    '   problems and continuously improving my skills',
    '   through hands-on development."',
    '',
    '  Values: Clean code · Scalable architecture · Real-world impact',
  ],
  interests: () => [
    '  <span class="text-secondary font-bold">// Areas of Interest</span>',
    '',
    '  Software Development · Full Stack Development · Web Technologies',
    '  Artificial Intelligence · Machine Learning · Computer Vision',
    '  Backend Systems · Mobile Applications · System Design',
    '  Database Systems · Human-Centered Software',
  ],
  neofetch: () => [
    '',
    '  <span class="text-secondary font-bold">        .-.      </span>  <span class="text-primary font-bold">aadhith@portfolio</span>',
    '  <span class="text-secondary font-bold">       (o.o)     </span>  ─────────────────',
    '  <span class="text-secondary font-bold">        |=|      </span>  <span class="text-primary font-bold">OS:</span>      Portfolio v1.0',
    '  <span class="text-secondary font-bold">       /| |\\     </span>  <span class="text-primary font-bold">Role:</span>    Full-Stack Dev',
    '  <span class="text-secondary font-bold">      (_| |_)    </span>  <span class="text-primary font-bold">Shell:</span>   React + Vite',
    '            ',
    '  <span class="text-primary font-bold">Languages:</span>  Python · TypeScript · Java · C · JS',
    '  <span class="text-primary font-bold">Editor:</span>     Whatever gets the job done',
    '  <span class="text-primary font-bold">Projects:</span>   5 major (and counting)',
    '  <span class="text-primary font-bold">Coffee:</span>     Required for compilation',
    '',
    '  <span style="background:#0A0A0A;color:#0A0A0A">██</span><span style="background:#FFD60A;color:#FFD60A">██</span><span style="background:#FF3B3B;color:#FF3B3B">██</span><span style="background:#0066FF;color:#0066FF">██</span><span style="background:#00C853;color:#00C853">██</span><span style="background:#F5F0E8;color:#F5F0E8">██</span>',
  ],
  ls: () => [
    '  <span class="text-secondary font-bold">drwxr-xr-x</span>  hero/',
    '  <span class="text-secondary font-bold">drwxr-xr-x</span>  about/',
    '  <span class="text-secondary font-bold">drwxr-xr-x</span>  skills/',
    '  <span class="text-secondary font-bold">drwxr-xr-x</span>  projects/',
    '  <span class="text-secondary font-bold">drwxr-xr-x</span>  terminal/ <span class="text-background/55">(you are here)</span>',
    '  <span class="text-secondary font-bold">drwxr-xr-x</span>  contact/',
  ],
};

const HIRE_RESPONSE = [
  '  <span class="text-secondary font-bold">sudo: hire aadhith</span>',
  '',
  '  [sudo] password for recruiter: ••••••••',
  '  Verifying credentials...',
  '  <span class="text-primary font-bold">✓</span> Access granted.',
  '',
  '  Initiating hire sequence...',
  '  <span class="text-primary font-bold">✓</span> Great taste detected.',
  '  <span class="text-primary font-bold">✓</span> Portfolio reviewed.',
  '  <span class="text-primary font-bold">✓</span> Skills matched.',
  '',
  '  <span class="text-secondary font-bold">Action required:</span> Reach out via the contact section!',
];

const BOOT_LINES = [
  'Aadhith C J // Portfolio Terminal v1.0',
  'Type <span class="text-secondary font-bold">help</span> to see available commands.',
  '',
];


export default function TerminalSection() {
  const [lines, setLines] = useState<TerminalLine[]>(
    BOOT_LINES.map((l) => ({ type: 'system', content: l }))
  );
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  const runCommand = (raw: string) => {
    const trimmed = raw.trim().toLowerCase();
    const newLines: TerminalLine[] = [...lines, { type: 'input', content: raw }];

    if (trimmed === '') { setLines(newLines); return; }
    if (trimmed === 'clear') { setLines(BOOT_LINES.map((l) => ({ type: 'system', content: l }))); return; }

    if (trimmed === 'sudo hire aadhith') {
      HIRE_RESPONSE.forEach((l) => newLines.push({ type: 'output', content: l }));
      setLines(newLines); return;
    }

    const projectMatch = trimmed.match(/^project\s+([1-5])$/);
    if (projectMatch) {
      const key = `project${projectMatch[1]}` as keyof typeof COMMANDS;
      (COMMANDS[key]?.() ?? []).forEach((l) => newLines.push({ type: 'output', content: l }));
      setLines(newLines); return;
    }

    const cmd = COMMANDS[trimmed as keyof typeof COMMANDS];
    if (cmd) {
      cmd().forEach((l) => newLines.push({ type: 'output', content: l }));
    } else {
      newLines.push({ type: 'error', content: `  command not found: ${raw}  (try 'help')` });
    }
    setLines([...newLines, { type: 'output', content: '' }]);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (input.trim()) setHistory((h) => [input, ...h]);
      setHistoryIndex(-1);
      runCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.length) return;
      const next = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(next);
      setInput(history[next] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(historyIndex - 1, -1);
      setHistoryIndex(next);
      setInput(next === -1 ? '' : history[next]);
    } else if (e.key === "Tab") {
      e.preventDefault()
      const match = Object.keys(COMMANDS).find((c) => c.startsWith(input.trim().toLowerCase()) && input.trim())
      if (match) setInput(match + " ")
    }
  };

  const quick = ["help", "whoami", "projects", "neofetch"]

  return (
    <section id="terminal" className="border-b-[3px] border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <SectionHeading index="04" title="Terminal" kicker="Despise a GUI? Try my terminal. I'd recommend 'sudo hire aadhith'." lowercase />

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
                aadhith@portfolio — bash
              </span>
            </div>

            <div ref={scrollRef} className="h-[420px] overflow-y-auto p-4 font-mono text-[13px] leading-relaxed">
              {lines.map((line, i) => (
                <div key={i} className={`whitespace-pre-wrap break-words ${line.type === 'input' ? 'font-bold text-primary' :
                  line.type === 'error' ? 'text-accent' :
                    'text-background'
                  }`}>
                  {line.type === 'input' && <span className="font-bold text-primary">$ </span>}
                  <span dangerouslySetInnerHTML={{ __html: line.content }} />
                </div>
              ))}

              <div className="flex items-center gap-2 mt-1">
                <span className="font-bold text-primary">$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
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
                  runCommand(c)
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
