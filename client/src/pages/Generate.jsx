import React from 'react'
import { ArrowLeft, Sparkles, Wand2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

function Generate() {
  const navigate = useNavigate()

  return (
    <div className='relative min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black overflow-hidden font-sans'>
      {/* Background Decorative Glows */}
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-violet-600/15 via-indigo-500/10 to-transparent blur-[120px] pointer-events-none' />
      <div className='absolute bottom-10 right-10 w-[400px] h-[400px] bg-purple-500/5 blur-[140px] pointer-events-none' />

      {/* Header Bar */}
      <header className='sticky top-0 z-40 backdrop-blur-2xl bg-black/40 border-b border-white/10'>
        <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <button 
              className='p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition flex items-center justify-center group' 
              onClick={() => navigate('/')}
              aria-label="Go back"
            >
              <ArrowLeft size={18} className='text-zinc-400 group-hover:text-white transition' />
            </button>
            <div className='flex items-center gap-2'>
              <h1 className='text-lg font-bold tracking-tight'>
                VibeSite<span className='text-zinc-500'>.GenAI</span>
              </h1>
            </div>
          </div>
          
          <div className='flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-400'>
            <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse' />
            AI Ready
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className='max-w-4xl mx-auto px-6 py-16 sm:py-20 relative z-10'>
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300 mb-6 backdrop-blur-md'>
            <Sparkles size={14} className='text-amber-400' />
            <span>Next-Generation Website Builder</span>
          </div>

          <h1 className='text-4xl sm:text-6xl font-extrabold mb-5 leading-[1.15] tracking-tight'>
            Build Websites with
            <span className='block bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent'>
              Real AI Power
            </span>
          </h1>

          <p className='text-zinc-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed'>
            This process may take several minutes.
            <span className='text-zinc-200 font-medium ml-1'>genweb.ai</span> focuses on quality, not shortcuts.
          </p>
        </motion.div>

        {/* Input Area */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className='mb-10'
        >
          <div className='flex items-center justify-between mb-3 px-1'>
            <label className='text-sm font-semibold text-zinc-200 flex items-center gap-2'>
              <Wand2 size={16} className='text-purple-400' />
              Describe your website
            </label>
            <span className='text-xs text-zinc-500'>Be as detailed as possible</span>
          </div>

          <div className='relative group'>
            {/* Glowing border hover effect */}
            <div className='absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-white/20 via-zinc-400/10 to-white/20 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition duration-500 blur-sm pointer-events-none' />
            
            <textarea
              placeholder='E.g. A sleek, modern portfolio for a digital agency featuring dark glassmorphism styling, a bold hero section, interactive pricing table, and testimonials...'
              className='relative w-full h-60 p-6 rounded-3xl bg-zinc-950/80 backdrop-blur-xl border border-white/10 outline-none resize-none text-sm leading-relaxed text-zinc-100 placeholder-zinc-600 transition duration-200 focus:border-white/30 focus:ring-2 focus:ring-white/10 shadow-2xl'
            />
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='flex justify-center'
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className='relative group overflow-hidden px-12 py-4 rounded-2xl font-bold text-base bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.25)] transition duration-300 flex items-center gap-2'
          >
            <Sparkles size={18} className='text-black' />
            <span>Generate Website</span>
          </motion.button>
        </motion.div>
      </main>
    </div>
  )
}

export default Generate