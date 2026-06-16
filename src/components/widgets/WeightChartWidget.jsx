import { motion } from 'framer-motion'
import { FiTrendingDown } from 'react-icons/fi'

export default function WeightChartWidget() {
  // SVG coordinates for a nice weight loss line graph
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { duration: 2, ease: 'easeInOut' }
    }
  }

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const weights = [78.5, 78.2, 77.9, 78.0, 77.4, 77.1, 76.8]

  return (
    <div className="glass-panel p-6 rounded-2xl glow-cyan flex flex-col justify-between h-[240px] relative overflow-hidden group">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -z-10 group-hover:bg-secondary/20 transition-colors" />

      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Weight Tracker</p>
          <div className="flex items-baseline gap-2 mt-1">
            <h3 className="text-2xl font-bold font-display text-white">76.8 kg</h3>
            <span className="text-xs text-secondary flex items-center gap-0.5 font-medium">
              <FiTrendingDown /> -1.7 kg this week
            </span>
          </div>
        </div>
        <div className="px-2.5 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-[10px] font-bold text-secondary">
          GOAL: 75.0 kg
        </div>
      </div>

      {/* Chart Space */}
      <div className="w-full h-[100px] mt-4 relative">
        <svg viewBox="0 0 300 100" className="w-full h-full overflow-visible">
          <defs>
            {/* Gradient for Line */}
            <linearGradient id="chart-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00F0FF" />
              <stop offset="100%" stopColor="#A855F7" />
            </linearGradient>
            {/* Area Fill Gradient */}
            <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#00F0FF" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="0" y1="20" x2="300" y2="20" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          <line x1="0" y1="50" x2="300" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          <line x1="0" y1="80" x2="300" y2="80" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

          {/* Area Fill */}
          <motion.path
            d="M 10 90 L 10 20 L 58 30 L 106 45 L 154 40 L 202 65 L 250 75 L 290 85 L 290 90 Z"
            fill="url(#area-gradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          />

          {/* Graph Line */}
          <motion.path
            d="M 10 20 L 58 30 L 106 45 L 154 40 L 202 65 L 250 75 L 290 85"
            fill="none"
            stroke="url(#chart-gradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
            variants={pathVariants}
            initial="hidden"
            animate="visible"
          />

          {/* Node points */}
          {[
            { x: 10, y: 20, v: "78.5" },
            { x: 58, y: 30, v: "78.2" },
            { x: 106, y: 45, v: "77.9" },
            { x: 154, y: 40, v: "78.0" },
            { x: 202, y: 65, v: "77.4" },
            { x: 250, y: 75, v: "77.1" },
            { x: 290, y: 85, v: "76.8" }
          ].map((pt, idx) => (
            <g key={idx}>
              <motion.circle
                cx={pt.x}
                cy={pt.y}
                r="4.5"
                fill="#030303"
                stroke={idx === 6 ? '#A855F7' : '#00F0FF'}
                strokeWidth="2.5"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 + idx * 0.1, type: 'spring' }}
                whileHover={{ scale: 1.5 }}
                className="cursor-pointer"
              />
            </g>
          ))}
        </svg>
      </div>

      {/* Footer labels */}
      <div className="flex justify-between mt-2 text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">
        {days.map((day, idx) => (
          <span key={idx} className={idx === 6 ? "text-primary" : ""}>{day}</span>
        ))}
      </div>
    </div>
  )
}
