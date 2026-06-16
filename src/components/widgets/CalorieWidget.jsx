import { motion } from 'framer-motion'
import { FiCoffee, FiTrendingUp } from 'react-icons/fi'

export default function CalorieWidget() {
  const macros = [
    { name: 'Protein', current: 124, target: 160, color: 'bg-primary', glow: 'shadow-neon-purple' },
    { name: 'Carbs', current: 195, target: 240, color: 'bg-secondary', glow: 'shadow-neon-cyan' },
    { name: 'Fat', current: 58, target: 75, color: 'bg-accent-orange', glow: '' }
  ]

  return (
    <div className="glass-panel p-6 rounded-2xl glow-purple flex flex-col justify-between h-[240px] relative overflow-hidden group">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -z-10 group-hover:bg-accent/20 transition-colors" />

      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Nutrients & Water</p>
          <div className="flex items-baseline gap-2 mt-1">
            <h3 className="text-2xl font-bold font-display text-white">1,840 kcal</h3>
            <span className="text-xs text-zinc-500">of 2,400 budget</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-zinc-300">
          <FiTrendingUp className="text-primary" /> Active streak
        </div>
      </div>

      {/* Macros progress lines */}
      <div className="flex flex-col gap-2.5 mt-2">
        {macros.map((macro, idx) => {
          const percent = macro.current / macro.target
          return (
            <div key={idx}>
              <div className="flex justify-between text-[11px] font-medium mb-1">
                <span className="text-zinc-400">{macro.name}</span>
                <span className="text-white font-semibold">
                  {macro.current}g <span className="text-zinc-500 font-normal">/ {macro.target}g</span>
                </span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${macro.color} ${macro.glow}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${percent * 100}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: idx * 0.1 }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Water Intake Quick Metric */}
      <div className="flex justify-between items-center border-t border-white/5 pt-3 mt-1">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-secondary/15 flex items-center justify-center text-secondary">
            <FiCoffee size={14} />
          </div>
          <div>
            <p className="text-[10px] text-zinc-400 font-medium">Water Intake</p>
            <p className="text-xs font-bold text-white">1.8 L <span className="text-[10px] text-zinc-500 font-normal">/ 2.5 L</span></p>
          </div>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((cup) => (
            <motion.div
              key={cup}
              className={`w-2 h-4 rounded-sm border ${
                cup <= 5 
                  ? 'bg-secondary border-secondary shadow-neon-cyan' 
                  : 'border-white/10 bg-transparent'
              }`}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.5 + cup * 0.05, type: 'spring' }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
