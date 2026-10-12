import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { serverUrl } from '../App'

import GenerateHeader from '../components/generate/GenerateHeader'
import GenerateHero from '../components/generate/GenerateHero'
import PromptInputSection from '../components/generate/PromptInputSection'

function Generate() {
  const navigate = useNavigate()
  const { userData } = useSelector((state) => state.user || {})
  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)

  const handleGenerateWebsite = async () => {
    if (!prompt.trim()) return

    try {
      setLoading(true)
      const result = await axios.post(
        `${serverUrl}/api/website/generate`,
        { prompt },
        { withCredentials: true }
      )
      console.log(result)
      // Navigate to your editor page when ready:
      // navigate(`/editor/${result.data._id}`)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-[#000516] text-white relative overflow-hidden'>
      {/* Background Matrix Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#6D28D9]/20 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-[#00FFFF]/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Header */}
      <GenerateHeader navigate={navigate} userData={userData} />

      {/* Main Content Area */}
      <main className='max-w-7xl mx-auto px-6 py-12 relative z-10'>
        <GenerateHero />

        <PromptInputSection
          prompt={prompt}
          setPrompt={setPrompt}
          handleGenerateWebsite={handleGenerateWebsite}
          loading={loading}
        />
      </main>
    </div>
  )
}

export default Generate