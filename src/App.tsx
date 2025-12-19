import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Mail,
  ExternalLink,
  Terminal,
  Globe,
  ArrowUpRight,
  Database,
  Layout,
  Server,
  Smartphone,
  Wifi,
  Layers,
  MapPin,
  Trophy,
  Briefcase,
  BookOpen,
  X,
  Cpu,
  Code,
  Check,
  Copy,
  Instagram,
} from "lucide-react";

// --- Types & Interfaces ---
interface Project {
  id: number;
  title: string;
  shortDesc: string;
  fullDesc: string;
  role: string;
  tech: string[];
  features: string[];
  color: string;
  image: string;
}

// --- Enhanced Data ---
const projects: Project[] = [
  {
    id: 1,
    title: "Wearable Teach Assistance",
    shortDesc:
      "IoT device using EEG sensors to analyze student engagement. PIMNAS Finalist.",
    fullDesc:
      "A breakthrough research project funded by Kemendikbudristek. We developed a wearable device that monitors brainwave activity (EEG) to detect concentration levels in Down Syndrome students during learning sessions. The data is processed in real-time to help teachers adjust their teaching methods dynamically.",
    role: "Lead Researcher & IoT Engineer",
    tech: [
      "Python (Signal Processing)",
      "ESP32",
      "Neurosky EEG",
      "MQTT",
      "WebSockets",
    ],
    features: [
      "Real-time Attention Level Graphing",
      "Wireless Data Transmission via Wifi",
      "Python-based Noise Filtering Algorithm",
      "Compact 3D Printed Enclosure",
    ],
    color: "from-indigo-500/20 to-blue-500/20",
    image: "/WereableTeachAssist.jpeg",
  },
  {
    id: 2,
    title: "Faculty Info System",
    shortDesc:
      "Comprehensive academic management system built with the TALL Stack.",
    fullDesc:
      "An enterprise-grade information system designed for the Faculty of Engineering at UNIMED. It solves the problem of fragmented academic data by centralizing student records, lecturer schedules, and administrative documents into a single, reactive SPA (Single Page Application).",
    role: "Fullstack Web Developer",
    tech: [
      "Laravel 12",
      "Livewire",
      "Tailwind CSS",
      "Alpine.js",
      "FilamentPHP",
    ],
    features: [
      "Dynamic SPA Experience without React/Vue overhead",
      "Role-based Access Control (RBAC)",
      "Automated Report Generation",
      "Optimized Database Queries for Large Datasets",
    ],
    color: "from-cyan-500/20 to-teal-500/20",
    image: "/Fakultas.jpeg",
  },
  {
    id: 3,
    title: "Smart Parking System",
    shortDesc:
      "Automated parking ecosystem integrating mobile apps with ESP8266.",
    fullDesc:
      "A smart city solution to reduce parking congestion. Users scan a QR code via the Android app to enter/exit. The app communicates with a Firebase Realtime Database, which triggers the ESP8266 controller to operate the gate servo motor instantly.",
    role: "Mobile & IoT Developer",
    tech: ["Kotlin (Native Android)", "ESP8266", "Firebase Realtime DB", "C++"],
    features: [
      "Sub-second Latency Gate Control",
      "QR Code Authentication",
      "Real-time Parking Slot Availability",
      "Digital Transaction History",
    ],
    color: "from-orange-500/20 to-red-500/20",
    image: "ParkirSystem.jpeg",
  },

  {
    id: 4,
    title: "Real-time Attendance App",
    shortDesc:
      "Native Android application for secure student attendance via QR code scanning.",
    fullDesc:
      "Developed a real-time attendance mobile application as part of an academic research project. Integrated Google Firebase for instant data syncing and secure user authentication.",
    role: "Research Assistant - Mobile App Developer",
    tech: ["Kotlin (Native Android)", "Google Firebase", "Barcode Scanner API"],
    features: [
      "Real-time Database Sync",
      "QR/Barcode Scanning",
      "Secure User Authentication",
      "Automated Logging",
    ],
    color: "from-green-500/20 to-emerald-500/20",
    image: "absensi.jpeg",
  },
  {
    id: 5,
    title: "E-Library Management System",
    shortDesc:
      "Web-based digital library administration system for SMK Swasta Teladan Sumut 2.",
    fullDesc:
      "Collaborated with a lecturer to develop a comprehensive digital library system. The platform digitizes book inventory, member management, and loan tracking to modernize school data administration.",
    role: "Research Assistant - Web Developer",
    tech: ["MySQL", "Bootstrap", "PHP"],
    features: [
      "Book Inventory Management",
      "Digital Loan Tracking",
      "Student Membership System",
      "Accessibility Optimization",
    ],
    color: "from-blue-500/20 to-cyan-500/20",
    image: "/perpustakaan.jpeg",
  },
];

