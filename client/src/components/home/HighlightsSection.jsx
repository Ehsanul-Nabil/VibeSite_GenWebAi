import React from 'react'
import { motion } from 'motion/react'
import { Code2, Smartphone, Zap } from 'lucide-react'

function HighlightsSection({ highlights }) {
  // Matching icons and unique descriptions for each feature highlight
  const featureDetails = [
    {
      icon: Code2,
      desc: 'Generates clean, modular React and Tailwind CSS components ready for immediate deployment.',
      accent: 'from-[#00FFFF] to-[#2D79FF]',
    },
    {
      icon: Smartphone,
      desc: 'Flawless adaptability across all viewport sizes, from mobile displays to ultra-wide monitors.',
      accent: 'from-[#2D79FF] to-[#6D28D9]',
    },
    {
      icon: Zap,
      desc: 'Optimized performance, clean asset loading, and production-grade code structure built to scale.',
      accent: 'from-[#6D28D9] to-[#00FFFF]',
    },
  ]

  return (
    <section className='max-w-7xl mx-auto px-6 pb-32 relative z-10'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        {highlights.map((h, i) => {
          const detail = featureDetails[i % featureDetails.length]
          const Icon = detail.icon

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -6 }}
              className="group relative rounded-2xl bg-[#000829] border border-[#1E293B] p-8 shadow-[0_0_20px_0_rgba(0,8,41,0.8)] hover:border-[#2D79FF]/50 transition-all duration-300"
            >
              {/* Subtle Ambient Hover Glow */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${detail.accent} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />

              {/* Icon Container */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${detail.accent} p-0.5 mb-6 shadow-md`}>
                <div className='w-full h-full bg-[#000829] rounded-[10px] flex items-center justify-center'>
                  <Icon size={22} className='text-[#00FFFF]' />
                </div>
              </div>

              {/* Card Title */}
              <h3 className='text-xl font-bold text-white mb-3 group-hover:text-[#00FFFF] transition-colors duration-200'>
                {h}
              </h3>

              {/* Card Description */}
              <p className='text-sm text-zinc-400 leading-relaxed'>
                {detail.desc}
              </p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

export default HighlightsSection