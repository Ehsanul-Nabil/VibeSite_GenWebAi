import React from 'react'
import { AnimatePresence, motion } from "framer-motion"
import { signInWithPopup, GithubAuthProvider, OAuthProvider } from 'firebase/auth'
import { auth, provider } from '../firebase'
import axios from 'axios'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

function LoginModal({ open, onClose }) {
  const dispatch = useDispatch()

  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      const { data } = await axios.post(`${serverUrl}/api/auth/google`, {
        name: result.user.displayName,
        email: result.user.email,
        avatar: result.user.photoURL
      }, { withCredentials: true })
      dispatch(setUserData(data))
      onClose()
    } catch (error) {
      console.log(error)
    }
  }

  const handleGithubAuth = async () => {
    try {
      const githubProvider = new GithubAuthProvider()
      const result = await signInWithPopup(auth, githubProvider)
      const { data } = await axios.post(`${serverUrl}/api/auth/github`, {
        name: result.user.displayName,
        email: result.user.email,
        avatar: result.user.photoURL
      }, { withCredentials: true })
      dispatch(setUserData(data))
      onClose()
    } catch (error) {
      console.log(error)
    }
  }

  const handleMicrosoftAuth = async () => {
    try {
      const microsoftProvider = new OAuthProvider('microsoft.com')
      const result = await signInWithPopup(auth, microsoftProvider)
      const { data } = await axios.post(`${serverUrl}/api/auth/microsoft`, {
        name: result.user.displayName,
        email: result.user.email,
        avatar: result.user.photoURL
      }, { withCredentials: true })
      dispatch(setUserData(data))
      onClose()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-xl px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 60 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative w-full max-w-md p-[1px] rounded-3xl bg-gradient-to-br from-purple-500/40 via-blue-500/30 to-transparent"
            onClick={(e) => e.stopPropagation()}
          >
            <div className='relative rounded-3xl bg-[#0b0b0b] border border-white/10 shadow-[0_30px_120px_rgba(0,0,0,0.8)] overflow-hidden'>
              <motion.div
                animate={{ opacity: [0.25, 0.4, 0.25] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute -top-32 -left-32 w-80 h-80 bg-purple-500/30 blur-[140px]"
              />

              <motion.div
                animate={{ opacity: [0.2, 0.35, 0.2] }}
                transition={{ duration: 6, repeat: Infinity, delay: 2 }}
                className="absolute -bottom-32 -right-32 w-80 h-80 bg-blue-500/25 blur-[140px]"
              />

              <button
                className='absolute top-5 right-5 z-20 text-zinc-400 hover:text-white transition text-lg'
                onClick={onClose}
              >
                X
              </button>

              <div className='relative px-8 pt-14 pb-10 text-center'>
                <h1 className='inline-block mb-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300'>
                  AI-powered website builder
                </h1>

                <h2 className='text-3xl font-semibold leading-tight mb-6 space-x-2'>
                  <span>Welcome to</span>
                  <span className='bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent'>VibeSite.AI</span>
                </h2>

                <div className='flex flex-col gap-3'>
                  {/* Google Login */}
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleGoogleAuth}
                    className="group relative w-full h-13 rounded-xl bg-white text-black font-semibold shadow-xl overflow-hidden"
                  >
                    <div className='relative flex items-center justify-center gap-3'>
                      <img src="https://www.svgrepo.com/show/303108/google-icon-logo.svg" alt="Google" className='h-5 w-5' />
                      Continue with Google
                    </div>
                  </motion.button>

                  {/* GitHub Login */}
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleGithubAuth}
                    className="group relative w-full h-13 rounded-xl bg-white text-black font-semibold shadow-xl overflow-hidden"
                  >
                    <div className='relative flex items-center justify-center gap-3'>
                      <svg className="h-5 w-5 fill-black" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      Continue with GitHub
                    </div>
                  </motion.button>

                  {/* Microsoft Login */}
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleMicrosoftAuth}
                    className="group relative w-full h-13 rounded-xl bg-white text-black font-semibold shadow-xl overflow-hidden"
                  >
                    <div className='relative flex items-center justify-center gap-3'>
                      <svg className="h-5 w-5" viewBox="0 0 23 23">
                        <path fill="#f35325" d="M1 1h10v10H1z"/>
                        <path fill="#81bc06" d="M12 1h10v10H12z"/>
                        <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                        <path fill="#ffba08" d="M12 12h10v10H12z"/>
                      </svg>
                      Continue with Microsoft
                    </div>
                  </motion.button>
                </div>

                <div className='flex items-center gap-4 my-8'>
                  <div className='h-px flex-1 bg-white/10' />
                  <span className='text-xs text-zinc-500 tracking-wide'>Secure Login</span>
                  <div className='h-px flex-1 bg-white/10' />
                </div>

                <p className='text-xs text-zinc-500 leading-relaxed'>
                  By continuing, you agree to our{" "}
                  <span className="underline cursor-pointer hover:text-zinc-300">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="underline cursor-pointer hover:text-zinc-300">
                    Privacy Policy
                  </span>.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoginModal