import React, { useEffect } from 'react'
import { ArrowLeft, Trash2, Plus, Code } from 'lucide-react'
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

function Dashboard() {
  const { user, projects, loadingProjects, loadProjects, handleDelete } = useAppContext()
  const navigate = useNavigate()

  useEffect(() => {
    loadProjects()
  }, [loadProjects])

  return (
    <div className='min-h-screen bg-[#050505] text-white'>
      {/* Sticky Header */}
      <div className='sticky top-0 z-40 backdrop-blur-xl bg-black/50 border-b border-white/10'>
        <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <button 
              className='p-2 rounded-lg hover:bg-white/10 transition text-zinc-400 hover:text-white' 
              onClick={() => navigate("/")}
            >
              <ArrowLeft size={18} />
            </button>
            <h1 className='text-lg font-semibold'>Dashboard</h1>
          </div>
          <button 
            className='flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-semibold hover:opacity-90 hover:scale-105 active:scale-95 transition shadow-lg' 
            onClick={() => navigate("/generate")}
          >
            <Plus size={16} /> New Website
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className='max-w-7xl mx-auto px-6 py-10'>
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <p className='text-sm text-zinc-400 mb-1'>Welcome Back</p>
          <h1 className='text-3xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent'>
            {user?.name || "Developer"}
          </h1>
        </motion.div>

        {/* Projects Section */}
        <div>
          <h2 className='text-xl font-semibold mb-6 text-zinc-200'>Your Projects</h2>

          {loadingProjects ? (
            <div className="flex items-center justify-center py-20 text-zinc-500 text-sm">
              Loading projects...
            </div>
          ) : projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
              <Code className="text-zinc-600 mb-3" size={32} />
              <p className="text-zinc-400 text-sm mb-4">No projects generated yet.</p>
              <button
                onClick={() => navigate("/")}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 transition"
              >
                Create Your First Website
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <motion.div
                  key={project._id}
                  whileHover={{ y: -4 }}
                  className="group relative p-5 rounded-2xl bg-[#0b0b0b] border border-white/10 shadow-xl flex flex-col justify-between hover:border-purple-500/40 transition-all cursor-pointer"
                  onClick={() => navigate(`/builder/${project._id}`)}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-white group-hover:text-purple-400 transition truncate pr-2">
                        {project.name || "Untitled Project"}
                      </h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(project._id)
                        }}
                        className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition"
                        title="Delete project"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <p className="text-xs text-zinc-400 line-clamp-2 mb-4 leading-relaxed">
                      {project.description || "No description provided."}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/5 text-[11px] text-zinc-500">
                    <span>v{project.version || 1}</span>
                    <span className="capitalize px-2 py-0.5 rounded-full bg-white/5 text-zinc-400">
                      {project.status || "ready"}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard