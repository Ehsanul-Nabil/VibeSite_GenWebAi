// import React from 'react'
// import { ArrowLeft } from 'lucide-react'
// import { motion } from 'motion/react'
// import { useNavigate } from 'react-router-dom'
// import { useState } from 'react'
// import { serverUrl } from '../App'
// import axios from 'axios'

// function Generate() {
//   const navigate = useNavigate()
//   const [prompt,setPrompt]=useState("")
//   const handleGenerateWebsite=async ()=>{
//         try {
//             const result=await axios.post(`${serverUrl}/api/website/generate`,{prompt},
//             {withCredentials:true})
//             console.log(result)
//         } catch (error) {
//             console.log(error)
//         }
//     }

//   return (
//     <div className='min-h-screen bg-linear-to-br from-[#050505] via-[#0b0b0b] to-[#050505] text-white'>
//       <div className='sticky top-0 z-40 backdrop-blur-xl bg-black/50 border-b border-white/10'>
//         <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
//           <div className='flex items-center gap-4'>
//             <button className='p-2 rounded-lg hover:bg-white/10 transition' onClick={() => navigate("/")}><ArrowLeft size={16} /></button>
//             <h1 className='text-lg font-semibold'>Genweb<span className='text-zinc-400'>.ai</span></h1>
//           </div>
//         </div>
//       </div>

//       <div className='max-w-6xl mx-auto px-6 py-16'>
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-16"
//         >
//           <h1 className='text-4xl md:text-5xl font-bold mb-5 leading-tight'>
//             Build Websites with
//             <span className='block bg-linear-to-r from-white to-zinc-400 bg-clip-text text-transparent'>Real AI Power</span>
//           </h1>
//           <p className='text-zinc-400 max-w-2xl mx-auto'>
//             This process may take several minutes.
//             genweb.ai focuses on quality, not shortcuts.
//           </p>
//         </motion.div>

//         <div className='mb-14'>
//           <h1 className='text-xl font-semibold mb-2'>Describe your website</h1>
//           <div className='relative'>
//             <textarea
//               onChange={(e)=>setPrompt(e.target.value)}
//               value={prompt}
//               placeholder='Describe your website in detail...'
//               className='w-full h-56 p-6 rounded-3xl bg-black/60 border border-white/10 outline-none resize-none text-sm leading-relaxed focus:ring-2 focus:ring-white/20'
//             ></textarea>
//           </div>
//         </div>

//         <div className='flex justify-center'>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.96 }}
//             onClick={handleGenerateWebsite}
//             className='px-14 py-4 rounded-2xl font-semibold text-lg bg-white text-black'
//           >
//             Generate Website
//           </motion.button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Generate


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