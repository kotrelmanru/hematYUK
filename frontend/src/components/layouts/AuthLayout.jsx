import React from 'react'
import hemat from "../../assets/images/hematyuk.png"
import { LuTrendingUpDown } from "react-icons/lu" 

const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      {/* Left Form Section */}
      <div className="w-full md:w-3/5 px-12 pt-8 pb-12 bg-[#ffffff]">
        <h2 className="text-2xl font-bold text-[#000000] animate-flicker">
          hematYUK
        </h2>
        {children}
      </div>

      {/* Right Neon Cyberpunk Panel */}
      <div className="hidden md:block w-2/5 relative overflow-hidden bg-gradient-to-b from-black via-[#001100] to-[#002200]">
        {/* Neon Frames */}
        <div className="absolute -top-8 -left-8 w-60 h-60 rounded-3xl border-8 border-[#39FF14] shadow-neon animate-pulse" />
        <div className="absolute top-1/3 right-12 w-56 h-64 rounded-2xl bg-[#39FF14]/20 backdrop-blur-lg shadow-neon-glow animate-fadeIn" />
        <div className="absolute -bottom-10 -left-10 w-72 h-72 rounded-full bg-[#39FF14]/10 shadow-inner" />

        {/* Neon Image */}
        <img 
          src={hemat}
          className="absolute bottom-25 left-1/2 transform -translate-x-1/2 w-64 lg:w-3/4 shadow-neon-glow filter drop-shadow-lg"
          alt="hematYUK neon"
        />
      </div>
    </div>
  )
}

export default AuthLayout

// Stats Info Card Component
export const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex items-center gap-4 bg-[#111] p-4 rounded-xl border border-[#39FF14]/40 shadow-neon-glow">
      <div className={`w-12 h-12 flex items-center justify-center text-2xl ${color} rounded-full shadow-neon`}>
        {icon}
      </div>
      <div>
        <h6 className="text-sm text-gray-400 mb-1 uppercase tracking-wide">{label}</h6>
        <span className="text-xl text-[#39FF14] font-mono">${value}</span>
      </div>
    </div>
  )
}
