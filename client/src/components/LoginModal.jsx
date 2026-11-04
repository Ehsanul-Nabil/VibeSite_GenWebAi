import React, { useState } from 'react'
import { AnimatePresence, motion } from "framer-motion"
import { signInWithPopup, GithubAuthProvider, OAuthProvider } from 'firebase/auth'
import { auth, googleProvider, githubProvider } from '../firebase'
import axios from 'axios'
import api from '../api/api'
import { useAppContext } from '../context/AppContext'

import ModalHeader from './loginModal/ModalHeader'
import AuthForm from './loginModal/AuthForm'
import OAuthButtons from './loginModal/OAuthButtons'

function LoginModal({ open, onClose }) {
  const { setUser, login, register } = useAppContext()
  const [isRegister, setIsRegister] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (isRegister) {
        await register(name, email, password)
      } else {
        await login(email, password)
      }
      onClose()
    } catch (err) {
      console.error("Auth submit error:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const { data } = await api.post('/api/auth/google', {
        name: result.user.displayName,
        email: result.user.email,
        avatar: result.user.photoURL
      })
      setUser(data.user || data)
      onClose()
    } catch (error) {
      console.error("Google Auth Error:", error)
    }
  }

  const handleGithubAuth = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider)
      let userEmail = result.user.email

      if (!userEmail) {
        try {
          const credential = GithubAuthProvider.credentialFromResult(result)
          const token = credential?.accessToken

          if (token) {
            const { data: emails } = await axios.get("https://api.github.com/user/emails", {
              headers: { Authorization: `token ${token}` }
            })
            const primaryEmail = emails.find(e => e.primary && e.verified) || emails[0]
            if (primaryEmail) userEmail = primaryEmail.email
          }
        } catch (err) {
          console.error("Could not fetch GitHub email:", err)
        }
      }

      const finalEmail = userEmail || `${result.user.reloadUserInfo?.screenName || 'github_user'}@github.com`

      const { data } = await api.post('/api/auth/google', {
        name: result.user.displayName || result.user.reloadUserInfo?.screenName || "GitHub User",
        email: finalEmail,
        avatar: result.user.photoURL || ""
      })

      setUser(data.user || data)
      onClose()
    } catch (error) {
      console.error("GitHub Auth Error:", error)
    }
  }

  const handleMicrosoftAuth = async () => {
    try {
      const microsoftProvider = new OAuthProvider('microsoft.com')
      const result = await signInWithPopup(auth, microsoftProvider)
      const { data } = await api.post('/api/auth/microsoft', {
        name: result.user.displayName,
        email: result.user.email,
        avatar: result.user.photoURL
      })
      setUser(data.user || data)
      onClose()
    } catch (error) {
      console.error("Microsoft Auth Error:", error)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl px-4 py-6 overflow-y-auto"
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
              
              {/* Background Blurs */}
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

              {/* Close Button */}
              <button
                className='absolute top-5 right-5 z-20 text-zinc-400 hover:text-white transition text-lg'
                onClick={onClose}
              >
                ✕
              </button>

              <div className='relative px-8 pt-10 pb-8 text-center'>
                <ModalHeader isRegister={isRegister} />

                <AuthForm
                  isRegister={isRegister}
                  setIsRegister={setIsRegister}
                  name={name}
                  setName={setName}
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  loading={loading}
                  handleSubmit={handleSubmit}
                />

                <div className='flex items-center gap-4 my-6'>
                  <div className='h-px flex-1 bg-white/10' />
                  <span className='text-xs text-zinc-500 tracking-wide'>Or continue with</span>
                  <div className='h-px flex-1 bg-white/10' />
                </div>

                <OAuthButtons
                  handleGoogleAuth={handleGoogleAuth}
                  handleGithubAuth={handleGithubAuth}
                  handleMicrosoftAuth={handleMicrosoftAuth}
                />

                <p className='text-xs text-zinc-500 leading-relaxed mt-6'>
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