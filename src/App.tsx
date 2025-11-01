/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "./data";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaGlobe,
  FaMediumM,
  FaRocket,
  FaGraduationCap,
  FaAward,
  FaCalendarAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import emailjs from "emailjs-com";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Component Props Interfaces
interface NavbarProps {
  activeSection: string;
}

interface SplashScreenProps {
  onComplete: () => void;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

// Subtle Professional Background Component
const ProfessionalBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black" />

      <motion.div
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-green-900/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98120_1px,transparent_1px),linear-gradient(to_bottom,#10b98120_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
  );
};

// Professional Splash Screen
const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative w-24 h-24 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-green-700 rounded-xl" />
            <div className="relative w-full h-full flex items-center justify-center">
              <span className="text-4xl font-bold text-white">
                {portfolioData.personal.name
                  ?.split(" ")
                  .map((name) => name[0])
                  .join("")}
              </span>
            </div>
          </div>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-3xl font-semibold text-white mb-2"
        >
          {portfolioData.personal.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-emerald-500 text-lg"
        >
          {portfolioData.personal.title}
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="w-32 h-0.5 bg-gradient-to-r from-emerald-600 to-green-600 mx-auto mt-6"
        />
      </div>
    </motion.div>
  );
};

// Helper function for social icons
const getSocialIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "github":
      return <FaGithub className="w-5 h-5" />;
    case "linkedin":
      return <FaLinkedin className="w-5 h-5" />;
    case "medium":
      return <FaMediumM className="w-5 h-5" />;
    case "twitter":
      return <FaTwitter className="w-5 h-5" />;
    case "instagram":
      return <FaInstagram className="w-5 h-5" />;
    case "portfolio":
      return <FaGlobe className="w-5 h-5" />;
    default:
      return <FaGlobe className="w-5 h-5" />;
  }
};

