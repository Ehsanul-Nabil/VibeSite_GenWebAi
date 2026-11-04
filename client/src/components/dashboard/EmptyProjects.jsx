import React from 'react'
import { Code, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const EmptyProjects = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center py-20 border border-dashed border-slate-800 rounded-2xl bg-[#0c121e]/50 backdrop-blur-sm">
      <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 mb-3">
        <Code size={28} />
      </div>
      <p className="text-slate-300 text-sm font-medium mb-1">No projects generated yet</p>
      <p className="text-slate-500 text-xs mb-5">Start building your first web application with VibeSite.AI</p>
      <button
        onClick={() => navigate("/")}
        className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-700 transition cursor-pointer active:scale-95 flex items-center gap-2"
      >
        <Plus size={14} /> Create Your First Website
      </button>
    </div>
  )
}

export default EmptyProjects