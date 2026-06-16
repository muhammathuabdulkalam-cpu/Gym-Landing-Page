import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiStar } from 'react-icons/fi'

const reviews = [
  {
    name: 'Marcus Aurelius',
    title: 'Fitness Enthusiast',
    img: 'MA',
    comment: 'This is the first gym app that actually keeps me consistent. The widget designs on the dashboard are so rewarding to look at.',
    stars: 5,
    accent: 'from-purple-500 to-indigo-500',
  },
  {
    name: 'Sarah Jenkins',
    title: 'Marathon Runner',
    img: 'SJ',
    comment: 'I love the calorie and water intake indicators. The daily streak reminders actually make me want to hit my step goals every single evening.',
    stars: 5,
    accent: 'from-cyan-500 to-blue-500',
  },
  {
    name: 'David Chen',
    title: 'Powerlifter',
    img: 'DC',
    comment: 'Logging workouts is incredibly fast. Custom templates let me select my splits and enter weights/reps in just a few taps.',
    stars: 5,
    accent: 'from-pink-500 to-purple-500',
  },
  {
    name: 'Aiko Tanaka',
    title: 'Yoga Instructor',
    img: 'AT',
    comment: "The BMI and body analytics charts give me deep insight into my clients' progress I couldn't get from any other single app.",
    stars: 5,
    accent: 'from-emerald-500 to-cyan-500',
  },
  {
    name: 'James Wright',
    title: 'CrossFit Athlete',
    img: 'JW',
    comment: 'The pedometer is dead accurate. I ran a 10k with it and the calorie estimate was within 3% of my chest-strap monitor.',
    stars: 5,
    accent: 'from-orange-500 to-pink-500',
  },
]

/* Duplicate for seamless loop */
const allReviews = [...reviews, ...reviews]

export default function Testimonials() {
  const trackRef    = useRef(null)
  const sectionRef  = useRef(null)
  const headRef     = useRef(null)
  const tweenRef    = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    /* ── Headline: Apple-style word-by-word clip-path reveal ── */
    const words = gsap.utils.toArray('.testi-word')
    gsap.fromTo(words,
      { y: 60, opacity: 0, clipPath: 'inset(0 0 100% 0)' },
      {
        y: 0, opacity: 1, clipPath: 'inset(0 0 0% 0)',
        duration: 0.9, stagger: 0.1, ease: 'power4.out',
        scrollTrigger: { trigger: headRef.current, start: 'top 85%' },
      }
    )

    /* ── Continuous marquee-style horizontal scroll (Apple-style ticker) ── */
    const track   = trackRef.current
    const totalW  = track.scrollWidth / 2  // half because we duplicated

    // Set up infinite loop tween
    tweenRef.current = gsap.to(track, {
      x: -totalW,
      duration: 38,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % totalW),
      },
    })

    /* ── Pause marquee when user hovers ── */
    track.addEventListener('mouseenter', () => tweenRef.current?.pause())
    track.addEventListener('mouseleave', () => tweenRef.current?.resume())

    /* ── Scrub speed based on scroll velocity ── */
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start:   'top bottom',
      end:     'bottom top',
      onUpdate: (self) => {
        if (tweenRef.current) {
          gsap.to(tweenRef.current, {
            timeScale: 1 + Math.abs(self.getVelocity()) / 800,
            duration: 0.4,
            overwrite: true,
          })
        }
      },
    })

    /* ── Stat counters animate in on scroll ── */
    gsap.fromTo('.testi-stat',
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.testi-stats', start: 'top 85%' },
      }
    )

    return () => {
      tweenRef.current?.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative py-28 w-full bg-background overflow-hidden border-t border-white/5">

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[600px] h-[600px] rounded-full bg-primary/4 blur-[160px] -z-10" />

      {/* ── Headline ── */}
      <div ref={headRef} className="max-w-6xl mx-auto px-6 md:px-12 mb-6">
        <span className="block text-[11px] font-extrabold uppercase tracking-[0.3em] text-purple-400 mb-4 text-center">
          Community Reviews
        </span>
        <h2 className="text-3xl md:text-6xl font-display font-black tracking-tight text-white text-center leading-none overflow-hidden">
          {['Loved', 'by', 'Thousands.'].map((w, i) => (
            <span key={i} className="testi-word inline-block mr-[0.3em] opacity-0">
              {i === 2
                ? <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">{w}</span>
                : w}
            </span>
          ))}
        </h2>
        <p className="text-zinc-500 font-medium mt-4 text-center text-sm md:text-base max-w-lg mx-auto">
          Hear from our community who have built consistent habits and transformed their lifestyles.
        </p>
      </div>

      {/* ── Stats strip (Apple-style) ── */}
      <div className="testi-stats max-w-6xl mx-auto px-6 md:px-12 mb-14">
        <div className="flex justify-center gap-12 md:gap-20 border-y border-white/5 py-8">
          {[
            { val: '10K+', label: 'Active Users' },
            { val: '4.9★', label: 'Avg. Rating' },
            { val: '2M+', label: 'Workouts Logged' },
          ].map((s, i) => (
            <div key={i} className="testi-stat flex flex-col items-center opacity-0">
              <span className="text-3xl md:text-5xl font-display font-black text-white">{s.val}</span>
              <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mt-1">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Marquee review track ── */}
      <div className="w-full overflow-hidden">
        {/* Left/Right fade masks */}
        <div className="pointer-events-none absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-background to-transparent z-10" />

        <div
          ref={trackRef}
          className="flex gap-5 pb-4"
          style={{ width: 'max-content' }}
        >
          {allReviews.map((rev, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-[320px] md:w-[380px]
                         bg-white/[0.03] border border-white/8 backdrop-blur-sm
                         rounded-3xl p-6 flex flex-col justify-between
                         hover:border-white/15 hover:bg-white/[0.05]
                         transition-all duration-300 cursor-default"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(rev.stars)].map((_, i) => (
                  <FiStar key={i} fill="#A855F7" stroke="none" size={13} />
                ))}
              </div>

              <p className="text-sm font-medium text-zinc-300 leading-relaxed italic flex-grow">
                "{rev.comment}"
              </p>

              {/* User */}
              <div className="flex items-center gap-3 border-t border-white/5 pt-4 mt-5">
                <div className={`w-9 h-9 rounded-full bg-gradient-to-tr ${rev.accent}
                                 flex items-center justify-center font-black text-white text-xs`}>
                  {rev.img}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-display leading-none">{rev.name}</h4>
                  <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider mt-0.5 block">{rev.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
