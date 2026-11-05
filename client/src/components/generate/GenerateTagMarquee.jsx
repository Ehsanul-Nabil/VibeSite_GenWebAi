import React from 'react'
import { Sparkles, ArrowRightIcon } from 'lucide-react'
import { homeTags } from '../../assets/assets'

const GenerateTagMarquee = ({ onSelectTag, generatingProject }) => {
  return (
    <div className="mt-8 w-full max-w-3xl">
      <div className="mb-4 flex items-center justify-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
        <Sparkles size={13} className="text-violet-400" />
        Need some inspiration?
      </div>

      {/* Modern Scrolling Marquee Tags */}
      <div className="masked-marquee mt-6 w-full max-w-3xl overflow-hidden py-3">
        <div className="animate-marquee flex w-max items-center gap-3">
          {[...homeTags, ...homeTags].map((tag, i) => (
            <button
              key={i}
              onClick={() => onSelectTag(tag)}
              disabled={generatingProject}
              className="
                group relative inline-flex shrink-0 items-center gap-2
                overflow-hidden rounded-full border border-blue-400/20
                bg-gradient-to-br from-[#101a38]/90 to-[#080d20]/90
                px-5 py-2.5 text-sm font-medium text-slate-300
                shadow-[0_4px_15px_rgba(0,0,0,0.15)]
                backdrop-blur-xl transition-all duration-300
                hover:-translate-y-0.5 hover:border-cyan-400/50
                hover:text-white hover:shadow-[0_0_20px_rgba(34,211,238,0.12)]
                disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer
              "
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-blue-500/0 to-violet-500/0 transition-all duration-300 group-hover:from-cyan-400/[0.06] group-hover:via-blue-500/[0.08] group-hover:to-violet-500/[0.12]" />

              <span className="relative">{tag}</span>

              <ArrowRightIcon
                size={14}
                className="relative text-slate-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan-400"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GenerateTagMarquee