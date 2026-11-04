import React from 'react'

const LoadingProjects = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-slate-400 text-xs gap-3">
      <div className="size-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      <span>Loading projects...</span>
    </div>
  )
}

export default LoadingProjects