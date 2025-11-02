import React, { useState, useEffect, useCallback } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Services from "./components/Services";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SplashScreen from "./components/SplashScreen";

const Portfolio: React.FC = () => {
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<string>("about");

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

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  return (
    <div className="bg-black min-h-screen overflow-x-hidden">
      {showSplash ? (
        <SplashScreen onComplete={handleSplashComplete} />
      ) : (
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
