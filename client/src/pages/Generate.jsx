import React, { useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import PromptInput from '../components/PromptInput'
import {
  ArrowRightIcon,
  ArrowDownRight,
  Sparkles,
  ChevronDown,
  LogOut,
  Code2,
} from 'lucide-react'
import { homeTags } from '../assets/assets'

const Generate = () => {
  const {
    user,
    generatingProject,
    loadProjects,
    handleGenerate,
    logout,
  } = useAppContext()

  useEffect(() => {
    loadProjects()
  }, [loadProjects])

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030617] font-sans text-white">

      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-40 h-96 w-96 rounded-full bg-blue-600/10 blur-[140px]" />
        <div className="absolute -right-32 top-72 h-96 w-96 rounded-full bg-violet-600/15 blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 h-72 w-96 rounded-full bg-cyan-500/5 blur-[130px]" />

        <div
          className="absolute inset-0 opacity-[0.13]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(100,130,255,0.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(100,130,255,0.12) 1px, transparent 1px)
            `,
            backgroundSize: '65px 65px',
            maskImage: 'linear-gradient(to bottom, black, transparent 85%)',
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-white/[0.08] bg-[#030617]/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">

          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl border border-violet-400/30 bg-gradient-to-br from-cyan-400/15 to-violet-600/25 shadow-lg shadow-violet-500/10">
              <Sparkles size={21} className="text-cyan-300" />
            </div>

            <span className="text-xl font-bold tracking-tight">
              VibeSite<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">.AI</span>
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <div className="hidden items-center gap-2 sm:flex">
              <div className="flex size-9 items-center justify-center rounded-full border border-blue-400/40 bg-gradient-to-br from-blue-500 to-violet-600 text-xs font-bold shadow-lg shadow-blue-500/20">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>

              <span className="max-w-28 truncate text-sm text-slate-300">
                {user?.name || 'User'}
              </span>

              <ChevronDown size={14} className="text-slate-500" />
            </div>

            <button
              onClick={logout}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-slate-300 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
            >
              <LogOut size={15} />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main hero */}
      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-73px)] w-full max-w-7xl flex-col items-center px-5 pb-20 pt-20 sm:px-8 sm:pt-24 lg:pt-28">

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

        {/* Prompt input */}
        <div className="mt-10 w-full max-w-3xl">
          <div className="mb-3 flex items-center gap-2 px-1 text-xs font-medium text-slate-400">
            <Code2 size={15} className="text-cyan-400" />
            <span>YOUR NEXT BIG IDEA STARTS HERE</span>
          </div>

          <div className="rounded-[19px] bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 p-px shadow-[0_0_45px_rgba(59,130,246,0.12)] transition duration-300 hover:shadow-[0_0_55px_rgba(99,102,241,0.2)]">
            <div className="rounded-[18px] bg-[#070d24]/95">
              <PromptInput
                onSubmit={handleGenerate}
                loading={generatingProject}
                placeholder="Describe your dream website..."
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

        {/* Suggested prompts */}
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
        onClick={() => handleGenerate(tag)}
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
          disabled:cursor-not-allowed disabled:opacity-40
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

        {/* Bottom branding */}
        <div className="mt-16 flex items-center gap-2 text-xs text-slate-600">
          <Sparkles size={13} className="text-violet-500" />
          <span>Made for creators with VibeSite</span>
        </div>

      </main>
    </div>
  )
}

export default Generate
