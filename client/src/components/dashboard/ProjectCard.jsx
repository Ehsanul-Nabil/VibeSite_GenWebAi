import React from 'react'
import { motion } from 'framer-motion'
import { Trash2, ExternalLink } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const ProjectCard = ({ project, onDelete }) => {
  const navigate = useNavigate()

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group relative p-5 rounded-2xl bg-[#0c121e]/90 border border-slate-800/90 shadow-xl flex flex-col justify-between hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] transition-all cursor-pointer backdrop-blur-md"
      onClick={() => navigate(`/builder/${project._id}`)}
    >
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="font-semibold text-slate-100 group-hover:text-cyan-300 transition truncate pr-2 text-sm">
            {project.name || "Untitled Project"}
          </h3>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete(project._id)
            }}
            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition cursor-pointer shrink-0"
            title="Delete project"
          >
            <Trash2 size={15} />
          </button>
        </div>

        <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed font-normal">
          {project.description || "No description provided."}
        </p>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-800/60 text-[11px] font-mono text-slate-400">
        <span className="text-slate-400">v{project.version || 1}</span>
        
        <div className="flex items-center gap-2">
          <span className={`capitalize px-2 py-0.5 rounded-full border text-[10px] font-medium ${
            project.status === 'completed' || project.status === 'ready'
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              : project.status === 'generating' || project.status === 'pending'
              ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
              : 'bg-slate-800 text-slate-400 border-slate-700'
          }`}>
            {project.status || "ready"}
          </span>
          <ExternalLink size={12} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard