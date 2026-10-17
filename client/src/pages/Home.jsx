import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Navbar from '../components/home/Navbar'
import HeroSection from '../components/home/HeroSection'
import HighlightsSection from '../components/home/HighlightsSection'
import Footer from '../components/home/Footer'
import LoginModal from '../components/LoginModal'
import { useAppContext } from '../context/AppContext'

function Home() {
  const { user, logout } = useAppContext()
  const navigate = useNavigate()

  const highlights = [
    "AI Generated Code",
    "Fully Responsive Layouts",
    "Production Ready Output",
  ]

  const [openLogin, setOpenLogin] = useState(false)
  const [openProfile, setOpenProfile] = useState(false)

  const handleLogOut = async () => {
    try {
      await logout()
      setOpenProfile(false)
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <div className='relative min-h-screen bg-[#040404] text-white overflow-hidden'>
      <Navbar
        userData={user}
        openProfile={openProfile}
        setOpenProfile={setOpenProfile}
        setOpenLogin={setOpenLogin}
        handleLogOut={handleLogOut}
        navigate={navigate}
      />

     <HeroSection
        userData={user}
        navigate={navigate}
      />

      <HighlightsSection
        highlights={highlights}
      />

      <Footer />

      {openLogin && (
        <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />
      )}
    </div>
  )
}

export default Home