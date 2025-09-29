"use client";

import { motion } from "framer-motion";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="py-20 px-6 bg-black relative overflow-hidden"
    >
      {/* Electric Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"
          style={{ backgroundColor: "#00A9E0", opacity: 0.1 }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-0 right-0 w-80 h-80 rounded-full blur-2xl"
          style={{ backgroundColor: "#FF69B4", opacity: 0.08 }}
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.08, 0.12, 0.08],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-2xl"
          style={{ backgroundColor: "#00A9E0", opacity: 0.06 }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.06, 0.1, 0.06],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto text-center relative z-10">
        <motion.h2
          className="text-4xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(45deg, #00A9E0, #FF69B4, #00A9E0)",
            filter: "drop-shadow(0 0 30px rgba(0, 169, 224, 0.5))",
          }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Let&apos;s{" "}
          <span
            style={{
              color: "#FF69B4",
              textShadow: "0 0 20px rgba(255, 105, 180, 0.6)",
            }}
          >
            Connect
          </span>
        </motion.h2>

        <motion.p
          className="text-xl mb-12 max-w-2xl mx-auto"
          style={{
            color: "#FFFFFF",
            textShadow: "0 0 15px rgba(0, 169, 224, 0.4)",
            opacity: 0.9,
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Ready to collaborate on the next project? Let&apos;s discuss how we
          can work together to create something special.
        </motion.p>

        <motion.a
          href="mailto:front.cuong@gmail.com"
          className="px-8 py-4 font-bold rounded-full text-lg inline-block transition-all duration-300"
          style={{
            background: "linear-gradient(45deg, #00A9E0, #FF69B4)",
            color: "#FFFFFF",
            textShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
            boxShadow:
              "0 0 30px rgba(0, 169, 224, 0.3), 0 0 60px rgba(255, 105, 180, 0.2)",
          }}
          whileHover={{
            scale: 1.05,
            y: -2,
            boxShadow:
              "0 0 40px rgba(0, 169, 224, 0.5), 0 0 80px rgba(255, 105, 180, 0.3)",
            background: "linear-gradient(45deg, #FF69B4, #00A9E0)",
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Contact Now
        </motion.a>

        {/* Electric Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: i % 2 === 0 ? "#00A9E0" : "#FF69B4",
                boxShadow: `0 0 10px ${i % 2 === 0 ? "#00A9E0" : "#FF69B4"}`,
                left: `${20 + Math.random() * 60}%`,
                top: `${30 + Math.random() * 40}%`,
              }}
              animate={{
                x: [0, Math.random() * 200 - 100],
                y: [0, Math.random() * 200 - 100],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
