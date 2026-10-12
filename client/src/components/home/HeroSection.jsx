// import React from 'react'
// import { motion } from 'motion/react'

// function HeroSection({ userData, navigate }) {
//   return (
//     <section className='pt-44 pb-32 px-6 text-center'>
//       <motion.h1
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-5xl md:text-7xl font-bold tracking-tight"
//       >
//         Build Stunning Websites <br />
//         <span className='bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent'>with AI</span>
//       </motion.h1>

//       <motion.p
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className='mt-8 max-w-2xl mx-auto text-zinc-400 text-lg'
//       >
//         Describe your idea and let AI generate a modern, responsive, production-ready website.
//       </motion.p>

//       <button
//         className="px-10 py-4 mt-12 rounded-xl bg-white text-black font-semibold hover:scale-105 transition"
//         onClick={() => navigate("/dashboard")}
//       >
//         {userData ? "Go to dashboard" : "Get Started"}
//       </button>
//     </section>
//   )
// }

// export default HeroSection


import React from 'react'
import { motion } from 'motion/react'
import { Sparkles, Code, BrainCircuit } from 'lucide-react'

// Professional, sophisticated palette
const theme = {
  bg: 'bg-[#000516]', // Deep Cobalt / Void
  accent: 'text-[#6D28D9]', // Indigo / Violet
  primaryGradient: 'bg-gradient-to-r from-[#00FFFF] via-[#2D79FF] to-[#6D28D9] bg-clip-text text-transparent', // Cyan-Blue-Indigo
  badgeBg: 'bg-gradient-to-r from-[#6D28D9]/20 to-[#00FFFF]/10',
  badgeBorder: 'border-[#6D28D9]/40',
  glow: 'bg-[#0B0133]/60',
  btnPrimary: 'bg-gradient-to-r from-[#2D79FF] to-[#6D28D9] text-white',
  codePanel: {
    bg: 'bg-[#000829]',
    border: 'border-[#1E293B]',
    text: 'text-[#94A3B8]', // Zinc / slate
    highlight: 'text-[#00FFFF]', // Cyan
  }
}

function HeroSection({ userData, navigate }) {
  // Define professional quotes as discussed
  const professionalQuote = {
    visionToCode: "Bridging the gap between creative vision and executable code. Transform ideas into scalable, production-ready frontend architectures instantly.",
    speedToMarket: "Eliminate boilerplate. Accelerate product deployment cycles from weeks to minutes with intelligent AI layout generation.",
    creatorFocus: "The smartest layer between prompt and production. Turn raw concepts into fully structured, component-driven web interfaces effortlessly."
  };

  // Example structured code block for the visualization panel
  const codeSnippet = `
export default function Component(data) {
  /* Elevate creative vision with precision code */
  return (
    <Architecture className="w-full h-full">
      <Structure.Component data={data.elements}>
        {data.logic}
      </Structure.Component>
    </Architecture>
  );
}`;

  return (
    <section className={`pt-44 pb-32 px-6 text-center relative overflow-hidden ${theme.bg}`}>
      {/* Redesigned Background Glow & Quantum Matrix Elements */}
      <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] ${theme.glow} blur-[120px] rounded-full pointer-events-none`} />
      
      {/* Stylized background matrix lines */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2D79FF" stopOpacity="1" />
              <stop offset="100%" stopColor="#6D28D9" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[...Array(15)].map((_, i) => (
            <line key={i} x1={5 + i * 7 + '%'} y1="0" x2={95 - i * 3 + '%'} y2="100%" stroke="url(#gradient-line)" strokeWidth="0.5"/>
          ))}
        </svg>
      </div>

      {/* Redesigned Pill Badge */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative z-10 inline-flex items-center gap-2.5 px-5 py-2 rounded-full ${theme.badgeBg} border ${theme.badgeBorder} backdrop-blur-lg text-xs font-semibold text-[#A78BFA] mb-10 shadow-[0_0_10px_2px_rgba(109,40,217,0.2)]`}
      >
        <Sparkles size={15} className="text-[#A78BFA]" />
        <span>Next Generation Web Creation</span>
      </motion.div>

      {/* Redesigned Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-5xl md:text-7xl font-extrabold tracking-tight max-w-5xl mx-auto leading-[1.1]"
      >
        Turn Simple Prompts Into <br />
        <span className={`${theme.primaryGradient}`}>
          Production-Ready Code
        </span>
      </motion.h1>

      {/* NEW: Professional Subtitle / Quote Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative z-10 mt-10 mb-16 max-w-4xl mx-auto px-6 border-l-2 border-[#1E293B]/60"
      >
        <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed italic text-left">
          "{professionalQuote.visionToCode}"
        </p>
      </motion.div>

      {/* REDESIGNED: Action Section & Code Visualization */}
      <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left column: input visualization */}
        <div className="flex flex-col gap-6 items-start">
          <div className="w-full p-6 rounded-2xl bg-[#000829] border border-[#1E293B] flex items-center gap-4 text-left">
            <BrainCircuit size={28} className="text-[#2D79FF]" />
            <div>
              <p className="text-sm font-semibold text-white">Prompt your vision</p>
              <p className="text-xs text-zinc-500">"Build a clean, high-converting product landing page for a web SaaS with smooth scrolling."</p>
            </div>
          </div>
          
          {/* Main Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full flex justify-center md:justify-start"
          >
            <button
              className={`px-12 py-5 mt-6 rounded-2xl ${theme.btnPrimary} font-bold text-lg shadow-2xl shadow-[#6D28D9]/20 hover:shadow-[#6D28D9]/40 hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out`}
              onClick={() => navigate("/dashboard")}
            >
              {userData ? "Go to Dashboard" : "Start Building Free"}
            </button>
          </motion.div>
        </div>

        {/* Right column: code visualization panel */}
        <div className={`p-6 rounded-3xl ${theme.codePanel.bg} border ${theme.codePanel.border} text-left font-mono text-sm leading-relaxed ${theme.codePanel.text} shadow-[0_0_30px_10px_rgba(0,13,51,0.5)]`}>
          <div className="flex items-center gap-2 mb-4">
            <Code size={18} className="text-[#2D79FF]" />
            <span className="text-xs uppercase font-bold text-[#1E293B]">Component Output</span>
          </div>
          <p className={`${theme.codePanel.highlight} opacity-90`}>{`// QuantumMatrix.tsx`}</p>
          <pre className="text-xs md:text-sm whitespace-pre-wrap">
            <code>{codeSnippet}</code>
          </pre>
        </div>
      </div>

    </section>
  )
}

export default HeroSection