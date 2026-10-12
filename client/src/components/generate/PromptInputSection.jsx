import React from 'react'
import { motion } from 'motion/react'
import { Wand2, Loader2, Code2, Terminal, Sparkles } from 'lucide-react'

function PromptInputSection({ prompt, setPrompt, handleGenerateWebsite, loading }) {
//   const examplePrompts = [
//     "SaaS landing page for an AI video editor with dark glassmorphism style and pricing tier cards.",
//     "Modern portfolio for a Senior Full-Stack Engineer with interactive project timeline and tech stack grid.",
//     "E-commerce storefront for minimalist mechanical keyboards with glowing ambient neon cards.",
//   ]

const examplePrompts = [
    "Create a Working Calculator"
]

  return (
    <div className='max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
      
      {/* Left Column: Interactive Input & Presets */}
      <div className='lg:col-span-7 space-y-6'>
        
        {/* Input Box Container */}
        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <label className='block text-sm font-bold text-white flex items-center gap-2'>
              <Sparkles size={16} className='text-[#00FFFF]' />
              <span>Prompt Definition</span>
            </label>
            <span className='text-xs text-zinc-500 font-mono'>
              {prompt.length} / 2000 chars
            </span>
          </div>

          <div className='relative rounded-2xl p-[1px] bg-gradient-to-br from-[#2D79FF]/40 via-[#6D28D9]/20 to-transparent focus-within:from-[#00FFFF] focus-within:to-[#6D28D9] transition-all duration-300 shadow-[0_0_30px_0_rgba(0,8,41,0.9)]'>
            <textarea
              onChange={(e) => setPrompt(e.target.value)}
              value={prompt}
              disabled={loading}
              placeholder='Describe the website you want to generate (e.g. "Create a high-converting dark-themed landing page with a hero section, features grid, pricing table, and testimonials")...'
              className='w-full h-60 p-5 rounded-[15px] bg-[#000829]/95 border border-[#1E293B] outline-none resize-none text-sm text-zinc-200 placeholder-zinc-500 leading-relaxed focus:bg-[#000829] transition-all'
            ></textarea>
          </div>
        </div>

        {/* Preset Prompt Suggestions */}
        <div className='space-y-2'>
          <p className='text-xs font-semibold text-zinc-400 uppercase tracking-wider'>
            Need inspiration? Try these:
          </p>
          <div className='flex flex-col gap-2'>
            {examplePrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setPrompt(p)}
                disabled={loading}
                className='text-left text-xs text-zinc-400 hover:text-[#00FFFF] p-2.5 rounded-xl bg-[#000829] border border-[#1E293B] hover:border-[#2D79FF]/40 transition-all duration-200 truncate'
              >
                ✨ "{p}"
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <motion.button
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          onClick={handleGenerateWebsite}
          disabled={loading || !prompt.trim()}
          className={`w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-3 transition-all duration-300 ${
            loading || !prompt.trim()
              ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700'
              : 'bg-gradient-to-r from-[#2D79FF] to-[#6D28D9] text-white shadow-lg shadow-[#6D28D9]/30 hover:shadow-[#6D28D9]/50'
          }`}
        >
          {loading ? (
            <>
              <Loader2 size={18} className='animate-spin text-[#00FFFF]' />
              <span>Generating React Architecture...</span>
            </>
          ) : (
            <>
              <Wand2 size={18} className='text-[#00FFFF]' />
              <span>Generate Website</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Right Column: Dynamic Terminal / Pipeline Visualizer */}
      <div className='lg:col-span-5 rounded-2xl bg-[#000829] border border-[#1E293B] p-5 shadow-2xl relative overflow-hidden font-mono text-xs text-zinc-400'>
        
        {/* Terminal Title Bar */}
        <div className='flex items-center justify-between border-b border-[#1E293B] pb-3 mb-4'>
          <div className='flex items-center gap-2'>
            <Terminal size={14} className='text-[#2D79FF]' />
            <span className='font-bold text-zinc-300'>AI Processing Pipeline</span>
          </div>
          <div className='flex items-center gap-1.5'>
            <span className='w-2.5 h-2.5 rounded-full bg-rose-500/80'></span>
            <span className='w-2.5 h-2.5 rounded-full bg-yellow-500/80'></span>
            <span className='w-2.5 h-2.5 rounded-full bg-emerald-500/80'></span>
          </div>
        </div>

        {/* Simulated Generation Log Steps */}
        <div className='space-y-3 leading-relaxed'>
          <div className='flex items-center gap-2 text-emerald-400'>
            <span>✓</span>
            <span>LLM Context Initialized</span>
          </div>
          <div className='flex items-center gap-2 text-emerald-400'>
            <span>✓</span>
            <span>Tailwind v4 Palette Configured</span>
          </div>
          
          {loading ? (
            <div className='space-y-2 pt-2 border-t border-[#1E293B]'>
              <p className='text-[#00FFFF] animate-pulse flex items-center gap-2'>
                <Code2 size={14} /> Synthesizing layout component tree...
              </p>
              <p className='text-zinc-500 pl-5'>&gt; Parsing responsive grids...</p>
              <p className='text-zinc-500 pl-5'>&gt; Injecting Motion animations...</p>
            </div>
          ) : (
            <div className='pt-2 border-t border-[#1E293B] text-zinc-500'>
              <p>&gt; Awaiting prompt submission...</p>
              <p>&gt; Ready to emit production React bundle.</p>
            </div>
          )}
        </div>

        {/* Ambient Glow */}
        <div className='absolute -bottom-10 -right-10 w-40 h-40 bg-[#6D28D9]/20 blur-[80px] rounded-full pointer-events-none' />
      </div>

    </div>
  )
}

export default PromptInputSection