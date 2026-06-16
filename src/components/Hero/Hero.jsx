import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { FiArrowRight, FiX, FiLink, FiSmartphone, FiMonitor } from 'react-icons/fi'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TranzioDashboard from '../widgets/TranzioDashboard'

export default function Hero() {
  const containerRef = useRef(null)
  const dashboardWrapperRef = useRef(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Hero content reveal timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo('.hero-title-word', 
      { y: 80, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, stagger: 0.15 }
    )
    tl.fromTo('.hero-sub', 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8 }, 
      '-=0.6'
    )
    tl.fromTo('.hero-ctas', 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8 }, 
      '-=0.6'
    )
    tl.fromTo('.hero-dashboard-container', 
      { scale: 0.85, opacity: 0, y: 120, rotateX: 15 }, 
      { scale: 1, opacity: 1, y: 0, rotateX: 0, duration: 1.5, ease: 'power4.out' }, 
      '-=1'
    )

    // Simple natural scroll fade-out
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    })
    
    scrollTl.to('.hero-header-content', {
      yPercent: -30,
      opacity: 0,
      ease: 'none',
    }, 0)

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[140vh] w-full flex flex-col items-center justify-start pt-32 pb-64 px-6 md:px-12 overflow-x-hidden grid-bg noise-bg"
      style={{ perspective: 1200 }}
    >
      {/* Background Animated Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px] -z-10 animate-blob-1" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] rounded-full bg-purple-500/5 blur-[120px] -z-10 animate-blob-2" />
      <div className="absolute bottom-10 left-1/3 w-[300px] h-[300px] rounded-full bg-orange-500/5 blur-[90px] -z-10 animate-blob-3" />

      {/* Grid overlay styling details */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none -z-10" />

      {/* Hero Header Content */}
      <div className="hero-header-content max-w-6xl w-full text-center flex flex-col items-center z-10">
        <h1 className="text-4xl md:text-7xl font-display font-black tracking-tight leading-none text-white max-w-4xl">
          <span className="block overflow-hidden h-[80px] md:h-[120px]">
            <span className="hero-title-word inline-block bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              Transform Your
            </span>
          </span>
          <span className="block overflow-hidden h-[80px] md:h-[120px] -mt-2 md:-mt-4">
            <span className="hero-title-word inline-block bg-gradient-to-r from-purple-400 via-orange-400 to-emerald-400 bg-clip-text text-transparent">
              Fitness Journey
            </span>
          </span>
        </h1>

        <p className="hero-sub mt-6 text-sm md:text-lg text-zinc-400/80 max-w-xl font-medium tracking-wide leading-relaxed opacity-0">
          Track workouts. Monitor calories. Measure progress. <br className="hidden md:inline" />
          Stay consistent. Achieve goals with Tranzio.
        </p>

        {/* Call to Actions */}
        <div className="hero-ctas flex flex-col sm:flex-row gap-4 mt-8 opacity-0 z-20">
          <a 
            href="https://gym-tracker-14iz.onrender.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold px-8 py-3.5 rounded-full shadow-neon-purple hover:scale-105 active:scale-95 transition-all duration-300 text-sm md:text-base"
          >
            <span>Launch Web App</span>
            <FiMonitor size={18} />
          </a>
          <button 
            onClick={() => setShowModal(true)}
            className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold px-8 py-3.5 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95 text-sm md:text-base"
          >
            <span>Launch Mobile App</span>
            <FiSmartphone size={18} />
          </button>
        </div>
      </div>

      {/* Combined Mobile App Dashboard Mockup (Centerpiece with scrolling 3D Zoom Parallax) */}
      <div 
        ref={dashboardWrapperRef}
        className="hero-dashboard-container w-full max-w-4xl mt-20 z-10 relative flex justify-center items-center"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <TranzioDashboard />
      </div>

      {/* App & Web Launch Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="relative w-full max-w-lg bg-[#151622] border border-white/10 p-8 rounded-3xl shadow-glass overflow-hidden"
            >
              {/* Close Button */}
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 p-2 text-zinc-400 hover:text-white transition-colors"
              >
                <FiX size={20} />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4 shadow-neon-purple">
                  <FiSmartphone size={22} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold font-display text-white">Launch Mobile App</h3>
                <p className="text-xs text-zinc-400 mt-2 font-medium">
                  Follow these instructions to run the Expo Go mobile client locally on your device or simulator.
                </p>

                {/* Instructions */}
                <div className="w-full text-left bg-black/40 border border-white/5 p-5 rounded-2xl gap-4 flex flex-col mt-6">
                  <div className="flex gap-3 items-start">
                    <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                    <p className="text-xs text-zinc-300 font-semibold">
                      Make sure your terminal is running <code className="bg-white/5 border border-white/10 px-1 py-0.5 rounded text-[10px] text-purple-300">npx expo start</code> in the <code className="bg-white/5 border border-white/10 px-1 py-0.5 rounded text-[10px] text-purple-300">GYM-APP</code> folder.
                    </p>
                  </div>

                  <div className="flex gap-3 items-start">
                    <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                    <p className="text-xs text-zinc-300 font-semibold">
                      Install the <strong className="text-white">Expo Go</strong> app from the Google Play Store or iOS App Store on your physical phone.
                    </p>
                  </div>

                  <div className="flex gap-3 items-start">
                    <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                    <p className="text-xs text-zinc-300 font-semibold flex-grow">
                      Scan the terminal's QR code using the Expo Go client, or open the link below directly from your mobile browser:
                    </p>
                  </div>

                  <a 
                    href="exp://127.0.0.1:8081"
                    className="flex items-center justify-center gap-2 bg-purple-600/10 hover:bg-purple-600/20 border border-purple-600/30 text-purple-400 font-bold py-2 px-4 rounded-xl text-xs transition-colors mt-2"
                  >
                    <FiLink /> exp://127.0.0.1:8081
                  </a>
                </div>

                {/* Footer buttons */}
                <div className="flex gap-3 w-full mt-6">
                  <a 
                    href="https://gym-tracker-14iz.onrender.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-grow flex items-center justify-center gap-2 bg-white text-black font-bold py-3 rounded-xl text-xs transition-colors"
                  >
                    Open Web App <FiArrowRight />
                  </a>
                  <button 
                    onClick={() => setShowModal(false)}
                    className="flex-grow bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold py-3 rounded-xl text-xs transition-colors"
                  >
                    Close Setup
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
