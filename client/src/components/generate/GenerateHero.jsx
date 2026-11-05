import React from 'react'
import { Sparkles } from 'lucide-react'

const GenerateHero = () => {
  return (
    <>
      {/* Promo badge */}
      <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-violet-400/20 bg-gradient-to-r from-violet-500/10 via-blue-500/10 to-cyan-500/10 px-4 py-2 shadow-lg shadow-violet-950/20 backdrop-blur-xl">
        <Sparkles size={15} className="text-violet-300" />

        <span className="rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-2.5 py-1 text-[10px] font-bold tracking-wider text-white">
          PROMO
        </span>

        <span className="text-xs font-medium text-slate-300 sm:text-sm">
          Create your first project for free
        </span>
      </div>

      {/* Heading */}
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Turn your ideas into
          <span className="mt-2 block bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text pb-2 text-transparent">
            beautiful websites.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
          Describe the vibe. Let AI build the website.
          Create, customize, and bring your ideas to life
          without writing a single line of code.
        </p>
      </div>
    </>
  )
}

export default GenerateHero