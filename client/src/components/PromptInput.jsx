// import React, { useEffect, useRef, useState } from 'react'
// import { ArrowRightIcon, CloudUploadIcon, Loader2Icon, MicIcon } from 'lucide-react'

// const PromptInput = ({onSubmit, loading = false, placeholder = "Describe the website you want to build...", large = false, autoFocus = false, variant = "default"}) => {
//   const [value, setValue] = useState("");
//   const textareaRef = useRef(null)

//   useEffect(()=>{
//     if(autoFocus && textareaRef.current){
//       textareaRef.current.focus();
//     }
//   },[autoFocus])

//   const handleSubmit = (e)=>{
//     if(e) e.preventDefault()
//     const trimmed = value.trim()
//     if(!trimmed || loading) return;
//     onSubmit(trimmed)
//     setValue("")
//   }

//   const handleKeyDown = (e)=>{
//     if(e.key === "Enter" && !e.shiftKey){
//       e.preventDefault();
//       handleSubmit()
//     }
//   }

//   if(variant === "glass"){
//     return (
//       <form onSubmit={handleSubmit} className='max-w-2xl w-full bg-white/10 backdrop-blur-xl rounded-xl ring-1 ring-white/25 focus-within:ring-2 focus-within:ring-white/30 overflow-hidden mt-6 transition'>

//         <textarea ref={textareaRef} value={value} onChange={(e)=>setValue(e.target.value)} onKeyDown={handleKeyDown} placeholder={placeholder} disabled={loading}
//         rows={large ? 5 : 1} className={`flex-1 bg-transparent border-none outline-none resize-none text-zinc-900 placeholder:text-zinc-400 ${large ? "text-base" : "text-sm"}`}/>

//         <div className='flex items-center justify-between pb-3 px-3 gap-2'>
//           <label htmlFor="file" className="border border-white/20 text-white/80 hover:text-white hover:border-white/30 p-1.5 rounded-md cursor-pointer flex items-center justify-center">
//             <input type="file" id='file' hidden/>
//             <CloudUploadIcon size={18}/>
//           </label>

//           <div className='flex items-center justify-end gap-2'>
//             <button type='button' className="flex items-center justify-center p-1 text-white/70 hover:text-white cursor-pointer">
//               <MicIcon size={18}/>
//             </button>

//             <button type='submit'
//             disabled={!value.trim() || loading}
//             className='flex items-center justify-center p-1.5 rounded-full bg-red-600 text-white hover:bg-red-700 disabled:opacity-40 cursor-pointer'>
//               {loading ? <Loader2Icon size={large ? 20 : 15} className="animate-spin" /> : <ArrowRightIcon size={large ? 20 : 15}/>}
//             </button>
//           </div>
//         </div>

//       </form>
//     )
//   }

//   return (
//     <div className={`bg-white border border-zinc-200 rounded-xl flex items-end gap-2 focus-within:ring-1 focus-within:ring-zinc-300 transition ${large ? "p-4" : "p-3"}`}>

//       <textarea ref={textareaRef}
//       value={value}
//       onChange={(e)=>setValue(e.target.value)}
//       onKeyDown={handleKeyDown}
//       placeholder={placeholder}
//       disabled={loading}
//       rows={large ? 5 : 1}
//       className={`flex-1 bg-transparent border-none outline-none resize-none text-zinc-900 placeholder:text-zinc-400 ${large ? "text-base" : "text-sm"}`}/>

//       <button
//       onClick={()=> handleSubmit()}
//       disabled={!value.trim() || loading}
//       className='inline-flex items-center justify-center bg-zinc-950 text-white hover:bg-zinc-800 disabled:opacity-40 cursor-pointer rounded-full shrink-0'
//       style={{
//         width: large ? 36 : 24,
//         height: large ? 36 : 24,
//       }}>
//         {loading ? <Loader2Icon size={large ? 20 : 15} className="animate-spin"/> : <ArrowRightIcon size={large ? 20 : 15}/>}
//       </button>

//     </div>
//   )
// }

// export default PromptInput



// chatgpt

// import React, { useEffect, useRef, useState } from 'react'
// import {
//   ArrowRightIcon,
//   CloudUploadIcon,
//   Loader2Icon,
//   MicIcon,
// } from 'lucide-react'

// const PromptInput = ({
//   onSubmit,
//   loading = false,
//   placeholder = "Describe the website you want to build...",
//   large = false,
//   autoFocus = false,
//   variant = "default",
// }) => {
//   const [value, setValue] = useState("")
//   const textareaRef = useRef(null)

//   useEffect(() => {
//     if (autoFocus && textareaRef.current) {
//       textareaRef.current.focus()
//     }
//   }, [autoFocus])

