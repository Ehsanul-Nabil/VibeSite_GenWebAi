import React from 'react'
import { Code2 } from 'lucide-react'
import PromptInput from '../PromptInput'

const GeneratePromptBox = ({ onGenerate, generatingProject }) => {
  return (
    <div className="mt-10 w-full max-w-3xl">
      <div className="mb-3 flex items-center gap-2 px-1 text-xs font-medium text-slate-400">
        <Code2 size={15} className="text-cyan-400" />
        <span>YOUR NEXT BIG IDEA STARTS HERE</span>
      </div>

      <div className="rounded-[19px] bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 p-px shadow-[0_0_45px_rgba(59,130,246,0.12)] transition duration-300 hover:shadow-[0_0_55px_rgba(99,102,241,0.2)]">
        <div className="rounded-[18px] bg-[#070d24]/95">
          <PromptInput
            onSubmit={onGenerate}
            loading={generatingProject}
            placeholder="Describe your Idea..."
            variant="glass"
            large
            autoFocus
          />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 px-1 text-[11px] text-slate-500">
        <span>Be creative. AI handles the code.</span>
        <span className="hidden sm:inline">
          Press Enter to generate · Shift + Enter for a new line
        </span>
      </div>
    </div>
  )
}

export default GeneratePromptBox