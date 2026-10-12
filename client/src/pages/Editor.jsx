import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from '../App'

function Editor() {
  const { id } = useParams()
  const [website, setWebsite] = useState(null)
  const iframeRef = useRef(null)

  // 1. Fetch website data on load
  useEffect(() => {
    axios
      .get(`${serverUrl}/api/website/get-by-id/${id}`, { withCredentials: true })
      .then((res) => setWebsite(res.data))
      .catch((err) => console.log(err))
  }, [id])

  // 2. Render HTML inside iframe whenever latestCode updates
  useEffect(() => {
    if (!iframeRef.current || !website?.latestCode) return

    const blob = new Blob([website.latestCode], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    iframeRef.current.src = url

    return () => URL.revokeObjectURL(url)
  }, [website?.latestCode])

  if (!website) {
    return <div className="h-screen bg-black text-white flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="flex h-screen w-screen bg-black text-white">
      {/* Left Sidebar (Chat & Title) */}
      <aside className="w-80 border-r border-white/10 flex flex-col">
        <div className="p-4 border-b border-white/10 font-bold">
          {website.title}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {website.conversation?.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg text-sm max-w-[80%] ${
                msg.role === 'user'
                  ? 'bg-white text-black ml-auto'
                  : 'bg-white/10 text-white mr-auto'
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>
      </aside>

      {/* Main Area (Live Preview) */}
      <main className="flex-1 flex flex-col">
        <div className="p-4 border-b border-white/10 text-xs text-zinc-400">
          Live Preview
        </div>

        <iframe
          ref={iframeRef}
          title="Preview"
          className="flex-1 w-full bg-white"
        />
      </main>
    </div>
  )
}

export default Editor