// Professional Navbar
const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const navItems: string[] = [
    "about",
    "skills",
    "services",
    "education",
    "experience",
    "contact",
  ];

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 50);
    };

    const handleResize = (): void => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (id: string): void => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          scrolled ? "backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="cursor-pointer"
              onClick={() => scrollToSection("about")}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-green-700 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">
                    {portfolioData.personal.name
                      ?.split(" ")
                      .map((name) => name[0])
                      .join("")}
                  </span>
                </div>
                <span className="text-white font-semibold text-lg hidden sm:block">
                  {portfolioData.personal.name}
                </span>
              </div>
            </motion.div>

            <div className="hidden lg:flex items-center gap-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item)}
                  className={`px-5 py-2.5 rounded-lg capitalize text-sm font-medium transition-all duration-200 ${
                    activeSection === item
                      ? "text-white bg-emerald-600 shadow-lg shadow-emerald-600/30"
                      : "text-gray-300 hover:text-white hover:bg-emerald-900/30"
                  }`}
                >
                  {item}
                </motion.button>
              ))}
            </div>

            <div className="lg:hidden">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-10 h-10 flex items-center justify-center relative"
                aria-label="Toggle menu"
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  <motion.span
                    animate={
                      mobileMenuOpen
                        ? { rotate: 45, y: 8 }
                        : { rotate: 0, y: 0 }
                    }
                    transition={{ duration: 0.2 }}
                    className="w-full h-0.5 bg-emerald-500 rounded-full shadow-sm"
                  />
                  <motion.span
                    animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-0.5 bg-emerald-500 rounded-full shadow-sm"
                  />
                  <motion.span
                    animate={
                      mobileMenuOpen
                        ? { rotate: -45, y: -8 }
                        : { rotate: 0, y: 0 }
                    }
                    transition={{ duration: 0.2 }}
                    className="w-full h-0.5 bg-emerald-500 rounded-full shadow-sm"
                  />
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
            />

            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-gradient-to-br from-gray-950 to-black z-50 lg:hidden shadow-2xl border-l border-emerald-900/30"
            >
              <div className="p-6 border-b border-emerald-900/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-green-700 rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">
                      {portfolioData.personal.name
                        ?.split(" ")
                        .map((name) => name[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">
                      {portfolioData.personal.name}
                    </p>
                    <p className="text-emerald-500 text-xs">
                      {portfolioData.personal.title}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => scrollToSection(item)}
                    className={`w-full text-left px-5 py-3.5 rounded-lg capitalize font-medium transition-all ${
                      activeSection === item
                        ? "text-white bg-emerald-600 shadow-lg"
                        : "text-gray-300 hover:text-white hover:bg-emerald-900/30"
                    }`}
                  >
                    {item}
                  </motion.button>
                ))}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-emerald-900/30">
                <div className="flex gap-4 justify-center">
                  {Object.entries(portfolioData.personal.social).map(
                    ([platform, url], index) => (
                      <motion.a
                        key={index}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 rounded-lg bg-gray-900 border border-emerald-900/30 flex items-center justify-center text-gray-400 hover:text-emerald-500 hover:border-emerald-600 transition-all"
                      >
                        {getSocialIcon(platform)}
                      </motion.a>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// Professional About Section
const Hero: React.FC = () => {
  return (
    <section
      id="about"
      className="py-24 relative overflow-hidden bg-gradient-to-b from-black via-gray-950 to-black"
    >
      <ProfessionalBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-2xl group">
                <img
                  src={portfolioData.personal.profileImage}
                  alt="Profile"
                  className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
                >
                  {portfolioData.personal.name}
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="mb-6"
                >
                  <p className="text-xl sm:text-2xl text-emerald-500 font-semibold mb-3">
                    {portfolioData.personal.title}
                  </p>
                  <div className="h-1 w-24 bg-gradient-to-r from-emerald-600 to-green-600 rounded-full" />
                </motion.div>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-gray-300 text-lg leading-relaxed"
              >
                {portfolioData.personal.bio}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="flex gap-4 pt-4"
              >
                {Object.entries(portfolioData.personal.social).map(
                  ([platform, url], index) => (
                    <motion.a
                      key={index}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      whileHover={{ scale: 1.2, y: -5 }}
                      className="w-12 h-12 rounded-xl bg-gray-900 border border-emerald-900/30 flex items-center justify-center text-gray-400 hover:text-emerald-500 hover:border-emerald-600 transition-all shadow-lg"
                    >
                      {getSocialIcon(platform)}
                    </motion.a>
                  )
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 pt-6"
              >
                <motion.a
                  href={portfolioData.personal.resume}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-emerald-900/50 transition-all"
                >
                  <span>Download Resume</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </motion.a>

                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 border-emerald-600 text-emerald-500 rounded-xl font-semibold hover:bg-emerald-600 hover:text-white transition-all"
                >
                  <span>Get In Touch</span>
                  <FaRocket className="w-4 h-4" />
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Fixed Animated Number Component
const AnimatedNumber: React.FC<{ value: number }> = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const steps = 60;
          const stepValue = value / steps;
          let currentStep = 0;

          const timer = setInterval(() => {
            currentStep++;
            setDisplayValue(
              Math.min(Math.floor(stepValue * currentStep), value)
            );

            if (currentStep >= steps) {
              clearInterval(timer);
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [value, hasAnimated]);

  return <span ref={elementRef}>{displayValue}+</span>;
};

// Enhanced Professional Skills Section
const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-black">
      <ProfessionalBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl font-bold mb-4"
            >
              <span className="text-white">Skills & </span>
              <span className="text-emerald-500">Expertise</span>
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="w-20 h-1 bg-gradient-to-r from-emerald-600 to-green-600 mx-auto mb-4 rounded-full"
            />
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-gray-400 text-lg max-w-2xl mx-auto"
            >
              My technical proficiency across different domains and technologies
            </motion.p>
          </div>

          {/* Skills Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {portfolioData.skills.map((skill, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(index)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                  selectedCategory === index
                    ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg shadow-emerald-600/30"
                    : "bg-gray-900 text-gray-400 border border-emerald-900/30 hover:text-emerald-500 hover:border-emerald-800/50"
                }`}
              >
                <span className="text-lg">{skill.icon}</span>
                <span>{skill.category}</span>
              </motion.button>
            ))}
          </div>

          {/* Skills Display - Fixed AnimatePresence */}
          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
              >
                {portfolioData.skills[selectedCategory].items.map(
                  (skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -5 }}
                      className="bg-gray-900 border border-emerald-900/30 rounded-2xl p-6 hover:border-emerald-800/50 transition-all duration-300 group"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
                          {skill.name}
                        </h3>
                        <span className="text-emerald-500 font-bold text-lg">
                          {skill.level}%
                        </span>
                      </div>

                      <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{
                            duration: 1,
                            delay: index * 0.05 + 0.3,
                            ease: "easeOut",
                          }}
                          className="absolute h-full bg-gradient-to-r from-emerald-600 to-green-600 rounded-full shadow-lg shadow-emerald-500/30"
                        />
                      </div>
                    </motion.div>
                  )
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Enhanced Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                {
                  label: "Technologies",
                  value: portfolioData.others?.technologies,
                  icon: "💻",
                  color: "text-blue-400",
                  bgGradient: "from-blue-500/20 to-blue-600/10",
                  borderColor: "border-blue-500/30",
                  description: "Modern Stack",
                },
                {
                  label: "Years Experience",
                  value: portfolioData.others?.experience,
                  icon: "⏱️",
                  color: "text-emerald-400",
                  bgGradient: "from-emerald-500/20 to-green-600/10",
                  borderColor: "border-emerald-500/30",
                  description: "Professional Journey",
                },
                {
                  label: "Projects Completed",
                  value: portfolioData?.others?.projects,
                  icon: "🚀",
                  color: "text-purple-400",
                  bgGradient: "from-purple-500/20 to-pink-600/10",
                  borderColor: "border-purple-500/30",
                  description: "Successful Deliveries",
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{
                    scale: 1.05,
                    y: -8,
                    transition: { duration: 0.3 },
                  }}
                  className={`relative bg-gradient-to-br ${stat.bgGradient} border ${stat.borderColor} rounded-2xl p-8 text-center backdrop-blur-sm group overflow-hidden`}
                >
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                  {/* Icon */}
                  <div className={`text-4xl mb-4 ${stat.color} drop-shadow-lg`}>
                    {stat.icon}
                  </div>

                  {/* Value */}
                  <div
                    className={`text-5xl font-bold ${stat.color} mb-2 drop-shadow-lg`}
                  >
                    <AnimatedNumber value={stat.value || 0} />
                  </div>

                  {/* Label */}
                  <div className="text-gray-300 font-semibold text-lg mb-2">
                    {stat.label}
                  </div>

                  {/* Description */}
                  <div className="text-gray-500 text-sm">
                    {stat.description}
                  </div>

                  {/* Animated dots */}
                  <div className="flex justify-center gap-1 mt-4">
                    {[1, 2, 3].map((dot, index) => (
                      <motion.div
                        key={index}
                        className={`w-1 h-1 rounded-full ${stat.color} opacity-50`}
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: dot * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Enhanced Services Section
const Services: React.FC = () => {
  const services = portfolioData.services;

  return (
    <section
      id="services"
      className="py-24 relative overflow-hidden bg-gradient-to-b from-black via-gray-950 to-black"
    >
      <ProfessionalBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl font-bold text-white mb-4"
            >
              My <span className="text-emerald-500">Services</span>
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="w-20 h-1 bg-gradient-to-r from-emerald-600 to-green-600 mx-auto mb-4 rounded-full"
            />
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-gray-400 text-lg max-w-2xl mx-auto"
            >
              Comprehensive digital solutions tailored to your business needs
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group bg-gray-900 border border-emerald-900/30 rounded-2xl p-8 hover:border-emerald-800/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-emerald-900/20"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-green-700 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:shadow-lg group-hover:shadow-emerald-900/30 transition-all"
                >
                  <span className="text-2xl">{service.icon}</span>
                </motion.div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-500 transition-colors">
                  {service.title}
                </h3>

                <p className="text-gray-400 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + featureIndex * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0" />
                      <span className="text-gray-400 text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
                {/* 
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="mt-8 pt-6 border-t border-emerald-900/30"
                >
                  <button className="w-full px-6 py-3 bg-transparent border-2 border-emerald-600 text-emerald-500 rounded-xl font-medium hover:bg-emerald-600 hover:text-white transition-all duration-300 text-sm">
                    Learn More
                  </button>
                </motion.div> */}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// New Education Section
const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 relative overflow-hidden bg-black">
      <ProfessionalBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl font-bold text-white mb-4"
            >
              Education &{" "}
              <span className="text-emerald-500">Qualifications</span>
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="w-20 h-1 bg-gradient-to-r from-emerald-600 to-green-600 mx-auto mb-4 rounded-full"
            />
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-gray-400 text-lg max-w-2xl mx-auto"
            >
              My academic background and continuous learning journey in
              technology
            </motion.p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-600 to-green-600 transform -translate-x-1/2 hidden md:block" />

            <div className="space-y-8">
              {portfolioData.education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative flex ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-col gap-8 items-start`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-emerald-600 rounded-full border-4 border-black transform -translate-x-1/2 z-10 hidden md:block" />

                  {/* Content */}
                  <div className=" md:w-1/2">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-gray-900 border border-emerald-900/30 rounded-2xl p-8 hover:border-emerald-800/50 transition-all duration-300 group"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-green-700 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                          <FaGraduationCap className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                            {edu.degree}
                          </h3>
                          <p className="text-emerald-500 font-semibold mb-1">
                            {edu.institution}
                          </p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-1">
                              <FaCalendarAlt className="w-3 h-3" />
                              <span>{edu.period}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FaMapMarkerAlt className="w-3 h-3" />
                              <span>{edu.location}</span>
                            </div>
                            {edu.score && (
                              <div className="flex items-center gap-1">
                                <FaAward className="w-3 h-3" />
                                <span>{edu.score}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 mt-6">
                        <p className="text-emerald-500 font-semibold text-sm mb-3">
                          Key Highlights:
                        </p>
                        {edu.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0 mt-2" />
                            <p className="text-gray-400 text-sm">
                              {achievement}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certification Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 max-w-2xl mx-auto"
          >
            <div className="bg-gradient-to-r from-emerald-600/20 to-green-600/20 border border-emerald-500/30 rounded-2xl p-8 text-center">
              <FaAward className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">
                Full Stack Development Certification
              </h3>
              <p className="text-emerald-400 font-semibold mb-2">
                Besant Technologies
              </p>
              <p className="text-gray-400">
                Completed a comprehensive 6-month Full Stack Development course,
                mastering modern web technologies and best practices.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Professional Experience Section
const Experience: React.FC = () => {
  return (
    <section
      id="experience"
      className="py-24 relative overflow-hidden bg-gradient-to-b from-black via-gray-950 to-black"
    >
      <ProfessionalBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl font-bold text-white mb-4"
            >
              Work <span className="text-emerald-500">Experience</span>
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="w-20 h-1 bg-gradient-to-r from-emerald-600 to-green-600 mx-auto rounded-full"
            />
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-600 to-green-600 hidden md:block" />

            <div className="space-y-12">
              {portfolioData.experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative"
                >
                  <div className="absolute left-6 w-4 h-4 bg-emerald-600 rounded-full border-4 border-black hidden md:block" />

                  <div className="md:ml-20 bg-gray-900 border border-emerald-900/30 rounded-2xl p-8 hover:border-emerald-800/50 transition-all duration-300 group">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-green-700 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0 group-hover:scale-110 transition-transform">
                        {exp.company[0]}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                          {exp.title}
                        </h3>
                        <p className="text-emerald-500 font-semibold mb-1">
                          {exp.company}
                        </p>
                        <p className="text-gray-400 text-sm">{exp.period}</p>
                      </div>
                    </div>

                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {exp.description}
                    </p>

                    <div className="space-y-3">
                      <p className="text-emerald-500 font-semibold text-sm mb-3">
                        Key Achievements:
                      </p>
                      {exp.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-5 h-5 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg
                              className="w-3 h-3 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <p className="text-gray-400">{achievement}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Professional Contact Section
const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        PUBLIC_KEY
      );

      if (result.status === 200) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitted(false), 3000);
      }
    } catch (err) {
      console.error("EmailJS Error:", err);
      alert("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-black">
      <ProfessionalBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl font-bold text-white mb-4"
            >
              Get In <span className="text-emerald-500">Touch</span>
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="w-20 h-1 bg-gradient-to-r from-emerald-600 to-green-600 mx-auto rounded-full"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">
                Let's create something amazing together
              </h3>
              <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                I’m always interested in exploring new opportunities and
                collaborations. Whether you’d like to discuss a project or
                simply connect, feel free to reach out!
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: "📧",
                    label: "Email",
                    value: portfolioData.personal.email,
                  },
                  {
                    icon: "📱",
                    label: "Phone",
                    value: portfolioData.personal.phone,
                  },
                  {
                    icon: "📍",
                    label: "Location",
                    value: portfolioData.personal.location,
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-6 p-5 rounded-xl bg-gray-900 border border-emerald-900/30 hover:border-emerald-800/50 transition-all duration-300"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-green-700 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-emerald-500 text-sm font-medium mb-1">
                        {item.label}
                      </p>
                      <p className="text-white font-medium">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <form
                onSubmit={handleSubmit}
                className="bg-gray-900 border border-emerald-900/30 rounded-2xl p-8 space-y-6"
              >
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-5 py-4 bg-gray-950 text-white rounded-xl border border-gray-800 focus:border-emerald-600 focus:outline-none transition-all placeholder-gray-500"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-5 py-4 bg-gray-950 text-white rounded-xl border border-gray-800 focus:border-emerald-600 focus:outline-none transition-all placeholder-gray-500"
                    required
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Your Message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-5 py-4 bg-gray-950 text-white rounded-xl border border-gray-800 focus:border-emerald-600 focus:outline-none resize-none transition-all placeholder-gray-500"
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-emerald-900/50 transition-all duration-300"
                >
                  {loading
                    ? "Sending..."
                    : submitted
                    ? "✓ Message Sent Successfully!"
                    : "Send Message"}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Professional Footer
const Footer: React.FC = () => {
  return (
    <footer className="relative py-12 overflow-hidden bg-black border-t border-emerald-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-400"
          >
            © {new Date().getFullYear()}{" "}
            <span className="text-emerald-500 font-semibold">
              {portfolioData.personal.name}
            </span>
            . All rights reserved.
          </motion.p>

          <div className="flex gap-6">
            {Object.entries(portfolioData.personal.social).map(
              ([platform, url], index) => (
                <motion.a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-400 hover:text-emerald-500 transition-colors capitalize text-sm font-medium"
                >
                  {platform}
                </motion.a>
              )
            )}
          </div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="mt-8 h-px bg-gradient-to-r from-transparent via-emerald-900/50 to-transparent"
        />
        {/* 
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-500 text-sm mt-6"
        >
          Built with React, TypeScript, Tailwind CSS, and Framer Motion
        </motion.p> */}
      </div>
    </footer>
  );
};

// Main App Component
const Portfolio: React.FC = () => {
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<string>("about");

  useEffect(() => {
    const handleScroll = (): void => {
      const sections: string[] = [
        "about",
        "skills",
        "services",
        "education",
        "experience",
        "contact",
      ];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-black min-h-screen overflow-x-hidden">
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>
      {!showSplash && (
        <>
          <Navbar activeSection={activeSection} />
          <Hero />
          <Skills />
          <Services />
          <Education />
          <Experience />
          <Contact />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Portfolio;
