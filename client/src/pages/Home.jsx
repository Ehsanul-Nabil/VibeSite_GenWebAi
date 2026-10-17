import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import Navbar from '../components/home/Navbar'
import HeroSection from '../components/home/HeroSection'
import HighlightsSection from '../components/home/HighlightsSection'
import Footer from '../components/home/Footer'
import LoginModal from '../components/LoginModal'

import { serverUrl } from '../App'
import { setUserData } from '../redux/userSlice'

function Home() {
  const highlights = [
    "AI Generated Code",
    "Fully Responsive Layouts",
    "Production Ready Output",
  ]

  const [openLogin, setOpenLogin] = useState(false)
  const [openProfile, setOpenProfile] = useState(false)
  const { userData } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true })
      dispatch(setUserData(null))
      setOpenProfile(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='relative min-h-screen bg-[#040404] text-white overflow-hidden'>
      <Navbar
        userData={userData}
        openProfile={openProfile}
        setOpenProfile={setOpenProfile}
        setOpenLogin={setOpenLogin}
        handleLogOut={handleLogOut}
        navigate={navigate}
      />

      <HeroSection
        userData={userData}
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