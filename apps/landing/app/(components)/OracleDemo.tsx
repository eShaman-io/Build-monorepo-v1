"use client"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

const demoMessages = [
  { role: "user", content: "I'm feeling uncertain about my career path. What guidance can you offer?" },
  { role: "assistant", content: "✨ The Star card appears in your reading today. This is a time of hope and renewal. Trust that you are being guided toward your true purpose." },
  { role: "user", content: "How can I find more clarity?" },
  { role: "assistant", content: "🌙 The moon suggests looking within. Consider what brings you joy and energy. Your intuition knows the way forward." }
]

export default function OracleDemo() {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(true)
      setTimeout(() => {
        setCurrentMessage((prev) => (prev + 1) % demoMessages.length)
        setIsTyping(false)
      }, 1000)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-24 px-6 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo/5 to-transparent" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-gradient mb-6">
            Oracle Chat Demo
          </h2>
          <p className="text-moonstone/75 text-lg max-w-2xl mx-auto">
            Experience personalized guidance through AI-powered Oracle conversations
          </p>
        </motion.div>

        <div className="glass-card max-w-2xl mx-auto">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emeraldGlint animate-pulse" />
              <span className="text-moonstone/70 text-sm">Oracle is online</span>
            </div>
          </div>

          <div className="p-6 space-y-4 min-h-[300px]">
            {demoMessages.slice(0, currentMessage + 1).map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.3 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-auroraTeal/20 border border-auroraTeal/30 text-moonstone'
                      : 'bg-white/5 border border-white/10 text-moonstone'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                  <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-crystalBlue/60 rounded-full"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <div className="p-6 border-t border-white/10">
            <div className="flex gap-3">
              <div className="flex-1 glass p-3 rounded-2xl">
                <input
                  type="text"
                  placeholder="Ask the Oracle..."
                  className="w-full bg-transparent text-moonstone placeholder-moonstone/50 outline-none"
                  disabled
                />
              </div>
              <button className="orb-button aurora-shimmer" disabled>
                Send
              </button>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-moonstone/60 text-sm mb-6">
            Join the waitlist to experience personalized Oracle guidance
          </p>
          <button className="orb-button aurora-shimmer">
            Get Early Access
          </button>
        </motion.div>
      </div>
    </section>
  )
}
