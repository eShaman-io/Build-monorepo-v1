"use client"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address")
})

type EmailForm = z.infer<typeof emailSchema>

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [ -200, 200 ], [ 8, -8 ]), { stiffness: 120, damping: 20 })
  const ry = useSpring(useTransform(mx, [ -200, 200 ], [ -8, 8 ]), { stiffness: 120, damping: 20 })

  const { register, handleSubmit, formState: { errors }, reset } = useForm<EmailForm>({
    resolver: zodResolver(emailSchema)
  })

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

  const onSubmit = async (data: EmailForm) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      // TODO: Replace with actual Firebase function URL
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, source: 'landing' })
      })
      
      if (response.ok) {
        setSubmitStatus('success')
        reset()
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Waitlist submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section ref={ref} className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      <motion.div style={{ rotateX: rx, rotateY: ry }} className="relative z-10 text-center space-y-6">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-serif text-gradient"
        >
          eShaman
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-moonstone/75 max-w-xl mx-auto text-lg"
        >
          Oracle • Rituals • Clarity
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {submitStatus === 'success' ? (
            <div className="glass-card max-w-md mx-auto">
              <div className="text-emeraldGlint text-center">
                <div className="text-2xl mb-2">✨</div>
                <p className="text-moonstone">Welcome to the journey. You'll hear from us soon.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="glass p-2 inline-flex gap-2 max-w-md">
              <div className="flex-1">
                <input 
                  {...register("email")}
                  placeholder="Enter your email" 
                  className="w-full bg-transparent px-4 py-3 outline-none text-moonstone placeholder-moonstone/50"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-roseQuartz text-sm mt-1 px-4">{errors.email.message}</p>
                )}
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="orb-button aurora-shimmer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Joining...' : 'Join'}
              </button>
            </form>
          )}
          
          {submitStatus === 'error' && (
            <p className="text-roseQuartz text-sm mt-2">Something went wrong. Please try again.</p>
          )}
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-moonstone/50 text-sm"
        >
          Join the waitlist for early access
        </motion.p>
      </motion.div>

      {/* Enhanced Crystal layers with animation */}
      <motion.div 
        className="absolute -top-24 -left-20 w-72 h-72 rounded-[2rem] bg-white/8 border border-white/10 blur-2xl crystal-glow" 
        style={{ rotate: -12 }}
        animate={{ 
          rotate: [-12, -8, -12],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      <motion.div 
        className="absolute -top-40 right-10 w-48 h-48 rounded-[1.5rem] bg-white/6 border border-white/10 blur-xl crystal-glow" 
        style={{ rotate: 8 }}
        animate={{ 
          rotate: [8, 12, 8],
          scale: [1, 1.08, 1]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      {/* Water gradient background */}
      <div className="absolute inset-0 opacity-50 water-gradient" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-crystalBlue/30 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [-20, -40, -20],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </section>
  )
}
