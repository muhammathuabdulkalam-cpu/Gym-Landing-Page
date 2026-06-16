import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { FiArrowRight, FiX, FiLink, FiSmartphone, FiMonitor, FiActivity, FiTrendingUp } from 'react-icons/fi'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TranzioDashboard from '../widgets/TranzioDashboard'

/* ─── Floating badge pill that hovers around dashboard ─── */
function FloatingBadge({ icon, label, value, accent, delay, style }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`hidden md:flex absolute z-20 items-center gap-2.5
                  bg-[#0d0e18]/90 border backdrop-blur-xl
                  px-3.5 py-2.5 rounded-2xl shadow-2xl
                  ${accent}`}
      style={style}
    >
      <span className="text-lg">{icon}</span>
      <div className="leading-none">
        <p className="text-white font-display font-black text-sm">{value}</p>
        <p className="text-zinc-500 text-[10px] font-semibold uppercase tracking-wider mt-0.5">{label}</p>
      </div>
    </motion.div>
  )
}

export default function Hero() {
  const containerRef    = useRef(null)
  const dashboardRef    = useRef(null)
  const [showModal, setShowModal] = useState(false)

  /* ─── Scroll animations ─── */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Dashboard scroll-driven zoom (Apple-style)
    gsap.fromTo(dashboardRef.current,
      { scale: 0.8, y: 80 },
      {
        scale: 1.04,
        y:    -30,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start:   'top top',
          end:     '50% top',
          scrub:   1.5,
        },
      }
    )

    // Hero text fade out on scroll
    gsap.to('.hero-content',{
      yPercent: -20,
      opacity:   0,
      ease:      'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start:   'top top',
        end:     '35% top',
        scrub:   true,
      },
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  /* ─── Animation variants ─── */
  const container = {
    hidden: {},
    show:   { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  }
  const fadeUp = {
    hidden: { y: 48, opacity: 0 },
    show:   { y: 0, opacity: 1, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-[160vh] w-full overflow-hidden"
      style={{ background: '#030303' }}
    >
      {/* ═══════════ BACKGROUND LAYERS ═══════════ */}

      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      {/* Large radial gradient — primary purple orb */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2
                      w-[900px] h-[700px] rounded-full
                      bg-gradient-radial from-purple-600/20 via-purple-900/8 to-transparent
                      blur-[80px] pointer-events-none" />

      {/* Secondary cyan orb bottom-right */}
      <div className="absolute top-[40%] right-[-5%]
                      w-[500px] h-[500px] rounded-full
                      bg-gradient-radial from-cyan-500/12 via-cyan-900/5 to-transparent
                      blur-[80px] pointer-events-none animate-blob-2" />

      {/* Diagonal neon beam — top left → center */}
      <div
        className="absolute top-0 left-0 w-full h-[2px] pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(168,85,247,0.4) 40%, rgba(0,240,255,0.2) 70%, transparent 100%)',
          transform: 'rotate(-8deg) translateY(220px)',
          filter: 'blur(1px)',
        }}
      />
      <div
        className="absolute top-0 left-0 w-full h-[1px] pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(168,85,247,0.25) 50%, transparent 100%)',
          transform: 'rotate(-8deg) translateY(240px)',
        }}
      />

      {/* Side vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background pointer-events-none" />

      {/* ═══════════ HERO CONTENT ═══════════ */}
      <div className="hero-content relative z-10 flex flex-col items-center text-center pt-28 md:pt-36 px-5 md:px-12">

        {/* Pill badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 px-4 py-2 rounded-full mb-8
                     bg-gradient-to-r from-purple-500/10 to-cyan-500/10
                     border border-purple-500/20 backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          <span className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-purple-300">
            Health Tracking Reimagined
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-5xl"
        >
          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-6xl md:text-8xl font-display font-black tracking-tight leading-[0.92] text-white mb-4"
          >
            <span className="block">Transform</span>
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Your Fitness
            </span>
            <span className="block">Journey.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-base md:text-xl text-zinc-400 max-w-xl mx-auto font-medium leading-relaxed"
          >
            Track workouts. Monitor calories. Measure progress.{' '}
            <span className="text-zinc-300">Stay consistent with Tranzio.</span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 mt-10 justify-center items-center"
          >
            {/* Web App — window.open guarantees redirect even on Render cold starts */}
            <button
              onClick={() => window.open('https://gym-tracker-14iz.onrender.com', '_blank', 'noopener,noreferrer')}
              className="group relative inline-flex items-center gap-2.5
                         bg-gradient-to-r from-purple-600 to-indigo-600
                         text-white font-bold px-8 py-4 rounded-2xl text-sm md:text-base
                         shadow-neon-purple hover:shadow-[0_0_40px_rgba(168,85,247,0.5)]
                         hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <FiMonitor size={18} />
              <span>Launch Web App</span>
              <FiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2.5
                         bg-white/5 border border-white/10 hover:border-white/20
                         text-white font-semibold px-8 py-4 rounded-2xl text-sm md:text-base
                         backdrop-blur-sm hover:bg-white/10
                         transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <FiSmartphone size={18} />
              <span>Mobile App</span>
            </button>
          </motion.div>

          {/* Stat row */}
          <motion.div
            variants={fadeUp}
            className="flex items-center justify-center gap-8 md:gap-14 mt-12
                       border-t border-white/5 pt-8"
          >
            {[
              { val: '4+',   sub: 'Tracking Modules' },
              { val: '100%', sub: 'On-Device Data'   },
              { val: '5 ★',  sub: 'Rated by Users'   },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="text-2xl md:text-4xl font-display font-black text-white">{s.val}</span>
                <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold">{s.sub}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ═══════════ DASHBOARD CENTERPIECE ═══════════ */}
      <div className="relative z-10 flex justify-center items-center mt-12 md:mt-16 px-4">

        {/* Glow ring behind dashboard */}
        <div className="absolute w-[560px] h-[320px] rounded-[40px]
                        bg-gradient-to-r from-purple-600/25 via-indigo-600/15 to-cyan-600/20
                        blur-[60px] pointer-events-none" />

        {/* Floating badges — only on md+ */}
        <FloatingBadge
          icon="🔥"
          label="Calories Today"
          value="1,840 kcal"
          accent="border-orange-500/20"
          delay={0.8}
          style={{ top: '8%', left: '-2%' }}
        />
        <FloatingBadge
          icon="👟"
          label="Steps Today"
          value="8,432"
          accent="border-cyan-500/20"
          delay={1.0}
          style={{ top: '8%', right: '-2%' }}
        />
        <FloatingBadge
          icon="💪"
          label="Workouts Done"
          value="3 Sets"
          accent="border-purple-500/20"
          delay={1.2}
          style={{ bottom: '12%', left: '0%' }}
        />
        <FloatingBadge
          icon="⚖️"
          label="Current Weight"
          value="76.8 kg"
          accent="border-emerald-500/20"
          delay={1.4}
          style={{ bottom: '12%', right: '0%' }}
        />

        {/* Dashboard card */}
        <div
          ref={dashboardRef}
          className="w-full max-w-3xl md:max-w-4xl relative"
          style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
        >
          {/* Subtle rainbow border glow */}
          <div className="absolute -inset-[1px] rounded-[28px] bg-gradient-to-r
                          from-purple-500/40 via-pink-500/20 to-cyan-500/40
                          blur-[2px] -z-10" />

          <TranzioDashboard />
        </div>
      </div>

      {/* ═══════════ MODAL ═══════════ */}
      {showModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowModal(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="relative w-full max-w-lg bg-[#0e0f1c] border border-white/10
                       rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Modal top bar */}
            <div className="flex items-center justify-between px-6 pt-6 pb-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500
                                flex items-center justify-center">
                  <span className="font-display font-black text-white text-xs">T</span>
                </div>
                <span className="font-display font-bold text-white text-sm tracking-wide">
                  TRANZIO<span className="text-purple-400">FIT</span>
                </span>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 text-zinc-500 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                <FiX size={18} />
              </button>
            </div>

            <div className="px-6 pb-6 pt-5 flex flex-col gap-4">

              {/* ── Web App CTA ── */}
              <div className="rounded-2xl bg-gradient-to-br from-purple-600/10 to-indigo-600/5
                              border border-purple-500/20 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <FiMonitor size={14} className="text-purple-400" />
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-400">Web App</span>
                    </div>
                    <h4 className="text-base font-display font-black text-white leading-tight">Open in Browser</h4>
                    <p className="text-zinc-400 text-xs mt-1 leading-relaxed">
                      Full-featured web version — works on any device with a browser.
                    </p>
                    <p className="text-zinc-600 text-[10px] mt-2 font-mono">gym-tracker-14iz.onrender.com</p>
                  </div>
                  <button
                    onClick={() => {
                      window.open('https://gym-tracker-14iz.onrender.com', '_blank', 'noopener,noreferrer')
                      setShowModal(false)
                    }}
                    className="flex-shrink-0 flex items-center gap-1.5
                               bg-gradient-to-r from-purple-600 to-indigo-600
                               text-white font-bold px-4 py-2.5 rounded-xl text-xs
                               shadow-neon-purple hover:scale-105 active:scale-95
                               transition-all duration-200 whitespace-nowrap mt-1"
                  >
                    Open Now <FiArrowRight size={12} />
                  </button>
                </div>
              </div>

              {/* ── Mobile App CTA ── */}
              <div className="rounded-2xl bg-white/[0.03] border border-white/8 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <FiSmartphone size={14} className="text-cyan-400" />
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-400">Mobile App</span>
                </div>
                <h4 className="text-base font-display font-black text-white leading-tight mb-1">
                  Install Standalone App
                </h4>
                <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                  Download and install the latest standalone mobile build directly from Expo EAS (iOS & Android).
                </p>

                {/* Direct download button */}
                <a
                  href="https://expo.dev/accounts/muhammathuabdulkalam/projects/GYM-APP/builds/0d03a59d-05d0-4acb-9e73-fa80163eb251"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2
                             bg-gradient-to-r from-cyan-500 to-blue-600
                             text-white font-bold py-3 px-4 rounded-xl text-xs md:text-sm
                             shadow-neon-cyan hover:scale-[1.02] active:scale-[0.98]
                             transition-all duration-200"
                >
                  <FiSmartphone size={14} /> Download EAS Mobile Build
                </a>

                {/* Divider */}
                <div className="flex items-center gap-2 my-4">
                  <div className="h-[1px] bg-white/5 flex-grow" />
                  <span className="text-[9px] font-extrabold text-zinc-500 uppercase tracking-widest">or developer testing</span>
                  <div className="h-[1px] bg-white/5 flex-grow" />
                </div>

                {/* Expo Go steps */}
                <div className="flex flex-col gap-2.5">
                  <p className="text-[10px] font-bold text-zinc-400">Run via Local Development Server:</p>
                  {[
                    { step: '1', text: <> Install <strong className="text-white">Expo Go</strong> from the App Store or Google Play. </> },
                    { step: '2', text: <> Make sure <code className="bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-[10px] text-purple-300">npx expo start</code> is running in <code className="bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-[10px] text-purple-300">GYM-APP</code>. </> },
                  ].map(({ step, text }) => (
                    <div key={step} className="flex gap-2.5 items-start">
                      <span className="w-4 h-4 rounded-full bg-cyan-500/10 text-cyan-400 text-[9px] font-black
                                       flex items-center justify-center flex-shrink-0 mt-0.5">{step}</span>
                      <p className="text-[11px] text-zinc-300 font-medium flex-grow leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Dismiss ── */}
              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-white/4 hover:bg-white/8 border border-white/8
                           text-zinc-400 hover:text-white font-semibold py-3 rounded-xl text-xs
                           transition-all duration-200"
              >
                Close
              </button>

            </div>
          </motion.div>
        </div>
      )}
    </section>
  )
}

