import React from "react";
import { portfolioData } from "../data";
import { FaRocket } from "react-icons/fa";
import Background from "./Background";
import SocialIcons from "./SocialIcons";

const Hero: React.FC = () => {
  return (
    <section
      id="about"
      className="min-h-screen py-20 md:py-24 relative overflow-hidden bg-gradient-to-b from-black via-gray-950 to-black flex items-center"
    >
      <Background />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Profile Image */}
          <div className="relative order-1 lg:order-1 animate-fade-in-up">
            <div className="relative overflow-hidden rounded-2xl group max-w-md mx-auto hover-lift">
              <img
                src={portfolioData.personal.profileImage}
                alt={portfolioData.personal.name}
                className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                loading="eager"
              />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" /> */}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4 md:space-y-6 order-2 lg:order-2 animate-fade-in-up delay-200">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 leading-tight">
                {portfolioData.personal.name}
              </h1>

              <div className="mb-4 md:mb-6">
                <p className="text-lg sm:text-xl md:text-2xl text-emerald-500 font-semibold mb-2 md:mb-3">
                  {portfolioData.personal.title}
                </p>
                <div className="h-1 w-20 md:w-24 bg-gradient-to-r from-emerald-600 to-green-600 rounded-full" />
              </div>
            </div>

            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              {portfolioData.personal.bio}
            </p>

            {/* Social Icons */}
            <div className="pt-4">
              <SocialIcons />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 md:pt-6">
              <a
                href={portfolioData.personal.resume}
                className="inline-flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-emerald-900/50 transition-all text-sm md:text-base hover-lift"
              >
                <span>Download Resume</span>
                <svg
                  className="w-4 h-4 md:w-5 md:h-5"
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
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-transparent border-2 border-emerald-600 text-emerald-500 rounded-xl font-semibold hover:bg-emerald-600 hover:text-white transition-all text-sm md:text-base"
              >
                <span>Get In Touch</span>
                <FaRocket className="w-3 h-3 md:w-4 md:h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Hero);
