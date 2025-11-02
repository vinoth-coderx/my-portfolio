import React from "react";

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-950 to-black" />
      
      {/* Subtle gradient orbs - CSS only */}
      <div 
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDuration: '8s' }}
      />
      <div 
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-green-900/10 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDuration: '10s', animationDelay: '2s' }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98115_1px,transparent_1px),linear-gradient(to_bottom,#10b98115_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
    </div>
  );
};

export default React.memo(Background);
