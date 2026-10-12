import React from 'react'
import { motion } from 'motion/react'
import { Sparkles, Cpu } from 'lucide-react'

function GenerateHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-12 relative z-10"
    >
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6D28D9]/20 border border-[#6D28D9]/40 backdrop-blur-md text-xs font-semibold text-[#A78BFA] mb-6 shadow-[0_0_15px_2px_rgba(109,40,217,0.25)]">
        <Sparkles size={14} className="text-[#00FFFF]" />
        <span>Quantum AI Code Engine v2.4</span>
      </div>

      <h1 className='text-4xl md:text-6xl font-extrabold mb-4 leading-tight tracking-tight'>
        Architect Your Website <br />
        <span className='bg-gradient-to-r from-[#00FFFF] via-[#2D79FF] to-[#6D28D9] bg-clip-text text-transparent'>
          With Pure Intent
        </span>
      </h1>
      
      <p className='text-zinc-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed'>
        Describe your vision in plain English. Our engine transforms prompt structures into production-ready React components and responsive Tailwind layouts.
      </p>
    </motion.div>
  )
}

export default GenerateHero