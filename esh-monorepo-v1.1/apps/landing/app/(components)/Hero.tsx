"use client"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef, useEffect } from "react"

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [ -200, 200 ], [ 8, -8 ]), { stiffness: 120, damping: 20 })
  const ry = useSpring(useTransform(mx, [ -200, 200 ], [ -8, 8 ]), { stiffness: 120, damping: 20 })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      mx.set(e.clientX - (r.left + r.width/2))
      my.set(e.clientY - (r.top + r.height/2))
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [mx, my])

  return (
    <section ref={ref} className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      <motion.div style={{ rotateX: rx, rotateY: ry }} className="relative z-10 text-center space-y-4">
        <h1 className="text-5xl md:text-7xl font-serif text-white/95">eShaman</h1>
        <p className="text-white/75 max-w-xl mx-auto">Oracle • Rituals • Clarity</p>
        <div className="glass p-2 inline-flex gap-2">
          <input placeholder="Enter your email" className="bg-transparent px-4 py-3 outline-none text-moonstone placeholder-white/50"/>
          <button className="px-5 py-3 rounded-2xl bg-auroraTeal/80 text-black font-medium">Join</button>
        </div>
      </motion.div>

      {/* Crystal layers */}
      <motion.div className="absolute -top-24 -left-20 w-72 h-72 rounded-[2rem] bg-white/8 border border-white/10 blur-2xl" style={{ rotate: -12 }} />
      <motion.div className="absolute -top-40 right-10 w-48 h-48 rounded-[1.5rem] bg-white/6 border border-white/10 blur-xl" style={{ rotate: 8 }} />
      <motion.div className="absolute inset-0 opacity-50" style={{ background:
        "radial-gradient(800px 400px at 50% -10%, rgba(143,211,255,0.28), transparent 60%), " +
        "radial-gradient(600px 600px at 80% 10%, rgba(0,212,255,0.20), transparent 70%), " +
        "radial-gradient(900px 500px at 20% 0%, rgba(106,0,244,0.15), transparent 70%)"
      }}/>
    </section>
  )
}
