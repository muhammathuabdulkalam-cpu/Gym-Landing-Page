import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiActivity, FiTrendingUp, FiCoffee, FiCompass } from 'react-icons/fi'
import WeightChartWidget  from '../widgets/WeightChartWidget'
import WorkoutSetsWidget  from '../widgets/WorkoutSetsWidget'
import CalorieWidget      from '../widgets/CalorieWidget'
import PedometerWidget    from '../widgets/PedometerWidget'

export default function Features() {
  const containerRef = useRef(null)
  const gridRef      = useRef(null)   // the 520×520 inner grid

  /* ─────────────── Feature copy ─────────────── */
  const featureData = [
    {
      title: 'Tranzio Ecosystem',
      desc:  'An all-in-one health suite designed to log, compute, and forecast performance metrics. Scroll down to deconstruct the dashboard widgets.',
      accent: 'text-purple-400',
      icon:   <FiActivity size={22} />,
    },
    {
      title:  'Nutrients & Calories',
      desc:   'Hit your macro targets. Log daily food intake with detailed macronutrient tracking of Protein, Carbs, and Fats.',
      accent: 'text-purple-400',
      icon:   <FiCoffee size={22} />,
    },
    {
      title:  'On-Device Pedometer',
      desc:   'Accelerometer-powered step counting with an integrated stopwatch and active-calorie estimation — fully offline.',
      accent: 'text-cyan-400',
      icon:   <FiCompass size={22} />,
    },
    {
      title:  'Weight & Body Analytics',
      desc:   'Monitor BMI, body fat %, and skeletal muscle mass on progressive charts alongside your daily weight logs.',
      accent: 'text-cyan-400',
      icon:   <FiTrendingUp size={22} />,
    },
    {
      title:  'Strength Sets Tracker',
      desc:   'Log exercise names, manage custom Push/Pull/Legs splits, and record sets with reps & weight in real-time.',
      accent: 'text-purple-400',
      icon:   <FiActivity size={22} />,
    },
  ]

  /* ─────────────── GSAP SETUP ─────────────── */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Ignore mobile address bar resize events to prevent jumpy layout shifts
    ScrollTrigger.config({ ignoreMobileResize: true })

    // Normalize touch scroll on mobile to resolve touch momentum and lagging scrub behaviors
    const isMobileDevice = window.innerWidth < 768
    if (isMobileDevice) {
      ScrollTrigger.normalizeScroll(true)
    }

    const leftSlides = gsap.utils.toArray('.feature-left-slide')
    gsap.set(leftSlides.slice(1), { opacity: 0, y: 30, display: 'none' })

    /* Helper: transition text slides */
    const swapText = (tl, hideIdx, showIdx, label) => {
      tl.to(leftSlides[hideIdx], { opacity: 0, y: -20, display: 'none', duration: 0.4 }, label)
      tl.to(leftSlides[showIdx], { display: 'flex', opacity: 1, y: 0,   duration: 0.5 }, `${label}+=0.4`)
    }

    /* Helper: activate stepper dot */
    const activateDot = (tl, idx, color, label) => {
      tl.to(`.step-indicator-${idx}`, { backgroundColor: color, scale: 1.3, boxShadow: `0 0 10px ${color}`, duration: 0.5 }, label)
      tl.to(`.step-label-${idx}`,     { color: '#ffffff', duration: 0.5 }, label)
    }
    const deactivateDot = (tl, idx, label) => {
      tl.to(`.step-indicator-${idx}`, { backgroundColor: 'rgba(255,255,255,0.12)', scale: 1, boxShadow: 'none', duration: 0.5 }, label)
      tl.to(`.step-label-${idx}`,     { color: 'rgba(255,255,255,0.28)', duration: 0.5 }, label)
    }

    const mm = gsap.matchMedia()

    mm.add({
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)"
    }, (context) => {
      const { isMobile } = context.conditions

      const focusScale = isMobile ? 1.85 : 1.25
      const explodeScale = isMobile ? 0.9 : 0.95
      const card0ExplodeX = -80
      const card0ExplodeY = -60
      const card1ExplodeX = 80
      const card1ExplodeY = -60
      const card2ExplodeX = -80
      const card2ExplodeY = 60
      const card3ExplodeX = 80
      const card3ExplodeY = 60

      /* ── Main pinned timeline ── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger:       containerRef.current,
          start:         'top top',
          end:           '+=500%',
          pin:           true,
          scrub:         isMobile ? 0.35 : 1, // highly responsive scrub on mobile touch, smooth lag on desktop
          anticipatePin: 1, // reduces pin jittering on mobile
        },
      })

      /* STEP 1 — Explode */
      tl.add('explode')
        .to('.feat-card-0', { x: card0ExplodeX, y: card0ExplodeY, scale: explodeScale, rotateY:  15, duration: 1 }, 'explode')
        .to('.feat-card-1', { x: card1ExplodeX, y: card1ExplodeY, scale: explodeScale, rotateY: -15, duration: 1 }, 'explode')
        .to('.feat-card-2', { x: card2ExplodeX, y: card2ExplodeY, scale: explodeScale, rotateY:  15, duration: 1 }, 'explode')
        .to('.feat-card-3', { x: card3ExplodeX, y: card3ExplodeY, scale: explodeScale, rotateY: -15, duration: 1 }, 'explode')
        .to({}, { duration: 0.5 })

      /* STEP 2 — Focus card 0 (Calories) */
      tl.add('focus-0')
      swapText(tl, 0, 1, 'focus-0')
      activateDot(tl, 1, '#A855F7', 'focus-0')
      tl.to('.feat-card-0', { x: 135, y: 135, scale: focusScale, rotateY: 0, z: 150, opacity: 1, zIndex: 50, duration: 1.2 }, 'focus-0')
      tl.to('.feat-card-1', { opacity: 0, scale: 0.85, z: -100, duration: 1 }, 'focus-0')
      tl.to('.feat-card-2', { opacity: 0, scale: 0.85, z: -100, duration: 1 }, 'focus-0')
      tl.to('.feat-card-3', { opacity: 0, scale: 0.85, z: -100, duration: 1 }, 'focus-0')
      tl.to({}, { duration: 0.6 })

      /* STEP 3 — Focus card 1 (Pedometer) */
      tl.add('focus-1')
      swapText(tl, 1, 2, 'focus-1')
      deactivateDot(tl, 1, 'focus-1')
      activateDot(tl, 2, '#00F0FF', 'focus-1')
      tl.to('.feat-card-0', { x: card0ExplodeX, y: card0ExplodeY, scale: explodeScale, rotateY: 15, z: 0, opacity: 0, zIndex: 10, duration: 1.2 }, 'focus-1')
      tl.to('.feat-card-1', { x: -135, y: 135, scale: focusScale, rotateY: 0, z: 150, opacity: 1, zIndex: 50, duration: 1.2 }, 'focus-1')
      tl.to('.feat-card-2', { opacity: 0, scale: 0.85, z: -100, duration: 1 }, 'focus-1')
      tl.to('.feat-card-3', { opacity: 0, scale: 0.85, z: -100, duration: 1 }, 'focus-1')
      tl.to({}, { duration: 0.6 })

      /* STEP 4 — Focus card 2 (Weight) */
      tl.add('focus-2')
      swapText(tl, 2, 3, 'focus-2')
      deactivateDot(tl, 2, 'focus-2')
      activateDot(tl, 3, '#A855F7', 'focus-2')
      tl.to('.feat-card-0', { opacity: 0, scale: 0.85, z: -100, duration: 1 }, 'focus-2')
      tl.to('.feat-card-1', { x: card1ExplodeX, y: card1ExplodeY, scale: explodeScale, rotateY: -15, z: 0, opacity: 0, zIndex: 10, duration: 1.2 }, 'focus-2')
      tl.to('.feat-card-2', { x: 135, y: -135, scale: focusScale, rotateY: 0, z: 150, opacity: 1, zIndex: 50, duration: 1.2 }, 'focus-2')
      tl.to('.feat-card-3', { opacity: 0, scale: 0.85, z: -100, duration: 1 }, 'focus-2')
      tl.to({}, { duration: 0.6 })

      /* STEP 5 — Focus card 3 (Workout) */
      tl.add('focus-3')
      swapText(tl, 3, 4, 'focus-3')
      deactivateDot(tl, 3, 'focus-3')
      activateDot(tl, 4, '#00F0FF', 'focus-3')
      tl.to('.feat-card-0', { opacity: 0, scale: 0.85, z: -100, duration: 1 }, 'focus-3')
      tl.to('.feat-card-1', { opacity: 0, scale: 0.85, z: -100, duration: 1 }, 'focus-3')
      tl.to('.feat-card-2', { x: card2ExplodeX, y: card2ExplodeY, scale: explodeScale, rotateY: 15, z: 0, opacity: 0, zIndex: 10, duration: 1.2 }, 'focus-3')
      tl.to('.feat-card-3', { x: -135, y: -135, scale: focusScale, rotateY: 0, z: 150, opacity: 1, zIndex: 50, duration: 1.2 }, 'focus-3')
      tl.to({}, { duration: 0.6 })

      /* STEP 6 — Reassemble */
      tl.add('assemble')
        .to('.feat-card-0', { x: 0, y: 0, scale: 1, rotateY: 0, z: 0, opacity: 1, zIndex: 10, duration: 1.2 }, 'assemble')
        .to('.feat-card-1', { x: 0, y: 0, scale: 1, rotateY: 0, z: 0, opacity: 1, zIndex: 10, duration: 1.2 }, 'assemble')
        .to('.feat-card-2', { x: 0, y: 0, scale: 1, rotateY: 0, z: 0, opacity: 1, zIndex: 10, duration: 1.2 }, 'assemble')
        .to('.feat-card-3', { x: 0, y: 0, scale: 1, rotateY: 0, z: 0, opacity: 1, zIndex: 10, duration: 1.2 }, 'assemble')
        .to({}, { duration: 0.5 })
    })

    return () => {
      mm.revert()
      ScrollTrigger.normalizeScroll(false)
    }
  }, [])

  /* ─────────────── RENDER ─────────────── */
  return (
    <section
      ref={containerRef}
      id="features"
      className="relative h-screen w-full flex items-center justify-center bg-background overflow-hidden"
      style={{ perspective: 1200 }}
    >
      {/* ── Two-column layout: stacks on mobile, side-by-side on md+ ── */}
      <div className="max-w-6xl w-full h-full flex flex-col md:flex-row items-center justify-center px-5 md:px-12 gap-6 md:gap-0">

        {/* ━━━ LEFT: Description + Stepper ━━━ */}
        <div className="w-full md:w-[44%] flex flex-col justify-center z-20
                        order-2 md:order-1 pb-4 md:pb-0">

          {/* Sliding text cards */}
          <div className="relative h-[180px] sm:h-[220px] md:h-[260px] w-full">
            {featureData.map((item, idx) => (
              <div
                key={idx}
                className="feature-left-slide absolute inset-0 flex flex-col justify-center"
                style={{ display: idx === 0 ? 'flex' : 'none' }}
              >
                <div className="flex items-center gap-3 mb-3 md:mb-5">
                  <div className={`w-9 h-9 md:w-11 md:h-11 rounded-xl bg-white/5 border border-white/10
                                   flex items-center justify-center ${item.accent}`}>
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 font-display">
                    {idx === 0 ? 'OVERVIEW' : `MODULE 0${idx}`}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-black tracking-tight text-white mb-3 leading-none">
                  {item.title}
                </h2>
                <p className="text-zinc-400/80 font-medium leading-relaxed text-xs sm:text-sm md:text-base">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Stepper */}
          <div className="flex flex-col gap-2.5 md:gap-3.5 border-t border-white/5 pt-4 md:pt-6 mt-2 md:mt-4">
            <span className="text-[9px] font-extrabold uppercase tracking-widest text-zinc-600 block mb-1">
              Ecosystem Index
            </span>
            {featureData.slice(1).map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className={`step-indicator-${idx + 1} w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-white/10 transition-all duration-300`} />
                <span className={`step-label-${idx + 1} text-[10px] md:text-xs font-bold uppercase tracking-wider text-white/30 transition-colors duration-300 font-display`}>
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ━━━ RIGHT: 3-D Exploded card grid ━━━ */}
        <div
          className="w-full md:w-[52%] relative order-1 md:order-2 z-10
                     h-[260px] sm:h-[310px] md:h-[520px]"
          style={{ transformStyle: 'preserve-3d', overflow: 'visible' }}
        >
          {/*
            KEY CENTERING TECHNIQUE:
            We place the 520×520 grid absolutely at top:50%, left:50%
            then pull it back by -260px (half of 520) in each axis.
            This anchors the CENTER of the 520px grid to the CENTER of the
            wrapper regardless of screen width.

            CSS scale with transformOrigin:'center center' then scales
            the grid from that same center point, so the focused card
            lands at the visual center of the screen on every device.

            Each card has p-2 padding = 8px gap between cards.
          */}
          <div
            ref={gridRef}
            className="absolute w-[520px] h-[520px]
                       scale-[0.44] xs:scale-[0.54] sm:scale-[0.66] md:scale-[0.87] lg:scale-100"
            style={{
              transformStyle:  'preserve-3d',
              transformOrigin: 'center center',
              top:             '50%',
              left:            '50%',
              marginTop:       '-260px',
              marginLeft:      '-260px',
            }}
          >
            {/* Card 0 — Calories (Top-Left) */}
            <div
              className="feat-card-0 absolute top-0 left-0 w-[250px] h-[250px] p-2"
              style={{ transformStyle: 'preserve-3d', zIndex: 20, willChange: 'transform, opacity', backfaceVisibility: 'hidden' }}
            >
              <div className="w-full h-full rounded-2xl overflow-hidden">
                <CalorieWidget />
              </div>
            </div>

            {/* Card 1 — Pedometer (Top-Right) */}
            <div
              className="feat-card-1 absolute top-0 right-0 w-[250px] h-[250px] p-2"
              style={{ transformStyle: 'preserve-3d', zIndex: 20, willChange: 'transform, opacity', backfaceVisibility: 'hidden' }}
            >
              <div className="w-full h-full rounded-2xl overflow-hidden">
                <PedometerWidget />
              </div>
            </div>

            {/* Card 2 — Weight (Bottom-Left) */}
            <div
              className="feat-card-2 absolute bottom-0 left-0 w-[250px] h-[250px] p-2"
              style={{ transformStyle: 'preserve-3d', zIndex: 20, willChange: 'transform, opacity', backfaceVisibility: 'hidden' }}
            >
              <div className="w-full h-full rounded-2xl overflow-hidden">
                <WeightChartWidget />
              </div>
            </div>

            {/* Card 3 — Workout (Bottom-Right) */}
            <div
              className="feat-card-3 absolute bottom-0 right-0 w-[250px] h-[250px] p-2"
              style={{ transformStyle: 'preserve-3d', zIndex: 20, willChange: 'transform, opacity', backfaceVisibility: 'hidden' }}
            >
              <div className="w-full h-full rounded-2xl overflow-hidden">
                <WorkoutSetsWidget />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