//   const handleSubmit = (e) => {
//     if (e) e.preventDefault()

//     const trimmed = value.trim()

//     if (!trimmed || loading) return

//     onSubmit(trimmed)
//     setValue("")
//   }

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault()
//       handleSubmit()
//     }
//   }

//   const isGlass = variant === "glass"

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className={`
//         group relative w-full overflow-hidden rounded-2xl
//         transition-all duration-300 ease-out
//         ${
//           isGlass
//             ? "max-w-2xl mt-6 border border-white/20 bg-white/10 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] focus-within:border-white/40 focus-within:bg-white/15"
//             : "border border-zinc-200/80 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:border-zinc-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.07)] focus-within:border-zinc-400 focus-within:ring-4 focus-within:ring-zinc-100"
//         }
//       `}
//     >
//       {/* Subtle top gradient */}
//       <div
//         className={`absolute inset-x-0 top-0 h-px ${
//           isGlass
//             ? "bg-gradient-to-r from-transparent via-white/50 to-transparent"
//             : "bg-gradient-to-r from-transparent via-zinc-300/70 to-transparent"
//         }`}
//       />

//       {/* Prompt area */}
//       <div className={`${large ? "p-5 sm:p-6" : "p-4"}`}>
//         <textarea
//           ref={textareaRef}
//           value={value}
//           onChange={(e) => setValue(e.target.value)}
//           onKeyDown={handleKeyDown}
//           placeholder={placeholder}
//           disabled={loading}
//           rows={large ? 5 : 2}
//           className={`
//             block w-full resize-none border-none bg-transparent
//             outline-none ring-0 focus:ring-0
//             disabled:cursor-not-allowed disabled:opacity-60
//             ${
//               isGlass
//                 ? "text-white placeholder:text-white/50"
//                 : "text-zinc-900 placeholder:text-zinc-400"
//             }
//             ${large ? "min-h-32 text-base leading-7" : "min-h-12 text-sm leading-6"}
//           `}
//         />

//         {/* Bottom toolbar */}
//         <div className="mt-4 flex items-center justify-between gap-3">
//           <div className="flex items-center gap-2">
//             {/* Upload button */}
//             <label
//               htmlFor="file"
//               title="Upload a file"
//               className={`
//                 inline-flex h-9 w-9 cursor-pointer items-center
//                 justify-center rounded-xl border transition-all duration-200
//                 ${
//                   isGlass
//                     ? "border-white/15 bg-white/5 text-white/75 hover:border-white/30 hover:bg-white/15 hover:text-white"
//                     : "border-zinc-200 bg-zinc-50 text-zinc-500 hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-900"
//                 }
//               `}
//             >
//               <input
//                 type="file"
//                 id="file"
//                 hidden
//               />
//               <CloudUploadIcon size={17} />
//             </label>

//             {/* Microphone button */}
//             <button
//               type="button"
//               title="Voice input"
//               className={`
//                 inline-flex h-9 w-9 items-center justify-center
//                 rounded-xl transition-all duration-200
//                 ${
//                   isGlass
//                     ? "text-white/65 hover:bg-white/10 hover:text-white"
//                     : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
//                 }
//               `}
//             >
//               <MicIcon size={17} />
//             </button>

//             {large && (
//               <span
//                 className={`hidden text-xs sm:inline ${
//                   isGlass ? "text-white/45" : "text-zinc-400"
//                 }`}
//               >
//                 Be creative. Describe your vision.
//               </span>
//             )}
//           </div>

//           {/* Submit button */}
//           <button
//             type="submit"
//             disabled={!value.trim() || loading}
//             aria-label={loading ? "Generating..." : "Submit prompt"}
//             className={`
//               group/submit inline-flex h-10 w-10 shrink-0
//               items-center justify-center rounded-xl
//               transition-all duration-200
//               disabled:cursor-not-allowed disabled:opacity-40
//               ${
//                 isGlass
//                   ? "bg-white text-zinc-950 shadow-lg hover:bg-zinc-200"
//                   : "bg-zinc-950 text-white shadow-md shadow-zinc-950/10 hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-lg active:translate-y-0"
//               }
//             `}
//           >
//             {loading ? (
//               <Loader2Icon
//                 size={18}
//                 className="animate-spin"
//               />
//             ) : (
//               <ArrowRightIcon
//                 size={18}
//                 className="transition-transform duration-200 group-hover/submit:translate-x-0.5"
//               />
//             )}
//           </button>
//         </div>
//       </div>
//     </form>
//   )
// }

// export default PromptInput




// import React, { useEffect, useRef, useState } from 'react'
// import { ArrowRightIcon, CloudUploadIcon, Loader2Icon, MicIcon } from 'lucide-react'
// import { motion } from 'framer-motion'

