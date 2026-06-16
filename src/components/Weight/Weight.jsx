import { motion } from 'framer-motion'
import { FiCheckCircle, FiCompass, FiCpu, FiTrendingDown } from 'react-icons/fi'

export default function Weight() {
  const milestones = [
    { title: "Current Weight", value: "76.8 kg", date: "June 16, 2026", status: "Active" },
    { title: "Starting Weight", value: "82.5 kg", date: "April 1, 2026", status: "Done" },
    { title: "Goal Weight", value: "75.0 kg", date: "Target: July 15", status: "Pending" }
  ]

  const metrics = [
    { name: "Body Fat %", val: "14.2%", desc: "Athletic Range", diff: "-2.4%", color: "text-secondary" },
    { name: "Skeletal Muscle", val: "38.5 kg", desc: "Optimal Range", diff: "+1.2 kg", color: "text-primary" },
    { name: "Visceral Fat Level", val: "5", desc: "Healthy (1-9)", diff: "-1", color: "text-primary" },
    { name: "BMI", val: "22.8", desc: "Normal weight", diff: "-1.8", color: "text-secondary" }
  ]

  return (
    <section className="relative py-28 w-full bg-background overflow-hidden border-t border-white/5">
      <div className="absolute top-10 right-10 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[100px] -z-10 animate-blob-1" />
      
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-white">
            Track Your Body <span className="text-primary text-glow-green">Composition</span>
          </h2>
          <p className="text-zinc-400 font-medium mt-4">
            Weight is just a number. Our system tracks Skeletal Muscle Mass, Body Fat Percentage, Visceral Fat, and more to give you a complete picture of health.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Milestones Card */}
          <div className="lg:col-span-5 flex flex-col justify-between glass-panel p-8 rounded-3xl glow-green">
            <div>
              <h3 className="text-xl font-bold font-display text-white mb-6">Milestone Track</h3>
              <div className="relative border-l border-white/10 pl-6 ml-3 flex flex-col gap-8">
                {milestones.map((ms, idx) => (
                  <div key={idx} className="relative">
                    {/* Circle Node indicator */}
                    <div className={`absolute -left-[31px] top-1.5 w-[11px] h-[11px] rounded-full border-2 border-background ${
                      ms.status === 'Done' 
                        ? 'bg-primary shadow-neon-green' 
                        : ms.status === 'Active' 
                        ? 'bg-secondary shadow-neon-cyan' 
                        : 'bg-zinc-700'
                    }`} />
                    
                    <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">{ms.title}</span>
                    <h4 className="text-lg font-bold text-white font-display mt-0.5">{ms.value}</h4>
                    <p className="text-xs text-zinc-400 font-medium mt-0.5">{ms.date}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs text-zinc-400 font-medium">Remaining to Goal</span>
              <span className="text-lg font-bold font-display text-primary">1.8 kg</span>
            </div>
          </div>

          {/* Detailed Composition Metrics Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {metrics.map((metric, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="glass-panel p-6 rounded-2xl flex flex-col justify-between group hover:border-white/15 transition-all duration-300"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">{metric.name}</span>
                    <h4 className="text-2xl font-bold font-display text-white mt-2">{metric.val}</h4>
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded bg-white/5 border border-white/5 ${metric.color}`}>
                    {metric.diff}
                  </span>
                </div>
                
                <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">
                  <span>{metric.desc}</span>
                  <FiCompass className="text-zinc-600 group-hover:rotate-45 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}
