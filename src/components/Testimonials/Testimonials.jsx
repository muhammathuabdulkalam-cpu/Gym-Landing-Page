import { motion } from 'framer-motion'
import { FiStar } from 'react-icons/fi'

export default function Testimonials() {
  const reviews = [
    {
      name: "Marcus Aurelius",
      title: "Fitness Enthusiast",
      img: "MA",
      comment: "This is the first gym app that actually keeps me consistent. The widget designs on the dashboard are so rewarding to look at, and tracking weight composite metrics changed how I view progress.",
      stars: 5
    },
    {
      name: "Sarah Jenkins",
      title: "Marathon Runner",
      img: "SJ",
      comment: "I love the calorie and water intake indicators. Syncing my Apple Watch was seamless, and the daily streak reminders actually make me want to hit my step goals every single evening.",
      stars: 5
    },
    {
      name: "David Chen",
      title: "Powerlifter",
      img: "DC",
      comment: "Logging workouts is incredibly fast. I don't need to waste time typing in exercises; custom templates let me select my splits and enter weights/reps in just a few taps.",
      stars: 5
    }
  ]

  return (
    <section className="relative py-28 w-full bg-background overflow-hidden border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/3 blur-[140px] -z-10" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-white">
            Loved by <span className="text-primary text-glow-purple">Thousands</span>
          </h2>
          <p className="text-zinc-400 font-medium mt-4">
            Hear from our community members who have built consistent habits and transformed their lifestyles.
          </p>
        </div>

        {/* Review list */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="glass-panel p-6 rounded-2xl flex flex-col justify-between hover:border-white/10 glow-card-purple transition-all duration-300"
            >
              <div>
                {/* Stars */}
                <div className="flex gap-1 mb-6 text-primary">
                  {[...Array(rev.stars)].map((_, i) => (
                    <FiStar key={i} fill="#A855F7" size={14} />
                  ))}
                </div>

                <p className="text-sm font-medium text-zinc-300 leading-relaxed italic mb-8">
                  "{rev.comment}"
                </p>
              </div>

              {/* User Profiling */}
              <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center font-bold text-black text-sm shadow-neon-purple">
                  {rev.img}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-display leading-none">{rev.name}</h4>
                  <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider mt-1 block">{rev.title}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
