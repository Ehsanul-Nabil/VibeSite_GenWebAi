// import React, { useState } from 'react'
// import { AnimatePresence, motion } from "framer-motion"
// import { signInWithPopup, GithubAuthProvider, OAuthProvider } from 'firebase/auth'
// import { auth, googleProvider, githubProvider } from '../firebase'
// import axios from 'axios'
// import api from '../api/api'
// import { useAppContext } from '../context/AppContext'

// function LoginModal({ open, onClose }) {
//   const { setUser, login, register } = useAppContext()

//   // Tab State: 'login' | 'register'
//   const [isRegister, setIsRegister] = useState(false)

//   // Form Input States matching UserSchema
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [loading, setLoading] = useState(false)

//   // Form Submission Handler
//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     try {
//       if (isRegister) {
//         await register(name, email, password)
//       } else {
//         await login(email, password)
//       }
//       onClose()
//     } catch (err) {
//       console.error("Auth submit error:", err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   // OAuth Handlers
//   const handleGoogleAuth = async () => {
//     try {
//       const result = await signInWithPopup(auth, googleProvider)
//       const { data } = await api.post('/api/auth/google', {
//         name: result.user.displayName,
//         email: result.user.email,
//         avatar: result.user.photoURL
//       })
//       setUser(data.user || data)
//       onClose()
//     } catch (error) {
//       console.error("Google Auth Error:", error)
//     }
//   }

//   const handleGithubAuth = async () => {
//     try {
//       const result = await signInWithPopup(auth, githubProvider);
//       let userEmail = result.user.email;

//       if (!userEmail) {
//         try {
//           const credential = GithubAuthProvider.credentialFromResult(result);
//           const token = credential?.accessToken;

//           if (token) {
//             const { data: emails } = await axios.get("https://api.github.com/user/emails", {
//               headers: { Authorization: `token ${token}` }
//             });
//             const primaryEmail = emails.find(e => e.primary && e.verified) || emails[0];
//             if (primaryEmail) userEmail = primaryEmail.email;
//           }
//         } catch (err) {
//           console.error("Could not fetch GitHub email:", err);
//         }
//       }

//       const finalEmail = userEmail || `${result.user.reloadUserInfo?.screenName || 'github_user'}@github.com`;

//       const { data } = await api.post('/api/auth/google', {
//         name: result.user.displayName || result.user.reloadUserInfo?.screenName || "GitHub User",
//         email: finalEmail,
//         avatar: result.user.photoURL || ""
//       });

//       setUser(data.user || data);
//       onClose();
//     } catch (error) {
//       console.error("GitHub Auth Error:", error);
//     }
//   };

//   const handleMicrosoftAuth = async () => {
//     try {
//       const microsoftProvider = new OAuthProvider('microsoft.com')
//       const result = await signInWithPopup(auth, microsoftProvider)
//       const { data } = await api.post('/api/auth/microsoft', {
//         name: result.user.displayName,
//         email: result.user.email,
//         avatar: result.user.photoURL
//       })
//       setUser(data.user || data)
//       onClose()
//     } catch (error) {
//       console.error("Microsoft Auth Error:", error)
//     }
//   }

//   return (
//     <AnimatePresence>
//       {open && (
//         <motion.div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl px-4 py-6 overflow-y-auto"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           onClick={onClose}
//         >
//           <motion.div
//             initial={{ scale: 0.88, opacity: 0, y: 60 }}
//             animate={{ scale: 1, opacity: 1, y: 0 }}
//             exit={{ scale: 0.9, opacity: 0, y: 40 }}
//             transition={{ duration: 0.45, ease: "easeOut" }}
//             className="relative w-full max-w-md p-[1px] rounded-3xl bg-gradient-to-br from-purple-500/40 via-blue-500/30 to-transparent"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className='relative rounded-3xl bg-[#0b0b0b] border border-white/10 shadow-[0_30px_120px_rgba(0,0,0,0.8)] overflow-hidden'>
              
//               {/* Background Blur Elements */}
//               <motion.div
//                 animate={{ opacity: [0.25, 0.4, 0.25] }}
//                 transition={{ duration: 6, repeat: Infinity }}
//                 className="absolute -top-32 -left-32 w-80 h-80 bg-purple-500/30 blur-[140px]"
//               />

//               <motion.div
//                 animate={{ opacity: [0.2, 0.35, 0.2] }}
//                 transition={{ duration: 6, repeat: Infinity, delay: 2 }}
//                 className="absolute -bottom-32 -right-32 w-80 h-80 bg-blue-500/25 blur-[140px]"
//               />

//               {/* Close Button */}
//               <button
//                 className='absolute top-5 right-5 z-20 text-zinc-400 hover:text-white transition text-lg'
//                 onClick={onClose}
//               >
//                 ✕
//               </button>

