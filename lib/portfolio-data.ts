export const profile = {
  name: "Aadhith C Joseph",
  role: "Software Developer / Full Stack Engineer",
  tagline: "Computer Science Engineering graduate with hands-on experience in full-stack development and AI/ML.",
  summary:
    "I develop web applications, desktop software, Android apps, and AI-powered systems. I have practical DevOps experience with Linux, Git, Docker, and CI/CD pipelines, and I'm interested in software engineering, backend development, cloud technologies, and automation.",
  focus: ["Full Stack Development", "Backend Engineering", "AI / ML", "DevOps"],
}

export const interests = [
  "Software Engineering",
  "Backend Development",
  "Cloud Technologies",
  "Automation",
  "Full Stack Web Development",
  "Artificial Intelligence",
  "Machine Learning",
  "Computer Vision",
  "Database Design",
]

export type SkillGroup = {
  id: string
  label: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  { id: "languages", label: "Languages", items: ["Python", "Java", "C", "TypeScript", "JavaScript", "SQL"] },
  { id: "frontend", label: "Frontend", items: ["React", "Vite", "HTML5", "CSS3", "Tailwind CSS"] },
  { id: "backend", label: "Backend & DB", items: ["Flask", "REST APIs", "Supabase", "PostgreSQL", "SQLite"] },
  {
    id: "devops",
    label: "DevOps & Tools",
    items: ["Linux", "Git", "GitHub", "GitHub Actions", "Docker", "Docker Compose", "CI/CD", "pytest"],
  },
  {
    id: "ai",
    label: "AI / ML",
    items: [
      "OpenCV",
      "TensorFlow Lite",
      "YOLO",
      "Google ML Kit",
      "Computer Vision",
    ],
  },
  { id: "core", label: "Core CS", items: ["OOP", "Data Structures", "DBMS"] },
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
    title: "RETINA - AI Assistive System",
    kind: "Android · Computer Vision",
    blurb:
      "Developed an assistive Android application for visually impaired users using object detection, OCR, currency recognition, and audio feedback.",
    features: [
      "Real-time Object Detection",
      "Indian Currency Recognition",
      "OCR Text Reader",
      "Text-to-Speech",
      "Obstacle Detection & Navigation",
    ],
    tech: ["Kotlin", "Android", "Computer Vision", "Machine Learning"],
    note: "Flagship academic project with multiple AI models integrated into one mobile app with accessibility as the core requirement.",
    flagship: true,
    accent: "#FFD60A",
  },
  {
    id: "inventory",
    index: "02",
    title: "Inventory Management System",
    kind: "Desktop · Dealership Software",
    blurb: "Developed a desktop inventory system for a motorbike shop supporting stock tracking, part locations, pricing, and purchase/customer billing.",
    features: ["Stock Tracking", "Part Locations", "Pricing Management", "Purchase Billing", "Customer Billing"],
    tech: ["Python", "PyQt6", "SQLite"],
    note: "Designed the system to manage 100+ inventory records per day and streamline daily operations.",
    accent: "#0066FF",
  },
  {
    id: "devopshub",
    index: "03",
    title: "DevOpsHub",
    kind: "Web · Full Stack · CI/CD",
    blurb: "Built and containerized a full-stack Flask, React, and PostgreSQL application using Docker Compose.",
    features: [
      "Containerized Architecture",
      "Git Workflows",
      "Automated Testing (pytest)",
      "Frontend Builds with GitHub Actions",
      "Environment-based Configuration",
      "Secure Secrets Management",
    ],
    tech: ["Python", "Flask", "React", "PostgreSQL", "Docker", "GitHub Actions"],
    accent: "#FF7A00",
  },
  {
    id: "crop",
    index: "04",
    title: "Crop Recommendation System",
    kind: "Web · Machine Learning",
    blurb: "Built a web-based crop recommendation system using React, Flask, weather data, and historical agricultural data.",
    features: ["Crop Recommendation", "Model Training & Evaluation", "Data Preprocessing"],
    tech: ["Python", "Flask", "React", "Machine Learning"],
    accent: "#00C853",
  },
  {
    id: "cv-management",
    index: "05",
    title: "CV Sorting & Management System",
    kind: "Web · Recruitment Platform",
    blurb: "Developed a web platform for job posting and resume management with automated filtering and skill-based candidate organization.",
    features: ["Job Posting", "Resume Management", "Automated Filtering", "Skill-based Organization"],
    tech: ["React", "Supabase"],
    accent: "#FF3B3B",
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

export const contact = {
  email: "aadhithcj9@gmail.com",
  github: "https://github.com/aadhithcj",
  linkedin: "https://linkedin.com/in/aadhithcj",
  phone: "9495268368",
  website: "aadhithcj.vercel.app",
  resumeUrl: "/Resumee.pdf",
}

export const sections = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "journey", label: "Journey" },
  { id: "research", label: "Research" },
  { id: "interests", label: "Interests" },
  { id: "contact", label: "Contact" },
]

export const timelineItems = [
  {
    year: "Jan 2025 - Feb 2025",
    title: "AI/ML Intern | ICT Academy of Kerala",
    description: "Completed a one-month internship focused on Artificial Intelligence and Machine Learning. Collaborated with a four-member team to develop and test a prototype across 5+ real-world datasets.",
  },
  {
    year: "2022 - Present",
    title: "Freelance Web & Software Developer",
    description: "Developed and delivered 4+ freelance web and software projects, building responsive web applications, backend services, database integrations, and custom software solutions based on client requirements.",
  },
  {
    year: "2021 - Present",
    title: "Freelance Designer & Video Editor",
    description: "Delivered 5+ UI/UX projects and edited 50+ social media videos contributing to campaigns generating 100K+ interactions.",
  },
  {
    year: "2022 - 2026",
    title: "B.Tech in Computer Science and Engineering",
    description: "Carmel College of Engineering and Technology (CGPA: 8.12). Additionally served as College Arts Secretary (2025-2026) coordinating 3+ major events. Secured 1st place at IEEEXtreme 17.0 (2023).",
  },
]
