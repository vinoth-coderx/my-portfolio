import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "../data";
import emailjs from "emailjs-com";
import Background from "./Background";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

interface ContactProps {
  isLowPerformance?: boolean;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC<ContactProps> = ({ isLowPerformance = false }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };

    if (name === "name") {
      if (!value.trim()) {
        newErrors.name = "Name is required";
      } else if (value.trim().length < 2) {
        newErrors.name = "Name must be at least 2 characters";
      } else {
        delete newErrors.name;
      }
    }

    if (name === "email") {
      if (!value.trim()) {
        newErrors.email = "Email is required";
      } else if (!emailRegex.test(value.toLowerCase())) {
        newErrors.email = "Please enter a valid email";
      } else {
        delete newErrors.email;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (touched[name as keyof typeof touched]) {
      validateField(name, value);
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    validateField(name, value);
  };

  const validateForm = () => {
    const newErrors: { name?: string; email?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email.toLowerCase())) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTouched({ name: true, email: true, message: true });

    if (!validateForm() || loading || submitted) return;

    setLoading(true);

    try {
      const result = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name.trim(),
          from_email: formData.email.trim().toLowerCase(),
          message: formData.message.trim() || "No message provided",
        },
        PUBLIC_KEY
      );

      if (result.status === 200) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setErrors({});
        setTouched({ name: false, email: false, message: false });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (err) {
      console.error("EmailJS Error:", err);
      alert("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 relative overflow-hidden bg-black">
      <Background isLowPerformance={isLowPerformance} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 md:mb-4">
            Get In <span className="text-emerald-500">Touch</span>
          </h2>
          <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-emerald-600 to-green-600 mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* Info Section */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">
              Let's create something amazing together
            </h3>
            <p className="text-gray-400 text-sm md:text-lg mb-6 md:mb-10 leading-relaxed">
              I'm always interested in exploring new opportunities. Feel free to reach out!
            </p>

            <div className="space-y-4 md:space-y-6">
              {[
                { icon: "📧", label: "Email", value: portfolioData.personal.email },
                { icon: "📱", label: "Phone", value: portfolioData.personal.phone },
                { icon: "📍", label: "Location", value: portfolioData.personal.location },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 md:gap-6 p-4 md:p-5 rounded-xl bg-gray-900 border border-emerald-900/30"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-emerald-600 to-green-700 rounded-xl flex items-center justify-center text-xl md:text-2xl flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-emerald-500 text-xs md:text-sm font-medium mb-1">
                      {item.label}
                    </p>
                    <p className="text-white font-medium text-sm md:text-base truncate">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Section */}
          <div>
            <form
              onSubmit={handleSubmit}
              className="bg-gray-900 border border-emerald-900/30 rounded-xl md:rounded-2xl p-6 md:p-8 space-y-4 md:space-y-6"
              noValidate
            >
              {/* Name */}
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 md:px-5 py-3 md:py-4 bg-gray-950 text-white rounded-lg md:rounded-xl border ${
                    errors.name && touched.name
                      ? "border-red-500"
                      : "border-gray-800 focus:border-emerald-600"
                  } focus:outline-none transition-all placeholder-gray-500 text-sm md:text-base`}
                />
                <AnimatePresence>
                  {errors.name && touched.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-500 text-xs md:text-sm mt-2"
                    >
                      ⚠️ {errors.name}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 md:px-5 py-3 md:py-4 bg-gray-950 text-white rounded-lg md:rounded-xl border ${
                    errors.email && touched.email
                      ? "border-red-500"
                      : "border-gray-800 focus:border-emerald-600"
                  } focus:outline-none transition-all placeholder-gray-500 text-sm md:text-base`}
                />
                <AnimatePresence>
                  {errors.email && touched.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-500 text-xs md:text-sm mt-2"
                    >
                      ⚠️ {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Message */}
              <div>
                <textarea
                  name="message"
                  placeholder="Your message (optional)..."
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 md:px-5 py-3 md:py-4 bg-gray-950 text-white rounded-lg md:rounded-xl border border-gray-800 focus:border-emerald-600 focus:outline-none resize-none transition-all placeholder-gray-500 text-sm md:text-base"
                />
              </div>

              {/* Success Message */}
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-emerald-900/20 border border-emerald-500/50 rounded-lg md:rounded-xl p-3 md:p-4 flex items-center gap-2 md:gap-3"
                  >
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-emerald-400 font-semibold text-sm md:text-base">
                        Message sent successfully!
                      </p>
                      <p className="text-emerald-500 text-xs md:text-sm">
                        I'll get back to you soon.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || submitted}
                className={`w-full px-6 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base ${
                  loading || submitted
                    ? "bg-gray-700 cursor-not-allowed"
                    : "bg-gradient-to-r from-emerald-600 to-green-600 hover:shadow-lg hover:shadow-emerald-900/50"
                } text-white`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : submitted ? (
                  <>✓ Message Sent!</>
                ) : (
                  <>
                    <span>Send Message</span>
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Contact);