//               <div className='relative px-8 pt-10 pb-8 text-center'>
//                 <h1 className='inline-block mb-4 px-4 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300'>
//                   AI-powered website builder
//                 </h1>

//                 <h2 className='text-2xl font-semibold leading-tight mb-2 space-x-2'>
//                   <span>{isRegister ? "Join" : "Welcome to"}</span>
//                   <span className='bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent'>VibeSite.AI</span>
//                 </h2>

//                 <p className='text-xs text-zinc-400 mb-6'>
//                   {isRegister ? "Create an account to start building" : "Sign in to access your projects"}
//                 </p>

//                 {/* Email / Password Form */}
//                 <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-left mb-6">
//                   {isRegister && (
//                     <div>
//                       <label className="block text-xs text-zinc-400 mb-1">Full Name</label>
//                       <input
//                         type="text"
//                         required
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         placeholder="John Doe"
//                         className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500 transition"
//                       />
//                     </div>
//                   )}

//                   <div>
//                     <label className="block text-xs text-zinc-400 mb-1">Email Address</label>
//                     <input
//                       type="email"
//                       required
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       placeholder="you@example.com"
//                       className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500 transition"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-xs text-zinc-400 mb-1">Password</label>
//                     <input
//                       type="password"
//                       required
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       placeholder="••••••••"
//                       className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500 transition"
//                     />
//                   </div>

//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className="w-full h-11 mt-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold text-sm shadow-lg hover:opacity-90 transition disabled:opacity-50"
//                   >
//                     {loading ? "Processing..." : isRegister ? "Create Account" : "Sign In"}
//                   </button>
//                 </form>

//                 {/* Switch between Login and Register */}
//                 <p className="text-xs text-zinc-400 mb-6">
//                   {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
//                   <button
//                     type="button"
//                     onClick={() => setIsRegister(!isRegister)}
//                     className="text-purple-400 hover:underline font-semibold"
//                   >
//                     {isRegister ? "Sign In" : "Register"}
//                   </button>
//                 </p>

//                 {/* Divider */}
//                 <div className='flex items-center gap-4 my-6'>
//                   <div className='h-px flex-1 bg-white/10' />
//                   <span className='text-xs text-zinc-500 tracking-wide'>Or continue with</span>
//                   <div className='h-px flex-1 bg-white/10' />
//                 </div>

//                 {/* Social Login Buttons */}
//                 <div className='flex flex-col gap-3'>
//                   {/* Google */}
//                   <motion.button
//                     type="button"
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={handleGoogleAuth}
//                     className="group relative w-full h-11 rounded-xl bg-white text-black font-semibold shadow-xl overflow-hidden flex items-center justify-center text-sm"
//                   >
//                     <div className='relative flex items-center justify-center gap-3'>
//                       <img src="https://www.svgrepo.com/show/303108/google-icon-logo.svg" alt="Google" className='h-4 w-4' />
//                       Google
//                     </div>
//                   </motion.button>

//                   <div className="grid grid-cols-2 gap-3">
//                     {/* GitHub */}
//                     <motion.button
//                       type="button"
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={handleGithubAuth}
//                       className="group relative w-full h-11 rounded-xl bg-white text-black font-semibold shadow-xl overflow-hidden flex items-center justify-center text-sm"
//                     >
//                       <div className='relative flex items-center justify-center gap-2'>
//                         <svg className="h-4 w-4 fill-black" viewBox="0 0 24 24">
//                           <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
//                         </svg>
//                         GitHub
//                       </div>
//                     </motion.button>

//                     {/* Microsoft */}
//                     <motion.button
//                       type="button"
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={handleMicrosoftAuth}
//                       className="group relative w-full h-11 rounded-xl bg-white text-black font-semibold shadow-xl overflow-hidden flex items-center justify-center text-sm"
//                     >
//                       <div className='relative flex items-center justify-center gap-2'>
//                         <svg className="h-4 w-4" viewBox="0 0 23 23">
//                           <path fill="#f35325" d="M1 1h10v10H1z"/>
//                           <path fill="#81bc06" d="M12 1h10v10H12z"/>
//                           <path fill="#05a6f0" d="M1 12h10v10H1z"/>
//                           <path fill="#ffba08" d="M12 12h10v10H12z"/>
//                         </svg>
//                         Microsoft
//                       </div>
//                     </motion.button>
//                   </div>
//                 </div>

//                 {/* Footer Legal Terms */}
//                 <p className='text-xs text-zinc-500 leading-relaxed mt-6'>
//                   By continuing, you agree to our{" "}
//                   <span className="underline cursor-pointer hover:text-zinc-300">
//                     Terms of Service
//                   </span>{" "}
//                   and{" "}
//                   <span className="underline cursor-pointer hover:text-zinc-300">
//                     Privacy Policy
//                   </span>.
//                 </p>
//               </div>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   )
// }

// export default LoginModal


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