import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaApple, FaGooglePlay } from 'react-icons/fa'
import { FiDownload } from 'react-icons/fi'

export default function Download() {
  const sectionRef = useRef(null)
  const glowRef    = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    /* ── Apple-style: large pinned headline that blurs in to full opacity ── */
    const words = gsap.utils.toArray('.dl-word')
    gsap.fromTo(words,
      { y: 80, opacity: 0, filter: 'blur(12px)' },
      {
        y: 0, opacity: 1, filter: 'blur(0px)',
        duration: 1.1, stagger: 0.12, ease: [0.16, 1, 0.3, 1],
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
      }
    )

    /* ── CTA buttons stagger up ── */
    gsap.fromTo('.dl-btn',
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.dl-btns', start: 'top 88%' },
      }
    )

    /* ── Glow orb parallax ── */
    gsap.to(glowRef.current, {
      y: -80,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start:   'top bottom',
        end:     'bottom top',
        scrub:   true,
      },
    })

    /* ── Badge pop in ── */
    gsap.fromTo('.dl-badge',
      { scale: 0.8, opacity: 0 },
      {
        scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      }
    )

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <section
      ref={sectionRef}
      id="download"
      className="relative py-36 w-full bg-background overflow-hidden border-t border-white/5"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-background to-background pointer-events-none -z-10" />
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[600px] h-[600px] rounded-full opacity-40
                   bg-gradient-radial from-purple-600/30 via-indigo-500/10 to-transparent
                   blur-[100px] -z-10"
      />

      {/* Subtle grid lines */}
      <div className="absolute inset-0 bg-[length:60px_60px]
                      bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)]
                      -z-10" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center">

        {/* Badge */}
        <div className="dl-badge flex items-center gap-2 px-4 py-1.5 rounded-full
                        bg-white/5 border border-white/10
                        text-[11px] font-bold uppercase tracking-widest text-purple-400 mb-10 opacity-0">
          <FiDownload className="animate-bounce" size={11} />
          Now available worldwide
        </div>

        {/* Apple-style: large blurred-to-clear headline */}
        <h2 className="text-4xl md:text-7xl font-display font-black tracking-tight text-white leading-none mb-6">
          {['Ready', 'to', 'Start', 'Your'].map((w, i) => (
            <span key={i} className="dl-word inline-block mr-[0.3em] opacity-0">{w}</span>
          ))}
          <br />
          <span className="dl-word inline-block opacity-0
                           bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400
                           bg-clip-text text-transparent">
            Transformation?
          </span>
        </h2>

        <p className="dl-word text-zinc-400 font-medium max-w-xl leading-relaxed text-sm md:text-base mb-12 opacity-0">
          Get the ultimate companion for your fitness journey. Track workouts, count steps,
          log meals, and measure progress — all in one app.
        </p>

        {/* Store CTAs */}
        <div className="dl-btns flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md">
          <a
            href="https://expo.dev/accounts/muhammathuabdulkalam/projects/GYM-APP/builds/0d03a59d-05d0-4acb-9e73-fa80163eb251"
            target="_blank"
            rel="noopener noreferrer"
            className="dl-btn flex items-center justify-center gap-3
                       bg-white text-black font-bold px-8 py-4 rounded-2xl
                       hover:bg-zinc-100 transition-all duration-300
                       hover:scale-105 active:scale-95 shadow-glass opacity-0
                       hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
          >
            <FaApple size={22} />
            <div className="text-left leading-none">
              <span className="text-[10px] uppercase font-semibold text-zinc-500 block">Download for iOS</span>
              <span className="text-sm font-black font-display mt-0.5 block">EAS Build</span>
            </div>
          </a>

          <a
            href="https://expo.dev/accounts/muhammathuabdulkalam/projects/GYM-APP/builds/0d03a59d-05d0-4acb-9e73-fa80163eb251"
            target="_blank"
            rel="noopener noreferrer"
            className="dl-btn flex items-center justify-center gap-3
                       bg-white/5 border border-purple-500/30 text-white font-bold px-8 py-4 rounded-2xl
                       hover:bg-white/10 transition-all duration-300
                       hover:scale-105 active:scale-95 shadow-glass opacity-0
                       hover:shadow-neon-purple"
          >
            <FaGooglePlay className="text-primary" size={20} />
            <div className="text-left leading-none">
              <span className="text-[10px] uppercase font-semibold text-zinc-500 block">Download for Android</span>
              <span className="text-sm font-black font-display mt-0.5 block">EAS Build</span>
            </div>
          </a>
        </div>

        {/* Bottom footnote — Apple-style small legal/info text */}
        <p className="text-zinc-600 text-[11px] mt-10 font-medium max-w-sm leading-relaxed">
          Available on iOS and Android. Data stored securely on-device.
          No subscriptions required.
        </p>
      </div>
    </section>
  )
}
