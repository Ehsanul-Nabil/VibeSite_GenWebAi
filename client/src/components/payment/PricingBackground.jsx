import React from 'react'

const PricingBackground = () => {
  return (
    <div className='absolute inset-0 pointer-events-none'>
      <div className='absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]' />
      <div className='absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px]' />
    </div>
  )
}

export default PricingBackground