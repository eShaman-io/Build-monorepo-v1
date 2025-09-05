"use client"
import { motion } from "framer-motion"
import { useState } from "react"

const faqs = [
  {
    question: "What makes eShaman different from other spiritual apps?",
    answer: "eShaman combines AI-powered Oracle guidance with authentic spiritual practices, lunar cycle tracking, and personalized ritual recommendations. Our crystal-inspired design creates a truly immersive spiritual experience."
  },
  {
    question: "How does the Oracle Chat work?",
    answer: "Our Oracle uses advanced AI trained on spiritual wisdom traditions, tarot meanings, and astrological insights to provide personalized guidance. Each conversation is tailored to your unique spiritual journey."
  },
  {
    question: "Can I use eShaman without any spiritual background?",
    answer: "Absolutely! eShaman is designed for both beginners and experienced practitioners. We provide gentle introductions to spiritual concepts and practices, making ancient wisdom accessible to everyone."
  },
  {
    question: "What's included in the premium subscription?",
    answer: "Premium includes unlimited Oracle conversations, access to all rituals and meditations, personalized astrological insights, lunar cycle notifications, and exclusive content from spiritual teachers."
  },
  {
    question: "Is my personal information kept private?",
    answer: "Yes, we take privacy seriously. Your conversations and personal data are encrypted and never shared. You have full control over your data and can export or delete it at any time."
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-gradient mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-moonstone/75 text-lg">
            Everything you need to know about your spiritual journey with eShaman
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors duration-200"
              >
                <h3 className="text-lg font-medium text-moonstone pr-4">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-auroraTeal text-xl flex-shrink-0"
                >
                  ↓
                </motion.div>
              </button>
              
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6">
                  <p className="text-moonstone/70 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