// const PromptInput = ({
//   onSubmit, 
//   loading = false, 
//   placeholder = "Describe the website you want to build...", 
//   large = false, 
//   autoFocus = false, 
//   variant = "default"
// }) => {
//   const [value, setValue] = useState("");
//   const textareaRef = useRef(null)

//   useEffect(() => {
//     if (autoFocus && textareaRef.current) {
//       textareaRef.current.focus();
//     }
//   }, [autoFocus])

//   const handleSubmit = (e) => {
//     if (e) e.preventDefault()
//     const trimmed = value.trim()
//     if (!trimmed || loading) return;
//     onSubmit(trimmed)
//     setValue("")
//   }

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit()
//     }
//   }

//   if (variant === "glass") {
//     return (
//       <form 
//         onSubmit={handleSubmit} 
//         className='w-full max-w-2xl bg-[#000829]/70 backdrop-blur-2xl rounded-2xl border border-[#1E293B] focus-within:border-[#00FFFF]/50 focus-within:shadow-[0_0_25px_rgba(0,255,255,0.15)] overflow-hidden transition-all duration-300 p-3 shadow-2xl'
//       >
//         <textarea 
//           ref={textareaRef} 
//           value={value} 
//           onChange={(e) => setValue(e.target.value)} 
//           onKeyDown={handleKeyDown} 
//           placeholder={placeholder} 
//           disabled={loading}
//           rows={large ? 5 : 2} 
//           className={`w-full bg-transparent border-none outline-none resize-none text-white placeholder:text-zinc-500 px-2 pt-1 ${large ? "text-base" : "text-sm"}`}
//         />

//         <div className='flex items-center justify-between pt-2 px-1 gap-2 border-t border-white/5'>
//           {/* File Upload Button */}
//           <label 
//             htmlFor="file" 
//             className="border border-[#1E293B] bg-white/5 text-zinc-400 hover:text-[#00FFFF] hover:border-[#00FFFF]/40 hover:bg-[#00FFFF]/5 p-2 rounded-xl cursor-pointer flex items-center justify-center transition-all"
//             title="Upload Reference File"
//           >
//             <input type="file" id='file' hidden/>
//             <CloudUploadIcon size={18}/>
//           </label>

//           <div className='flex items-center justify-end gap-2'>
//             {/* Voice Input Button */}
//             <button 
//               type='button' 
//               className="flex items-center justify-center p-2 rounded-xl text-zinc-400 hover:text-[#00FFFF] hover:bg-white/5 cursor-pointer transition-all"
//               title="Voice Input"
//             >
//               <MicIcon size={18}/>
//             </button>

//             {/* Submit Button */}
//             <motion.button 
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               type='submit'
//               disabled={!value.trim() || loading}
//               className='flex items-center justify-center p-2.5 rounded-xl bg-gradient-to-r from-[#2D79FF] to-[#6D28D9] text-white shadow-lg shadow-[#6D28D9]/30 hover:shadow-[#6D28D9]/50 disabled:opacity-40 disabled:hover:shadow-none cursor-pointer transition-all'
//             >
//               {loading ? (
//                 <Loader2Icon size={large ? 20 : 16} className="animate-spin" />
//               ) : (
//                 <ArrowRightIcon size={large ? 20 : 16}/>
//               )}
//             </motion.button>
//           </div>
//         </div>
//       </form>
//     )
//   }

//   return (
//     <div className={`bg-[#000829] border border-[#1E293B] rounded-2xl flex items-end gap-3 focus-within:border-[#00FFFF]/50 focus-within:shadow-[0_0_20px_rgba(0,255,255,0.15)] transition-all duration-300 ${large ? "p-4" : "p-3"}`}>
//       <textarea 
//         ref={textareaRef}
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//         onKeyDown={handleKeyDown}
//         placeholder={placeholder}
//         disabled={loading}
//         rows={large ? 5 : 1}
//         className={`flex-1 bg-transparent border-none outline-none resize-none text-white placeholder:text-zinc-500 ${large ? "text-base" : "text-sm"}`}
//       />

//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={() => handleSubmit()}
//         disabled={!value.trim() || loading}
//         className='inline-flex items-center justify-center bg-gradient-to-r from-[#2D79FF] to-[#6D28D9] text-white shadow-lg shadow-[#6D28D9]/20 disabled:opacity-40 cursor-pointer rounded-xl shrink-0 transition-all'
//         style={{
//           width: large ? 40 : 32,
//           height: large ? 40 : 32,
//         }}
//       >
//         {loading ? (
//           <Loader2Icon size={large ? 20 : 16} className="animate-spin"/>
//         ) : (
//           <ArrowRightIcon size={large ? 20 : 16}/>
//         )}
//       </motion.button>
//     </div>
//   )
// }

