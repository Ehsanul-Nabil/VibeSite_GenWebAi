import React from 'react'
import { motion } from 'framer-motion'

const WelcomeBanner = ({ userName }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-10"
    >
      <p className='text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-1 font-mono'>
        Welcome Back
      </p>
      <h1 className='text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent tracking-tight'>
        {userName || "Developer"}
      </h1>
    </motion.div>
  )
}

export default WelcomeBanner