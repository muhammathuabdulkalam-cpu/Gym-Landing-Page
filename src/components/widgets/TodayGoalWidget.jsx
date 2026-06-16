import { motion } from 'framer-motion'
import { FiAward, FiPercent } from 'react-icons/fi'
import { FaWalking } from 'react-icons/fa'

export default function TodayGoalWidget() {
  const steps = 8432
  const stepsGoal = 10000
  const stepPercent = steps / stepsGoal

  return (
    <div className="glass-panel p-6 rounded-2xl glow-green flex flex-col justify-between h-[240px] relative overflow-hidden group">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10 group-hover:bg-primary/20 transition-colors" />

      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Daily Status</p>
          <div className="flex items-baseline gap-2 mt-1">
            <h3 className="text-2xl font-bold font-display text-white">82% Complete</h3>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-neon-green">
          <FiPercent size={16} />
        </div>
      </div>

      {/* Steps metric */}
      <div className="bg-white/5 border border-white/5 rounded-xl p-3 flex justify-between items-center relative overflow-hidden">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-secondary/15 flex items-center justify-center text-secondary">
            <FaWalking size={14} />
          </div>
          <div>
            <p className="text-[10px] text-zinc-400 font-medium">Step Counter</p>
            <p className="text-sm font-bold text-white">8,432 <span className="text-xs text-zinc-500 font-normal">/ 10,000</span></p>
          </div>
        </div>
        <div className="w-12 h-1.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-secondary shadow-neon-cyan"
            initial={{ width: 0 }}
            animate={{ width: `${stepPercent * 100}%` }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Daily Streak Banner */}
      <div className="flex items-center justify-between border-t border-white/5 pt-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
            <FiAward size={16} />
          </div>
          <div>
            <p className="text-[10px] text-zinc-400 font-medium">Daily Streak</p>
            <h4 className="text-sm font-bold text-white">15 Days Consistent</h4>
          </div>
        </div>

        {/* Streak indicators */}
        <div className="flex gap-1">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
            <motion.div
              key={idx}
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold ${
                idx < 5 
                  ? 'bg-gradient-to-r from-primary to-primary-dark text-black shadow-neon-green' 
                  : 'bg-white/5 text-zinc-500 border border-white/10'
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7 + idx * 0.05, type: 'spring' }}
            >
              {day}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
