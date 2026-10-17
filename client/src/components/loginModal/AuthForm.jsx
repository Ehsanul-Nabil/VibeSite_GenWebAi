import React from 'react'

function AuthForm({
  isRegister,
  setIsRegister,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  loading,
  handleSubmit
}) {
  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-left mb-6">
        {isRegister && (
          <div>
            <label className="block text-xs text-zinc-400 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500 transition"
            />
          </div>
        )}

        <div>
          <label className="block text-xs text-zinc-400 mb-1">Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500 transition"
          />
        </div>

        <div>
          <label className="block text-xs text-zinc-400 mb-1">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500 transition"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 mt-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold text-sm shadow-lg hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Processing..." : isRegister ? "Create Account" : "Sign In"}
        </button>
      </form>

      <p className="text-xs text-zinc-400 mb-6">
        {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          type="button"
          onClick={() => setIsRegister(!isRegister)}
          className="text-purple-400 hover:underline font-semibold"
        >
          {isRegister ? "Sign In" : "Register"}
        </button>
      </p>
    </>
  )
}

export default AuthForm