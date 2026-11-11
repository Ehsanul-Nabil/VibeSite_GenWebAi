import { BotIcon, BotMessageSquareIcon, UserIcon, SparklesIcon } from 'lucide-react'
import React, { useEffect, useRef } from 'react'
import PromptInput from './PromptInput'

const ChatPanel = ({ messages, onSend, loading }) => {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  return (
    <div className="flex flex-col h-full bg-[#070b12] border-r border-slate-800/80">
      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-4 custom-scrollbar">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 mb-3 text-cyan-400 shadow-inner">
              <SparklesIcon size={20} className="animate-pulse" />
            </div>
            <p className="text-slate-200 text-sm font-medium">VibeSite AI Assistant</p>
            <p className="text-slate-400 text-xs mt-1 max-w-[200px]">
              Ask AI to modify your website, generate components, or adjust styles.
            </p>
          </div>
        )}

        {messages.map((msg, i) => {
          const isUser = msg.role === "user";

          return (
            <div key={i} className="group">
              <div
                className={`flex gap-2.5 items-start ${
                  isUser ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/* Role Avatar */}
                <div
                  className={`shrink-0 w-6 h-6 rounded-md flex items-center justify-center mt-0.5 border ${
                    isUser
                      ? "bg-slate-800 border-slate-700/80 text-slate-300"
                      : "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                  }`}
                >
                  {isUser ? (
                    <UserIcon size={13} />
                  ) : (
                    <BotMessageSquareIcon size={13} />
                  )}
                </div>

                {/* Message Content */}
                <div
                  className={`flex flex-col min-w-0 max-w-[85%] ${
                    isUser ? "items-end text-right" : "items-start text-left"
                  }`}
                >
                  <p className="text-[10px] font-semibold text-slate-400 mb-1 uppercase tracking-wider font-mono">
                    {isUser ? "You" : "AI"}
                  </p>

                  <div
                    className={`p-3 rounded-xl border text-[13px] leading-relaxed break-words text-left ${
                      isUser
                        ? "bg-cyan-500/10 border-cyan-500/30 text-slate-100 rounded-tr-none shadow-sm"
                        : "bg-[#0c121e] border-slate-800/80 text-slate-300 rounded-tl-none shadow-inner"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">
                      {msg.content.split("- `").map((text, idx) => (
                        <span
                          key={idx}
                          className={
                            idx > 0
                              ? "block mt-2 font-mono text-cyan-300 text-xs bg-slate-900/80 p-2 rounded-lg border border-slate-800"
                              : ""
                          }
                        >
                          {idx === 0 ? text : `- \`${text}`}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex gap-2.5 items-start flex-row">
            <div className="shrink-0 w-6 h-6 rounded-md flex items-center justify-center mt-0.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <BotIcon size={13} className="animate-spin" />
            </div>
            <div className="flex flex-col items-start">
              <p className="text-[10px] font-semibold text-cyan-400/80 mb-1 uppercase tracking-wider font-mono">
                AI is thinking
              </p>
              <div className="p-3 rounded-xl rounded-tl-none bg-[#0c121e] border border-slate-800/80 inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input Section */}
      <div className="p-3 border-t border-slate-800/80 bg-[#090d16]/80 backdrop-blur-md">
        <PromptInput
          onSubmit={onSend}
          loading={loading}
          placeholder="Ask AI to modify site..."
          autoFocus
          variant="panel"
        />


      </div>
    </div>
  )
}

export default ChatPanel