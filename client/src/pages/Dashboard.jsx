import React, { useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import DashboardHeader from '../components/dashboard/DashboardHeader'
import WelcomeBanner from '../components/dashboard/WelcomeBanner'
import ProjectCard from '../components/dashboard/ProjectCard'
import EmptyProjects from '../components/dashboard/EmptyProjects'
import LoadingProjects from '../components/dashboard/LoadingProjects'

function Dashboard() {
  const { user, projects, loadingProjects, loadProjects, handleDelete } = useAppContext()

  useEffect(() => {
    loadProjects()
  }, [loadProjects])

  return (
    <div className='min-h-screen bg-[#070b12] text-slate-100 font-sans selection:bg-cyan-500/20 relative overflow-hidden'>
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-1/4 size-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-0 size-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <DashboardHeader />

      {/* Main Content Area */}
      <div className='max-w-7xl mx-auto px-6 py-10 relative z-10'>
        <WelcomeBanner userName={user?.name} />

        {/* Projects Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className='text-lg font-semibold text-slate-200 tracking-wide'>Your Projects</h2>
            {projects?.length > 0 && (
              <span className="text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full">
                {projects.length} {projects.length === 1 ? 'Project' : 'Projects'}
              </span>
            )}
          </div>

          {loadingProjects ? (
            <LoadingProjects />
          ) : projects.length === 0 ? (
            <EmptyProjects />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard