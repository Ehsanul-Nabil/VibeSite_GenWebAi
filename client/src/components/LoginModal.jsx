// import React, { useState } from 'react'
// import { AnimatePresence, motion } from "framer-motion"
// import { signInWithPopup, GithubAuthProvider, OAuthProvider } from 'firebase/auth'
// import { auth, googleProvider, githubProvider } from '../firebase'
// import axios from 'axios'
// import api from '../api/api'
// import { useAppContext } from '../context/AppContext'

// import ModalHeader from './loginModal/ModalHeader'
// import AuthForm from './loginModal/AuthForm'
// import OAuthButtons from './loginModal/OAuthButtons'

// function LoginModal({ open, onClose }) {
//   const { setUser, login, register } = useAppContext()
//   const [isRegister, setIsRegister] = useState(false)
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [loading, setLoading] = useState(false)

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
//       const result = await signInWithPopup(auth, githubProvider)
//       let userEmail = result.user.email

//       if (!userEmail) {
//         try {
//           const credential = GithubAuthProvider.credentialFromResult(result)
//           const token = credential?.accessToken

//           if (token) {
//             const { data: emails } = await axios.get("https://api.github.com/user/emails", {
//               headers: { Authorization: `token ${token}` }
//             })
//             const primaryEmail = emails.find(e => e.primary && e.verified) || emails[0]
//             if (primaryEmail) userEmail = primaryEmail.email
//           }
//         } catch (err) {
//           console.error("Could not fetch GitHub email:", err)
//         }
//       }

//       const finalEmail = userEmail || `${result.user.reloadUserInfo?.screenName || 'github_user'}@github.com`

//       const { data } = await api.post('/api/auth/google', {
//         name: result.user.displayName || result.user.reloadUserInfo?.screenName || "GitHub User",
//         email: finalEmail,
//         avatar: result.user.photoURL || ""
//       })

//       setUser(data.user || data)
//       onClose()
//     } catch (error) {
//       console.error("GitHub Auth Error:", error)
//     }
//   }

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
              
//               {/* Background Blurs */}
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
//                 <ModalHeader isRegister={isRegister} />

//                 <AuthForm
//                   isRegister={isRegister}
//                   setIsRegister={setIsRegister}
//                   name={name}
//                   setName={setName}
//                   email={email}
//                   setEmail={setEmail}
//                   password={password}
//                   setPassword={setPassword}
//                   loading={loading}
//                   handleSubmit={handleSubmit}
//                 />

//                 <div className='flex items-center gap-4 my-6'>
//                   <div className='h-px flex-1 bg-white/10' />
//                   <span className='text-xs text-zinc-500 tracking-wide'>Or continue with</span>
//                   <div className='h-px flex-1 bg-white/10' />
//                 </div>

//                 <OAuthButtons
//                   handleGoogleAuth={handleGoogleAuth}
//                   handleGithubAuth={handleGithubAuth}
//                   handleMicrosoftAuth={handleMicrosoftAuth}
//                 />

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



// import React, { useState } from 'react'
// import { AnimatePresence, motion } from "framer-motion"
// import { signInWithPopup, GithubAuthProvider, OAuthProvider } from 'firebase/auth'
// import { auth, googleProvider, githubProvider } from '../firebase'
// import axios from 'axios'
// import api from '../api/api'
// import { useAppContext } from '../context/AppContext'

// import ModalHeader from './loginModal/ModalHeader'
// import AuthForm from './loginModal/AuthForm'
// import OAuthButtons from './loginModal/OAuthButtons'
// import OtpModal from './loginModal/OtpModal'

// function LoginModal({ open, onClose }) {
//   const { setUser, login, register } = useAppContext()
//   const [isRegister, setIsRegister] = useState(false)
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [loading, setLoading] = useState(false)

//   // OTP State
//   const [showOtp, setShowOtp] = useState(false)
//   const [otpLoading, setOtpLoading] = useState(false)

//   // Step 1: Submit Form -> Triggers Backend to Send OTP & Opens OTP Modal
//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     try {
//       if (isRegister) {
//         await register(name, email, password)
//       } else {
//         await login(email, password)
//       }
//       // Open OTP Modal upon successful initial submission
//       setShowOtp(true)
//     } catch (err) {
//       console.error("Auth submit error:", err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Step 2: Verify OTP via Redis Endpoint
//   const handleVerifyOtp = async (otpCode) => {
//     setOtpLoading(true)
//     try {
//       const { data } = await api.post('/api/auth/verify-otp', {
//         email,
//         otp: otpCode,
//       })

//       if (data?.user || data) {
//         setUser(data.user || data)
//         setShowOtp(false)
//         onClose()
//       }
//     } catch (err) {
//       console.error("OTP verification error:", err)
//     } finally {
//       setOtpLoading(false)
//     }
//   }

//   // Step 3: Resend OTP
//   const handleResendOtp = async () => {
//     try {
//       await api.post('/api/auth/resend-otp', { email })
//     } catch (err) {
//       console.error("Resend OTP error:", err)
//     }
//   }

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
//       const result = await signInWithPopup(auth, githubProvider)
//       let userEmail = result.user.email

//       if (!userEmail) {
//         try {
//           const credential = GithubAuthProvider.credentialFromResult(result)
//           const token = credential?.accessToken

//           if (token) {
//             const { data: emails } = await axios.get("https://api.github.com/user/emails", {
//               headers: { Authorization: `token ${token}` }
//             })
//             const primaryEmail = emails.find(e => e.primary && e.verified) || emails[0]
//             if (primaryEmail) userEmail = primaryEmail.email
//           }
//         } catch (err) {
//           console.error("Could not fetch GitHub email:", err)
//         }
//       }

//       const finalEmail = userEmail || `${result.user.reloadUserInfo?.screenName || 'github_user'}@github.com`

//       const { data } = await api.post('/api/auth/google', {
//         name: result.user.displayName || result.user.reloadUserInfo?.screenName || "GitHub User",
//         email: finalEmail,
//         avatar: result.user.photoURL || ""
//       })

//       setUser(data.user || data)
//       onClose()
//     } catch (error) {
//       console.error("GitHub Auth Error:", error)
//     }
//   }

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
//         <>
//           {/* Main Credentials Login Modal */}
//           {!showOtp ? (
//             <motion.div
//               className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl px-4 py-6 overflow-y-auto"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={onClose}
//             >
//               <motion.div
//                 initial={{ scale: 0.88, opacity: 0, y: 60 }}
//                 animate={{ scale: 1, opacity: 1, y: 0 }}
//                 exit={{ scale: 0.9, opacity: 0, y: 40 }}
//                 transition={{ duration: 0.45, ease: "easeOut" }}
//                 className="relative w-full max-w-md p-[1px] rounded-3xl bg-gradient-to-br from-purple-500/40 via-blue-500/30 to-transparent"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className='relative rounded-3xl bg-[#0b0b0b] border border-white/10 shadow-[0_30px_120px_rgba(0,0,0,0.8)] overflow-hidden'>
                  
//                   {/* Background Blurs */}
//                   <motion.div
//                     animate={{ opacity: [0.25, 0.4, 0.25] }}
//                     transition={{ duration: 6, repeat: Infinity }}
//                     className="absolute -top-32 -left-32 w-80 h-80 bg-purple-500/30 blur-[140px]"
//                   />
//                   <motion.div
//                     animate={{ opacity: [0.2, 0.35, 0.2] }}
//                     transition={{ duration: 6, repeat: Infinity, delay: 2 }}
//                     className="absolute -bottom-32 -right-32 w-80 h-80 bg-blue-500/25 blur-[140px]"
//                   />

//                   {/* Close Button */}
//                   <button
//                     className='absolute top-5 right-5 z-20 text-zinc-400 hover:text-white transition text-lg cursor-pointer'
//                     onClick={onClose}
//                   >
//                     ✕
//                   </button>

//                   <div className='relative px-8 pt-10 pb-8 text-center'>
//                     <ModalHeader isRegister={isRegister} />

