import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiActivity, FiTrendingUp, FiCoffee, FiCompass } from 'react-icons/fi'
import WeightChartWidget from '../widgets/WeightChartWidget'
import WorkoutSetsWidget from '../widgets/WorkoutSetsWidget'
import CalorieWidget from '../widgets/CalorieWidget'
import PedometerWidget from '../widgets/PedometerWidget'

export default function Features() {
  const containerRef   = useRef(null)
  const mobileRef      = useRef(null)

  /* ─────────────── DATA ─────────────── */
  const featureData = [
    {
      title: 'Tranzio Ecosystem',
      desc:  'An all-in-one health suite designed to log, compute, and forecast performance metrics. Scroll down to deconstruct the dashboard widgets.',
      accent: 'text-purple-400',
      icon:   <FiActivity size={24} />,
    },
    {
      title:  'Nutrients & Calories',
      desc:   'Hit your macro targets. Log daily food intake with detailed macronutrient tracking of Protein, Carbs, and Fats. Water logs via quick cup selectors.',
      accent: 'text-purple-400',
      icon:   <FiCoffee size={24} />,
      widget: <CalorieWidget />,
      color:  'from-purple-500/20',
      tag:    'MODULE 01',
    },
    {
      title:  'On-Device Pedometer',
      desc:   'Employs on-device accelerometer sensors to record live steps, count duration with an integrated stopwatch, and estimate active calories burned.',
      accent: 'text-cyan-400',
      icon:   <FiCompass size={24} />,
      widget: <PedometerWidget />,
      color:  'from-cyan-500/20',
      tag:    'MODULE 02',
    },
    {
      title:  'Weight & Body Analytics',
      desc:   'Observe trends. Monitor BMI, body fat percentage, and skeletal muscle mass progression charts synced alongside your daily weight logs.',
      accent: 'text-cyan-400',
      icon:   <FiTrendingUp size={24} />,
      widget: <WeightChartWidget />,
      color:  'from-indigo-500/20',
      tag:    'MODULE 03',
    },
    {
      title:  'Strength Sets Tracker',
      desc:   'Ditch paper notebooks. Log exercise names, manage custom workout splits (Push/Pull/Legs), and track multiple sets with reps & weight logs in real-time.',
      accent: 'text-purple-400',
      icon:   <FiActivity size={24} />,
      widget: <WorkoutSetsWidget />,
      color:  'from-pink-500/20',
      tag:    'MODULE 04',
    },
  ]

  /* ─────────────── ANIMATIONS ─────────────── */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const mm = gsap.matchMedia()

    /* ═══════════ DESKTOP: 3-D Explode Tour ═══════════ */
    mm.add('(min-width: 768px)', () => {
      const leftSlides = gsap.utils.toArray('.feature-left-slide')
      gsap.set(leftSlides.slice(1), { opacity: 0, y: 30, display: 'none' })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=500%',
          pin: true,
          scrub: 1,
        },
      })

      // STEP 1 — Explode
      tl.add('explode')
        .to('.exploded-card-0', { x: -80, y: -60, scale: 0.95, rotateY:  15, duration: 1 }, 'explode')
        .to('.exploded-card-1', { x:  80, y: -60, scale: 0.95, rotateY: -15, duration: 1 }, 'explode')
        .to('.exploded-card-2', { x: -80, y:  60, scale: 0.95, rotateY:  15, duration: 1 }, 'explode')
        .to('.exploded-card-3', { x:  80, y:  60, scale: 0.95, rotateY: -15, duration: 1 }, 'explode')
        .to({}, { duration: 0.5 })

      // STEP 2 — Focus Card 0
      tl.add('focus-0')
        .to(leftSlides[0], { opacity: 0, y: -20, display: 'none', duration: 0.4 }, 'focus-0')
        .to(leftSlides[1], { display: 'flex', opacity: 1, y: 0,   duration: 0.5 }, 'focus-0+=0.4')
        .to('.step-indicator-1', { backgroundColor: '#A855F7', scale: 1.3, boxShadow: '0 0 10px #A855F7', duration: 0.5 }, 'focus-0')
        .to('.step-label-1',     { color: '#ffffff', duration: 0.5 }, 'focus-0')
        .to('.exploded-card-0',  { x: 135, y: 135, scale: 1.25, rotateY: 0,  z: 150, opacity: 1, zIndex: 50, duration: 1.2 }, 'focus-0')
        .to('.exploded-card-1',  { opacity: 0, scale: 0.85, z: -100, duration: 1 }, 'focus-0')
        .to('.exploded-card-2',  { opacity: 0, scale: 0.85, z: -100, duration: 1 }, 'focus-0')
        .to('.exploded-card-3',  { opacity: 0, scale: 0.85, z: -100, duration: 1 }, 'focus-0')
        .to({}, { duration: 0.6 })

      // STEP 3 — Focus Card 1
      tl.add('focus-1')
        .to(leftSlides[1], { opacity: 0, y: -20, display: 'none', duration: 0.4 }, 'focus-1')
        .to(leftSlides[2], { display: 'flex', opacity: 1, y: 0,   duration: 0.5 }, 'focus-1+=0.4')
        .to('.step-indicator-1', { backgroundColor: 'rgba(255,255,255,0.15)', scale: 1, boxShadow: 'none', duration: 0.5 }, 'focus-1')
        .to('.step-label-1',     { color: 'rgba(255,255,255,0.3)',  duration: 0.5 }, 'focus-1')
        .to('.step-indicator-2', { backgroundColor: '#00F0FF', scale: 1.3, boxShadow: '0 0 10px #00F0FF', duration: 0.5 }, 'focus-1')
        .to('.step-label-2',     { color: '#ffffff', duration: 0.5 }, 'focus-1')
        .to('.exploded-card-0',  { x: -80, y: -60, scale: 0.95, rotateY: 15, z: 0, opacity: 0, zIndex: 10, duration: 1.2 }, 'focus-1')
        .to('.exploded-card-1',  { x: -135, y: 135, scale: 1.25, rotateY: 0, z: 150, opacity: 1, zIndex: 50, duration: 1.2 }, 'focus-1')
        .to('.exploded-card-2',  { opacity: 0, scale: 0.85, z: -100, duration: 1 }, 'focus-1')
        .to('.exploded-card-3',  { opacity: 0, scale: 0.85, z: -100, duration: 1 }, 'focus-1')
        .to({}, { duration: 0.6 })

      // STEP 4 — Focus Card 2
      tl.add('focus-2')
        .to(leftSlides[2], { opacity: 0, y: -20, display: 'none', duration: 0.4 }, 'focus-2')
        .to(leftSlides[3], { display: 'flex', opacity: 1, y: 0,   duration: 0.5 }, 'focus-2+=0.4')
        .to('.step-indicator-2', { backgroundColor: 'rgba(255,255,255,0.15)', scale: 1, boxShadow: 'none', duration: 0.5 }, 'focus-2')
        .to('.step-label-2',     { color: 'rgba(255,255,255,0.3)',  duration: 0.5 }, 'focus-2')
        .to('.step-indicator-3', { backgroundColor: '#A855F7', scale: 1.3, boxShadow: '0 0 10px #A855F7', duration: 0.5 }, 'focus-2')
        .to('.step-label-3',     { color: '#ffffff', duration: 0.5 }, 'focus-2')
        .to('.exploded-card-0',  { opacity: 0, scale: 0.85, z: -100, duration: 1 }, 'focus-2')
        .to('.exploded-card-1',  { x: 80, y: -60, scale: 0.95, rotateY: -15, z: 0, opacity: 0, zIndex: 10, duration: 1.2 }, 'focus-2')
        .to('.exploded-card-2',  { x: 135, y: -135, scale: 1.25, rotateY: 0, z: 150, opacity: 1, zIndex: 50, duration: 1.2 }, 'focus-2')
        .to('.exploded-card-3',  { opacity: 0, scale: 0.85, z: -100, duration: 1 }, 'focus-2')
        .to({}, { duration: 0.6 })

      // STEP 5 — Focus Card 3
      tl.add('focus-3')
        .to(leftSlides[3], { opacity: 0, y: -20, display: 'none', duration: 0.4 }, 'focus-3')
        .to(leftSlides[4], { display: 'flex', opacity: 1, y: 0,   duration: 0.5 }, 'focus-3+=0.4')
        .to('.step-indicator-3', { backgroundColor: 'rgba(255,255,255,0.15)', scale: 1, boxShadow: 'none', duration: 0.5 }, 'focus-3')
        .to('.step-label-3',     { color: 'rgba(255,255,255,0.3)',  duration: 0.5 }, 'focus-3')
        .to('.step-indicator-4', { backgroundColor: '#00F0FF', scale: 1.3, boxShadow: '0 0 10px #00F0FF', duration: 0.5 }, 'focus-3')
        .to('.step-label-4',     { color: '#ffffff', duration: 0.5 }, 'focus-3')
        .to('.exploded-card-0',  { opacity: 0, scale: 0.85, z: -100, duration: 1 }, 'focus-3')
        .to('.exploded-card-1',  { opacity: 0, scale: 0.85, z: -100, duration: 1 }, 'focus-3')
        .to('.exploded-card-2',  { x: -80, y: 60, scale: 0.95, rotateY: 15, z: 0, opacity: 0, zIndex: 10, duration: 1.2 }, 'focus-3')
        .to('.exploded-card-3',  { x: -135, y: -135, scale: 1.25, rotateY: 0, z: 150, opacity: 1, zIndex: 50, duration: 1.2 }, 'focus-3')
        .to({}, { duration: 0.6 })

      // STEP 6 — Reassemble
      tl.add('assemble')
        .to('.exploded-card-0', { x: 0, y: 0, scale: 1, rotateY: 0, z: 0, opacity: 1, zIndex: 10, duration: 1.2 }, 'assemble')
        .to('.exploded-card-1', { x: 0, y: 0, scale: 1, rotateY: 0, z: 0, opacity: 1, zIndex: 10, duration: 1.2 }, 'assemble')
        .to('.exploded-card-2', { x: 0, y: 0, scale: 1, rotateY: 0, z: 0, opacity: 1, zIndex: 10, duration: 1.2 }, 'assemble')
        .to('.exploded-card-3', { x: 0, y: 0, scale: 1, rotateY: 0, z: 0, opacity: 1, zIndex: 10, duration: 1.2 }, 'assemble')
        .to({}, { duration: 0.5 })
    })

    /* ═══════════ MOBILE: Cinematic Vertical Card Reveals ═══════════ */
    mm.add('(max-width: 767px)', () => {
      // Section header reveal
      gsap.fromTo('.mob-features-header',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.mob-features-header', start: 'top 88%' },
        }
      )

      // Each card: cinematic entrance — text left, card right, both converge
      gsap.utils.toArray('.mob-feat-card').forEach((card, i) => {
        const text   = card.querySelector('.mob-feat-text')
        const widget = card.querySelector('.mob-feat-widget')
        const tag    = card.querySelector('.mob-feat-tag')

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        })

        // tag line flash
        tl.fromTo(tag,
          { opacity: 0, letterSpacing: '0.4em' },
          { opacity: 1, letterSpacing: '0.2em', duration: 0.5, ease: 'power2.out' }
        )
        // text block slides up
        tl.fromTo(text,
          { y: 50, opacity: 0, clipPath: 'inset(0 0 100% 0)' },
          { y: 0,  opacity: 1, clipPath: 'inset(0 0 0% 0)',   duration: 0.8, ease: 'power4.out' },
          '-=0.2'
        )
        // widget swoops in from right with 3D tilt
        tl.fromTo(widget,
          { x: 80, opacity: 0, rotateY: 25, scale: 0.85 },
          { x: 0,  opacity: 1, rotateY:  0, scale: 1,    duration: 1, ease: 'power4.out' },
          '-=0.5'
        )
        // neon line sweeps in
        const line = card.querySelector('.mob-feat-line')
        if (line) {
          tl.fromTo(line,
            { scaleX: 0, opacity: 0 },
            { scaleX: 1, opacity: 1, duration: 0.6, ease: 'power3.out', transformOrigin: 'left' },
            '-=0.8'
          )
        }
      })
    })

    return () => {
      mm.revert()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  /* ─────────────── RENDER ─────────────── */
  return (
    <>
      {/* ══════════════ DESKTOP LAYOUT ══════════════ */}
      <section
        ref={containerRef}
        id="features"
        className="hidden md:flex relative min-h-screen w-full items-center justify-center bg-background overflow-hidden"
        style={{ perspective: 1200 }}
      >
        <div className="max-w-6xl w-full h-full flex flex-row items-center justify-between px-12 relative">

          {/* Left: description + stepper */}
          <div className="w-[44%] h-[460px] flex flex-col justify-between z-20">

            <div className="relative h-[250px] w-full flex items-center">
              {featureData.map((item, idx) => (
                <div
                  key={idx}
                  className="feature-left-slide absolute inset-0 flex flex-col justify-center"
                  style={{ display: idx === 0 ? 'flex' : 'none' }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${item.accent} shadow-neon-purple`}>
                      {item.icon}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 font-display">
                      {idx === 0 ? 'OVERVIEW' : `MODULE 0${idx}`}
                    </span>
                  </div>
                  <h2 className="text-5xl font-display font-black tracking-tight text-white mb-4 leading-none">
                    {item.title}
                  </h2>
                  <p className="text-zinc-400/80 font-medium tracking-wide leading-relaxed text-base">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3.5 border-t border-white/5 pt-6 mt-4">
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-zinc-600 block mb-1">Ecosystem Index</span>
              {featureData.slice(1).map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className={`step-indicator-${idx + 1} w-2.5 h-2.5 rounded-full bg-white/10 transition-all duration-300`} />
                  <span className={`step-label-${idx + 1} text-xs font-bold uppercase tracking-wider text-white/30 transition-colors duration-300 font-display`}>
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: exploded card grid */}
          <div
            className="w-[52%] h-[540px] relative flex items-center justify-center overflow-visible z-10"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div
              className="w-[520px] h-[520px] relative scale-[0.9] lg:scale-100 origin-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="exploded-card-0 absolute top-0 left-0 w-[250px] h-[250px]" style={{ transformStyle: 'preserve-3d', zIndex: 20 }}>
                <CalorieWidget />
              </div>
              <div className="exploded-card-1 absolute top-0 right-0 w-[250px] h-[250px]" style={{ transformStyle: 'preserve-3d', zIndex: 20 }}>
                <PedometerWidget />
              </div>
              <div className="exploded-card-2 absolute bottom-0 left-0 w-[250px] h-[250px]" style={{ transformStyle: 'preserve-3d', zIndex: 20 }}>
                <WeightChartWidget />
              </div>
              <div className="exploded-card-3 absolute bottom-0 right-0 w-[250px] h-[250px]" style={{ transformStyle: 'preserve-3d', zIndex: 20 }}>
                <WorkoutSetsWidget />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ MOBILE LAYOUT — Cinematic Vertical Reveals ══════════════ */}
      <section
        ref={mobileRef}
        id="features-mobile"
        className="md:hidden relative w-full bg-background overflow-hidden pt-8 pb-16"
        style={{ perspective: 1000 }}
      >
        {/* Background glow blobs */}
        <div className="absolute top-1/4 -left-20 w-64 h-64 rounded-full bg-purple-500/5 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-64 h-64 rounded-full bg-cyan-500/5 blur-[80px] pointer-events-none" />

        {/* Section header */}
        <div className="mob-features-header px-6 mb-12 text-center">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-purple-400 block mb-3">
            Ecosystem Index
          </span>
          <h2 className="text-4xl font-display font-black tracking-tight text-white leading-tight">
            Four Modules.<br />
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              One Platform.
            </span>
          </h2>
          <p className="text-zinc-500 text-sm font-medium mt-3 leading-relaxed">
            Scroll to explore each tracking module.
          </p>
        </div>

        {/* Feature cards — each one has a cinematic entrance */}
        <div className="flex flex-col gap-16 px-5">
          {featureData.slice(1).map((item, idx) => (
            <div
              key={idx}
              className="mob-feat-card relative"
              style={{ perspective: 800 }}
            >
              {/* Neon accent line */}
              <div
                className={`mob-feat-line h-[2px] w-full rounded-full mb-6 bg-gradient-to-r ${
                  idx % 2 === 0 ? 'from-purple-500 to-transparent' : 'from-cyan-500 to-transparent'
                } origin-left`}
              />

              {/* Tag */}
              <div className="mob-feat-tag flex items-center gap-2 mb-3">
                <div className={`w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center ${item.accent}`}>
                  {item.icon}
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-zinc-500 font-display">
                  {item.tag}
                </span>
              </div>

              {/* Text */}
              <div className="mob-feat-text mb-6">
                <h3 className={`text-3xl font-display font-black tracking-tight text-white mb-2 leading-none ${item.accent}`}>
                  {item.title}
                </h3>
                <p className="text-zinc-400/80 text-sm font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Widget card — full width, properly sized */}
              <div
                className="mob-feat-widget w-full rounded-2xl overflow-hidden"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="relative w-full" style={{ minHeight: 220 }}>
                  {item.widget}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
