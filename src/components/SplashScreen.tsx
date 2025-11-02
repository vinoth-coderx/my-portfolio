import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "../data";

interface SplashScreenProps {
  onComplete: () => void;
  isLowPerformance?: boolean;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ 
  onComplete, 
  isLowPerformance = false 
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, isLowPerformance ? 1500 : 2500);
    
    return () => clearTimeout(timer);
  }, [onComplete, isLowPerformance]);

  // Simpler animation for mobile
  if (isLowPerformance) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      >
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-emerald-600 to-green-700 rounded-xl flex items-center justify-center">
            <span className="text-3xl font-bold text-white">
              {portfolioData.personal.name
                ?.split(" ")
                .map((name) => name[0])
                .join("")}
            </span>
          </div>
          <h1 className="text-2xl font-semibold text-white mb-2">
            {portfolioData.personal.name}
          </h1>
          <p className="text-emerald-500 text-lg">
            {portfolioData.personal.title}
          </p>
        </div>
      </motion.div>
    );
  }

  // Full animation for desktop
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

export default React.memo(SplashScreen);
