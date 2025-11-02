import React, { useEffect } from "react";
import { portfolioData } from "../data";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000); // Reduced from 2500ms for faster load
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  const initials = portfolioData.personal.name
    ?.split(" ")
    .map((name) => name[0])
    .join("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8 animate-scale-in">
          <div className="w-20 h-20 md:w-24 md:h-24 mx-auto bg-gradient-to-br from-emerald-600 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-3xl md:text-4xl font-bold text-white">
              {initials}
            </span>
          </div>
        </div>
        
        {/* Name */}
        <h1 className="text-2xl md:text-3xl font-semibold text-white mb-2 animate-fade-in delay-300">
          {portfolioData.personal.name}
        </h1>
        
        {/* Title */}
        <p className="text-emerald-500 text-lg animate-fade-in delay-500">
          {portfolioData.personal.title}
        </p>
        
        {/* Line */}
        <div className="w-32 h-0.5 bg-gradient-to-r from-emerald-600 to-green-600 mx-auto mt-6 animate-fade-in delay-700" />
      </div>
    </div>
  );
};

export default React.memo(SplashScreen);
