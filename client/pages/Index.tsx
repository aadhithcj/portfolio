import { useState } from "react";
import { ArrowUpRight, Check, Github, Linkedin, Mail, Menu, X } from "lucide-react";
import CursorGrid from "@/components/CursorGrid";
import LineSidebar from "@/components/LineSidebar";
import Magnet from "@/components/Magnet";
import TextPressure from "@/components/TextPressure";

const projects = [
  { number: "01", title: "RETINA", type: "AI · ANDROID · ACCESSIBILITY", description: "An on-device assistive system helping visually impaired users navigate daily life through object detection, currency recognition, OCR, and obstacle awareness.", tech: ["Kotlin", "Jetpack Compose", "TensorFlow Lite", "YOLOv8", "OpenCV"], accent: "lime" },
  { number: "02", title: "CV Management System", type: "FULL STACK · RECRUITMENT", description: "A role-based recruitment workspace that brings resume management, candidate scoring, interview scheduling, and reporting into one clear workflow.", tech: ["React", "Vite", "Supabase", "PostgreSQL"], accent: "blue" },
  { number: "03", title: "Motorbike Inventory", type: "DESKTOP · OPERATIONS", description: "An offline-first dealership tool for inventory, billing, purchase management, customer records, and the everyday details that spreadsheets miss.", tech: ["Python", "PyQt6", "SQLite"], accent: "orange" },
  { number: "04", title: "Crop Intelligence", type: "ML · WEB · AGRICULTURE", description: "A data-informed agricultural platform combining crop recommendation, rainfall analysis, yield prediction, and interactive maps.", tech: ["React", "Flask", "Machine Learning"], accent: "violet" },
];

const skills = ["Python", "TypeScript", "React", "Kotlin", "TensorFlow Lite", "OpenCV", "Flask", "PostgreSQL", "Jetpack Compose", "Firebase", "Git", "Figma"];
const sections = ["About", "Projects", "Toolkit", "Contact"];

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const scrollTo = (id: string) => { document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  return (
    <div className="portfolio-shell">
      <div className="ambient-glow" />
      <header className="site-header">
        <div className="header-inner">
          <button className="wordmark cursor-target" onClick={() => scrollTo("about")} aria-label="Go to top">ACJ<span>•</span></button>
          <div className="header-status"><span className="status-dot" /> AVAILABLE FOR SELECTED OPPORTUNITIES</div>
          <nav className="desktop-nav">{sections.map((section) => <button className="cursor-target" key={section} onClick={() => scrollTo(section)}>{section}</button>)}</nav>
          <button className="menu-button cursor-target" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
        {menuOpen && <nav className="mobile-nav">{sections.map((section) => <button className="cursor-target" key={section} onClick={() => scrollTo(section)}>{section}</button>)}</nav>}
      </header>

      <main>
        <section id="about" className="hero-section">
          <CursorGrid className="hero-grid" />
          <div className="hero-content page-width">
            <div className="hero-kicker"><span>01 / SOFTWARE ENGINEER</span><span>BASED IN INDIA · BUILDING GLOBALLY</span></div>
            <TextPressure text="Aadhith C J" className="hero-title" minFontSize={42} />
            <div className="hero-bottom">
              <p className="hero-intro">I build complete software products where thoughtful engineering meets intelligent systems.</p>
              <div className="hero-actions"><Magnet><button className="button button-primary cursor-target" onClick={() => scrollTo("projects")}>Explore work <ArrowUpRight size={16} /></button></Magnet><a className="text-link cursor-target" href="mailto:aadhith.cj@example.com">Start a conversation <ArrowUpRight size={15} /></a></div>
            </div>
            <div className="hero-scroll">SCROLL TO DISCOVER <span>↓</span></div>
          </div>
        </section>

        <section className="statement-section page-width"><div className="section-label">02 / THE SHORT VERSION</div><div className="statement-grid"><h2>Curious by default.<br /><em>Precise by practice.</em></h2><div><p>I am a Computer Science Engineering graduate focused on software development, full-stack applications, AI, machine learning, and computer vision.</p><p>I enjoy the full arc of a product — understanding the problem, shaping the experience, building the system, and making it dependable in the real world.</p><div className="principles"><span><Check size={15} /> Functional</span><span><Check size={15} /> Accessible</span><span><Check size={15} /> Considered</span></div></div></div></section>

        <section id="projects" className="projects-section page-width"><div className="section-label">03 / SELECTED WORK <span>04 PROJECTS</span></div><div className="projects-layout"><LineSidebar items={projects.map((project) => project.title)} defaultActive={0} onItemClick={setActiveProject} /><div className="project-featured"><div className={`project-index ${projects[activeProject].accent}`}>{projects[activeProject].number}</div><div className="project-meta">{projects[activeProject].type}</div><h2>{projects[activeProject].title}</h2><p>{projects[activeProject].description}</p><div className="tech-list">{projects[activeProject].tech.map((tech) => <span key={tech}>{tech}</span>)}</div><div className="project-footer"><span>CASE STUDY / {projects[activeProject].number}</span><ArrowUpRight size={18} /></div></div></div><div className="project-strip">{projects.map((project, index) => <button key={project.title} className={`cursor-target ${activeProject === index ? "active" : ""}`} onClick={() => setActiveProject(index)}><span>{project.number}</span>{project.title}<ArrowUpRight size={15} /></button>)}</div></section>

        <section id="toolkit" className="toolkit-section"><div className="page-width"><div className="section-label">04 / TOOLKIT <span>WHAT I LIKE TO BUILD WITH</span></div><div className="toolkit-heading"><h2>The tools change.<br /><em>The approach stays.</em></h2><p>From mobile inference to full-stack systems, I choose technology for the problem — not the trend cycle.</p></div><div className="skill-cloud">{skills.map((skill, index) => <span key={skill} className={`skill-chip chip-${index % 4}`}>{skill}</span>)}</div></div></section>

        <section className="philosophy-section page-width"><div className="section-label">05 / HOW I WORK</div><div className="philosophy-grid"><div className="big-number">3<span>—</span></div><div className="philosophy-list"><article><span>01</span><div><h3>Start with the why</h3><p>Good software begins with a clear understanding of who it helps and what friction it removes.</p></div></article><article><span>02</span><div><h3>Make complexity feel simple</h3><p>Whether it is an AI model or a database, the final experience should feel calm and human.</p></div></article><article><span>03</span><div><h3>Leave it better</h3><p>Clean code, accessible interfaces, and systems that can grow are part of the delivery — not extras.</p></div></article></div></div></section>

        <section id="contact" className="contact-section"><div className="page-width contact-inner"><div className="section-label">06 / CONTACT <span>LET'S MAKE SOMETHING USEFUL</span></div><h2>Have a problem<br /><em>worth solving?</em></h2><p>I'm always interested in thoughtful products, hard technical questions, and teams that care about the details.</p><a className="contact-email cursor-target" href="mailto:aadhith.cj@example.com">aadhith.cj@example.com <ArrowUpRight size={22} /></a><div className="social-links"><a className="cursor-target" href="https://github.com/aadhith-cj" target="_blank" rel="noreferrer"><Github size={17} /> GitHub</a><a className="cursor-target" href="https://linkedin.com/in/aadhith-cj" target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn</a><a className="cursor-target" href="mailto:aadhith.cj@example.com"><Mail size={17} /> Email</a></div></div></section>
      </main>
      <footer className="site-footer page-width"><span>AADHITH C J © 2025</span><span>SOFTWARE / INTELLIGENCE / IMPACT</span><span>BUILT WITH INTENTION</span></footer>
    </div>
  );
}