const experience = [
  {
    role: "Lead Researcher & IoT Dev",
    company: "Kemendikbudristek (PKM-KI)",
    period: "Apr 2025 - Dec 2025",
    desc: "Led a team to develop an EEG-based IoT device. Qualified for PIMNAS 38 (National Finals).",
  },
  {
    role: "Technical Developer",
    company: "Kemendikbudristek (PKM-PI)",
    period: "Jan 2024 - Aug 2025",
    desc: "Engineered a smart parking system integrating Android apps with ESP8266 microcontrollers.",
  },
  {
    role: "Web Developer",
    company: "Faculty of Engineering UNIMED",
    period: "Jul 2025 - Dec 2025",
    desc: "Built a Faculty Information System using the TALL Stack (Tailwind, Alpine, Laravel, Livewire).",
  },
  {
    role: "Mobile Application Developer",
    company: "Universitas Negeri Medan",
    period: "Jul 2025 - Okt 2025",
    desc: "Developed a real-time attendance mobile application using Kotlin (Native Android) and Firebase.",
  },
  {
    role: "Research Assistant - Web Developer",
    company: "Universitas Negeri Medan",
    period: "Jul 2025 - Sep 2025",
    desc: 'Collaborated with a lecturer to develop "E-Library", a web-based library management system implemented at SMK Swasta Teladan Sumatera Utara 2.',
  },
];

// --- Helper Components ---

const CopyToast = ({ show }: { show: boolean }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-5 py-3 bg-zinc-100 text-zinc-900 rounded-full text-sm font-semibold shadow-2xl flex items-center gap-2 border border-zinc-200"
      >
        <div className="bg-emerald-500 rounded-full p-1">
          <Check size={12} className="text-white" />
        </div>
        Email copied to clipboard!
      </motion.div>
    )}
  </AnimatePresence>
);

const LiveTime = () => {
  const [time, setTime] = useState("");
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Force Medan/Jakarta Timezone (WIB)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      const timeString = new Intl.DateTimeFormat("en-US", options).format(now);
      setTime(timeString);
      setBlink((prev) => !prev);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="font-mono tabular-nums tracking-wider flex items-center gap-1">
      {time.split(":")[0]}
      <span
        className={`${
          blink ? "opacity-100" : "opacity-50"
        } transition-opacity duration-300`}
      >
        :
      </span>
      {time.split(":")[1]}
      <span className="ml-1 text-xs text-zinc-500 font-sans font-bold">
        WIB
      </span>
    </span>
  );
};

const Card = ({
  children,
  className = "",
  noPadding = false,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
  onClick?: () => void;
}) => (
  <div
    onClick={onClick}
    className={`group relative overflow-hidden rounded-3xl bg-zinc-900/80 border border-zinc-800/50 backdrop-blur-md transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/90 ${
      onClick ? "cursor-pointer" : ""
    } ${className}`}
  >
    <div className={noPadding ? "h-full" : "p-6 h-full"}>{children}</div>
  </div>
);

