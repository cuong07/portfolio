"use client";

import { motion } from "framer-motion";
import { Home, User, Briefcase, Mail } from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { icon: Home, label: "Home", href: "#home" },
  { icon: User, label: "About", href: "#about" },
  { icon: Briefcase, label: "Projects", href: "#projects" },
  { icon: Mail, label: "Contact", href: "#contact" },
];

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollY < windowHeight * 0.5) {
        setActiveSection("home");
      } else if (scrollY < windowHeight * 1.5) {
        setActiveSection("about");
      } else if (scrollY < windowHeight * 2.5) {
        setActiveSection("projects");
      } else {
        setActiveSection("contact");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      className="fixed top-1/2 right-6 transform -translate-y-1/2 z-40"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
    >
      <div
        className="p-2 rounded-full backdrop-blur-md border"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          border: "1px solid rgba(0, 169, 224, 0.3)",
          boxShadow:
            "0 0 30px rgba(0, 169, 224, 0.2), 0 0 60px rgba(255, 105, 180, 0.1)",
        }}
      >
        <div className="flex flex-col gap-2">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeSection === item.href.substring(1);

            return (
              <motion.button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="relative p-3 rounded-full transition-all duration-300 group"
                style={{
                  backgroundColor: isActive
                    ? "rgba(0, 169, 224, 0.2)"
                    : "rgba(255, 255, 255, 0.05)",
                  border: `1px solid ${
                    isActive
                      ? "rgba(0, 169, 224, 0.5)"
                      : "rgba(255, 255, 255, 0.1)"
                  }`,
                  boxShadow: isActive
                    ? "0 0 20px rgba(0, 169, 224, 0.4)"
                    : "0 0 10px rgba(255, 255, 255, 0.1)",
                }}
                whileHover={{
                  backgroundColor: "rgba(255, 105, 180, 0.2)",
                  borderColor: "rgba(255, 105, 180, 0.5)",
                  boxShadow: "0 0 25px rgba(255, 105, 180, 0.4)",
                  scale: 1.1,
                }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Icon
                  className="w-4 h-4"
                  style={{
                    color: isActive ? "#00A9E0" : "#FFFFFF",
                    filter: isActive
                      ? "drop-shadow(0 0 10px rgba(0, 169, 224, 0.6))"
                      : "drop-shadow(0 0 5px rgba(255, 255, 255, 0.3))",
                  }}
                />

                {/* Electric Pulse Effect for Active Item */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      border: "2px solid rgba(0, 169, 224, 0.6)",
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.6, 0, 0.6],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}

                {/* Tooltip */}
                <motion.div
                  className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 px-2 py-1 rounded text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    color: "#FF69B4",
                    border: "1px solid rgba(255, 105, 180, 0.3)",
                    boxShadow: "0 0 15px rgba(255, 105, 180, 0.2)",
                    textShadow: "0 0 10px rgba(255, 105, 180, 0.5)",
                  }}
                >
                  {item.label}
                </motion.div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
