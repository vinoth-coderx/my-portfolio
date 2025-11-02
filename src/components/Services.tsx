import React from "react";
import { motion } from "framer-motion";
import { portfolioData } from "../data";
import Background from "./Background";

interface ServicesProps {
  isLowPerformance?: boolean;
}

const Services: React.FC<ServicesProps> = ({ isLowPerformance = false }) => {
  const fadeIn = isLowPerformance
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.5 },
      };

  return (
    <section
      id="services"
      className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-black via-gray-950 to-black"
    >
      <Background isLowPerformance={isLowPerformance} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 md:mb-4">
            My <span className="text-emerald-500">Services</span>
          </h2>
          <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-emerald-600 to-green-600 mx-auto mb-3 md:mb-4 rounded-full" />
          <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto px-4">
            Comprehensive digital solutions tailored to your business needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {portfolioData.services.map((service, index) => (
            <motion.div
              key={index}
              {...fadeIn}
              className="bg-gray-900 border border-emerald-900/30 rounded-xl md:rounded-2xl p-6 md:p-8 hover:border-emerald-800/50 transition-all duration-300"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-emerald-600 to-green-700 rounded-xl md:rounded-2xl flex items-center justify-center text-white mb-4 md:mb-6">
                <span className="text-xl md:text-2xl">{service.icon}</span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">
                {service.title}
              </h3>

              <p className="text-gray-400 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                {service.description}
              </p>

              <div className="space-y-2 md:space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-2 md:gap-3">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-emerald-500 rounded-full flex-shrink-0" />
                    <span className="text-gray-400 text-xs md:text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Services);
