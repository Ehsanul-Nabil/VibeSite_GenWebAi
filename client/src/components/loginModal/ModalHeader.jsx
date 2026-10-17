import React from 'react'

function ModalHeader({ isRegister }) {
  return (
    <>
      <h1 className='inline-block mb-4 px-4 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300'>
        AI-powered website builder
      </h1>

      <h2 className='text-2xl font-semibold leading-tight mb-2 space-x-2'>
        <span>{isRegister ? "Join" : "Welcome to"}</span>
        <span className='bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent'>
          VibeSite.AI
        </span>
      </h2>

      <p className='text-xs text-zinc-400 mb-6'>
        {isRegister ? "Create an account to start building" : "Sign in to access your projects"}
      </p>
    </>
  )
}

export default ModalHeader