//                     <AuthForm
//                       isRegister={isRegister}
//                       setIsRegister={setIsRegister}
//                       name={name}
//                       setName={setName}
//                       email={email}
//                       setEmail={setEmail}
//                       password={password}
//                       setPassword={setPassword}
//                       loading={loading}
//                       handleSubmit={handleSubmit}
//                     />

//                     <div className='flex items-center gap-4 my-6'>
//                       <div className='h-px flex-1 bg-white/10' />
//                       <span className='text-xs text-zinc-500 tracking-wide'>Or continue with</span>
//                       <div className='h-px flex-1 bg-white/10' />
//                     </div>

//                     <OAuthButtons
//                       handleGoogleAuth={handleGoogleAuth}
//                       handleGithubAuth={handleGithubAuth}
//                       handleMicrosoftAuth={handleMicrosoftAuth}
//                     />

//                     <p className='text-xs text-zinc-500 leading-relaxed mt-6'>
//                       By continuing, you agree to our{" "}
//                       <span className="underline cursor-pointer hover:text-zinc-300">
//                         Terms of Service
//                       </span>{" "}
//                       and{" "}
//                       <span className="underline cursor-pointer hover:text-zinc-300">
//                         Privacy Policy
//                       </span>.
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>
//             </motion.div>
//           ) : (
//             /* OTP Modal View */
//             <OtpModal
//               isOpen={showOtp}
//               email={email}
//               loading={otpLoading}
//               onClose={() => {
//                 setShowOtp(false)
//                 onClose()
//               }}
//               onVerify={handleVerifyOtp}
//               onResend={handleResendOtp}
//               onChangeEmail={() => setShowOtp(false)}
//             />
//           )}
//         </>
//       )}
//     </AnimatePresence>
//   )
// }

// export default LoginModal



// import React, { useState } from 'react'
// import { AnimatePresence, motion } from "framer-motion"
// import { signInWithPopup, GithubAuthProvider, OAuthProvider } from 'firebase/auth'
// import { auth, googleProvider, githubProvider } from '../firebase'
// import axios from 'axios'
// import api from '../api/api'
// import { useAppContext } from '../context/AppContext'

// import ModalHeader from './loginModal/ModalHeader'
// import AuthForm from './loginModal/AuthForm'
// import OAuthButtons from './loginModal/OAuthButtons'
// import OtpModal from './loginModal/OtpModal'

// function LoginModal({ open, onClose }) {
//   const { setUser, register } = useAppContext()
//   const [isRegister, setIsRegister] = useState(false)
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [loading, setLoading] = useState(false)

//   // OTP State
//   const [showOtp, setShowOtp] = useState(false)
//   const [otpLoading, setOtpLoading] = useState(false)

//   // Initial Submission Handler
//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     try {
//       if (isRegister) {
//         // Direct Registration Flow (No OTP)
//         await register(name, email, password)
//         onClose()
//       } else {
//         // Login Flow (Triggers Backend OTP Generation & Email Dispatch)
//         await api.post('/api/auth/send-login-otp', { email, password })
//         setShowOtp(true)
//       }
//     } catch (err) {
//       console.error("Auth submit error:", err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Verify Login OTP (Redis Endpoint)
//   const handleVerifyOtp = async (otpCode) => {
//     setOtpLoading(true)
//     try {
//       const { data } = await api.post('/api/auth/verify-login-otp', {
//         email,
//         password,
//         otp: otpCode,
//       })

//       if (data?.user || data) {
//         setUser(data.user || data)
//         setShowOtp(false)
//         onClose()
//       }
//     } catch (err) {
//       console.error("OTP verification error:", err)
//     } finally {
//       setOtpLoading(false)
//     }
//   }

//   // Resend Login OTP
//   const handleResendOtp = async () => {
//     try {
//       await api.post('/api/auth/send-login-otp', { email, password })
//     } catch (err) {
//       console.error("Resend OTP error:", err)
//     }
//   }

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
//       const result = await signInWithPopup(auth, githubProvider)
//       let userEmail = result.user.email

//       if (!userEmail) {
//         try {
//           const credential = GithubAuthProvider.credentialFromResult(result)
//           const token = credential?.accessToken

