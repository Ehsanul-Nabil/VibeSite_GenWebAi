// import React from 'react'
// import { Sparkles, ChevronDown, LogOut } from 'lucide-react'

// const GenerateNavbar = ({ user, onLogout }) => {
//   return (
//     <nav className="relative z-10 border-b border-white/[0.08] bg-[#030617]/70 backdrop-blur-xl">
//       <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
//         <div className="flex items-center gap-3">
//           <div className="flex size-10 items-center justify-center rounded-xl border border-violet-400/30 bg-gradient-to-br from-cyan-400/15 to-violet-600/25 shadow-lg shadow-violet-500/10">
//             <Sparkles size={21} className="text-cyan-300" />
//           </div>

//           <span className="text-xl font-bold tracking-tight">
//             VibeSite<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">.AI</span>
//           </span>
//         </div>

//         <div className="flex items-center gap-3 sm:gap-5">
//           <div className="hidden items-center gap-2 sm:flex">
//             <div className="flex size-9 items-center justify-center rounded-full border border-blue-400/40 bg-gradient-to-br from-blue-500 to-violet-600 text-xs font-bold shadow-lg shadow-blue-500/20">
//               {user?.name?.charAt(0)?.toUpperCase() || 'U'}
//             </div>

//             <span className="max-w-28 truncate text-sm text-slate-300">
//               {user?.name || 'User'}
//             </span>

//             <ChevronDown size={14} className="text-slate-500" />
//           </div>

//           <button
//             onClick={onLogout}
//             className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-slate-300 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white cursor-pointer"
//           >
//             <LogOut size={15} />
//             <span>Sign out</span>
//           </button>
//         </div>
//       </div>
//     </nav>
//   )
// }

// export default GenerateNavbar


import React from 'react'
import { ArrowLeft, Sparkles, Home } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const GenerateNavbar = () => {
  const navigate = useNavigate()

  return (
    <div className="sticky top-0 z-40 backdrop-blur-xl bg-[#070b12]/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Left Side: Back Navigation & Brand Title */}
        <div className="flex items-center gap-4">
          <button 
            className="p-2 rounded-xl hover:bg-slate-800/80 transition text-slate-400 hover:text-white cursor-pointer active:scale-95" 
            onClick={() => navigate("/dashboard")}
            aria-label="Back to dashboard"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-cyan-400 animate-pulse" />
            <h1 className="text-base font-semibold tracking-wide text-slate-100">
              Generate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500"> Idea</span>
            </h1>
          </div>
        </div>

        

        {/* Right Side: Home Navigation */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-800/80 bg-slate-900/40 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-700 hover:bg-slate-800/80 active:scale-95 transition-all cursor-pointer"
          >
            <Home size={15} />
            <span className="hidden sm:inline">Home</span>
          </button>
        </div>

      </div>
    </div>
  )
}

export default GenerateNavbar