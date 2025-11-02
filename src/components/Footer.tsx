import React from "react";
import { portfolioData } from "../data";

const Footer: React.FC = () => {
  return (
    <footer className="relative py-8 md:py-12 overflow-hidden bg-black border-t border-emerald-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          <p className="text-gray-400 text-sm md:text-base text-center md:text-left">
            © {new Date().getFullYear()}{" "}
            <span className="text-emerald-500 font-semibold">
              {portfolioData.personal.name}
            </span>
            . All rights reserved.
          </p>

          <div className="flex gap-4 md:gap-6 flex-wrap justify-center">
            {Object.entries(portfolioData.personal.social).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-emerald-500 transition-colors capitalize text-xs md:text-sm font-medium"
              >
                {platform}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