//           if (token) {
//             const { data: emails } = await axios.get("https://api.github.com/user/emails", {
//               headers: { Authorization: `token ${token}` }
//             })
//             const primaryEmail = emails.find(e => e.primary && e.verified) || emails[0]
//             if (primaryEmail) userEmail = primaryEmail.email
//           }
//         } catch (err) {
//           console.error("Could not fetch GitHub email:", err)
//         }
//       }

//       const finalEmail = userEmail || `${result.user.reloadUserInfo?.screenName || 'github_user'}@github.com`

//       const { data } = await api.post('/api/auth/google', {
//         name: result.user.displayName || result.user.reloadUserInfo?.screenName || "GitHub User",
//         email: finalEmail,
//         avatar: result.user.photoURL || ""
//       })

//       setUser(data.user || data)
//       onClose()
//     } catch (error) {
//       console.error("GitHub Auth Error:", error)
//     }
//   }

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
//         <>
//           {/* Main Credentials Modal */}
//           {!showOtp ? (
//             <motion.div
//               className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl px-4 py-6 overflow-y-auto"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={onClose}
//             >
//               <motion.div
//                 initial={{ scale: 0.88, opacity: 0, y: 60 }}
//                 animate={{ scale: 1, opacity: 1, y: 0 }}
//                 exit={{ scale: 0.9, opacity: 0, y: 40 }}
//                 transition={{ duration: 0.45, ease: "easeOut" }}
//                 className="relative w-full max-w-md p-[1px] rounded-3xl bg-gradient-to-br from-purple-500/40 via-blue-500/30 to-transparent"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className='relative rounded-3xl bg-[#0b0b0b] border border-white/10 shadow-[0_30px_120px_rgba(0,0,0,0.8)] overflow-hidden'>
                  
//                   {/* Background Blurs */}
//                   <motion.div
//                     animate={{ opacity: [0.25, 0.4, 0.25] }}
//                     transition={{ duration: 6, repeat: Infinity }}
//                     className="absolute -top-32 -left-32 w-80 h-80 bg-purple-500/30 blur-[140px]"
//                   />
//                   <motion.div
//                     animate={{ opacity: [0.2, 0.35, 0.2] }}
//                     transition={{ duration: 6, repeat: Infinity, delay: 2 }}
//                     className="absolute -bottom-32 -right-32 w-80 h-80 bg-blue-500/25 blur-[140px]"
//                   />

//                   {/* Close Button */}
//                   <button
//                     className='absolute top-5 right-5 z-20 text-zinc-400 hover:text-white transition text-lg cursor-pointer'
//                     onClick={onClose}
//                   >
//                     ✕
//                   </button>

//                   <div className='relative px-8 pt-10 pb-8 text-center'>
//                     <ModalHeader isRegister={isRegister} />

//                     <AuthForm
//                       isRegister={isRegister}
//                       setIsRegister={setIsRegister}
//                       name={name}
//                       setName={setName}
//                       email={email}
//                       setEmail={setEmail}
//                       password={password}
//                       setPassword={setPassword}
//                       loading={loading}
//                       handleSubmit={handleSubmit}
//                     />

//                     <div className='flex items-center gap-4 my-6'>
//                       <div className='h-px flex-1 bg-white/10' />
//                       <span className='text-xs text-zinc-500 tracking-wide'>Or continue with</span>
//                       <div className='h-px flex-1 bg-white/10' />
//                     </div>

//                     <OAuthButtons
//                       handleGoogleAuth={handleGoogleAuth}
//                       handleGithubAuth={handleGithubAuth}
//                       handleMicrosoftAuth={handleMicrosoftAuth}
//                     />

//                     <p className='text-xs text-zinc-500 leading-relaxed mt-6'>
//                       By continuing, you agree to our{" "}
//                       <span className="underline cursor-pointer hover:text-zinc-300">
//                         Terms of Service
//                       </span>{" "}
//                       and{" "}
//                       <span className="underline cursor-pointer hover:text-zinc-300">
//                         Privacy Policy
//                       </span>.
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>
//             </motion.div>
//           ) : (
//             /* OTP Verification View (Login Only) */
//             <OtpModal
//               isOpen={showOtp}
//               email={email}
//               loading={otpLoading}
//               onClose={() => {
//                 setShowOtp(false)
//                 onClose()
//               }}
//               onVerify={handleVerifyOtp}
//               onResend={handleResendOtp}
//               onChangeEmail={() => setShowOtp(false)}
//             />
//           )}
//         </>
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
import toast from 'react-hot-toast'

