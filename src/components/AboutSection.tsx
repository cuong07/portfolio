"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, GraduationCap, Briefcase } from "lucide-react";

const experiences = [
  {
    title: "Front-End Developer (On Job Training)",
    company: "FPT Software",
    period: "12/2024 - 03/2025",
    location: "Ho Chi Minh City",
    description:
      "Implemented UI components based on Figma designs, ensuring pixel-perfect and responsive layouts. Fixed front-end bugs and developed unit tests achieving 90% test coverage.",
    project: "GoNetZero™ – A global decarbonisation platform",
    technologies: ["Angular", "TailwindCSS", "RESTful APIs", "Karma"],
  },
  {
    title: "Freelance / Side Project (2024 - 2025)",
    company: "Self-Employed",
    period: "06/2024 - Present",
    location: "Remote",
    description:
      "Developed and maintained personal projects and freelance work, focusing on modern web technologies and best practices.",
    project: "Personal Portfolio Website",
    technologies: ["Next.js", "TypeScript", "Framer Motion", "TailwindCSS", "Express.js", "Gitlab CI/CD", "Docker", "Nginx", "NestJS"],
  }
];

const education = [
  {
    degree: "Bachelor's in Information Technology",
    school: "Hung Vuong University Of Ho Chi Minh City",
    period: "2021 - 2025",
    location: "Ho Chi Minh City",
    description:
      "GPA: 3.25/4 - Specialized in software engineering and web development technologies.",
  },
];

const certificates = [
  {
    title: "Cloud Computing Fundamentals",
    organization: "Robusta",
    date: "11/2024",
  },
  {
    title: "Linux LPIC-1 (101-500 & 102-500)",
    organization: "Robusta",
    date: "01/2025",
  },
  {
    title: "Global Data Hackathon DIVE 2025 in Busan",
    organization: "Busan Metropolitan City",
    date: "08/2025",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-black relative overflow-hidden">
      {/* Electric Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 right-10 w-96 h-96 rounded-full blur-2xl"
          style={{ backgroundColor: "#00A9E0", opacity: 0.08 }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.12, 0.08],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-80 h-80 rounded-full blur-2xl"
          style={{ backgroundColor: "#FF69B4", opacity: 0.06 }}
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.06, 0.1, 0.06],
          }}
          transition={{
            duration: 10,
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
            About Me
          </h2>
          <p
            className="text-lg max-w-3xl mx-auto"
            style={{
              color: "#FFFFFF",
              textShadow: "0 0 15px rgba(0, 169, 224, 0.4)",
              opacity: 0.9,
            }}
          >
            Frontend developer with a passion for crafting engaging and
            user-friendly web experiences. Skilled in React, Next.js, and modern
            web technologies.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Experience Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3
              className="text-2xl font-bold mb-6 flex items-center gap-3"
              style={{
                color: "#00A9E0",
                textShadow: "0 0 20px rgba(0, 169, 224, 0.5)",
              }}
            >
              <Briefcase className="w-6 h-6" />
              Experience
            </h3>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-lg border transition-all duration-300"
                  style={{
                    backgroundColor: "rgba(0, 169, 224, 0.05)",
                    border: "1px solid rgba(0, 169, 224, 0.2)",
                    boxShadow: "0 0 20px rgba(0, 169, 224, 0.1)",
                  }}
                  whileHover={{
                    backgroundColor: "rgba(255, 105, 180, 0.05)",
                    borderColor: "rgba(255, 105, 180, 0.3)",
                    boxShadow: "0 0 30px rgba(255, 105, 180, 0.2)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h4
                    className="font-semibold text-lg mb-2"
                    style={{ color: "#FF69B4" }}
                  >
                    {exp.title}
                  </h4>
                  <div className="flex items-center gap-4 mb-3 text-sm">
                    <span className="font-medium" style={{ color: "#00A9E0" }}>
                      {exp.company}
                    </span>
                    <span className="flex items-center gap-1 text-gray-300">
                      <Calendar className="w-4 h-4" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1 text-gray-300">
                      <MapPin className="w-4 h-4" />
                      {exp.location}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-3">{exp.description}</p>
                  <p
                    className="text-sm font-medium mb-3"
                    style={{ color: "#FF69B4" }}
                  >
                    Project: {exp.project}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 text-xs rounded-full"
                        style={{
                          backgroundColor: "rgba(0, 169, 224, 0.2)",
                          color: "#00A9E0",
                          border: "1px solid rgba(0, 169, 224, 0.3)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education & Certificates */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Education */}
            <div>
              <h3
                className="text-2xl font-bold mb-6 flex items-center gap-3"
                style={{
                  color: "#FF69B4",
                  textShadow: "0 0 20px rgba(255, 105, 180, 0.5)",
                }}
              >
                <GraduationCap className="w-6 h-6" />
                Education
              </h3>
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-lg border"
                  style={{
                    backgroundColor: "rgba(255, 105, 180, 0.05)",
                    border: "1px solid rgba(255, 105, 180, 0.2)",
                    boxShadow: "0 0 20px rgba(255, 105, 180, 0.1)",
                  }}
                  whileHover={{
                    backgroundColor: "rgba(0, 169, 224, 0.05)",
                    borderColor: "rgba(0, 169, 224, 0.3)",
                    boxShadow: "0 0 30px rgba(0, 169, 224, 0.2)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <h4
                    className="font-semibold text-lg mb-2"
                    style={{ color: "#00A9E0" }}
                  >
                    {edu.degree}
                  </h4>
                  <div className="flex items-center gap-4 mb-3 text-sm">
                    <span className="font-medium" style={{ color: "#FF69B4" }}>
                      {edu.school}
                    </span>
                    <span className="flex items-center gap-1 text-gray-300">
                      <Calendar className="w-4 h-4" />
                      {edu.period}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-300 mb-3">
                    <MapPin className="w-4 h-4" />
                    {edu.location}
                  </div>
                  <p className="text-gray-300">{edu.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Certificates */}
            <div>
              <h3
                className="text-2xl font-bold mb-6"
                style={{
                  color: "#00A9E0",
                  textShadow: "0 0 20px rgba(0, 169, 224, 0.5)",
                }}
              >
                Certificates
              </h3>
              <div className="space-y-4">
                {certificates.map((cert, index) => (
                  <motion.div
                    key={index}
                    className="p-4 rounded-lg border transition-all duration-300"
                    style={{
                      backgroundColor: "rgba(0, 169, 224, 0.05)",
                      border: "1px solid rgba(0, 169, 224, 0.2)",
                      boxShadow: "0 0 15px rgba(0, 169, 224, 0.1)",
                    }}
                    whileHover={{
                      backgroundColor: "rgba(255, 105, 180, 0.05)",
                      borderColor: "rgba(255, 105, 180, 0.3)",
                      boxShadow: "0 0 25px rgba(255, 105, 180, 0.2)",
                    }}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4
                          className="font-medium mb-1"
                          style={{ color: "#FF69B4" }}
                        >
                          {cert.title}
                        </h4>
                        <p className="text-sm" style={{ color: "#00A9E0" }}>
                          {cert.organization}
                        </p>
                      </div>
                      <span className="text-sm text-gray-400">{cert.date}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
