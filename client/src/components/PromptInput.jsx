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
  variant = "default", // "default" | "glass" | "panel"
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
  const isPanel = variant === "panel"

  return (
    <form
      onSubmit={handleSubmit}
      className={`
        group relative w-full overflow-hidden rounded-2xl
        transition-all duration-300 ease-out
        ${
          isPanel
            ? "border border-slate-800/80 bg-[#0c121e] focus-within:border-cyan-500/40 focus-within:shadow-[0_0_20px_rgba(6,182,212,0.12)]"
            : isGlass
              ? "w-full max-w-none border-0 bg-transparent shadow-none backdrop-blur-none focus-within:bg-transparent"
              : "border border-zinc-200/80 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:border-zinc-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.07)] focus-within:border-zinc-400 focus-within:ring-4 focus-within:ring-zinc-100"
        }
      `}
    >
      {/* Subtle top gradient line */}
      {!isGlass && !isPanel && (
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-300/70 to-transparent" />
      )}

      {/* Prompt Area */}
      <div className={`${isPanel ? "p-3 sm:p-3.5" : large ? "p-5 sm:p-6" : "p-4"}`}>
        <div className="flex items-start gap-2.5">
          {(isGlass || isPanel) && (
            <SparklesIcon
              size={18}
              className="mt-1 shrink-0 text-cyan-400 animate-pulse"
            />
          )}

          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={loading}
            rows={isPanel ? 2 : large ? 5 : 2}
            className={`
              block min-w-0 flex-1 resize-none border-none
              bg-transparent outline-none ring-0 focus:ring-0
              disabled:cursor-not-allowed disabled:opacity-60 leading-relaxed
              ${
                isGlass || isPanel
                  ? "text-slate-100 placeholder:text-slate-500 font-normal"
                  : "text-zinc-900 placeholder:text-zinc-400"
              }
              ${
                isPanel
                  ? "min-h-10 text-xs sm:text-sm"
                  : large
                    ? "min-h-28 text-base leading-7"
                    : "min-h-12 text-sm leading-6"
              }
            `}
          />
        </div>

        {/* Bottom Toolbar */}
        <div className={`${isPanel ? "mt-2 pt-2 border-t border-slate-800/60" : "mt-4"} flex items-center justify-between gap-3`}>
          <div className="flex min-w-0 items-center gap-1.5">
            {/* Upload Button */}
            <label
              htmlFor="vibesite-prompt-file"
              title="Upload a file"
              className={`
                inline-flex shrink-0 cursor-pointer items-center justify-center
                rounded-xl border transition-all duration-200
                ${
                  isPanel
                    ? "h-8 w-8 border-slate-800/80 bg-slate-900/60 text-slate-400 hover:border-cyan-500/30 hover:bg-cyan-500/10 hover:text-cyan-300"
                    : isGlass
                      ? "h-9 w-9 border-white/10 bg-white/[0.04] text-slate-400 hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-300"
                      : "h-9 w-9 border-zinc-200 bg-zinc-50 text-zinc-500 hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-900"
                }
              `}
            >
              <input
                type="file"
                id="vibesite-prompt-file"
                hidden
              />
              <CloudUploadIcon size={isPanel ? 15 : 17} />
            </label>

            {/* Microphone Button */}
            <button
              type="button"
              title="Voice input"
              className={`
                inline-flex shrink-0 items-center justify-center rounded-xl
                transition-all duration-200
                ${
                  isPanel
                    ? "h-8 w-8 text-slate-400 hover:bg-slate-800/60 hover:text-cyan-300"
                    : isGlass
                      ? "h-9 w-9 text-slate-400 hover:bg-white/[0.06] hover:text-cyan-300"
                      : "h-9 w-9 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
                }
              `}
            >
              <MicIcon size={isPanel ? 15 : 17} />
            </button>

            {large && !isPanel && (
              <span
                className={`hidden truncate text-xs sm:inline ${
                  isGlass ? "text-slate-500" : "text-zinc-400"
                }`}
              >
                Be creative. Describe your vision.
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!value.trim() || loading}
            aria-label={loading ? "Generating..." : "Submit prompt"}
            className={`
              group/submit inline-flex shrink-0 items-center justify-center
              rounded-xl transition-all duration-200 cursor-pointer
              disabled:cursor-not-allowed disabled:opacity-40
              ${
                isPanel
                  ? "h-8.5 w-8.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_12px_rgba(147,51,234,0.3)] hover:shadow-[0_0_18px_rgba(147,51,234,0.5)] active:scale-95"
                  : isGlass
                    ? "h-10 w-10 bg-gradient-to-r from-blue-500 to-violet-600 text-white shadow-lg shadow-blue-500/20 hover:from-blue-400 hover:to-violet-500 hover:shadow-blue-500/30"
                    : "h-10 w-10 bg-zinc-950 text-white shadow-md shadow-zinc-950/10 hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-lg active:translate-y-0"
              }
            `}
          >
            {loading ? (
              <Loader2Icon
                size={isPanel ? 15 : 18}
                className="animate-spin"
              />
            ) : (
              <ArrowRightIcon
                size={isPanel ? 15 : 18}
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
