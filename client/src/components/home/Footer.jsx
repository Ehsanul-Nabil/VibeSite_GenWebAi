import React from 'react'
import { motion } from 'motion/react'
import { Sparkles, Code, MessageSquare, Share2, Mail, ArrowUpRight, Heart } from 'lucide-react'

// Matching theme configuration
const theme = {
  bg: 'bg-[#000516]',
  border: 'border-[#1E293B]',
  cardBg: 'bg-[#000829]',
  primaryGradient: 'bg-gradient-to-r from-[#00FFFF] via-[#2D79FF] to-[#6D28D9] bg-clip-text text-transparent',
  accent: 'text-[#00FFFF]',
  btnPrimary: 'bg-gradient-to-r from-[#2D79FF] to-[#6D28D9] text-white',
}

function Footer({ navigate }) {
  const footerLinks = {
    Product: [
      { name: 'AI Generator', path: '/dashboard' },
      { name: 'Templates', path: '/templates' },
      { name: 'Pricing', path: '/pricing' },
      { name: 'Changelog', path: '/changelog' },
    ],
    Resources: [
      { name: 'Documentation', path: '/docs' },
      { name: 'Component Library', path: '/components' },
      { name: 'API Reference', path: '/api' },
      { name: 'Guides & Tutorials', path: '/guides' },
    ],
    Company: [
      { name: 'About Us', path: '/about' },
      { name: 'Careers', path: '/careers' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
    ],
  }

  const socialLinks = [
    { icon: Code, href: 'https://github.com', label: 'GitHub' },
    { icon: MessageSquare, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Share2, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:support@vibesite.ai', label: 'Email' },
  ]

  return (
    <footer className={`relative pt-24 pb-12 px-6 border-t ${theme.border} ${theme.bg} overflow-hidden text-left`}>
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#6D28D9]/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Call to Action Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`p-8 md:p-12 rounded-3xl ${theme.cardBg} border ${theme.border} mb-20 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden`}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#2D79FF]/10 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6D28D9]/20 border border-[#6D28D9]/40 text-xs font-semibold text-[#A78BFA] mb-4">
              <Sparkles size={14} />
              <span>Ready to build?</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Transform your workflow with <span className={theme.primaryGradient}>VibeSite.AI</span>
            </h3>
            <p className="text-zinc-400 mt-2 text-sm md:text-base">
              Generate production-grade React components in seconds. No credit card required.
            </p>
          </div>

        
        </motion.div>

        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 pb-16 border-b border-[#1E293B]">
          {/* Brand Column */}
          <div className="md:col-span-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#00FFFF] to-[#6D28D9] flex items-center justify-center">
                  <Sparkles size={18} className="text-white" />
                </div>
                <span className="text-xl font-bold text-white tracking-tight">
                  VibeSite<span className={theme.accent}>.AI</span>
                </span>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-sm mb-6">
                The AI-powered layout & frontend code engine. Turn creative concepts and raw prompts into clean, scalable React & Tailwind interfaces effortlessly.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-xl bg-[#000829] border border-[#1E293B] flex items-center justify-center text-zinc-400 hover:text-[#00FFFF] hover:border-[#00FFFF]/50 transition-all duration-200"
                  >
                    <Icon size={18} />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links], i) => (
            <div key={i}>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <button
                      onClick={() => navigate ? navigate(link.path) : null}
                      className="text-sm text-zinc-400 hover:text-[#00FFFF] transition-colors duration-200 text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} VibeSite.AI Inc. All rights reserved.</p>
          
          <div className="flex items-center gap-1 text-zinc-500">
            <span>Crafted with</span>
            <Heart size={12} className="text-[#00FFFF] fill-[#00FFFF]" />
            <span>for modern creators</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer