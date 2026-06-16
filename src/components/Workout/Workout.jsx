import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiDribbble, FiActivity, FiAnchor, FiHeart } from 'react-icons/fi'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Workout() {
  const [activeSplit, setActiveSplit] = useState(0)
  const containerRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Motion graphics style entrance reveal
    gsap.fromTo('.workout-header-anim', 
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.workout-header-anim',
          start: 'top 85%',
        }
      }
    )

    gsap.fromTo('.workout-tab-anim', 
      { x: -50, opacity: 0 },
      { 
        x: 0, 
        opacity: 1, 
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.workout-tab-anim',
          start: 'top 85%',
        }
      }
    )

    gsap.fromTo('.workout-card-anim', 
      { scale: 0.9, opacity: 0, y: 50 },
      { 
        scale: 1, 
        opacity: 1, 
        y: 0,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.workout-card-anim',
          start: 'top 80%',
        }
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  const splits = [
    {
      title: "Push Day",
      tagline: "Upper Body Hypertrophy",
      duration: "55 mins",
      calories: "450 kcal",
      target: "Chest, Shoulders, Triceps",
      icon: <FiActivity />,
      color: "from-purple-500/20 to-purple-500/5",
      borderColor: "group-hover:border-purple-500/40",
      accent: "text-purple-400 animate-pulse",
      exercises: ["Bench Press (4x8)", "Incline DB Flyes (3x12)", "Overhead Press (4x10)", "Lateral Raises (3x15)", "Tricep Pushdowns (4x12)"]
    },
    {
      title: "Pull Day",
      tagline: "Back & Bicep Strength",
      duration: "60 mins",
      calories: "480 kcal",
      target: "Back, Rear Delts, Biceps",
      icon: <FiDribbble />,
      color: "from-cyan-500/20 to-cyan-500/5",
      borderColor: "group-hover:border-cyan-500/40",
      accent: "text-cyan-400",
      exercises: ["Deadlifts (3x5)", "Weighted Pull-Ups (4x8)", "Barbell Rows (3x10)", "Face Pulls (3x15)", "Incline Bicep Curls (4x10)"]
    },
    {
      title: "Leg Day",
      tagline: "Lower Body & Core Power",
      duration: "65 mins",
      calories: "600 kcal",
      target: "Quads, Hamstrings, Calves",
      icon: <FiAnchor />,
      color: "from-pink-500/20 to-pink-500/5",
      borderColor: "group-hover:border-pink-500/40",
      accent: "text-pink-400",
      exercises: ["Back Squats (4x6)", "Romanian Deadlifts (4x8)", "Leg Press (3x12)", "Calf Raises (4x20)", "Hanging Leg Raises (3x15)"]
    },
    {
      title: "Cardio & Core",
      tagline: "Endurance & Conditioning",
      duration: "40 mins",
      calories: "380 kcal",
      target: "Heart Health, Abs, Cardio",
      icon: <FiHeart />,
      color: "from-purple-500/20 to-cyan-500/5",
      borderColor: "group-hover:border-purple-500/40",
      accent: "text-purple-300",
      exercises: ["HIIT Treadmill (20m)", "Rowing Machine (10m)", "Russian Twists (3x30)", "Plank Holds (3x1m)", "Cable Crunches (3x15)"]
    }
  ]

  return (
    <section ref={containerRef} className="relative py-28 w-full bg-background overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-radial-gradient(ellipse at center, rgba(168, 85, 247, 0.02) 0%, transparent 70%) pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 workout-header-anim">
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-white">
            Custom Workout <span className="text-purple-400 text-glow-purple">Splits</span>
          </h2>
          <p className="text-zinc-400/80 font-medium mt-4 text-sm md:text-base">
            Build muscle, burn calories, or stay in shape. Choose from our standard plans, or customize exercises, rest times, and intensity.
          </p>
        </div>

        {/* Dynamic Splits Interaction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Tabs list */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {splits.map((split, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSplit(idx)}
                className={`workout-tab-anim group text-left p-5 rounded-2xl border transition-all duration-300 ${
                  activeSplit === idx
                    ? 'bg-white/5 border-white/10 glow-purple'
                    : 'bg-transparent border-white/5 hover:bg-white/3'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 text-lg ${
                      activeSplit === idx ? split.accent : 'text-zinc-500'
                    }`}>
                      {split.icon}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white font-display">{split.title}</h4>
                      <p className="text-xs text-zinc-500 font-semibold">{split.tagline}</p>
                    </div>
                  </div>
                  <span className="text-xs text-zinc-400 font-semibold">{split.duration}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Exercise Details Card */}
          <div className="lg:col-span-7 workout-card-anim">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSplit}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="glass-panel p-8 rounded-3xl relative overflow-hidden"
              >
                {/* Accent Background Gradient */}
                <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${splits[activeSplit].color} rounded-full blur-3xl -z-10`} />

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/5 pb-6 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold font-display text-white">{splits[activeSplit].title}</h3>
                    <p className="text-sm text-zinc-400 mt-1">{splits[activeSplit].tagline}</p>
                  </div>
                  <div className="flex gap-4 mt-4 md:mt-0">
                    <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-center">
                      <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">Burn Rate</p>
                      <p className={`text-sm font-bold mt-0.5 ${splits[activeSplit].accent}`}>{splits[activeSplit].calories}</p>
                    </div>
                    <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-center">
                      <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">Targets</p>
                      <p className="text-sm font-bold text-white mt-0.5">{splits[activeSplit].duration}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-4">Target Muscle Groups</h4>
                  <p className="text-sm font-semibold text-zinc-200">{splits[activeSplit].target}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-4">Sample Workout Plan</h4>
                  <ul className="flex flex-col gap-3">
                    {splits[activeSplit].exercises.map((ex, idx) => (
                      <motion.li 
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center gap-3 text-sm font-semibold text-zinc-300 bg-white/3 border border-white/3 py-3 px-4 rounded-xl hover:bg-white/5 transition-colors"
                      >
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-white/5 ${splits[activeSplit].accent}`}>
                          {idx + 1}
                        </span>
                        {ex}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  )
}
