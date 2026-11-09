import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAppContext } from '../context/AppContext'
import { plans } from '../components/payment/plansData'
import PricingBackground from '../components/payment/PricingBackground'
import PricingHeader from '../components/payment/PricingHeader'
import PricingCard from '../components/payment/PricingCard'

const serverUrl = import.meta.env.VITE_SERVER_URL;

function Pricing() {
  const navigate = useNavigate()
  const { user } = useAppContext()
  const [loading, setLoading] = useState(null)

  const handleBuy = async (planKey) => {
    if (!user) {
      navigate("/")
      return
    }
    if (planKey === "free") {
      navigate("/dashboard")
      return
    }

    setLoading(planKey)
    try {
      const result = await axios.post(
        `${serverUrl}/api/payment/initiate`,
        { planType: planKey },
        { withCredentials: true }
      )

      if (result.data?.sessionUrl) {
        window.location.href = result.data.sessionUrl
      }
    } catch (error) {
      console.error("Payment initiation error:", error)
      setLoading(null)
    }
  }

  return (
    <div className='relative min-h-screen overflow-hidden bg-[#050505] text-white px-6 pt-16 pb-24'>
      {/* Glow background */}
      <PricingBackground />

      {/* Header section */}
      <PricingHeader />

      {/* Pricing cards grid */}
      <div className='relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
        {plans.map((plan, i) => (
          <PricingCard
            key={plan.key}
            plan={plan}
            index={i}
            loading={loading}
            onBuy={handleBuy}
          />
        ))}
      </div>
    </div>
  )
}

export default Pricing