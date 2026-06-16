import { motion } from 'framer-motion'
import { FiActivity, FiClock } from 'react-icons/fi'
import { FaFire } from 'react-icons/fa'

export default function WorkoutSummaryWidget() {
  const radius = 32
  const circumference = 2 * Math.PI * radius
  
  // Progress values (e.g., 75% calories, 90% time)
  const caloriesPercent = 0.72
  const timePercent = 0.85

  return (
    <div className="glass-panel p-6 rounded-2xl glow-green flex items-center justify-between h-[240px] relative overflow-hidden group">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10 group-hover:bg-primary/20 transition-colors" />

      {/* Info Stats */}
      <div className="flex flex-col justify-between h-full w-[55%]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Workout Summary</p>
          <h3 className="text-2xl font-bold font-display text-white mt-1">Push Day</h3>
          <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider mt-0.5">Today at 08:30 AM</p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-neon-green">
              <FiClock size={16} />
            </div>
            <div>
              <p className="text-[10px] text-zinc-400 font-medium">Duration</p>
              <h4 className="text-sm font-bold text-white">52 min <span className="text-xs text-zinc-500 font-normal">/ 60m</span></h4>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <FaFire size={16} />
            </div>
            <div>
              <p className="text-[10px] text-zinc-400 font-medium">Active Burn</p>
              <h4 className="text-sm font-bold text-white">580 kcal <span className="text-xs text-zinc-500 font-normal">/ 800</span></h4>
            </div>
          </div>
        </div>
      </div>

      {/* Concentric Progress Rings */}
      <div className="w-[40%] flex justify-center items-center relative h-full">
        <svg width="100" height="100" className="transform -rotate-90 overflow-visible">
          {/* Outer Ring Background (Time) */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="rgba(255,255,255,0.03)"
            strokeWidth="8"
          />
          {/* Outer Ring Active (Time) */}
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="#00FF66"
            strokeWidth="8"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference * (1 - timePercent) }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            strokeLinecap="round"
          />

          {/* Inner Ring Background (Calories) */}
          <circle
            cx="50"
            cy="50"
            r={radius - 12}
            fill="transparent"
            stroke="rgba(255,255,255,0.03)"
            strokeWidth="8"
          />
          {/* Inner Ring Active (Calories) */}
          <motion.circle
            cx="50"
            cy="50"
            r={radius - 12}
            fill="transparent"
            stroke="#8B5CF6"
            strokeWidth="8"
            strokeDasharray={2 * Math.PI * (radius - 12)}
            initial={{ strokeDashoffset: 2 * Math.PI * (radius - 12) }}
            animate={{ strokeDashoffset: 2 * Math.PI * (radius - 12) * (1 - caloriesPercent) }}
            transition={{ duration: 1.5, delay: 0.2, ease: 'easeOut' }}
            strokeLinecap="round"
          />
        </svg>

        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: 'spring' }}
            className="text-primary glow-green"
          >
            <FiActivity size={20} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