// export default PromptInput






import React, { useEffect, useRef, useState } from 'react'
import {
  ArrowRightIcon,
  CloudUploadIcon,
  Loader2Icon,
  MicIcon,
  SparklesIcon,
} from 'lucide-react'

const PromptInput = ({
  onSubmit,
  loading = false,
  placeholder = "Describe the website you want to build...",
  large = false,
  autoFocus = false,
  variant = "default",
}) => {
  const [value, setValue] = useState("")
  const textareaRef = useRef(null)

  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [autoFocus])

  const handleSubmit = (e) => {
    if (e) e.preventDefault()

    const trimmed = value.trim()

    if (!trimmed || loading) return

    onSubmit(trimmed)
    setValue("")
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const isGlass = variant === "glass"

  return (
    <form
      onSubmit={handleSubmit}
      className={`
        group relative w-full overflow-hidden rounded-2xl
        transition-all duration-300 ease-out
        ${
          isGlass
            ? "w-full max-w-none border-0 bg-transparent shadow-none backdrop-blur-none focus-within:bg-transparent"
            : "border border-zinc-200/80 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:border-zinc-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.07)] focus-within:border-zinc-400 focus-within:ring-4 focus-within:ring-zinc-100"
        }
      `}
    >
      {/* Subtle top gradient */}
      {!isGlass && (
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-300/70 to-transparent" />
      )}

      {/* Prompt area */}
      <div className={`${large ? "p-5 sm:p-6" : "p-4"}`}>
        <div className="flex items-start gap-3">
          {isGlass && (
            <SparklesIcon
              size={20}
              className="mt-1 shrink-0 text-cyan-400"
            />
          )}

          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={loading}
            rows={large ? 5 : 2}
            className={`
              block min-w-0 flex-1 resize-none border-none
              bg-transparent outline-none ring-0 focus:ring-0
              disabled:cursor-not-allowed disabled:opacity-60
              ${
                isGlass
                  ? "text-white placeholder:text-slate-500"
                  : "text-zinc-900 placeholder:text-zinc-400"
              }
              ${
                large
                  ? "min-h-28 text-base leading-7"
                  : "min-h-12 text-sm leading-6"
              }
            `}
          />
        </div>

        {/* Bottom toolbar */}
        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            {/* Upload button */}
            <label
              htmlFor="vibesite-prompt-file"
              title="Upload a file"
              className={`
                inline-flex h-9 w-9 shrink-0 cursor-pointer
                items-center justify-center rounded-xl border
                transition-all duration-200
                ${
                  isGlass
                    ? "border-white/10 bg-white/[0.04] text-slate-400 hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-300"
                    : "border-zinc-200 bg-zinc-50 text-zinc-500 hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-900"
                }
              `}
            >
              <input
                type="file"
                id="vibesite-prompt-file"
                hidden
              />
              <CloudUploadIcon size={17} />
            </label>

            {/* Microphone button */}
            <button
              type="button"
              title="Voice input"
              className={`
                inline-flex h-9 w-9 shrink-0 items-center
                justify-center rounded-xl transition-all duration-200
                ${
                  isGlass
                    ? "text-slate-400 hover:bg-white/[0.06] hover:text-cyan-300"
                    : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
                }
              `}
            >
              <MicIcon size={17} />
            </button>

            {large && (
              <span
                className={`hidden truncate text-xs sm:inline ${
                  isGlass ? "text-slate-500" : "text-zinc-400"
                }`}
              >
                Be creative. Describe your vision.
              </span>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={!value.trim() || loading}
            aria-label={loading ? "Generating..." : "Submit prompt"}
            className={`
              group/submit inline-flex h-10 w-10 shrink-0
              items-center justify-center rounded-xl
              transition-all duration-200
              disabled:cursor-not-allowed disabled:opacity-40
              ${
                isGlass
                  ? "bg-gradient-to-r from-blue-500 to-violet-600 text-white shadow-lg shadow-blue-500/20 hover:from-blue-400 hover:to-violet-500 hover:shadow-blue-500/30"
                  : "bg-zinc-950 text-white shadow-md shadow-zinc-950/10 hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-lg active:translate-y-0"
              }
            `}
          >
            {loading ? (
              <Loader2Icon
                size={18}
                className="animate-spin"
              />
            ) : (
              <ArrowRightIcon
                size={18}
                className="transition-transform duration-200 group-hover/submit:translate-x-0.5"
              />
            )}
          </button>
        </div>
      </div>
    </form>
  )
}

export default PromptInput
