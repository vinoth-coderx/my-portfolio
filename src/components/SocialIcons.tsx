import React from "react";
import { portfolioData } from "../data";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaGlobe,
  FaMediumM,
} from "react-icons/fa";

interface SocialIconsProps {
  isLowPerformance?: boolean;
}

const getSocialIcon = (platform: string) => {
  const iconClass = "w-4 h-4 md:w-5 md:h-5";
  switch (platform.toLowerCase()) {
    case "github":
      return <FaGithub className={iconClass} />;
    case "linkedin":
      return <FaLinkedin className={iconClass} />;
    case "medium":
      return <FaMediumM className={iconClass} />;
    case "twitter":
      return <FaTwitter className={iconClass} />;
    case "instagram":
      return <FaInstagram className={iconClass} />;
    case "portfolio":
      return <FaGlobe className={iconClass} />;
    default:
      return <FaGlobe className={iconClass} />;
  }
};

const SocialIcons: React.FC<SocialIconsProps> = () => {
  return (
    <div className="flex gap-3 md:gap-4">
      {Object.entries(portfolioData.personal.social).map(([platform, url]) => (
        <a
          key={platform}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gray-900 border border-emerald-900/30 flex items-center justify-center text-gray-400 hover:text-emerald-500 hover:border-emerald-600 transition-all shadow-lg"
          aria-label={platform}
        >
          {getSocialIcon(platform)}
        </a>
      ))}
    </div>
  );
};

export default React.memo(SocialIcons);
