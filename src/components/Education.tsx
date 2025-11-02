import React from "react";
import { portfolioData } from "../data";
import { FaGraduationCap, FaAward, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import Background from "./Background";

const Education: React.FC = () => {
  return (
    <section id="education" className="py-16 md:py-24 relative overflow-hidden bg-black">
      <Background />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 md:mb-4">
            Education & <span className="text-emerald-500">Qualifications</span>
          </h2>
          <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-emerald-600 to-green-600 mx-auto mb-3 md:mb-4 rounded-full" />
          <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto px-4">
            My academic background and continuous learning journey
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line - hidden on mobile */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 md:w-1 bg-gradient-to-b from-emerald-600 to-green-600 transform -translate-x-1/2 hidden md:block" />

          <div className="space-y-8 md:space-y-12">
            {portfolioData.education.map((edu, index) => (
              <div
                key={index}
                className={`relative flex ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex-col gap-4 md:gap-8 items-start animate-fade-in-up`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 md:w-4 md:h-4 bg-emerald-600 rounded-full border-2 md:border-4 border-black transform -translate-x-1/2 z-10 hidden md:block" />

                {/* Content */}
                <div className="md:w-1/2 w-full">
                  <div className="bg-gray-900 border border-emerald-900/30 rounded-xl md:rounded-2xl p-6 md:p-8 hover:border-emerald-800/50 transition-all duration-300 hover-lift">
                    <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-emerald-600 to-green-700 rounded-lg md:rounded-xl flex items-center justify-center text-white flex-shrink-0">
                        <FaGraduationCap className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">
                          {edu.degree}
                        </h3>
                        <p className="text-emerald-500 font-semibold mb-1 text-sm md:text-base">
                          {edu.institution}
                        </p>
                        <div className="flex flex-wrap gap-2 md:gap-4 text-xs md:text-sm text-gray-400">
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

                    <div className="space-y-2 md:space-y-3 mt-4 md:mt-6">
                      <p className="text-emerald-500 font-semibold text-xs md:text-sm mb-2 md:mb-3">
                        Key Highlights:
                      </p>
                      {edu.achievements.map((achievement, i) => (
                        <div key={i} className="flex items-start gap-2 md:gap-3">
                          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-emerald-500 rounded-full flex-shrink-0 mt-1.5 md:mt-2" />
                          <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                            {achievement}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certification */}
        <div className="mt-12 md:mt-16 max-w-2xl mx-auto animate-fade-in-up delay-400">
          <div className="bg-gradient-to-r from-emerald-600/20 to-green-600/20 border border-emerald-500/30 rounded-xl md:rounded-2xl p-6 md:p-8 text-center hover-lift">
            <FaAward className="w-10 h-10 md:w-12 md:h-12 text-emerald-500 mx-auto mb-3 md:mb-4" />
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
              Full Stack Development Certification
            </h3>
            <p className="text-emerald-400 font-semibold mb-2 text-sm md:text-base">
              Besant Technologies
            </p>
            <p className="text-gray-400 text-sm md:text-base">
              Completed a comprehensive 6-month Full Stack Development course
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Education);
