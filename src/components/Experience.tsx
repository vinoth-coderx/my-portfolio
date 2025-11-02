import React from "react";
import { portfolioData } from "../data";
import Background from "./Background";

const Experience: React.FC = () => {
  return (
    <section
      id="experience"
      className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-black via-gray-950 to-black"
    >
      <Background />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 md:mb-4">
            Work <span className="text-emerald-500">Experience</span>
          </h2>
          <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-emerald-600 to-green-600 mx-auto rounded-full" />
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 md:w-1 bg-gradient-to-b from-emerald-600 to-green-600 hidden md:block" />

          <div className="space-y-8 md:space-y-12">
            {portfolioData.experience.map((exp, index) => (
              <div 
                key={index} 
                className="relative animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="absolute left-3 md:left-6 w-2 h-2 md:w-4 md:h-4 bg-emerald-600 rounded-full border-2 md:border-4 border-black hidden md:block" />

                <div className="md:ml-16 lg:ml-20 bg-gray-900 border border-emerald-900/30 rounded-xl md:rounded-2xl p-6 md:p-8 hover:border-emerald-800/50 transition-all duration-300 hover-lift">
                  <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-emerald-600 to-green-700 rounded-lg md:rounded-xl flex items-center justify-center text-white font-bold text-lg md:text-xl flex-shrink-0">
                      {exp.company[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                        {exp.title}
                      </h3>
                      <p className="text-emerald-500 font-semibold mb-1 text-sm md:text-base">
                        {exp.company}
                      </p>
                      <p className="text-gray-400 text-xs md:text-sm">{exp.period}</p>
                    </div>
                  </div>

                  <p className="text-gray-400 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                    {exp.description}
                  </p>

                  <div className="space-y-2 md:space-y-3">
                    <p className="text-emerald-500 font-semibold text-xs md:text-sm mb-2 md:mb-3">
                      Key Achievements:
                    </p>
                    {exp.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-start gap-2 md:gap-3">
                        <div className="w-4 h-4 md:w-5 md:h-5 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg
                            className="w-2 h-2 md:w-3 md:h-3 text-white"
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
                        <p className="text-gray-400 text-xs md:text-base leading-relaxed">
                          {achievement}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Experience);
