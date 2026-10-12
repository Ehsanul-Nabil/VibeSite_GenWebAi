// import React from 'react'

// function Footer() {
//   return (
//     <footer className='border-t border-white/10 py-10 text-center text-sm text-zinc-500'>
//       &copy; {new Date().getFullYear()} VibeSite.AI
//     </footer>
//   )
// }

// export default Footer


import React from 'react'
import { Globe, Code2 } from 'lucide-react'

function Footer() {
  return (
    <footer className='border-t border-[#1E293B] bg-[#000516] py-10 px-6 text-zinc-400'>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6'>
        
        {/* Brand */}
        <div className='flex items-center gap-2'>
          <span className='text-lg font-bold bg-gradient-to-r from-[#00FFFF] via-[#2D79FF] to-[#6D28D9] bg-clip-text text-transparent'>
            VibeSite.AI
          </span>
          <span className='text-xs text-zinc-500'>| Built with AI</span>
        </div>

        {/* Copyright */}
        <p className='text-sm text-zinc-500'>
          &copy; {new Date().getFullYear()} VibeSite.AI. All rights reserved.
        </p>

        {/* Social & Web Icons */}
        <div className='flex items-center gap-4 text-zinc-400'>
          {/* Twitter / X Inline SVG */}
          <a href="#" className='hover:text-[#00FFFF] transition-colors' title="Twitter / X">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          {/* GitHub Inline SVG */}
          <a href="#" className='hover:text-[#00FFFF] transition-colors' title="GitHub">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>

          {/* Safe Lucide Icons */}
          <a href="#" className='hover:text-[#00FFFF] transition-colors' title="Source Code">
            <Code2 size={18} />
          </a>
          <a href="#" className='hover:text-[#00FFFF] transition-colors' title="Website">
            <Globe size={18} />
          </a>
        </div>

      </div>
    </footer>
  )
}

export default Footer