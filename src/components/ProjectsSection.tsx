"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { title } from "process";

const projects = [
  {
    title: "Chain4Good",
    description:
      "A decentralized fundraising platform leveraging blockchain and AI. Supports web3 wallet login, donations via ETH & stablecoins, with AI campaign analysis and fraud detection.",
    tech: [
      "ReactJS",
      "NodeJS",
      "NestJS",
      "PostgreSQL",
      "Ethers.js",
      "Socket.io",
      "AI (Gemini)",
      "NFT",
    ],
    image: "/image.png",
    period: "05/2025 - 07/2025",
    github: "https://github.com/cuong07/chain4good",
    demo: "https://chain4good.io.vn",
  },
  {
    title: "TroVN - Room Rental",
    description: "A web platform for searching, managing, and booking rental rooms in Vietnam, offering real-time chat, an intuitive UI, and an admin dashboard for efficient management.",
    tech: ['ReactJS', 'NodeJS', 'ExpressJS', 'Shadcn', 'Zalo Mini App', 'PostgreSQL', 'Mapbox', 'Redis', 'Azure Computer Vision', 'TailwindCSS', 'Ant Design', 'Socket.io', 'CI-CD', 'Docker'],
    image: "/trovn.png",
    period: "(04/2024 - 10/2024",
    github: "https://github.com/cuong07/tro-client",
    demo: "https://trovn.io.vn",
  },
  {
    title: "GoNetZero™ Platform",
    description:
      "Global decarbonisation platform built during FPT Software training. Implemented pixel-perfect UI components with 90% test coverage.",
    tech: ["Angular", "TailwindCSS", "RESTful APIs", "Karma", "TypeScript"],
    image: "/gnz.png",
    period: "12/2024 - 03/2025",
    github: "#",
    demo: "#",
  },

  {
    title: "Portfolio Website",
    description:
      "Modern portfolio website showcasing my work with beautiful animations and responsive design. Built with Next.js and Framer Motion.",
    tech: ["Next.js", "React", "Framer Motion", "TailwindCSS", "TypeScript"],
    image: "/portfolio.png",
    period: "09/2025",
    github: "https://github.com/cuong07/portfolio",
    demo: "https://manhcuong.tech",
  },

  {
    title: "OrbitX - Trading Demo",
    description: "This is a demo trading interface showcasing real-time market data, interactive charts, and a smooth trading experience for practice and exploration purposes only.",
    tech: ["ReactJS", "TypeScript", "TailwindCSS", "Framer Motion", "Lightweight charts"],
    image: "/orbitx.png",
    period: "08/2025",
    github: "https://github.com/cuong07/orbitx",
    demo: "https://orbitx.vercel.app",
  },
  {
    title: "TroVN - Zalo Mini App",
    description: "A Zalo Mini App for searching and booking rental rooms in Vietnam, integrated with the TroVN web platform. Features real-time chat, intuitive UI, and seamless booking experience.",
    tech: ['Zalo Mini App', 'JavaScript', 'CSS', 'HTML', 'RESTful APIs', 'Socket.io'],
    image: "/trov-zma.png",
    period: "09/2024 - 10/2024",
    github: "https://github.com/cuong07/trovn-zma"
  }
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 bg-black relative overflow-hidden">
      {/* Electric Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-2xl"
          style={{ backgroundColor: "#FF69B4", opacity: 0.08 }}
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-2xl"
          style={{ backgroundColor: "#00A9E0", opacity: 0.06 }}
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(45deg, #FF69B4, #00A9E0, #FF69B4)",
              filter: "drop-shadow(0 0 20px rgba(255, 105, 180, 0.5))",
            }}
          >
            Projects
          </h2>
          <p
            className="text-lg max-w-3xl mx-auto"
            style={{
              color: "#FFFFFF",
              textShadow: "0 0 15px rgba(255, 105, 180, 0.4)",
              opacity: 0.9,
            }}
          >
            Explore the projects I&apos;ve created with modern technology and
            creative design.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="group rounded-xl overflow-hidden border transition-all duration-500"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                border: "1px solid rgba(0, 169, 224, 0.2)",
                boxShadow: "0 0 20px rgba(0, 169, 224, 0.1)",
              }}
              whileHover={{
                y: -10,
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                borderColor: "rgba(255, 105, 180, 0.4)",
                boxShadow: "0 20px 40px rgba(255, 105, 180, 0.2)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(0, 169, 224, 0.3), rgba(255, 105, 180, 0.3))",
                  }}
                  whileHover={{
                    background:
                      "linear-gradient(135deg, rgba(255, 105, 180, 0.4), rgba(0, 169, 224, 0.4))",
                  }}
                />
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Electric Overlay */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(45deg, transparent, rgba(0, 169, 224, 0.1), transparent, rgba(255, 105, 180, 0.1), transparent)",
                    backgroundSize: "200% 200%",
                  }}
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3
                    className="text-xl font-bold"
                    style={{
                      color: "#00A9E0",
                      textShadow: "0 0 15px rgba(0, 169, 224, 0.5)",
                    }}
                  >
                    {project.title}
                  </h3>
                  <span
                    className="text-sm px-2 py-1 rounded"
                    style={{
                      backgroundColor: "rgba(255, 105, 180, 0.2)",
                      color: "#FF69B4",
                      border: "1px solid rgba(255, 105, 180, 0.3)",
                    }}
                  >
                    {project.period}
                  </span>
                </div>

                <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 text-xs rounded transition-all duration-300"
                      style={{
                        backgroundColor: "rgba(0, 169, 224, 0.1)",
                        color: "#00A9E0",
                        border: "1px solid rgba(0, 169, 224, 0.2)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Links */}
                <div className="flex gap-4">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                    style={{
                      backgroundColor: "rgba(0, 169, 224, 0.1)",
                      color: "#00A9E0",
                      border: "1px solid rgba(0, 169, 224, 0.3)",
                    }}
                    whileHover={{
                      backgroundColor: "rgba(0, 169, 224, 0.2)",
                      scale: 1.05,
                      boxShadow: "0 0 20px rgba(0, 169, 224, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    GitHub
                  </motion.a>
                  {project.demo && <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                    style={{
                      backgroundColor: "rgba(255, 105, 180, 0.1)",
                      color: "#FF69B4",
                      border: "1px solid rgba(255, 105, 180, 0.3)",
                    }}
                    whileHover={{
                      backgroundColor: "rgba(255, 105, 180, 0.2)",
                      scale: 1.05,
                      boxShadow: "0 0 20px rgba(255, 105, 180, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Demo
                  </motion.a>}

                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
