import React, { useEffect } from 'react'
import { Sparkles } from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import GenerateBackground from '../components/generate/GenerateBackground'
import GenerateNavbar from '../components/generate/GenerateNavbar'
import GenerateHero from '../components/generate/GenerateHero'
import GeneratePromptBox from '../components/generate/GeneratePromptBox'
import GenerateTagMarquee from '../components/generate/GenerateTagMarquee'

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
      {/* Background Lighting & Grid Effects */}
      <GenerateBackground />

      {/* Navigation Bar */}
      <GenerateNavbar user={user} onLogout={logout} />

      {/* Main Hero Container */}
      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-73px)] w-full max-w-7xl flex-col items-center px-5 pb-20 pt-20 sm:px-8 sm:pt-24 lg:pt-28">
        {/* Hero Title & Subtitle */}
        <GenerateHero />

        {/* Prompt Input Area */}
        <GeneratePromptBox
          onGenerate={handleGenerate}
          generatingProject={generatingProject}
        />

        {/* Marquee Inspiration Tags */}
        <GenerateTagMarquee
          onSelectTag={handleGenerate}
          generatingProject={generatingProject}
        />

        {/* Bottom Branding */}
        <div className="mt-16 flex items-center gap-2 text-xs text-slate-600">
          <Sparkles size={13} className="text-violet-500" />
          <span>Made for creators with VibeSite</span>
        </div>
      </main>
    </div>
  )
}

export default Generate