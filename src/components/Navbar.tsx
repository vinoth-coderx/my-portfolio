import React, { useState, useEffect, useCallback, useMemo } from "react";
import { portfolioData } from "../data";

interface NavbarProps {
  activeSection: string;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  
  const navItems: string[] = useMemo(
    () => ["about", "skills", "services", "education", "experience", "contact"],
    []
  );

  const initials = useMemo(() => 
    portfolioData.personal.name
      ?.split(" ")
      .map((name) => name[0])
      .join(""),
    []
  );

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 50);
    };

    const handleResize = (): void => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileMenuOpen]);

  const scrollToSection = useCallback((id: string): void => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileMenuOpen(false);
    }
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-40 transition-all duration-300 animate-fade-in-down ${
          scrolled ? "backdrop-blur-md bg-black/80 shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <div
              className="cursor-pointer flex items-center gap-3 transition-transform hover:scale-105"
              onClick={() => scrollToSection("about")}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-green-700 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">{initials}</span>
              </div>
              <span className="text-white font-semibold text-lg hidden sm:block">
                {portfolioData.personal.name}
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-2">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`px-5 py-2.5 rounded-lg capitalize text-sm font-medium transition-all duration-200 hover:scale-105 ${
                    activeSection === item
                      ? "text-white bg-emerald-600 shadow-lg"
                      : "text-gray-300 hover:text-white hover:bg-emerald-900/30"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-10 h-10 flex items-center justify-center relative"
                aria-label="Toggle menu"
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span
                    className={`w-full h-0.5 bg-emerald-500 rounded-full transition-transform duration-200 ${
                      mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                    }`}
                  />
                  <span
                    className={`w-full h-0.5 bg-emerald-500 rounded-full transition-opacity duration-200 ${
                      mobileMenuOpen ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`w-full h-0.5 bg-emerald-500 rounded-full transition-transform duration-200 ${
                      mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Mobile Menu Panel */}
          <div className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-gradient-to-br from-gray-950 to-black z-50 lg:hidden shadow-2xl border-l border-emerald-900/30 menu-enter">
            {/* Menu Header */}
            <div className="p-6 border-b border-emerald-900/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-green-700 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">{initials}</span>
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

            {/* Menu Items */}
            <div className="p-6 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`w-full text-left px-5 py-3.5 rounded-lg capitalize font-medium transition-all ${
                    activeSection === item
                      ? "text-white bg-emerald-600 shadow-lg"
                      : "text-gray-300 hover:text-white hover:bg-emerald-900/30"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default React.memo(Navbar);
