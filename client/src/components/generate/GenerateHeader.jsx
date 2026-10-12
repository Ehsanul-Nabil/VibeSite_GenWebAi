// import React from 'react'
// import { ArrowLeft, Sparkles } from 'lucide-react'

// function GenerateHeader({ navigate }) {
//   return (
//     <div className='sticky top-0 z-40 backdrop-blur-xl bg-[#000516]/70 border-b border-[#1E293B]'>
//       <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
//         <div className='flex items-center gap-4'>
//           <button 
//             className='p-2 rounded-lg bg-[#000829] border border-[#1E293B] hover:border-[#00FFFF]/50 text-zinc-300 hover:text-white transition-all' 
//             onClick={() => navigate("/")}
//           >
//             <ArrowLeft size={16} />
//           </button>
          
//           <div 
//             onClick={() => navigate('/')} 
//             className='flex items-center gap-2 cursor-pointer group'
//           >
//             <div className='p-1.5 rounded-lg bg-[#6D28D9]/20 border border-[#6D28D9]/40 group-hover:border-[#00FFFF]/50 transition-colors'>
//               <Sparkles size={16} className='text-[#00FFFF]' />
//             </div>
//             <span className='text-lg font-extrabold tracking-tight bg-gradient-to-r from-[#00FFFF] via-[#2D79FF] to-[#6D28D9] bg-clip-text text-transparent'>
//               VibeSite.AI
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default GenerateHeader


import React from 'react'
import { ArrowLeft, Sparkles, Tag, Coins } from 'lucide-react'

function GenerateHeader({ navigate, userData }) {
  return (
    <header className='sticky top-0 z-40 backdrop-blur-xl bg-[#000516]/80 border-b border-[#1E293B]'>
      <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
        
        {/* Left: Back button & Logo */}
        <div className='flex items-center gap-4'>
          <button 
            className='p-2 rounded-xl bg-[#000829] border border-[#1E293B] hover:border-[#00FFFF]/50 text-zinc-300 hover:text-white transition-all' 
            onClick={() => navigate("/")}
            title="Back to Home"
          >
            <ArrowLeft size={16} />
          </button>
          
          <div 
            onClick={() => navigate('/')} 
            className='flex items-center gap-2 cursor-pointer group'
          >
            <div className='p-1.5 rounded-lg bg-[#6D28D9]/20 border border-[#6D28D9]/40 group-hover:border-[#00FFFF]/50 transition-colors'>
              <Sparkles size={16} className='text-[#00FFFF]' />
            </div>
            <span className='text-lg font-extrabold tracking-tight bg-gradient-to-r from-[#00FFFF] via-[#2D79FF] to-[#6D28D9] bg-clip-text text-transparent'>
              VibeSite.AI
            </span>
          </div>
        </div>

        {/* Right: Quick Navigation Badges */}
        <div className='flex items-center gap-3'>
          <div 
            onClick={() => navigate('/pricing')} 
            className='hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#000829] border border-[#1E293B] hover:border-[#00FFFF]/50 text-xs cursor-pointer transition-all group'
          >
            <Tag size={13} className='text-[#00FFFF] group-hover:rotate-12 transition-transform' />
            <span className='text-zinc-300 font-semibold group-hover:text-white'>Pricing</span>
          </div>

          {userData && (
            <div className='flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#000829] border border-[#1E293B] text-xs'>
              <Coins size={14} className='text-yellow-400 animate-pulse' />
              <span className='text-zinc-400 font-medium'>Credits</span>
              <span className='font-bold text-white'>{userData.credits}</span>
            </div>
          )}
        </div>

      </div>
    </header>
  )
}

export default GenerateHeader