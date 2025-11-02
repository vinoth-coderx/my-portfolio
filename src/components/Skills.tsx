import React, { useState, useRef, useEffect } from "react";
import { portfolioData } from "../data";
import Background from "./Background";

// Simple animated number with CSS
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
          const duration = 1500;
          const steps = 30;
          const stepValue = value / steps;
          let currentStep = 0;

          const timer = setInterval(() => {
            currentStep++;
            setDisplayValue(Math.min(Math.floor(stepValue * currentStep), value));

            if (currentStep >= steps) {
              clearInterval(timer);
            }
          }, duration / steps);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.3 }
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

const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  return (
    <section id="skills" className="py-16 md:py-24 relative overflow-hidden bg-black">
      <Background />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4">
            <span className="text-white">Skills & </span>
            <span className="text-emerald-500">Expertise</span>
          </h2>
          <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-emerald-600 to-green-600 mx-auto mb-3 md:mb-4 rounded-full" />
          <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto px-4">
            My technical proficiency across different domains and technologies
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12 px-2 animate-fade-in-up delay-200">
          {portfolioData.skills.map((skill, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(index)}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 text-sm md:text-base hover-lift ${
                selectedCategory === index
                  ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg"
                  : "bg-gray-900 text-gray-400 border border-emerald-900/30 hover:text-emerald-500 hover:border-emerald-800/50"
              }`}
            >
              <span className="text-base md:text-lg">{skill.icon}</span>
              <span className="hidden sm:inline">{skill.category}</span>
            </button>
          ))}
        </div>

        {/* Skills Display */}
        <div className="min-h-[300px] md:min-h-[400px]">
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
            {portfolioData.skills[selectedCategory].items.map((skill, index) => (
              <div
                key={`${skill.name}-${index}`}
                className="bg-gray-900 border border-emerald-900/30 rounded-xl md:rounded-2xl p-4 md:p-6 hover:border-emerald-800/50 transition-all duration-300 animate-fade-in-up hover-lift"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <h3 className="text-base md:text-lg font-semibold text-white">
                    {skill.name}
                  </h3>
                  <span className="text-emerald-500 font-bold text-base md:text-lg">
                    {skill.level}%
                  </span>
                </div>

                <div className="relative h-2 md:h-3 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="absolute h-full bg-gradient-to-r from-emerald-600 to-green-600 rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: `${skill.level}%`,
                      transitionDelay: `${index * 50}ms` 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-12 md:mt-20 animate-fade-in-up delay-400">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto">
            {[
              {
                label: "Technologies",
                value: portfolioData.others?.technologies,
                icon: "💻",
                color: "text-blue-400",
              },
              {
                label: "Years Experience",
                value: portfolioData.others?.experience,
                icon: "⏱️",
                color: "text-emerald-400",
              },
              {
                label: "Projects",
                value: portfolioData?.others?.projects,
                icon: "🚀",
                color: "text-purple-400",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-gray-900 border border-emerald-900/30 rounded-xl md:rounded-2xl p-6 md:p-8 text-center hover-lift hover-glow"
              >
                <div className={`text-3xl md:text-4xl mb-3 md:mb-4 ${stat.color}`}>
                  {stat.icon}
                </div>
                <div className={`text-4xl md:text-5xl font-bold ${stat.color} mb-2`}>
                  <AnimatedNumber value={stat.value || 0} />
                </div>
                <div className="text-gray-300 font-semibold text-sm md:text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Skills);
