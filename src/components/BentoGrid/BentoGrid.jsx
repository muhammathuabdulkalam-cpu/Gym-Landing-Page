import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiActivity, FiTrendingUp, FiCoffee, FiCompass, FiZap } from 'react-icons/fi'
import CalorieWidget      from '../widgets/CalorieWidget'
import PedometerWidget    from '../widgets/PedometerWidget'
import WeightChartWidget  from '../widgets/WeightChartWidget'
import WorkoutSetsWidget  from '../widgets/WorkoutSetsWidget'

/* ─── Animated ring / pulse dot ─── */
function PulseDot({ color = 'bg-purple-500' }) {
  return (
    <span className="relative flex h-2 w-2">
      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${color} opacity-50`} />
      <span className={`relative inline-flex rounded-full h-2 w-2 ${color}`} />
    </span>
  )
}

/* ─── Mini stat pill inside a card ─── */
function StatPill({ label, value, accent }) {
  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold
                     bg-white/5 border ${accent}`}>
      <span className="text-zinc-400 uppercase tracking-wider">{label}</span>
      <span className="text-white font-display">{value}</span>
    </div>
  )
}

/* ─── Individual card shell ─── */
function BentoCard({ children, className = '', glowColor = 'rgba(168,85,247,0.15)', index }) {
  return (
    <div
      className={`bento-card group relative rounded-3xl overflow-hidden
                  bg-[#0d0e18] border border-white/[0.07]
                  hover:border-white/15 transition-all duration-500
                  ${className}`}
      style={{ '--glow': glowColor }}
    >
      {/* Hover spotlight glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
        style={{ background: `radial-gradient(600px circle at 50% 0%, ${glowColor}, transparent 60%)` }}
      />
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${glowColor.replace('0.15', '0.6')}, transparent)` }}
      />
      {children}
    </div>
  )
}

export default function BentoGrid() {
  const sectionRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    /* Staggered card entrance */
    gsap.fromTo('.bento-card',
      { y: 60, opacity: 0, scale: 0.95 },
      {
        y: 0, opacity: 1, scale: 1,
        duration: 0.9,
        stagger: { amount: 0.55, from: 'start' },
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start:   'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )

    /* Section title reveal */
    gsap.fromTo('.bento-title span',
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.85, stagger: 0.1, ease: 'power4.out',
        scrollTrigger: { trigger: '.bento-title', start: 'top 88%' },
      }
    )

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <section ref={sectionRef} className="relative w-full bg-background py-20 md:py-28 px-5 md:px-12 overflow-hidden">

      {/* Background orbs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-purple-600/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-cyan-500/5 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">

        {/* ── Section header ── */}
        <div className="bento-title text-center mb-14 overflow-hidden">
          <span className="inline-block text-[11px] font-extrabold uppercase tracking-[0.35em] text-purple-400 mb-4">
            <span>Everything you need</span>
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight leading-tight text-white overflow-hidden">
            <span className="inline-block overflow-hidden">
              <span className="inline-block">One App.</span>
            </span>{' '}
            <span className="inline-block overflow-hidden">
              <span className="inline-block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Total Control.
              </span>
            </span>
          </h2>
          <p className="text-zinc-500 max-w-lg mx-auto mt-4 text-sm md:text-base font-medium leading-relaxed">
            <span>Four precision-engineered tracking modules working seamlessly together.</span>
          </p>
        </div>

        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">

          {/* ━━━ Card 1: WIDE — Calorie Tracker (col-span 7) ━━━ */}
          <BentoCard
            className="md:col-span-7 min-h-[420px] flex flex-col"
            glowColor="rgba(168,85,247,0.2)"
          >
            {/* Card header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20
                                   flex items-center justify-center text-purple-400">
                    <FiCoffee size={16} />
                  </span>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-500">Module 01</span>
                </div>
                <h3 className="text-xl md:text-2xl font-display font-black text-white leading-tight mt-2">
                  Nutrients &amp; Calories
                </h3>
                <p className="text-zinc-500 text-xs font-medium mt-1 max-w-xs leading-relaxed">
                  Log daily macros — Protein, Carbs, Fats — and track water intake with quick cup selectors.
                </p>
              </div>
              <div className="hidden sm:flex flex-col gap-2 items-end">
                <StatPill label="Today" value="1,840 kcal" accent="border-purple-500/20" />
                <StatPill label="Water" value="6 cups" accent="border-cyan-500/20" />
              </div>
            </div>

            {/* Live widget */}
            <div className="flex-1 mx-4 mb-4 rounded-2xl overflow-hidden bg-black/20 border border-white/5">
              <div className="scale-[0.92] md:scale-100 origin-top-left w-full h-full">
                <CalorieWidget />
              </div>
            </div>
          </BentoCard>

          {/* ━━━ Card 2: TALL — Pedometer (col-span 5) ━━━ */}
          <BentoCard
            className="md:col-span-5 min-h-[420px] flex flex-col"
            glowColor="rgba(0,240,255,0.15)"
          >
            <div className="flex items-center gap-2 px-6 pt-6 pb-2">
              <span className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20
                               flex items-center justify-center text-cyan-400">
                <FiCompass size={16} />
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-500">Module 02</span>
              <PulseDot color="bg-cyan-500" />
            </div>
            <div className="px-6 pb-4">
              <h3 className="text-xl md:text-2xl font-display font-black text-white leading-tight">
                On-Device Pedometer
              </h3>
              <p className="text-zinc-500 text-xs font-medium mt-1 leading-relaxed">
                Real-time step counting with integrated stopwatch &amp; calorie estimation.
              </p>
            </div>
            <div className="flex-1 mx-4 mb-4 rounded-2xl overflow-hidden bg-black/20 border border-white/5">
              <PedometerWidget />
            </div>
          </BentoCard>

          {/* ━━━ Card 3: MEDIUM — Weight Analytics (col-span 5) ━━━ */}
          <BentoCard
            className="md:col-span-5 min-h-[380px] flex flex-col"
            glowColor="rgba(99,102,241,0.2)"
          >
            <div className="flex items-center gap-2 px-6 pt-6 pb-2">
              <span className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20
                               flex items-center justify-center text-indigo-400">
                <FiTrendingUp size={16} />
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-500">Module 03</span>
            </div>
            <div className="px-6 pb-4">
              <h3 className="text-xl md:text-2xl font-display font-black text-white leading-tight">
                Weight Analytics
              </h3>
              <p className="text-zinc-500 text-xs font-medium mt-1 leading-relaxed">
                BMI, body fat %, and muscle mass — charted over time.
              </p>
            </div>
            <div className="flex-1 mx-4 mb-4 rounded-2xl overflow-hidden bg-black/20 border border-white/5">
              <WeightChartWidget />
            </div>
          </BentoCard>

          {/* ━━━ Card 4: MEDIUM — Strength Tracker (col-span 7) ━━━ */}
          <BentoCard
            className="md:col-span-7 min-h-[380px] flex flex-col"
            glowColor="rgba(236,72,153,0.15)"
          >
            <div className="flex items-center justify-between px-6 pt-6 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-pink-500/10 border border-pink-500/20
                                 flex items-center justify-center text-pink-400">
                  <FiActivity size={16} />
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-500">Module 04</span>
              </div>
              <div className="flex gap-2">
                {['Push', 'Pull', 'Legs'].map(t => (
                  <span key={t} className="px-2 py-1 rounded-lg bg-white/5 border border-white/8 text-[10px] font-bold text-zinc-400 uppercase">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="px-6 pb-4">
              <h3 className="text-xl md:text-2xl font-display font-black text-white leading-tight">
                Strength Sets Tracker
              </h3>
              <p className="text-zinc-500 text-xs font-medium mt-1 leading-relaxed">
                Log exercise names, custom splits, reps &amp; weight per set — in real-time.
              </p>
            </div>
            <div className="flex-1 mx-4 mb-4 rounded-2xl overflow-hidden bg-black/20 border border-white/5">
              <WorkoutSetsWidget />
            </div>
          </BentoCard>

          {/* ━━━ Card 5: FULL-WIDTH — Stats band ━━━ */}
          <BentoCard
            className="md:col-span-12 py-8 px-8"
            glowColor="rgba(168,85,247,0.1)"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
              {/* Left: CTA text */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600
                                 flex items-center justify-center shadow-neon-purple">
                  <FiZap size={18} className="text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-display font-black text-white leading-none">
                    Start Your Streak Today
                  </h4>
                  <p className="text-xs text-zinc-500 font-medium mt-1">
                    All data is stored on-device. Private. Instant. Free.
                  </p>
                </div>
              </div>

              {/* Stats in a row */}
              <div className="flex items-center gap-8 md:gap-16 border-t md:border-t-0 md:border-l border-white/5 pt-6 md:pt-0 md:pl-12 w-full md:w-auto">
                {[
                  { val: '10K+', sub: 'Active Users',     accent: 'text-purple-400' },
                  { val: '2M+',  sub: 'Workouts Logged',  accent: 'text-cyan-400'   },
                  { val: '98%',  sub: 'Accuracy Rate',    accent: 'text-pink-400'   },
                  { val: '4.9',  sub: 'App Store Rating', accent: 'text-emerald-400'},
                ].map((s, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 flex-1 md:flex-none">
                    <span className={`text-2xl md:text-3xl font-display font-black ${s.accent}`}>{s.val}</span>
                    <span className="text-[9px] uppercase tracking-widest text-zinc-600 font-bold text-center">{s.sub}</span>
                  </div>
                ))}
              </div>

              {/* Right: CTA button */}
              <a
                href="https://gym-tracker-14iz.onrender.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 flex items-center gap-2
                           bg-gradient-to-r from-purple-600 to-indigo-600 text-white
                           font-bold px-6 py-3 rounded-2xl text-sm
                           shadow-neon-purple hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]
                           hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Launch App →
              </a>
            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  )
}
