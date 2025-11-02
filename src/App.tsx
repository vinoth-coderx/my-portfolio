import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Services from "./components/Services";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SplashScreen from "./components/SplashScreen";

// Detect if device is mobile for performance optimization
const isMobile = () => {
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth < 768
  );
};

const Portfolio: React.FC = () => {
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<string>("about");
  const [isLowPerformance] = useState<boolean>(isMobile());

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

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
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });

      if (current && current !== activeSection) {
        setActiveSection(current);
      }
    };

    // Use passive listener for better scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  // Pass performance context to children
  return (
    <div className="bg-black min-h-screen overflow-x-hidden">
      <AnimatePresence mode="wait">
        {showSplash && (
          <SplashScreen
            onComplete={handleSplashComplete}
            isLowPerformance={isLowPerformance}
          />
        )}
      </AnimatePresence>

      {!showSplash && (
        <>
          <Navbar
            activeSection={activeSection}
            isLowPerformance={isLowPerformance}
          />
          <Hero isLowPerformance={isLowPerformance} />
          <Skills isLowPerformance={isLowPerformance} />
          <Services isLowPerformance={isLowPerformance} />
          <Education isLowPerformance={isLowPerformance} />
          <Experience isLowPerformance={isLowPerformance} />
          <Contact isLowPerformance={isLowPerformance} />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Portfolio;
