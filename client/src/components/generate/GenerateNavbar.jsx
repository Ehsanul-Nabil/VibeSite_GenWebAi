import React from 'react'
import { Sparkles, ChevronDown, LogOut } from 'lucide-react'

const GenerateNavbar = ({ user, onLogout }) => {
  return (
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
            onClick={onLogout}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-slate-300 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white cursor-pointer"
          >
            <LogOut size={15} />
            <span>Sign out</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default GenerateNavbar