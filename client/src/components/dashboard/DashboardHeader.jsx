import React from 'react'
import { ArrowLeft, Plus, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const DashboardHeader = () => {
  const navigate = useNavigate()

  return (
    <div className='sticky top-0 z-40 backdrop-blur-xl bg-[#070b12]/80 border-b border-slate-800/80'>
      <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <button 
            className='p-2 rounded-xl hover:bg-slate-800/80 transition text-slate-400 hover:text-white cursor-pointer active:scale-95' 
            onClick={() => navigate("/")}
            aria-label="Go to homepage"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-cyan-400" />
            <h1 className='text-base font-semibold tracking-wide text-slate-100'>Dashboard</h1>
          </div>
        </div>
        <button 
          className='flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:shadow-[0_0_20px_rgba(147,51,234,0.5)] active:scale-95 transition-all cursor-pointer' 
          onClick={() => navigate("/generate")}
        >
          <Plus size={16} /> New Website
        </button>
      </div>
    </div>
  )
}

export default DashboardHeader