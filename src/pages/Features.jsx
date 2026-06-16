import { motion } from 'framer-motion'
import { FiActivity, FiTrendingDown, FiCoffee, FiAward, FiCompass, FiPieChart, FiLock } from 'react-icons/fi'
import useLenis from '../hooks/useLenis'

export default function FeaturesPage() {
  useLenis()

  const allFeatures = [
    { name: "Weight Tracker", desc: "Line charts, goal forecast, and BMI composite calculations.", icon: <FiTrendingDown />, color: "text-primary border-primary/20 bg-primary/5 hover:border-primary/40" },
    { name: "Workout Logs", desc: "Log reps, weight splits, and monitor rest time timers.", icon: <FiActivity />, color: "text-secondary border-secondary/20 bg-secondary/5 hover:border-secondary/40" },
    { name: "Nutrient Calculator", desc: "Detailed macronutrient splits (protein, carbs, fat) and meal logging.", icon: <FiPieChart />, color: "text-accent border-accent/20 bg-accent/5 hover:border-accent/40" },
    { name: "Daily Streak Goals", desc: "Visual rewards and notifications to encourage continuous logs.", icon: <FiAward />, color: "text-primary border-primary/20 bg-primary/5 hover:border-primary/40" },
    { name: "Water Intake Logger", desc: "Quick cups visual metrics to track hydration on the go.", icon: <FiCoffee />, color: "text-secondary border-secondary/20 bg-secondary/5 hover:border-secondary/40" },
    { name: "On-Device Pedometer", desc: "Uses built-in accelerometer sensors to track daily steps and active calorie expenditure.", icon: <FiCompass />, color: "text-accent border-accent/20 bg-accent/5 hover:border-accent/40" },
    { name: "Active Calories Burn", desc: "Estimate energy output automatically based on custom workout types and exercise logs.", icon: <FiActivity />, color: "text-primary border-primary/20 bg-primary/5 hover:border-primary/40" },
    { name: "Secure Cloud Sync", desc: "Securely backup and restore all workout sets, weight trends, and calories with our backend.", icon: <FiLock />, color: "text-secondary border-secondary/20 bg-secondary/5 hover:border-secondary/40" }
  ]

  return (
    <div className="relative min-h-screen w-full bg-background pt-32 pb-20 px-6 md:px-12 grid-bg noise-bg overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/3 left-10 w-[350px] h-[350px] rounded-full bg-secondary/5 blur-[100px] -z-10 animate-blob-3" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[90px] -z-10 animate-blob-1" />

      <div className="max-w-6xl mx-auto z-10 relative">
        
        {/* Title */}
        <div className="max-w-2xl mb-16">
          <span className="text-sm font-bold uppercase tracking-widest text-secondary text-glow-cyan font-display">Feature Details</span>
          <h1 className="text-4xl md:text-6xl font-display font-black tracking-tight text-white mt-4 leading-none">
            Built for <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">Power Users</span>
          </h1>
          <p className="text-zinc-400 font-medium tracking-wide mt-6 leading-relaxed">
            Tranzio combines the depth of pro-grade sports software with the accessibility of modern consumer design. Explore our tracking capabilities below.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {allFeatures.map((f, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className={`glass-panel p-6 rounded-2xl flex flex-col justify-between min-h-[220px] transition-all duration-300 ${f.color}`}
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-lg border border-white/5">
                {f.icon}
              </div>
              <div className="mt-8">
                <h3 className="text-base font-bold font-display text-white">{f.name}</h3>
                <p className="text-xs text-zinc-500 font-medium leading-relaxed mt-2">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  )
}
