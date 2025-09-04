"use client"
import { motion } from "framer-motion"

const feelings = [
  {
    title: "Calm",
    description: "Find peace in the present moment through guided breathwork and meditation",
    icon: "🌊",
    gradient: "from-crystalBlue/20 to-moonstone/20"
  },
  {
    title: "Clarity", 
    description: "Receive insights and guidance through Oracle conversations and tarot wisdom",
    icon: "✨",
    gradient: "from-auroraTeal/20 to-crystalBlue/20"
  },
  {
    title: "Synchronicity",
    description: "Align with lunar cycles and cosmic rhythms for deeper spiritual connection",
    icon: "🌙",
    gradient: "from-etherPurple/20 to-auroraTeal/20"
  }
]

export default function WhatYoullFeel() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-crystalBlue/10 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-etherPurple/10 blur-2xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-gradient mb-6">
            What You'll Feel
          </h2>
          <p className="text-moonstone/75 text-lg max-w-2xl mx-auto">
            Experience transformation through ancient wisdom and modern technology
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {feelings.map((feeling, index) => (
            <motion.div
              key={feeling.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="glass-card h-full p-8 text-center relative overflow-hidden">
                {/* Hover gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feeling.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {feeling.icon}
                  </div>
                  
                  <h3 className="text-2xl font-serif text-moonstone mb-4 group-hover:text-white transition-colors duration-300">
                    {feeling.title}
                  </h3>
                  
                  <p className="text-moonstone/70 leading-relaxed group-hover:text-moonstone/90 transition-colors duration-300">
                    {feeling.description}
                  </p>
                </div>

                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-crystalBlue/40 rounded-full"
                      style={{
                        left: `${20 + i * 30}%`,
                        top: `${30 + i * 20}%`,
                      }}
                      animate={{
                        y: [-10, -20, -10],
                        opacity: [0.4, 0.8, 0.4],
                      }}
                      transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.5,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
