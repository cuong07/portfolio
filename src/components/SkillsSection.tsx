"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Palette,
  Database,
  Smartphone,
  Cpu,
  Layers,
  Globe,
  Zap,
} from "lucide-react";

const skillCategories = [
  {
    name: "Frontend Development",
    icon: Code2,
    skills: ["ReactJS", "NextJS", "Angular", "TailwindCSS"],
    color: "electric-blue",
  },
  {
    name: "Backend Development",
    icon: Database,
    skills: ["NodeJS", "NestJS", "Express", "RESTful APIs"],
    color: "hot-pink",
  },
  {
    name: "Programming Languages",
    icon: Cpu,
    skills: ["JavaScript", "TypeScript", "SQL", "HTML", "CSS"],
    color: "electric-blue",
  },
  {
    name: "Database & Cloud",
    icon: Layers,
    skills: ["PostgreSQL", "Cloud VPS"],
    color: "hot-pink",
  },
  {
    name: "UI/UX Design",
    icon: Palette,
    skills: ["Figma", "User Research"],
    color: "electric-blue",
  },
  // {
  //   name: "Mobile Development",
  //   icon: Smartphone,
  //   skills: ["React Native", "Flutter", "Mobile UI", "Cross-platform"],
  //   color: "hot-pink",
  // },
  {
    name: "DevOps & Tools",
    icon: Globe,
    skills: ["Git", "Docker", "Linux", "Github"],
    color: "electric-blue",
  },
  {
    name: "Blockchain & AI",
    icon: Zap,
    skills: ["Ethers.js", "Web3", "Smart Contracts", "AI Integration"],
    color: "hot-pink",
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 bg-black relative overflow-hidden">
      {/* Electric Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background:
              "radial-gradient(circle at 25% 25%, rgba(0, 169, 224, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255, 105, 180, 0.1) 0%, transparent 50%)",
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-96 h-96 rounded-full blur-2xl"
          style={{ backgroundColor: "#00A9E0", opacity: 0.08 }}
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-80 h-80 rounded-full blur-2xl"
          style={{ backgroundColor: "#FF69B4", opacity: 0.06 }}
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 16,
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
                "linear-gradient(45deg, #00A9E0, #FF69B4, #00A9E0)",
              filter: "drop-shadow(0 0 20px rgba(0, 169, 224, 0.5))",
            }}
          >
            Skills
          </h2>
          <p
            className="text-lg max-w-3xl mx-auto"
            style={{
              color: "#FFFFFF",
              textShadow: "0 0 15px rgba(0, 169, 224, 0.4)",
              opacity: 0.9,
            }}
          >
            Technologies and tools I use to create amazing digital experiences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            const isElectricBlue = category.color === "electric-blue";

            return (
              <motion.div
                key={index}
                className="group p-6 rounded-xl border transition-all duration-500"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  border: `1px solid rgba(${isElectricBlue ? "0, 169, 224" : "255, 105, 180"
                    }, 0.2)`,
                  boxShadow: `0 0 20px rgba(${isElectricBlue ? "0, 169, 224" : "255, 105, 180"
                    }, 0.1)`,
                }}
                whileHover={{
                  y: -10,
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  borderColor: `rgba(${isElectricBlue ? "0, 169, 224" : "255, 105, 180"
                    }, 0.4)`,
                  boxShadow: `0 20px 40px rgba(${isElectricBlue ? "0, 169, 224" : "255, 105, 180"
                    }, 0.2)`,
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Electric Icon */}
                <motion.div
                  className="mb-4"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-3"
                    style={{
                      backgroundColor: `rgba(${isElectricBlue ? "0, 169, 224" : "255, 105, 180"
                        }, 0.2)`,
                      border: `2px solid rgba(${isElectricBlue ? "0, 169, 224" : "255, 105, 180"
                        }, 0.3)`,
                      boxShadow: `0 0 20px rgba(${isElectricBlue ? "0, 169, 224" : "255, 105, 180"
                        }, 0.3)`,
                    }}
                  >
                    <Icon
                      className="w-6 h-6"
                      style={{
                        color: isElectricBlue ? "#00A9E0" : "#FF69B4",
                        filter: `drop-shadow(0 0 10px rgba(${isElectricBlue ? "0, 169, 224" : "255, 105, 180"
                          }, 0.6))`,
                      }}
                    />
                  </div>
                </motion.div>

                {/* Category Name */}
                <h3
                  className="text-lg font-bold mb-4"
                  style={{
                    color: isElectricBlue ? "#00A9E0" : "#FF69B4",
                    textShadow: `0 0 15px rgba(${isElectricBlue ? "0, 169, 224" : "255, 105, 180"
                      }, 0.5)`,
                  }}
                >
                  {category.name}
                </h3>

                {/* Skills List */}
                <div className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1 + skillIndex * 0.05,
                      }}
                      viewport={{ once: true }}
                    >
                      {/* Electric Dot */}
                      <motion.div
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: isElectricBlue
                            ? "#00A9E0"
                            : "#FF69B4",
                          boxShadow: `0 0 10px rgba(${isElectricBlue ? "0, 169, 224" : "255, 105, 180"
                            }, 0.6)`,
                        }}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: skillIndex * 0.2,
                        }}
                      />

                      {/* Skill Name */}
                      <span
                        className="text-sm"
                        style={{
                          color: "#FFFFFF",
                          textShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
                          opacity: 0.9,
                        }}
                      >
                        {skill}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Electric Border Effect on Hover */}
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `linear-gradient(45deg, transparent, rgba(${isElectricBlue ? "0, 169, 224" : "255, 105, 180"
                      }, 0.1), transparent)`,
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
              </motion.div>
            );
          })}
        </div>

        {/* Electric Stats Section */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {[
            {
              label: "Projects Completed",
              value: "10+",
              color: "electric-blue",
            },
            { label: "Technologies Mastered", value: "15+", color: "hot-pink" },
            {
              label: "Years of Experience",
              value: "2+",
              color: "electric-blue",
            },
            { label: "Certificates", value: "5+", color: "hot-pink" },
          ].map((stat, index) => {
            const isElectricBlue = stat.color === "electric-blue";

            return (
              <motion.div
                key={index}
                className="text-center p-4 rounded-lg border"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  border: `1px solid rgba(${isElectricBlue ? "0, 169, 224" : "255, 105, 180"
                    }, 0.3)`,
                  boxShadow: `0 0 15px rgba(${isElectricBlue ? "0, 169, 224" : "255, 105, 180"
                    }, 0.1)`,
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: `0 0 25px rgba(${isElectricBlue ? "0, 169, 224" : "255, 105, 180"
                    }, 0.3)`,
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div
                  className="text-3xl font-bold mb-1"
                  style={{
                    color: isElectricBlue ? "#00A9E0" : "#FF69B4",
                    textShadow: `0 0 20px rgba(${isElectricBlue ? "0, 169, 224" : "255, 105, 180"
                      }, 0.6)`,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-sm"
                  style={{
                    color: "#FFFFFF",
                    opacity: 0.8,
                  }}
                >
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
