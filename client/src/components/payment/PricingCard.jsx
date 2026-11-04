import React from 'react'
import { motion } from 'framer-motion'
import { Check, Coins } from 'lucide-react'

const PricingCard = ({ plan, index, loading, onBuy }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12 }}
      whileHover={{ y: -14, scale: 1.03 }}
      className={`relative rounded-3xl p-8 border backdrop-blur-xl transition-all ${
        plan.popular
          ? "border-indigo-500 bg-gradient-to-b from-indigo-500/20 to-transparent shadow-2xl shadow-indigo-500/30"
          : "border-white/10 bg-white/5 hover:border-indigo-400 hover:bg-white/10"
      }`}
    >
      {plan.popular && (
        <span className='absolute top-5 right-5 px-3 py-1 text-xs rounded-full bg-indigo-500'>
          Most Popular
        </span>
      )}

      <h1 className='text-xl font-semibold mb-2'>{plan.name}</h1>
      <p className='text-zinc-400 text-sm mb-6'>{plan.description}</p>

      <div className='flex items-end gap-1 mb-4'>
        <span className='text-4xl font-bold'>{plan.price}</span>
        <span className='text-sm text-zinc-400 mb-1'>/one-time</span>
      </div>

      <div className='flex items-center gap-2 mb-8'>
        <Coins size={18} className='text-yellow-400' />
        <span className='font-semibold'>{plan.credits} Credits</span>
      </div>

      <ul className='space-y-3 mb-10'>
        {plan.features.map((f) => (
          <li
            key={f}
            className='flex items-center gap-2 text-sm text-zinc-300'
          >
            <Check size={16} className='text-green-400' />
            {f}
          </li>
        ))}
      </ul>

      <motion.button
        whileTap={{ scale: 0.96 }}
        disabled={loading !== null}
        onClick={() => onBuy(plan.key)}
        className={`w-full py-3 rounded-xl font-semibold transition cursor-pointer ${
          plan.popular
            ? "bg-indigo-500 hover:bg-indigo-600"
            : "bg-white/10 hover:bg-white/20"
        } disabled:opacity-60`}
      >
        {loading === plan.key ? "Redirecting..." : plan.button}
      </motion.button>
    </motion.div>
  )
}

export default PricingCard