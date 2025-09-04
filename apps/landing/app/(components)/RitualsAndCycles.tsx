"use client"
import { motion } from "framer-motion"

const rituals = [
  { name: "Morning Clarity", duration: "5 min", icon: "🌅", phase: "New Moon" },
  { name: "Lunar Meditation", duration: "15 min", icon: "🌙", phase: "Full Moon" },
  { name: "Evening Reflection", duration: "10 min", icon: "✨", phase: "Waning Moon" },
  { name: "Energy Cleansing", duration: "8 min", icon: "🕯️", phase: "Waxing Moon" }
]

const lunarCalendar = [
  { phase: "New", emoji: "🌑", date: "Dec 15" },
  { phase: "Waxing", emoji: "🌒", date: "Dec 22" },
  { phase: "Full", emoji: "🌕", date: "Dec 30" },
  { phase: "Waning", emoji: "🌘", date: "Jan 6" }
]

export default function RitualsAndCycles() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-etherPurple/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-auroraTeal/10 blur-2xl" />
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
            Rituals & Cycles
          </h2>
          <p className="text-moonstone/75 text-lg max-w-2xl mx-auto">
            Align with lunar rhythms and cosmic cycles for deeper spiritual practice
          </p>
        </motion.div>

        {/* Lunar Calendar Strip */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-card p-6 mb-12"
        >
          <h3 className="text-xl font-serif text-moonstone mb-6 text-center">Upcoming Lunar Phases</h3>
          <div className="flex justify-between items-center">
            {lunarCalendar.map((lunar, index) => (
              <div key={lunar.phase} className="text-center">
                <div className="text-3xl mb-2">{lunar.emoji}</div>
                <div className="text-moonstone text-sm font-medium">{lunar.phase}</div>
                <div className="text-moonstone/60 text-xs">{lunar.date}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Ritual Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rituals.map((ritual, index) => (
            <motion.div
              key={ritual.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
            >
              <div className="glass-card p-6 text-center h-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-etherPurple/10 to-auroraTeal/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {ritual.icon}
                  </div>
                  
                  <h3 className="text-lg font-serif text-moonstone mb-2 group-hover:text-white transition-colors duration-300">
                    {ritual.name}
                  </h3>
                  
                  <div className="text-auroraTeal text-sm font-medium mb-2">
                    {ritual.duration}
                  </div>
                  
                  <div className="text-moonstone/60 text-xs">
                    Best during {ritual.phase}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="orb-button aurora-shimmer">
            Explore All Rituals
          </button>
        </motion.div>
      </div>
    </section>
  )
}
