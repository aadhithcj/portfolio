export const profile = {
  name: "Aadhith C J",
  role: "Software Developer / Full Stack Engineer",
  tagline: "Computer Science Engineering graduate building software that solves real-world problems.",
  summary:
    "I develop web applications, desktop software, Android apps, and AI-powered systems. I enjoy the full development lifecycle — planning and designing an application, implementing features, integrating databases, and deploying complete solutions.",
  focus: ["Full Stack Web Development", "Software Engineering", "AI / ML", "Computer Vision"],
}

export const interests = [
  "Full Stack Web Development",
  "Software Engineering",
  "Artificial Intelligence",
  "Machine Learning",
  "Computer Vision",
  "Backend Development",
  "Frontend Development",
  "Mobile Application Development",
  "Database Design",
  "Human-Centered Software",
]

export type SkillGroup = {
  id: string
  label: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  { id: "languages", label: "Languages", items: ["Python", "Java", "C", "TypeScript", "JavaScript"] },
  { id: "frontend", label: "Frontend", items: ["React", "Vite", "HTML5", "CSS3", "Tailwind CSS"] },
  { id: "backend", label: "Backend", items: ["Flask", "REST APIs", "Supabase", "PostgreSQL", "SQLite"] },
  {
    id: "ai",
    label: "AI / ML",
    items: [
      "TensorFlow Lite",
      "OpenCV",
      "Google ML Kit",
      "YOLO",
      "EfficientDet",
      "Computer Vision",
      "OCR",
      "Image Processing",
    ],
  },
  { id: "mobile", label: "Mobile", items: ["Android Studio", "Kotlin", "Jetpack Compose"] },
  { id: "tools", label: "Tools", items: ["Git", "GitHub", "Figma", "Framer", "Firebase"] },
  { id: "creative", label: "Creative", items: ["Adobe Premiere Pro", "Adobe After Effects"] },
]

export type Project = {
  id: string
  index: string
  title: string
  kind: string
  blurb: string
  features: string[]
  tech: string[]
  note?: string
  flagship?: boolean
  accent: string
}

export const projects: Project[] = [
  {
    id: "retina",
    index: "01",
    title: "RETINA",
    kind: "Android · AI Assistive System",
    blurb:
      "An AI powered assistive Android application that helps visually impaired users perform everyday tasks using computer vision and on-device machine learning.",
    features: [
      "Real-time Object Detection",
      "Indian Currency Recognition",
      "OCR Text Reader",
      "Text-to-Speech",
      "Obstacle Detection",
      "Smart Object Locator",
    ],
    tech: ["Kotlin", "Jetpack Compose", "TensorFlow Lite", "YOLOv8", "EfficientDet Lite", "Google ML Kit", "OpenCV"],
    note: "Flagship academic project — multiple AI models integrated into one mobile app with accessibility as the core requirement.",
    flagship: true,
    accent: "#FFD60A",
  },
  {
    id: "cv-management",
    index: "02",
    title: "CV Management System",
    kind: "Web · Recruitment Platform",
    blurb: "A web-based recruitment and candidate management platform for handling resumes end to end.",
    features: [
      "Resume Management",
      "Candidate Scoring",
      "Interview Scheduling",
      "Role-Based Access",
      "Reporting Dashboard",
    ],
    tech: ["React", "Vite", "Supabase", "PostgreSQL"],
    accent: "#FF3B3B",
  },
  {
    id: "motorbike",
    index: "03",
    title: "Motorbike Inventory Management",
    kind: "Desktop · Dealership Software",
    blurb: "A desktop software solution designed for motorcycle dealerships to run daily operations.",
    features: ["Inventory Management", "Billing", "Purchase Management", "Customer Records", "Database Management"],
    tech: ["Python", "PyQt6", "SQLite"],
    accent: "#0066FF",
  },
  {
    id: "crop",
    index: "04",
    title: "Crop Intelligence Platform",
    kind: "Web · Machine Learning",
    blurb: "A machine learning powered agricultural web application for data-driven crop decisions.",
    features: ["Crop Recommendation", "Rainfall Analysis", "Crop Prediction", "Yield Prediction", "Interactive Maps"],
    tech: ["React", "Flask", "Machine Learning"],
    accent: "#00C853",
  },
  {
    id: "lineplanner",
    index: "05",
    title: "LinePlanner",
    kind: "Web · Manufacturing",
    blurb: "A web application developed for garment manufacturing production planning.",
    features: ["Production Line Planning", "Capacity Planning", "Interactive Layout Management"],
    tech: ["React", "Web Technologies"],
    accent: "#FF7A00",
  },
]

export const traits = [
  "Curious",
  "Adaptable",
  "Detail-oriented",
  "Problem Solver",
  "Continuous Learner",
  "Collaborative",
  "Creative in finding technical solutions",
  "Passionate about technology",
]

export const philosophy = [
  "Great software combines functionality, performance, accessibility, and a thoughtful user experience.",
  "I value writing clean, maintainable code and designing scalable solutions.",
  "Whether it is a web app, desktop software, or an AI-powered mobile app, I enjoy understanding how systems work and bringing ideas to life through code.",
]

// Fill these in with your real links — empty strings render as "coming soon".
export const contact = {
  email: "",
  github: "",
  linkedin: "",
  resumeUrl: "",
}

export const sections = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "terminal", label: "Terminal" },
  { id: "contact", label: "Contact" },
]
