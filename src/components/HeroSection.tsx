"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black"
    >
      {/* Electric & Neon Background Effects */}
      <div className="absolute inset-0">
        {/* Primary Electric Blue Glow */}
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 rounded-full blur-xl"
          style={{ backgroundColor: "#00A9E0", opacity: 0.15 }}
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Hot Pink Glow */}
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-xl"
          style={{ backgroundColor: "#FF69B4", opacity: 0.12 }}
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Additional Electric Glow Effects */}
        <motion.div
          className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full blur-2xl"
          style={{ backgroundColor: "#00A9E0", opacity: 0.08 }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full blur-2xl"
          style={{ backgroundColor: "#FF69B4", opacity: 0.06 }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.06, 0.12, 0.06],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-6 z-10">
        {/* Main Content - Flex Layout */}
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 min-h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Electric Profile Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex-shrink-0"
          >
            {/* Electric Neon Ring */}
            <motion.div
              className="absolute inset-0 w-80 h-80 rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, #00A9E0, #FF69B4, #00A9E0, #FF69B4, #00A9E0)",
                padding: "4px",
                filter:
                  "drop-shadow(0 0 20px #00A9E0) drop-shadow(0 0 40px #FF69B4)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-full h-full rounded-full bg-black/80 backdrop-blur-sm"></div>
            </motion.div>

            {/* Electric Floating Elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-8 h-8 rounded-full opacity-90"
              style={{
                backgroundColor: "#FF69B4",
                boxShadow: "0 0 25px #FF69B4, 0 0 50px #FF69B4",
                border: "2px solid #FF69B4",
              }}
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            <motion.div
              className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full opacity-90"
              style={{
                backgroundColor: "#00A9E0",
                boxShadow: "0 0 20px #00A9E0, 0 0 40px #00A9E0",
                border: "2px solid #00A9E0",
              }}
              animate={{
                y: [0, 20, 0],
                scale: [1, 0.8, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            />

            {/* Electric Profile Image Container */}
            <motion.div
              className="relative w-80 h-80 rounded-full overflow-hidden"
              style={{
                border: "3px solid rgba(0, 169, 224, 0.6)",
                boxShadow: `
                  0 0 30px rgba(0, 169, 224, 0.4), 
                  0 0 60px rgba(255, 105, 180, 0.3),
                  inset 0 0 30px rgba(0, 169, 224, 0.1)
                `,
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: `
                  0 0 40px rgba(0, 169, 224, 0.6), 
                  0 0 80px rgba(255, 105, 180, 0.4),
                  inset 0 0 30px rgba(0, 169, 224, 0.2)
                `,
              }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="w-full h-full flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, #00A9E0 0%, #FF69B4 50%, #00A9E0 100%)",
                  backgroundImage: "url('/cuong.jpg')",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <motion.span
                  className="text-8xl font-bold text-white"
                  style={{
                    textShadow:
                      "0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(0, 169, 224, 0.6)",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                ></motion.span>
              </div>
            </motion.div>
          </motion.div>

          {/* Electric Text Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center lg:text-left max-w-xl"
          >
            {/* Electric Neon Name */}
            <motion.h1
              className="text-5xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(45deg, #00A9E0, #FF69B4, #00A9E0)",
                filter: "drop-shadow(0 0 20px rgba(0, 169, 224, 0.5))",
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Võ Mạnh Cường
            </motion.h1>

            <motion.p
              className="text-2xl lg:text-3xl mb-8 font-light"
              style={{
                color: "#FF69B4",
                textShadow:
                  "0 0 25px rgba(255, 105, 180, 0.6), 0 0 50px rgba(255, 105, 180, 0.3)",
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Full Stack Web Developer
            </motion.p>

            {/* Electric Description */}
            <motion.p
              className="text-lg mb-10 leading-relaxed"
              style={{
                color: "#FFFFFF",
                textShadow: "0 0 15px rgba(0, 169, 224, 0.4)",
                opacity: 0.9,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Frontend Developer with over 1 year of experience specializing in building user-friendly, responsive, and
              high-performance web applications using <strong className="font-black">ReactJS, NextJS, NestJs, TypeScript, and TailwindCSS</strong>.
            </motion.p>

            {/* Electric Social Links */}
            <motion.div
              className="flex justify-center lg:justify-start gap-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              {[
                { icon: Github, href: "https://github.com/cuong07" },
                {
                  icon: Linkedin,
                  href: "https://linkedin.com/in/cuong07",
                },
                { icon: Mail, href: "mailto:front.cuong@gmail.com" },
              ].map(({ icon: Icon, href }, index) => (
                <motion.a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: "rgba(0, 169, 224, 0.1)",
                    border: "2px solid rgba(0, 169, 224, 0.3)",
                    boxShadow: "0 0 15px rgba(0, 169, 224, 0.2)",
                  }}
                  whileHover={{
                    scale: 1.1,
                    y: -5,
                    backgroundColor: "rgba(255, 105, 180, 0.1)",
                    borderColor: "rgba(255, 105, 180, 0.5)",
                    boxShadow: "0 0 25px rgba(255, 105, 180, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                >
                  <Icon
                    className="w-6 h-6 text-white"
                    style={{
                      filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))",
                    }}
                  />
                </motion.a>
              ))}
            </motion.div>

            {/* Electric Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="cursor-pointer"
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <ArrowDown
                  className="w-8 h-8 mx-auto lg:mx-0"
                  style={{
                    color: "#00A9E0",
                    filter: "drop-shadow(0 0 15px rgba(0, 169, 224, 0.6))",
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
