import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const PricingHeader = () => {
  const navigate = useNavigate()

  return (
    <>
      <button 
        className='relative z-10 mb-8 flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition cursor-pointer' 
        onClick={() => navigate("/")}
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-4xl mx-auto text-center mb-14"
      >
        <h1 className='text-4xl md:text-5xl font-bold mb-4'>Simple, transparent pricing</h1>
        <p className='text-zinc-400 text-lg'>Buy credits once. Build anytime.</p>
      </motion.div>
    </>
  )
}

export default PricingHeader