import ModalHeader from './loginModal/ModalHeader'
import AuthForm from './loginModal/AuthForm'
import OAuthButtons from './loginModal/OAuthButtons'
import OtpModal from './loginModal/OtpModal'

function LoginModal({ open, onClose }) {
  const { setUser, register } = useAppContext()
  const [isRegister, setIsRegister] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  // OTP Modal State
  const [showOtp, setShowOtp] = useState(false)
  const [otpLoading, setOtpLoading] = useState(false)

  // Helper to reset modal internal states when closing
  const handleModalClose = () => {
    setShowOtp(false)
    setIsRegister(false)
    setName('')
    setEmail('')
    setPassword('')
    onClose()
  }

  // Step 1: Initial Credentials Submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isRegister) {
        // Direct Registration Flow (Bypasses OTP)
        await register(name, email, password)
        toast.success("Account created successfully!")
        handleModalClose()
      } else {
        // Login Flow (Validates password & sends OTP via Redis)
        const { data } = await api.post('/api/auth/send-login-otp', { email, password })
        
        toast.success(data?.message || 'Verification code sent to your email!')
        setShowOtp(true)
      }
    } catch (err) {
      console.error("Auth submission error:", err)
      toast.error(err?.response?.data?.error || 'Authentication failed. Check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  // Step 2: Verify Login OTP (Redis Backend Check)
  const handleVerifyOtp = async (otpCode) => {
    setOtpLoading(true)

    try {
      const { data } = await api.post('/api/auth/verify-login-otp', {
        email,
        otp: otpCode,
      })

      if (data?.user || data) {
        setUser(data.user || data)
        toast.success("Welcome back! Successfully logged in.")
        handleModalClose()
      }
    } catch (err) {
      console.error("OTP verification error:", err)
      toast.error(err?.response?.data?.error || 'Invalid or expired OTP code')
    } finally {
      setOtpLoading(false)
    }
  }

  // Step 3: Resend OTP Code
  const handleResendOtp = async () => {
    try {
      const { data } = await api.post('/api/auth/resend-otp', { email })
      toast.success(data?.message || 'New OTP sent to your email!')
    } catch (err) {
      console.error("Resend OTP error:", err)
      toast.error(err?.response?.data?.error || 'Failed to resend code')
    }
  }

  // Social Auth Handlers
  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const { data } = await api.post('/api/auth/google', {
        name: result.user.displayName,
        email: result.user.email,
        avatar: result.user.photoURL
      })
      setUser(data.user || data)
      handleModalClose()
    } catch (error) {
      console.error("Google Auth Error:", error)
      toast.error("Google authentication failed")
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
      handleModalClose()
    } catch (error) {
      console.error("GitHub Auth Error:", error)
      toast.error("GitHub authentication failed")
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
      handleModalClose()
    } catch (error) {
      console.error("Microsoft Auth Error:", error)
      toast.error("Microsoft authentication failed")
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Main Credentials Form View */}
          {!showOtp ? (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl px-4 py-6 overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleModalClose}
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
                  
                  {/* Glowing Ambient Backdrop */}
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

                  {/* Close Modal Button */}
                  <button
                    className='absolute top-5 right-5 z-20 text-zinc-400 hover:text-white transition text-lg cursor-pointer'
                    onClick={handleModalClose}
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
          ) : (
            /* Standalone OTP Verification View */
            <OtpModal
              isOpen={showOtp}
              email={email}
              loading={otpLoading}
              onClose={handleModalClose}
              onVerify={handleVerifyOtp}
              onResend={handleResendOtp}
              onChangeEmail={() => setShowOtp(false)}
            />
          )}
        </>
      )}
    </AnimatePresence>
  )
}

export default LoginModal