const Badge = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300 border border-zinc-700/50 ${className}`}
  >
    {children}
  </span>
);

const SocialLink = ({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 transition-all duration-300 hover:scale-110"
    aria-label={label}
  >
    <Icon size={18} />
  </a>
);

const ProjectModal = ({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) => {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-zinc-800/50 rounded-full hover:bg-zinc-800 transition-colors z-10"
        >
          <X size={20} className="text-zinc-400" />
        </button>

        <div className="h-64 w-full relative">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>
          <div className="absolute bottom-6 left-6">
            <h2 className="text-3xl font-bold text-white mb-2">
              {project.title}
            </h2>
            <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
              {project.role}
            </Badge>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-zinc-100 mb-3 flex items-center gap-2">
              <Code size={20} className="text-indigo-400" /> Overview
            </h3>
            <p className="text-zinc-400 leading-relaxed">{project.fullDesc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-zinc-100 mb-3 flex items-center gap-2">
                <Cpu size={20} className="text-emerald-400" /> Key Features
              </h3>
              <ul className="space-y-2">
                {project.features.map((feat, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-zinc-400 text-sm"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500/50 shrink-0"></span>
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-100 mb-3 flex items-center gap-2">
                <Layers size={20} className="text-amber-400" /> Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, i) => (
                  <Badge
                    key={i}
                    className="bg-zinc-800 hover:bg-zinc-700 transition-colors"
                  >
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Sections ---

const HeroSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      {/* Main Intro Card */}
      <Card
        className="md:col-span-2 relative overflow-hidden min-h-[400px] group"
        noPadding
      >
        <div className="flex flex-col md:flex-row h-full">
          {/* Left Side: Content */}
          <div className="w-full md:w-3/5 p-8 md:p-10 flex flex-col justify-center relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Open to Opportunities
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight text-zinc-100 mb-4">
                Raffi Hidayat <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 text-3xl md:text-4xl lg:text-5xl">
                  Software & IoT Engineer
                </span>
              </h1>

              <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-6 max-w-sm">
                Merging complex technical solutions with educational goals.
                Specialized in Full-stack development & IoT.
              </p>

              {/* NEW: Mini Stats/Highlights Row */}
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-300 bg-zinc-800/60 px-3 py-1.5 rounded-lg border border-zinc-700/50 hover:border-amber-500/30 transition-colors">
                  <Trophy size={14} className="text-amber-400" />
                  <span>PIMNAS 38 Finalist</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-zinc-300 bg-zinc-800/60 px-3 py-1.5 rounded-lg border border-zinc-700/50 hover:border-indigo-500/30 transition-colors">
                  <Trophy size={14} className="text-amber-400" />
                  <span>Student Grand Awardee</span>
                </div>
              </div>

              <div className="flex gap-4">
                {/* BUTTON DOWNLOAD RESUME */}
                <a
                  href="/Raffi_Hidayat_Resume.pdf"
                  download="Raffi_Hidayat_Resume.pdf"
                  className="px-5 py-2.5 rounded-full bg-zinc-100 text-zinc-900 font-semibold text-sm hover:bg-white transition-colors flex items-center gap-2 group cursor-pointer"
                >
                  View Resume
                  <ArrowUpRight
                    size={16}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </a>
                <a
                  href="#contact"
                  className="px-5 py-2.5 rounded-full bg-zinc-800 text-zinc-300 font-medium text-sm hover:bg-zinc-700 transition-colors"
                >
                  Contact Me
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Image Filling the Block */}
          <div className="relative w-full md:w-2/5 h-64 md:h-full shrink-0 overflow-hidden border-t md:border-t-0 md:border-l border-zinc-800/50">
            <div className="absolute inset-0 bg-indigo-900/20 mix-blend-overlay z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-zinc-900 to-transparent z-20 pointer-events-none hidden md:block"></div>

            <img
              src="/RaffiHidayat.JPG"
              alt="Raffi Hidayat Profile"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </Card>

      {/* Side Stack */}
      <div className="grid grid-rows-2 gap-4">
        {/* Top: Tech Stack Summary */}
        <Card className="flex flex-col justify-center p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-16 bg-zinc-800/50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"></div>
          <h3 className="text-zinc-100 font-semibold mb-4 flex items-center gap-2 relative z-10">
            <Terminal size={18} className="text-zinc-400" />
            Core Stack
          </h3>
          <div className="grid grid-cols-4 gap-3 relative z-10">
            {[Layout, Server, Database, Wifi, Globe, Smartphone, Cpu, Code].map(
              (Icon, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg bg-zinc-900/50 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-indigo-400 hover:border-indigo-500/30 transition-all"
                >
                  <Icon size={20} />
                </div>
              )
            )}
          </div>
        </Card>

        {/* Bottom: Location & Status */}
        <Card className="flex items-center justify-center p-0 overflow-hidden relative">
          <div className="absolute inset-0 grid grid-cols-6 gap-2 opacity-20 transform -rotate-12 scale-150 pointer-events-none">
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-zinc-700 rounded-sm"
              ></div>
            ))}
          </div>
          <div className="relative z-10 text-center flex flex-col items-center">
            <div className="flex items-center gap-2 text-zinc-400 mb-2">
              <MapPin size={16} />
              <span className="text-xs font-medium uppercase tracking-wider">
                Medan, ID
              </span>
            </div>
            <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
              <LiveTime />
            </h2>
            <p className="text-emerald-400 text-[10px] uppercase tracking-widest mt-2 font-semibold flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              ONLINE
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

const TechArsenal = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
    <Card className="relative overflow-hidden">
      <div className="absolute top-0 right-0 p-24 bg-cyan-500/10 blur-[60px] rounded-full pointer-events-none"></div>
      <div className="relative z-10">
        <h3 className="text-lg font-bold text-zinc-100 mb-4 flex items-center gap-2">
          <Globe size={20} className="text-cyan-400" /> Web and Mobile Ecosystem
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            "Laravel",
            "Livewire",
            "Unity (AR/VR)",
            "Tailwind CSS & Bootstrap",
            "Flutter",
            "Kotlin (Native Android)",
          ].map((s) => (
            <Badge key={s} className="bg-zinc-800/80 border-zinc-700/50">
              {s}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
    <Card className="relative overflow-hidden">
      <div className="absolute top-0 right-0 p-24 bg-orange-500/10 blur-[60px] rounded-full pointer-events-none"></div>
      <div className="relative z-10">
        <h3 className="text-lg font-bold text-zinc-100 mb-4 flex items-center gap-2">
          <Wifi size={20} className="text-orange-400" /> Hardware & IoT
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            "Python",
            "C++",
            "ESP32 / ESP8266",
            "MQTT",
            "Firebase Realtime",
            "Sensors & Actuators",
          ].map((s) => (
            <Badge key={s} className="bg-zinc-800/80 border-zinc-700/50">
              {s}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  </div>
);

// --- Main App Component ---

const App = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showCopyToast, setShowCopyToast] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("rafi50631@gmail.com");
    setShowCopyToast(true);
    setTimeout(() => setShowCopyToast(false), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 selection:bg-indigo-500/30 selection:text-indigo-200 font-sans antialiased relative">
      {/* Background Pattern (Blueprint Effect) */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #27272a 1px, transparent 0)`,
          backgroundSize: "40px 40px",
          opacity: 0.3,
        }}
      ></div>

      <div className="max-w-6xl mx-auto p-4 md:p-8 relative z-10">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-12 py-4 sticky top-0 bg-zinc-950/80 backdrop-blur-md z-40 rounded-b-2xl px-4 border-b border-white/5 transition-all">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-zinc-100 rounded-lg flex items-center justify-center">
              <span className="text-zinc-900 font-bold text-lg">R</span>
            </div>
            <span className="font-semibold text-zinc-100 tracking-tight">
              Raffi Hidayat
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
            <a
              href="#projects"
              className="hover:text-zinc-100 transition-colors"
            >
              Work
            </a>
            <a
              href="#experience"
              className="hover:text-zinc-100 transition-colors"
            >
              Experience
            </a>
            <a
              href="#contact"
              className="hover:text-zinc-100 transition-colors"
            >
              Contact
            </a>
          </div>
        </nav>

        <main>
          <HeroSection />
          <TechArsenal />

          {/* Bento Grid for Experience, Education & Awards */}
          <section
            id="experience"
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
          >
            {/* Experience Timeline (Span 2) */}
            <Card className="md:col-span-2">
              <h3 className="text-lg font-bold text-zinc-100 mb-6 flex items-center gap-2">
                <Briefcase size={20} className="text-indigo-400" /> Experience
              </h3>
              <div className="space-y-8 pl-2">
                {experience.map((exp, i) => (
                  <div
                    key={i}
                    className="relative pl-8 border-l-2 border-zinc-800 last:border-none"
                  >
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-zinc-900 border-2 border-indigo-500/50"></div>
                    <div>
                      <h4 className="text-zinc-100 font-semibold">
                        {exp.role}
                      </h4>
                      <div className="flex justify-between items-center mt-1 mb-2">
                        <span className="text-zinc-400 text-sm">
                          {exp.company}
                        </span>
                        <span className="text-zinc-500 text-xs font-mono bg-zinc-900 px-2 py-1 rounded">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-zinc-500 text-sm leading-relaxed">
                        {exp.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Right Column: Awards & Education */}
            <div className="grid grid-rows-2 gap-4">
              {/* Awards Card */}
              <Card className="relative overflow-hidden bg-gradient-to-br from-amber-500/10 to-yellow-500/5 border-amber-500/20">
                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-amber-100 mb-4 flex items-center gap-2">
                    <Trophy size={20} className="text-amber-400" /> Achievements
                  </h3>
                  <ul className="space-y-3">
                    <li className="text-sm text-zinc-300 border-b border-amber-500/10 pb-2">
                      <strong className="text-amber-200 block">
                        PIMNAS 38 Finalist
                      </strong>
                      <span className="text-xs opacity-70">
                        National Scientific Week 2025
                      </span>
                    </li>
                    <li className="text-sm text-zinc-300">
                      <strong className="text-amber-200 block">
                        PKM Funding Grantee
                      </strong>
                      <span className="text-xs opacity-70">
                        Kemendikbudristek '24 & '25
                      </span>
                    </li>
                    <li className="text-sm text-zinc-300">
                      <strong className="text-amber-200 block">
                        Student Grand Awardee
                      </strong>
                      <span className="text-xs opacity-70">
                        University Medan Estate '25
                      </span>
                    </li>
                  </ul>
                </div>
              </Card>

              {/* Education Card */}
              <Card>
                <h3 className="text-lg font-bold text-zinc-100 mb-4 flex items-center gap-2">
                  <BookOpen size={20} className="text-emerald-400" /> Education
                </h3>
                <div className="text-sm text-zinc-300">
                  <p className="font-semibold text-white">
                    Universitas Negeri Medan
                  </p>
                  <p className="opacity-70 mb-2">B.Ed in Informatics</p>
                  <p className="text-zinc-500 text-xs leading-relaxed">
                    Unique blend of technical engineering and pedagogical
                    skills. Strong in technical documentation and instruction.
                  </p>
                </div>
              </Card>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="py-8">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-2xl font-bold text-zinc-100">
                  Featured Projects
                </h2>
                <p className="text-zinc-500 text-sm mt-1">
                  Click on a card to view technical details.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="group cursor-pointer hover:ring-1 hover:ring-zinc-700 transition-all flex flex-col h-full"
                  noPadding
                >
                  <div className="h-48 w-full overflow-hidden relative bg-zinc-800">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <div className="bg-zinc-950/50 backdrop-blur-md p-2 rounded-full text-zinc-100">
                        <ExternalLink size={16} />
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60"></div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-zinc-100 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-grow">
                      {project.shortDesc}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-zinc-800/50">
                      {project.tech.slice(0, 3).map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                      {project.tech.length > 3 && (
                        <Badge>+{project.tech.length - 3}</Badge>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section
            id="contact"
            className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4"
          >
            <Card className="flex flex-col justify-center min-h-[200px] bg-gradient-to-br from-indigo-500/10 to-purple-500/5 border-indigo-500/20">
              <h2 className="text-2xl font-bold text-zinc-100 mb-2">
                Ready to Collaborate?
              </h2>
              <p className="text-zinc-400 text-sm mb-6">
                Whether it's an intricate IoT system or a scalable web platform,
                I'm ready to bring technical expertise to your team.
              </p>
              <div className="flex gap-4">
                <SocialLink
                  href="https://github.com/RaffiHDMedia"
                  icon={Github}
                  label="GitHub"
                />
                <SocialLink
                  href="https://www.instagram.com/__rafihdyt"
                  icon={Instagram}
                  label="Instagram"
                />
                <SocialLink
                  href="mailto:rafi50631@gmail.com"
                  icon={Mail}
                  label="Email"
                />
              </div>
            </Card>
            <Card className="flex flex-col justify-center min-h-[200px] border-dashed">
              <div className="text-center group">
                <p className="text-zinc-500 text-sm mb-2">Drop me a line at</p>

                <button
                  onClick={handleCopyEmail}
                  className="relative inline-flex items-center gap-2 text-2xl md:text-3xl font-bold text-zinc-100 hover:text-indigo-400 transition-colors"
                >
                  rafi50631@gmail.com
                  <Copy
                    size={20}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-500"
                  />
                </button>

                <p className="text-zinc-600 text-xs mt-4">
                  Responds within 24 hours
                </p>
              </div>
            </Card>
          </section>
        </main>

        <footer className="mt-12 py-8 border-t border-zinc-900 text-center text-zinc-600 text-xs">
          © {new Date().getFullYear()} Raffi Hidayat. Built with Next.js,
          Tailwind & Framer Motion.
        </footer>
      </div>

      {/* Popups & Toasts */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
      <CopyToast show={showCopyToast} />
    </div>
  );
};

export default App;
