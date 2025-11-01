import profile from "../src/assets/profile.png";

// Type Definitions
interface SocialLinks {
  github?: string;
  linkedin?: string;
  portfolio?: string;
  medium?: string;
}

interface PersonalInfo {
  name: string;
  profileImage?: string;
  title: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  resume: string;
  social: SocialLinks;
}

interface SkillItem {
  name: string;
  level: number;
}

interface SkillCategory {
  category: string;
  icon: string;
  items: SkillItem[];
}

interface Service {
  icon: string;
  title: string;
  description: string;
  features: string[];
}

interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  demo: string;
  github: string;
}

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}

interface Education {
  degree: string;
  institution: string;
  period: string;
  location: string;
  score?: string;
  achievements: string[];
}

interface Others {
  technologies: number;
  experience: number;
  projects: number;
  certifications?: number;
}

interface PortfolioData {
  personal: PersonalInfo;
  skills: SkillCategory[];
  services: Service[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  others: Others;
}

// Portfolio Data Configuration
export const portfolioData: PortfolioData = {
  personal: {
    name: "Vinoth R",
    title: "Software Developer",
    tagline: "Crafting elegant solutions to complex problems",
    email: "vinoth.coderx@gmail.com",
    phone: "+91 9113632816",
    location: "Chennai, India",
    profileImage: profile,
    bio: "Passionate Software Developer experienced in building scalable mobile and web applications using React and React Native. At itTrident, I’ve contributed to projects like D-Tools, HKM, MFU, and SCC, focusing on performance, clean architecture, and seamless user experiences. Driven by continuous learning and innovation, I strive to create impactful, high-quality software solutions.",
    resume: "#",
    social: {
      github: "https://github.com/vinoth-coderx",
      linkedin: "https://www.linkedin.com/in/vinoth-r-586103324",
      medium: "https://medium.com/@vinoth_1209/how-to-improve-code-security-best-practices-to-stay-safe-from-threats-ced83b7d2787",
    },
  },
  skills: [
    {
      category: "Frontend Development",
      icon: "💻",
      items: [
        { name: "React.js", level: 90 },
        { name: "JavaScript", level: 88 },
        { name: "TypeScript", level: 85 },
        { name: "Redux", level: 85 },
        { name: "RTK Query", level: 80 },
        { name: "HTML/CSS", level: 90 },
        { name: "Material UI", level: 85 },
        { name: "Tailwind CSS", level: 88 },
        { name: "Bootstrap", level: 80 },
      ],
    },
    {
      category: "Mobile & Backend",
      icon: "⚙️",
      items: [
        { name: "React Native", level: 82 },
        { name: "Flutter", level: 75 },
        { name: "Node.js", level: 85 },
        { name: "Express.js", level: 83 },
        { name: "MongoDB", level: 80 },
        { name: "RESTful APIs", level: 85 },
      ],
    },
    {
      category: "Tools & Technologies",
      icon: "🛠️",
      items: [
        { name: "Git & GitHub", level: 88 },
        { name: "Expo", level: 78 },
        { name: "React Query", level: 82 },
      ],
    },
    {
      category: "Soft Skills",
      icon: "🎯",
      items: [
        { name: "Problem Solving", level: 90 },
        { name: "Team Collaboration", level: 88 },
        { name: "Communication", level: 85 },
        { name: "Adaptability", level: 90 },
        { name: "Continuous Learning", level: 95 },
      ],
    },
  ],
  services: [
    {
      icon: "💻",
      title: "Web Development",
      description:
        "Custom web applications built with React, Redux, and modern technologies for optimal performance and user experience.",
      features: [
        "React.js Development",
        "State Management",
        "Responsive Design",
        "Performance Optimization",
      ],
    },
    {
      icon: "📱",
      title: "Mobile Development",
      description:
        "Cross-platform mobile applications using React Native and Flutter for seamless experiences across iOS and Android.",
      features: [
        "React Native",
        "Flutter",
        "Expo",
        "Cross-platform Compatibility",
      ],
    },
    {
      icon: "🔗",
      title: "API Development",
      description:
        "RESTful APIs and backend services with Node.js, Express, and efficient data management solutions.",
      features: [
        "Node.js & Express",
        "MongoDB",
        "REST APIs",
        "Data Management",
      ],
    },
    {
      icon: "🔄",
      title: "State Management",
      description:
        "Advanced state management solutions using Redux, RTK Query, and React Query for scalable applications.",
      features: [
        "Redux Toolkit",
        "RTK Query",
        "React Query",
        "State Consistency",
      ],
    },
    {
      icon: "🎨",
      title: "UI/UX Development",
      description:
        "Beautiful and responsive user interfaces using modern CSS frameworks and component libraries.",
      features: [
        "Tailwind CSS",
        "Material UI",
        "Bootstrap",
        "Responsive Design",
      ],
    },
    {
      icon: "⚡",
      title: "Real-time Features",
      description:
        "Implementation of real-time features like chat, audio/video calls, and live updates.",
      features: ["WebRTC", "Jitsi", "Real-time Chat", "Live Updates"],
    },
  ],
  projects: [
    {
      title: "CRM Application",
      description:
        "Feature-rich CRM application with real-time chat, audio/video calls, and efficient customer management system.",
      tech: [
        "React",
        "Redux",
        "RTK Query",
        "Node.js",
        "MongoDB",
        "Jitsi",
        "Knowlarity",
        "Tailwind CSS",
      ],
      image:
        "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800&h=500&fit=crop",
      demo: "#",
      github: "#",
    },
    {
      title: "Real-time Weather App",
      description:
        "React Native weather application providing accurate forecasts with cross-platform compatibility.",
      tech: ["React Native", "Expo", "Node.js", "MongoDB", "Tailwind CSS"],
      image:
        "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=500&fit=crop",
      demo: "#",
      github: "#",
    },
    {
      title: "Slot Booking System",
      description:
        "Time slot booking feature for special offers with seamless user experience and cross-platform support.",
      tech: ["React Native", "Expo", "Node.js", "MongoDB"],
      image:
        "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=500&fit=crop",
      demo: "#",
      github: "#",
    },
  ],
  experience: [
    {
      title: "Software Developer",
      company: "itTrident",
      period: "Sep 2024 - Present",
      description:
        "Contributing to the development of mobile and web applications with a strong focus on scalability, performance, and intuitive design.",
      achievements: [
        "Developed and maintained multiple production-grade mobile and web applications including D-Tools, HKM, MFU, and SCC.",
        "Implemented responsive, cross-platform UIs using Tailwind CSS, Material UI, and React Native.",
        "Integrated advanced state management using Redux Toolkit, RTK Query, and React Query for efficient data handling.",
        "Collaborated with backend teams to design and optimize RESTful APIs for secure, high-performance communication.",
        "Enhanced code scalability and maintainability by modularizing components and applying best React and React Native practices.",
        "Contributed to CI/CD setup and automated testing pipelines for consistent and reliable releases.",
      ],
    },
    {
      title: "Software Developer",
      company: "Foyer Technology, Chennai",
      period: "Aug 2023 - Sep 2024",
      description:
        "Leading the development of feature-rich CRM applications with focus on customer management and seamless user experience.",
      achievements: [
        "Led development of CRM application with real-time chat, audio/video calls",
        "Implemented cross-platform compatibility using Tailwind CSS and Material UI",
        "Integrated state management with Redux, RTK Query, and React Query",
        "Developed modular, reusable components with React hooks for scalability",
      ],
    },
    {
      title: "MERN Full Stack Developer Intern",
      company: "Renambl Technologies, Chennai",
      period: "Mar 2023 - Jul 2023",
      description:
        "Developed real-time applications and slot booking systems with React Native and Node.js backend.",
      achievements: [
        "Built real-time weather application using React Native (Expo)",
        "Developed slot booking feature with cross-platform compatibility",
        "Implemented backend APIs with Node.js and MongoDB",
        "Created responsive UIs with Tailwind CSS",
      ],
    },
  ],
  education: [
    {
      degree: "BA Economics",
      institution: "Government Arts College, Salem",
      period: "2018 - 2021",
      location: "Salem, India",
      achievements: [
        "Completed degree in Economics",
      ],
    },
    {
      degree: "Full Stack Development Course",
      institution: "Besant Technologies",
      period: "2022 - 2023",
      location: "Chennai, India",
      achievements: [
        "6-month intensive Full Stack Development program",
        "Mastered MERN stack technologies",
        "Completed multiple real-world projects",
        "Gained hands-on experience in web and mobile development",
      ],
    },
    {
      degree: "HSC",
      institution: "S.M.H. School, Tharamangalam",
      period: "2018",
      location: "Salem, India",
      achievements: [
        "Completed Higher Secondary Education",
      ],
    },
  ],
  others: {
    technologies: 15,
    experience: 3.1,
    projects: 10,
    certifications: 1,
  },
};
