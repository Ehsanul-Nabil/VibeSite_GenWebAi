import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      {/* Header */}
      <header className="flex justify-between items-center p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold">Vibesite</h1>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded text-sm">
          Get Started
        </button>
      </header>

      {/* Main Banner */}
      <main className="text-center py-20 px-4 max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold mb-4">
          Generate websites with AI
        </h2>
        <p className="text-slate-400 mb-8">
          Type your prompt and create clean React pages instantly.
        </p>

        {/* Input Bar */}
        <div className="flex gap-2 bg-slate-800 p-2 rounded-lg border border-slate-700">
          <input
            type="text"
            placeholder="Describe your site vibe..."
            className="w-full bg-transparent px-3 py-2 text-sm outline-none text-white placeholder-slate-500"
          />
          <button className="bg-blue-600 hover:bg-blue-500 text-sm text-white px-4 py-2 rounded">
            Generate
          </button>
        </div>
      </main>

      {/* Simple Grid */}
      <section className="max-w-4xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-slate-800 rounded border border-slate-700">
          <h3 className="font-semibold mb-2">⚡ Fast</h3>
          <p className="text-slate-400 text-sm">Built in seconds using AI.</p>
        </div>
        <div className="p-4 bg-slate-800 rounded border border-slate-700">
          <h3 className="font-semibold mb-2">🎨 Custom Vibes</h3>
          <p className="text-slate-400 text-sm">Choose from multiple style themes.</p>
        </div>
        <div className="p-4 bg-slate-800 rounded border border-slate-700">
          <h3 className="font-semibold mb-2">🚀 Export</h3>
          <p className="text-slate-400 text-sm">Download React code ready to deploy.</p>
        </div>
      </section>
    </div>
  );
}





