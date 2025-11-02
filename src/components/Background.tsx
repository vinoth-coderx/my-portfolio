import React from "react";

interface BackgroundProps {
  isLowPerformance?: boolean;
}

// Lightweight background without heavy animations
const Background: React.FC<BackgroundProps> = ({ isLowPerformance = false }) => {
  if (isLowPerformance) {
    // Static background for mobile - no animations
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98115_1px,transparent_1px),linear-gradient(to_bottom,#10b98115_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
      </div>
    );
  }

  // Lightweight CSS animations for desktop
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black" />
      
      {/* Lightweight gradient orbs with CSS animation */}
      <div 
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDuration: '8s' }}
      />
      <div 
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-green-900/10 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDuration: '10s', animationDelay: '2s' }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98120_1px,transparent_1px),linear-gradient(to_bottom,#10b98120_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
  );
};

export default React.memo(Background);
