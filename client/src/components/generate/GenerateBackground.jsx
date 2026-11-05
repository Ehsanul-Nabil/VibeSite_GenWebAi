import React from 'react'

const GenerateBackground = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-40 top-40 h-96 w-96 rounded-full bg-blue-600/10 blur-[140px]" />
      <div className="absolute -right-32 top-72 h-96 w-96 rounded-full bg-violet-600/15 blur-[140px]" />
      <div className="absolute bottom-0 left-1/3 h-72 w-96 rounded-full bg-cyan-500/5 blur-[130px]" />

      <div
        className="absolute inset-0 opacity-[0.13]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(100,130,255,0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100,130,255,0.12) 1px, transparent 1px)
          `,
          backgroundSize: '65px 65px',
          maskImage: 'linear-gradient(to bottom, black, transparent 85%)',
        }}
      />
    </div>
  )
}

export default GenerateBackground