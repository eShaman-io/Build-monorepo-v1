"use client"
import { motion } from "framer-motion"

export default function FounderNote() {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-card p-12 text-center"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-auroraTeal/20 to-etherPurple/20 mx-auto mb-8 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-moonstone/10 flex items-center justify-center">
              <span className="text-2xl">✨</span>
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-serif text-gradient mb-6">
            A Message from the Founder
          </h2>
          
          <blockquote className="text-lg leading-relaxed text-moonstone/80 mb-8 italic">
            "In a world of constant noise, we've lost touch with our inner wisdom. eShaman bridges ancient spiritual practices with modern technology, creating a sacred space for reflection, guidance, and growth. Every feature is designed with intention, every interaction crafted to honor the profound journey of self-discovery."
          </blockquote>
          
          <div className="text-moonstone/60">
            <p className="font-medium">— Sarah Chen</p>
            <p className="text-sm">Founder & Spiritual Guide</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
