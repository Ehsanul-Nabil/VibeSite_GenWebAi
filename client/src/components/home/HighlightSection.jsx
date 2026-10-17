import React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Coins, LayoutDashboard, LogOut, Sparkles, Tag } from 'lucide-react'

function Navbar({ 
  userData, 
  openProfile, 
  setOpenProfile, 
  setOpenLogin, 
  handleLogOut, 
  navigate 
}) {
  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#000516]/70 border-b border-[#1E293B]'
    >
      <div className='max-w-7xl mx-auto px-6 py-4 flex justify-between items-center'>
        
        {/* Brand Logo */}
        <div 
          onClick={() => navigate('/')} 
          className='flex items-center gap-2 cursor-pointer group'
        >
          <div className='p-1.5 rounded-lg bg-[#6D28D9]/20 border border-[#6D28D9]/40 group-hover:border-[#00FFFF]/50 transition-colors'>
            <Sparkles size={16} className='text-[#00FFFF]' />
          </div>
          <span className='text-lg font-extrabold tracking-tight bg-gradient-to-r from-[#00FFFF] via-[#2D79FF] to-[#6D28D9] bg-clip-text text-transparent'>
            VibeSite.AI
          </span>
        </div>

        {/* Action Items */}
        <div className='flex items-center gap-4 md:gap-5'>
          
          {/* Pricing Button with Price Tag Icon */}
          <div 
            // onClick={() => navigate('/pricing')} 
            className='flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#000829] border border-[#1E293B] hover:border-[#00FFFF]/50 text-sm cursor-pointer transition-all shadow-inner group'
          >
            <Tag size={14} className='text-[#00FFFF] group-hover:rotate-12 transition-transform duration-200' />
            <span className='text-zinc-300 text-xs font-semibold group-hover:text-white transition-colors'>
              Pricing
            </span>
          </div>

          {/* Credits Badge */}
          {userData && (
            <div className='hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#000829] border border-[#1E293B] hover:border-[#2D79FF]/50 text-sm cursor-pointer transition-all shadow-inner'>
              <Coins size={15} className='text-yellow-400 animate-pulse' />
              <span className='text-zinc-400 text-xs font-medium'>Credits</span>
              <span className='font-bold text-white'>{userData.credits}</span>
              <span className='font-semibold text-[#00FFFF] ml-0.5'>+</span>
            </div>
          )}

          {/* User Profile or Get Started CTA */}
          {!userData ? (
            <button
              className='px-5 py-2 rounded-xl bg-gradient-to-r from-[#2D79FF] to-[#6D28D9] text-white text-sm font-semibold shadow-lg shadow-[#6D28D9]/20 hover:shadow-[#6D28D9]/40 hover:scale-105 active:scale-95 transition-all duration-200'
              onClick={() => setOpenLogin(true)}
            >
              Get Started
            </button>
          ) : (
            <div className='relative'>
              <button 
                className='flex items-center p-0.5 rounded-full border border-[#1E293B] hover:border-[#00FFFF] transition-colors' 
                onClick={() => setOpenProfile(!openProfile)}
              >
                <img
                  src={userData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=2D79FF&color=fff`}
                  alt=""
                  className='w-9 h-9 rounded-full object-cover'
                />
              </button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {openProfile && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -100, scale: 0.95, transition: { duration: 0.5 }}}
                    className="absolute right-0 mt-3 w-64 z-50 rounded-2xl bg-[#000829] border border-[#1E293B] shadow-2xl shadow-black/80 overflow-hidden backdrop-blur-2xl"
                  >
                    {/* User Details */}
                    <div className='px-4 py-3.5 border-b border-[#1E293B] bg-white/[0.02]'>
                      <p className='text-sm font-semibold text-white truncate'>{userData.name}</p>
                      <p className='text-xs text-zinc-400 truncate mt-0.5'>{userData.email}</p>
                    </div>

                    {/* Mobile Credits View */}
                    <button className='md:hidden w-full px-4 py-3 flex items-center gap-2 text-sm border-b border-[#1E293B] hover:bg-white/5 transition-colors'>
                      <Coins size={15} className='text-yellow-400' />
                      <span className='text-zinc-400'>Credits:</span>
                      <span className='font-bold text-white'>{userData.credits}</span>
                      <span className='font-semibold text-[#00FFFF] ml-auto'>+</span>
                    </button>

                    {/* Dropdown Menu Options */}
                    <button 
                      className='w-full px-4 py-3 flex items-center gap-2.5 text-left text-sm text-zinc-300 hover:text-white hover:bg-[#2D79FF]/10 transition-colors' 
                      onClick={() => {
                        setOpenProfile(false);
                        navigate("/dashboard");
                      }}
                    >
                      <LayoutDashboard size={16} className='text-[#2D79FF]' />
                      Dashboard
                    </button>

                    <button 
                      onClick={handleLogOut} 
                      className='w-full px-4 py-3 flex items-center gap-2.5 text-left text-sm text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border-t border-[#1E293B] transition-colors'
                    >
                      <LogOut size={16} />
                      Logout
                    </button>

                    
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default Navbar