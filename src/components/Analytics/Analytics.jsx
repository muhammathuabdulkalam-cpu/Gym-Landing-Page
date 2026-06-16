import { motion } from 'framer-motion'
import { FiTrendingUp, FiActivity, FiCoffee, FiLock } from 'react-icons/fi'

export default function Analytics() {
  const barVariants = {
    hidden: { height: 0 },
    visible: (custom) => ({
      height: `${custom}%`,
      transition: { duration: 1.2, ease: 'easeOut', delay: custom * 0.005 }
    })
  }

  const weeklyActivity = [
    { day: "M", val: 65, kcal: 420 },
    { day: "T", val: 85, kcal: 580 },
    { day: "W", val: 40, kcal: 310 },
    { day: "T", val: 95, kcal: 680 },
    { day: "F", val: 70, kcal: 490 },
    { day: "S", val: 50, kcal: 350 },
    { day: "S", val: 90, kcal: 620 }
  ]

  const metrics = [
    { title: "Daily Water Log", val: "1.8 L / 2.5 L", label: "8 cups logged", icon: <FiCoffee />, accent: "text-secondary" },
    { title: "Cloud Backup", val: "Active", label: "100% Secure Sync", icon: <FiLock />, accent: "text-primary" }
  ]

  return (
    <section className="relative py-28 w-full bg-background overflow-hidden border-t border-white/5">
      <div className="absolute top-1/3 left-10 w-[300px] h-[300px] rounded-full bg-secondary/5 blur-[100px] -z-10 animate-blob-3" />
      
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-white">
            Performance <span className="text-secondary text-glow-cyan">Analytics</span>
          </h2>
          <p className="text-zinc-400 font-medium mt-4">
            Get comprehensive reports, trend highlights, and calorie tracking. Automatically sync workout plans, daily water logs, and weight charts securely to the cloud.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Active SVG Bar Chart */}
          <div className="lg:col-span-7 glass-panel p-8 rounded-3xl glow-cyan flex flex-col justify-between min-h-[360px] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl -z-10 group-hover:bg-secondary/10 transition-colors" />

            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Weekly Performance</span>
                <h3 className="text-xl font-bold font-display text-white mt-1">Calorie Expenditure</h3>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary">
                <FiTrendingUp /> +12% vs last week
              </div>
            </div>

            {/* Vertical Bar Chart */}
            <div className="w-full h-[180px] flex items-end justify-between px-2 mt-8 relative">
              {/* Chart lines */}
              <div className="absolute left-0 right-0 top-0 border-t border-white/5 pointer-events-none" />
              <div className="absolute left-0 right-0 top-1/3 border-t border-white/5 pointer-events-none" />
              <div className="absolute left-0 right-0 top-2/3 border-t border-white/5 pointer-events-none" />

              {weeklyActivity.map((d, idx) => (
                <div key={idx} className="flex flex-col items-center gap-3 w-8 z-10 group/bar relative">
                  <span className="absolute -top-6 text-[10px] font-bold text-secondary opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap bg-background border border-white/10 px-1.5 py-0.5 rounded shadow-glass">
                    {d.kcal} kcal
                  </span>
                  <div className="w-4 bg-white/5 rounded-full h-[140px] flex items-end">
                    <motion.div
                      custom={d.val}
                      variants={barVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="w-full rounded-full bg-gradient-to-t from-secondary to-primary shadow-neon-cyan"
                    />
                  </div>
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Metrics & Wearables */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            {metrics.map((m, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl flex items-center justify-between group hover:border-white/10 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-lg ${m.accent}`}>
                    {m.icon}
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">{m.title}</span>
                    <h4 className="text-xl font-bold font-display text-white mt-0.5">{m.val}</h4>
                  </div>
                </div>
                <span className="text-xs text-zinc-400 font-semibold">{m.label}</span>
              </div>
            ))}

            <div className="glass-panel p-6 rounded-2xl border border-white/5 flex items-start gap-4 bg-gradient-to-r from-primary-glow to-transparent">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 shadow-neon-purple">
                <FiActivity size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-display">Cloud Sync & Backup</h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-medium mt-1">
                  Seamlessly sync your weights, calorie logs, and custom workout plans with our secure database to access your data on any device.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
