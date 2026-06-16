import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaPlay, FaPause, FaStop } from 'react-icons/fa6'

export default function PedometerWidget() {
  const [isActive, setIsActive] = useState(false)
  const [steps, setSteps] = useState(0)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    let interval = null
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1)
        // Add random footsteps
        setSteps(prev => prev + Math.floor(Math.random() * 3) + 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isActive])

  const formatTime = (s) => {
    const mins = Math.floor(s / 60)
    const secs = s % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  const handleReset = () => {
    setIsActive(false)
    setSteps(0)
    setSeconds(0)
  }

  return (
    <div className="glass-panel p-6 rounded-2xl glow-cyan flex flex-col justify-between h-[240px] relative overflow-hidden group select-none">
      <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl -z-10" />

      {/* Header */}
      <div className="flex justify-between items-center mb-1">
        <div>
          <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Cardio Tracker</span>
          <h4 className="text-base font-bold text-white font-display mt-0.5">Pedometer Session</h4>
        </div>
        
        {/* Sensor ready dot */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[9px] font-bold text-cyan-400">
          <span className={`w-1.5 h-1.5 rounded-full bg-cyan-400 ${isActive ? 'animate-ping' : ''}`} />
          {isActive ? 'Sensor Active' : 'Sensor Ready'}
        </div>
      </div>

      {/* Live values layout */}
      <div className="flex justify-between items-center my-2 bg-black/30 border border-white/5 p-3 rounded-xl">
        <div className="text-center w-1/3">
          <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Steps</p>
          <span className="text-lg font-black text-white font-display mt-0.5 block">{steps.toLocaleString()}</span>
        </div>
        <div className="text-center w-1/3 border-x border-white/5">
          <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Time</p>
          <span className="text-lg font-black text-cyan-400 font-display mt-0.5 block">{formatTime(seconds)}</span>
        </div>
        <div className="text-center w-1/3">
          <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Kcal Burn</p>
          <span className="text-lg font-black text-white font-display mt-0.5 block">{Math.round(steps * 0.045)}</span>
        </div>
      </div>

      {/* Controls row */}
      <div className="flex gap-3 mt-1 justify-center items-center">
        {isActive ? (
          <button 
            onClick={() => setIsActive(false)}
            className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-black shadow-lg hover:scale-105 active:scale-95 transition-transform"
          >
            <FaPause size={14} />
          </button>
        ) : (
          <button 
            onClick={() => setIsActive(true)}
            className="w-10 h-10 rounded-full bg-cyan-400 flex items-center justify-center text-black shadow-lg hover:scale-105 active:scale-95 transition-transform"
          >
            <FaPlay size={14} className="ml-0.5" />
          </button>
        )}

        {(steps > 0 || seconds > 0) && (
          <button 
            onClick={handleReset}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/15 flex items-center justify-center text-white border border-white/10 hover:scale-105 active:scale-95 transition-transform"
          >
            <FaStop size={12} />
          </button>
        )}
      </div>
    </div>
  )
}
