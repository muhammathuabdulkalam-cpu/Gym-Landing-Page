import { motion } from 'framer-motion'
import { FaApple, FaGooglePlay } from 'react-icons/fa'
import { FiDownload } from 'react-icons/fi'

export default function Download() {
  return (
    <section id="download" className="relative py-32 w-full bg-background overflow-hidden border-t border-white/5">
      {/* Decorative Blob */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-background to-background pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px] -z-10 animate-blob-1" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center">
        
        {/* Animated Badge */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-zinc-300 mb-8"
        >
          <FiDownload className="text-primary animate-bounce" /> Now available worldwide
        </motion.div>

        {/* Large Header */}
        <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight text-white mb-6 leading-none">
          Ready to Start Your <br />
          <span className="text-primary text-glow-purple">Transformation?</span>
        </h2>
        
        <p className="text-zinc-400 font-medium max-w-xl leading-relaxed text-sm md:text-base mb-10">
          Get the ultimate companion for your fitness journey. Track workouts, count steps, log meals, and measure progress all in one single application.
        </p>

        {/* Store Links */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md">
          {/* iOS download */}
          <a 
            href="#app-store"
            className="flex items-center justify-center gap-3 bg-white text-black font-bold px-8 py-4 rounded-2xl hover:bg-zinc-200 transition-colors duration-300 hover:scale-105 active:scale-95 shadow-glass"
          >
            <FaApple size={22} />
            <div className="text-left leading-none">
              <span className="text-[10px] uppercase font-semibold text-zinc-500 block">Download on the</span>
              <span className="text-sm font-black font-display mt-0.5 block">App Store</span>
            </div>
          </a>

          {/* Android download */}
          <a 
            href="#google-play"
            className="flex items-center justify-center gap-3 bg-dark-700 border border-white/10 text-white font-bold px-8 py-4 rounded-2xl hover:bg-dark-600 transition-colors duration-300 hover:scale-105 active:scale-95 shadow-glass glow-purple"
          >
            <FaGooglePlay className="text-primary" size={20} />
            <div className="text-left leading-none">
              <span className="text-[10px] uppercase font-semibold text-zinc-500 block">Get it on</span>
              <span className="text-sm font-black font-display mt-0.5 block">Google Play</span>
            </div>
          </a>
        </div>

      </div>
    </section>
  )
}
