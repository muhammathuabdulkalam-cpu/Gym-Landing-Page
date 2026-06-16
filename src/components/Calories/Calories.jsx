import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiPieChart, FiCoffee, FiTrendingDown, FiAlertCircle } from 'react-icons/fi'
import { FaFire } from 'react-icons/fa'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Calories() {
  const [intake, setIntake] = useState(2000)
  const [burn, setBurn] = useState(2500)
  
  const bmr = 1800
  const totalBurn = bmr + burn
  const balance = intake - totalBurn
  const isDeficit = balance < 0
  const progressText = isDeficit 
    ? `Deficit of ${Math.abs(balance)} kcal` 
    : `Surplus of ${balance} kcal`

  // Calculate approximate weight change per week (7700 kcal = 1kg fat)
  const weightChange = (balance * 7) / 7700

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.fromTo('.cal-header-anim',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.cal-header-anim',
          start: 'top 85%',
        }
      }
    )

    gsap.fromTo('.cal-left-anim',
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.cal-left-anim',
          start: 'top 80%',
        }
      }
    )

    gsap.fromTo('.cal-right-anim',
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.cal-right-anim',
          start: 'top 80%',
        }
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section className="relative py-28 w-full bg-background overflow-hidden border-t border-white/5">
      <div className="absolute top-1/2 left-1/4 w-[350px] h-[350px] rounded-full bg-purple-500/5 blur-[120px] -z-10 animate-blob-2" />
      
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 cal-header-anim">
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-white">
            Understand Your <span className="text-purple-400 text-glow-purple">Caloric Balance</span>
          </h2>
          <p className="text-zinc-400/80 font-medium mt-4 text-sm md:text-base">
            Managing weight isn't just about intense workouts; it's a science of input and output. Play with the slider below to see how consistency yields results.
          </p>
        </div>

        {/* Interaction Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Controls Side */}
          <div className="lg:col-span-5 flex flex-col gap-8 cal-left-anim">
            <h3 className="text-xl font-bold font-display text-white">Interactive Calorie Tool</h3>
            
            {/* Calories Eaten */}
            <div>
              <div className="flex justify-between font-semibold mb-2">
                <span className="text-zinc-400 flex items-center gap-1.5"><FiCoffee /> Daily Intake</span>
                <span className="text-purple-400">{intake.toLocaleString()} kcal</span>
              </div>
              <input 
                type="range" 
                min="1200" 
                max="4000" 
                step="50"
                value={intake} 
                onChange={(e) => setIntake(parseInt(e.target.value))}
                className="w-full accent-purple-500 bg-white/5 rounded-full h-1.5 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-bold mt-1 uppercase">
                <span>1,200 (Extreme Cut)</span>
                <span>4,000 (Bulk)</span>
              </div>
            </div>

            {/* Exercise Burn */}
            <div>
              <div className="flex justify-between font-semibold mb-2">
                <span className="text-zinc-400 flex items-center gap-1.5"><FaFire /> Exercise Burn</span>
                <span className="text-cyan-400">{burn.toLocaleString()} kcal</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="1500" 
                step="50"
                value={burn} 
                onChange={(e) => setBurn(parseInt(e.target.value))}
                className="w-full accent-cyan-400 bg-white/5 rounded-full h-1.5 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 font-bold mt-1 uppercase">
                <span>0 (Sedentary)</span>
                <span>1,500 (Pro Athlete)</span>
              </div>
            </div>

            {/* Static BMR note */}
            <div className="p-4 rounded-xl bg-white/3 border border-white/5 flex gap-3 items-start text-xs text-zinc-400 leading-relaxed font-medium">
              <FiAlertCircle className="text-zinc-500 flex-shrink-0 mt-0.5" size={16} />
              <p>
                <strong>BMR (Basal Metabolic Rate):</strong> Calculated at a baseline of <strong>1,800 kcal</strong>. This is the energy your body naturally burns to keep you alive and breathing.
              </p>
            </div>
          </div>

          {/* Visualization Side */}
          <div className="lg:col-span-7 cal-right-anim">
            <div className="glass-panel p-8 rounded-3xl glow-purple relative overflow-hidden flex flex-col justify-between min-h-[360px]">
              
              {/* Top Row: Visual Scale */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Net Energy Scale</h4>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase ${
                    isDeficit 
                      ? 'bg-purple-500/10 border-purple-500/20 text-purple-400 shadow-neon-purple' 
                      : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
                  }`}>
                    {isDeficit ? 'Deficit' : 'Surplus'}
                  </span>
                </div>

                <div className="flex justify-between items-center gap-4">
                  <div className="text-center w-1/3">
                    <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">Intake</p>
                    <h5 className="text-xl font-bold font-display text-white mt-1">+{intake}</h5>
                  </div>
                  <div className="w-1/3 h-1 bg-white/5 rounded-full relative">
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-background shadow-glass ${
                      isDeficit ? 'bg-purple-500' : 'bg-cyan-400'
                    }`} />
                  </div>
                  <div className="text-center w-1/3">
                    <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">Total Burn</p>
                    <h5 className="text-xl font-bold font-display text-white mt-1">-{totalBurn}</h5>
                  </div>
                </div>
              </div>

              {/* Middle Row: Progress indicator */}
              <div className="my-8 text-center bg-white/3 border border-white/5 p-6 rounded-2xl">
                <p className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Expected Weekly Weight Change</p>
                <h4 className={`text-3xl font-display font-black tracking-tight mt-2 ${
                  isDeficit ? 'text-purple-400 text-glow-purple' : 'text-cyan-400'
                }`}>
                  {weightChange > 0 ? '+' : ''}{weightChange.toFixed(2)} kg
                </h4>
                <p className="text-[10px] text-zinc-500 mt-2 font-medium">
                  {progressText} per day. Results assume high tracking accuracy.
                </p>
              </div>

              {/* Bottom Metrics */}
              <div className="flex justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                    <FiPieChart size={16} />
                  </div>
                  <div>
                    <p className="text-[9px] text-zinc-400 font-semibold uppercase tracking-wider">Tracked Ratio</p>
                    <p className="text-xs font-bold text-white">100% Accurate</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                    <FiTrendingDown size={16} />
                  </div>
                  <div>
                    <p className="text-[9px] text-zinc-400 font-semibold uppercase tracking-wider">Forecast</p>
                    <p className="text-xs font-bold text-white">Consistent Loss</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
