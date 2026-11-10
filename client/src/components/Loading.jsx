// import { Loader2Icon } from 'lucide-react';

// const Loading = () => {
//   return (
//     <div className='h-screen flex items-center justify-center bg-white'>
//       <Loader2Icon size={26} className="animate-spin text-zinc-950" />
//     </div>
//   );
// };

// export default Loading;



import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Loader2 } from 'lucide-react'

// Theme palette matching VibeSite.AI design system
const theme = {
  bg: 'bg-[#000516]',
  cardBg: 'bg-[#000829]',
  border: 'border-[#1E293B]',
  primaryGradient: 'bg-gradient-to-r from-[#00FFFF] via-[#2D79FF] to-[#6D28D9] bg-clip-text text-transparent',
}

const Loading = () => {
  return (
    <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center ${theme.bg} overflow-hidden select-none`}>
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#6D28D9]/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#00FFFF]/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Main Glass Card Loader */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className={`relative z-10 flex flex-col items-center p-8 md:p-10 rounded-3xl ${theme.cardBg}/80 border ${theme.border} backdrop-blur-xl shadow-[0_0_50px_0_rgba(0,5,22,0.8)]`}
      >
        {/* Animated Brand Icon Ring */}
        <div className="relative flex items-center justify-center mb-6">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#00FFFF] via-[#2D79FF] to-[#6D28D9] animate-spin blur-md opacity-50" />
          <div className="relative w-16 h-16 rounded-2xl bg-[#000516] border border-[#1E293B] flex items-center justify-center shadow-inner">
            <Sparkles size={28} className="text-[#00FFFF] animate-pulse" />
          </div>
        </div>

        {/* Brand Name with Gradient */}
        <h2 className="text-2xl font-bold tracking-tight text-white mb-2">
          VibeSite<span className={theme.primaryGradient}>Studio</span>
        </h2>

        {/* Status Indicator */}
        <div className="flex items-center gap-2.5 text-zinc-400 text-xs font-semibold tracking-wider uppercase">
          <Loader2 size={16} className="animate-spin text-[#00FFFF]" />
          <span>Initializing workspace...</span>
        </div>
      </motion.div>
    </div>
  )
}

export default Loading