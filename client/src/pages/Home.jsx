import React, { useState } from 'react'
import { AnimatePresence, motion } from "motion/react"
import LoginModal from '../components/LoginModal'
import { useDispatch, useSelector } from 'react-redux'
import { Coins } from 'lucide-react'
import { serverUrl } from '../App'
import { setUserData } from '../redux/userSlice'
import axios from 'axios'

function Home() {
  const highlights = [
    {
      title: "Vibe-Driven AI Generation",
      description: "Transform natural language prompts into stunning, tailored user experiences in seconds.",
      icon: (
        <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Ultra-Responsive Layouts",
      description: "Flawlessly adapts to desktop, tablet, and mobile screens with pixel-perfect modern styling.",
      icon: (
        <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Production-Ready Code",
      description: "Clean, performant React & Tailwind code, ready to deploy directly to production environments.",
      icon: (
        <svg className="w-6 h-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
  ]

  const [openLogin, setOpenLogin] = useState(false)
  const [openProfile, setOpenProfile] = useState(false)
  const { userData } = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true })
      dispatch(setUserData(null))
      setOpenProfile(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='relative min-h-screen bg-[#06070B] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white overflow-hidden'>
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-pink-500/10 blur-[130px] rounded-full pointer-events-none -z-0" />
      <div className="absolute top-[40%] -right-40 w-[500px] h-[500px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none -z-0" />

      {/* Floating Pill Glass Navbar */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className='fixed top-5 left-0 right-0 z-50 px-4 md:px-0 flex justify-center'
      >
        <div className='w-full max-w-5xl rounded-2xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/50 px-6 py-3 flex justify-between items-center transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]'>
          
          {/* Brand / Logo */}
          <div className='flex items-center gap-3 cursor-pointer group'>
            <div className='relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-[1.5px] shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform'>
              <div className='w-full h-full bg-[#06070B] rounded-[10px] flex items-center justify-center font-black text-transparent bg-clip-text bg-gradient-to-tr from-indigo-400 via-purple-300 to-pink-400 text-lg'>
                V
              </div>
            </div>
            <div className='flex flex-col'>
              <span className='text-lg font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors leading-none'>
                Vibe Site
              </span>
              <span className='text-[10px] text-slate-400 font-medium tracking-widest uppercase mt-0.5'>
                AI Web Engine
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <div className='hidden md:flex items-center gap-8 bg-white/[0.04] px-5 py-2 rounded-full border border-white/5'>
            <span className='text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer'>
              Features
            </span>
            <span className='text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer'>
              Pricing
            </span>
          </div>

          {/* User Controls & Actions */}
          <div className='flex items-center gap-4'>
            {userData && (
              <div className='hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium cursor-pointer hover:bg-white/10 transition shadow-inner'>
                <Coins size={14} className='text-amber-400' />
                <span className='text-slate-400'>Credits:</span>
                <span className='text-white font-semibold'>{userData.credits}</span>
                <span className='font-bold text-indigo-400 hover:text-indigo-300'>+</span>
              </div>
            )}

            {!userData ? (
              <button 
                onClick={() => setOpenLogin(true)} 
                className='relative inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-[1.03] active:scale-[0.97] transition-all'
              >
                <span>Get Started</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            ) : (
              <div className='relative'>
                <button 
                  className='flex items-center p-0.5 rounded-full border border-white/20 hover:border-indigo-400 transition-all'
                  onClick={() => setOpenProfile(!openProfile)}
                >
                  <img 
                    src={userData.avatar || `https://ui-avatars.com/api/?name=${userData.name}`} 
                    alt="avatar" 
                    className='w-9 h-9 rounded-full object-cover' 
                  />
                </button>

                <AnimatePresence>
                  {openProfile && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-64 z-50 rounded-2xl bg-[#0B0D13]/95 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden"
                    >
                      <div className='px-4 py-3.5 border-b border-white/10 bg-white/[0.02]'>
                        <p className='text-sm font-semibold text-white truncate'>{userData.name}</p>
                        <p className='text-xs text-slate-400 truncate mt-0.5'>{userData.email}</p>
                      </div>

                      <button className='md:hidden w-full px-4 py-3 flex items-center gap-2 text-xs border-b border-white/10 hover:bg-white/5 transition-colors'>
                        <Coins size={14} className='text-amber-400' />
                        <span className='text-slate-400'>Credits:</span>
                        <span className='text-white font-semibold'>{userData.credits}</span>
                        <span className='font-bold text-indigo-400 ml-auto'>+</span>
                      </button>

                      <button className='w-full px-4 py-3 text-left text-xs font-medium text-slate-300 hover:bg-white/5 transition-colors'>
                        Dashboard
                      </button>
                      <button 
                        onClick={handleLogOut} 
                        className='w-full px-4 py-3 text-left text-xs font-medium text-red-400 hover:bg-red-500/10 transition-colors'
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className='relative pt-52 pb-28 px-6 text-center max-w-5xl mx-auto z-10'>
        {/* Animated Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium tracking-wide uppercase mb-8 shadow-inner"
        >
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          Next-Gen AI Web Engine
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1]"
        >
          Match Your Vision <br />
          <span className='bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-sm'>
            With Perfect Vibe
          </span>
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className='mt-8 max-w-2xl mx-auto text-slate-400 text-lg md:text-xl font-normal leading-relaxed'
        >
          Turn your ideas into beautiful, interactive, production-ready web interfaces powered by modern AI. No design background required.
        </motion.p>

        {/* Hero CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button 
            onClick={() => setOpenLogin(true)}
            className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Create Your First Site
          </button>
        </motion.div>
      </section>

      {/* Highlights / Features Grid */}
      <section className='relative max-w-7xl mx-auto px-6 pb-32 z-10'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {highlights.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group relative rounded-2xl bg-white/[0.03] border border-white/10 p-8 hover:border-indigo-500/40 hover:bg-white/[0.05] transition-all duration-300 shadow-xl backdrop-blur-lg"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-indigo-500/30 transition-transform">
                {item.icon}
              </div>
              <h3 className='text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors'>
                {item.title}
              </h3>
              <p className='text-sm text-slate-400 leading-relaxed'>
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className='relative border-t border-white/10 py-12 text-center text-sm text-slate-500 z-10'>
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Vibe Site Inc. All rights reserved.</p>
          <div className="flex gap-6 text-slate-400 text-xs">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition-colors">Contact</span>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {openLogin && <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />}
    </div>
  )
}

export default Home