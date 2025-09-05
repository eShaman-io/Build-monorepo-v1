"use client"
import { motion } from "framer-motion"

export default function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-white/10 relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-serif text-gradient mb-4">eShaman</h3>
              <p className="text-moonstone/70 mb-6 max-w-md">
                Ancient wisdom meets modern technology. Find clarity, peace, and guidance through personalized spiritual practices.
              </p>
              <div className="flex gap-4">
                {['Twitter', 'Instagram', 'YouTube'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors duration-200"
                  >
                    <span className="text-moonstone/60 text-sm">{social[0]}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-moonstone font-medium mb-4">Product</h4>
            <ul className="space-y-2">
              {['Features', 'Pricing', 'Download', 'Support'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-moonstone/60 hover:text-moonstone transition-colors duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-moonstone font-medium mb-4">Company</h4>
            <ul className="space-y-2">
              {['About', 'Blog', 'Privacy', 'Terms'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-moonstone/60 hover:text-moonstone transition-colors duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center">
          <p className="text-moonstone/50 text-sm mb-4 md:mb-0">
            © 2024 eShaman. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-moonstone/50 hover:text-moonstone/70 transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-moonstone/50 hover:text-moonstone/70 transition-colors duration-200">
              Terms of Service
            </a>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-crystalBlue/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-48 h-48 rounded-full bg-etherPurple/5 blur-2xl" />
      </div>
    </footer>
  )
}
