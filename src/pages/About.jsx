import { motion } from 'framer-motion'
import { FiTrendingUp, FiLock, FiAward, FiEye } from 'react-icons/fi'
import useLenis from '../hooks/useLenis'

export default function About() {
  useLenis()

  const pillars = [
    {
      title: "Data Integrity",
      desc: "Every tracking point is logged with extreme precision, allowing you to trust the analytics and trend models fully.",
      icon: <FiTrendingUp />,
      color: "text-primary bg-primary/10 border-primary/20"
    },
    {
      "title": "Strict Privacy",
      "desc": "Your health metrics belong to you. We employ on-device encryption and secure cloud backups that you control completely.",
      "icon": <FiLock />,
      "color": "text-secondary bg-secondary/10 border-secondary/20"
    },
    {
      "title": "Rewarding Streaks",
      "desc": "Habits are built through visual gratification. We track milestones to encourage consistency at every step.",
      "icon": <FiAward />,
      "color": "text-accent bg-accent/10 border-accent/20"
    },
    {
      "title": "Clean UX Design",
      "desc": "No clutter, no ads, no distraction. A premium luxury theme that focuses solely on your performance metrics.",
      "icon": <FiEye />,
      "color": "text-white bg-white/5 border-white/10"
    }
  ]

  return (
    <div className="relative min-h-screen w-full bg-background pt-32 pb-20 px-6 md:px-12 grid-bg noise-bg overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-primary/5 blur-[100px] -z-10 animate-blob-1" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-secondary/5 blur-[100px] -z-10 animate-blob-2" />

      <div className="max-w-6xl mx-auto z-10 relative">
        
        {/* Intro */}
        <div className="max-w-3xl mb-20">
          <span className="text-sm font-bold uppercase tracking-widest text-primary text-glow-purple font-display">Our Mission</span>
          <h1 className="text-4xl md:text-6xl font-display font-black tracking-tight text-white mt-4 leading-none">
            Empowering Your <br className="hidden md:inline" />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Health Autonomy</span>
          </h1>
          <p className="text-zinc-400 font-medium tracking-wide mt-6 leading-relaxed">
            Tranzio was founded with a single premise: fitness trackers shouldn't feel like spreadsheets. They should feel like premium, engaging ecosystems that reward your daily habits and help you realize your peak potential.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {pillars.map((p, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="glass-panel p-6 rounded-2xl flex flex-col justify-between min-h-[260px] hover:border-white/10 transition-colors duration-300"
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center border text-lg ${p.color}`}>
                {p.icon}
              </div>
              <div className="mt-8">
                <h3 className="text-base font-bold font-display text-white mb-3">{p.title}</h3>
                <p className="text-xs text-zinc-500 font-medium leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Team or stats card */}
        <div className="glass-panel p-8 rounded-3xl glow-cyan flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-lg">
            <h3 className="text-xl font-bold font-display text-white">Join the Community</h3>
            <p className="text-xs text-zinc-400 mt-2 font-medium leading-relaxed">
              We are constantly refining the Tranzio ecosystem with new integrations, advanced analytics tools, and localized performance streaks. Check out our open roadmap or request custom tracking features on our social handles.
            </p>
          </div>
          <a
            href="#download"
            className="bg-white text-black font-bold px-8 py-3.5 rounded-full hover:bg-zinc-200 transition-all text-sm flex-shrink-0"
          >
            Explore Roadmap
          </a>
        </div>

      </div>
    </div>
  )
}
