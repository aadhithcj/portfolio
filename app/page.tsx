import SiteNav from "@/components/site-nav"
import Hero from "@/components/hero"
import Marquee from "@/components/marquee"
import AboutSection from "@/components/about-section"
import SkillsSection from "@/components/skills-section"
import ProjectsSection from "@/components/projects-section"
import TerminalSection from "@/components/terminal-section"
import ContactSection from "@/components/contact-section"
import TargetCursor from "@/components/fx/target-cursor"

export default function Page() {
  return (
    <>
      <TargetCursor spinDuration={2.4} hideDefaultCursor parallaxOn cursorColor="#ffffff" />
      <SiteNav />
      <main>
        <Hero />
        <Marquee
          items={[
            "Full Stack Development",
            "Computer Vision",
            "Machine Learning",
            "Android",
            "PostgreSQL",
            "React",
            "Python",
            "Kotlin",
          ]}
        />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <Marquee items={["Concept", "Design", "Build", "Integrate", "Deploy", "Iterate"]} speed={22} />
        <TerminalSection />
        <ContactSection />
      </main>
    </>
  )
}
