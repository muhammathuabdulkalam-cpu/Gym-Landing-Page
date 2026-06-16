import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiMapPin, FiMessageSquare } from 'react-icons/fi'
import useLenis from '../hooks/useLenis'

export default function Contact() {
  useLenis()
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Mock submit
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', message: '' })
    }, 3000)
  }

  return (
    <div className="relative min-h-screen w-full bg-background pt-32 pb-20 px-6 md:px-12 grid-bg noise-bg overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px] -z-10 animate-blob-2" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px] -z-10 animate-blob-1" />

      <div className="max-w-6xl mx-auto z-10 relative">
        
        {/* Intro */}
        <div className="max-w-2xl mb-16">
          <span className="text-sm font-bold uppercase tracking-widest text-primary text-glow-purple font-display">Get in touch</span>
          <h1 className="text-4xl md:text-6xl font-display font-black tracking-tight text-white mt-4 leading-none">
            Let's Start a <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Conversation</span>
          </h1>
          <p className="text-zinc-400 font-medium tracking-wide mt-6 leading-relaxed">
            Have questions about the application, feedback on your tracking logs, or business requests? Drop us a message below, and our team will reach out.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Quick Info Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            <div className="glass-panel p-6 rounded-2xl flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-neon-purple">
                <FiMail size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-display">General Support</h4>
                <p className="text-xs text-zinc-400 font-semibold mt-1">support@tranzio.app</p>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary shadow-neon-cyan">
                <FiMessageSquare size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-display">Press & Media</h4>
                <p className="text-xs text-zinc-400 font-semibold mt-1">press@tranzio.app</p>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                <FiMapPin size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-display">Headquarters</h4>
                <p className="text-xs text-zinc-400 font-semibold mt-1">San Francisco, CA</p>
              </div>
            </div>

          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 rounded-3xl glow-purple relative overflow-hidden">
              <h3 className="text-lg font-bold font-display text-white mb-6">Send Message</h3>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/5 focus:border-primary/40 focus:ring-1 focus:ring-primary/30 rounded-xl px-4 py-3 text-sm font-semibold text-white outline-none transition-all"
                    placeholder="Marcus Aurelius"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/5 focus:border-primary/40 focus:ring-1 focus:ring-primary/30 rounded-xl px-4 py-3 text-sm font-semibold text-white outline-none transition-all"
                    placeholder="marcus@philosophy.org"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-2">Your Message</label>
                  <textarea
                    required
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/5 focus:border-primary/40 focus:ring-1 focus:ring-primary/30 rounded-xl px-4 py-3 text-sm font-semibold text-white outline-none transition-all resize-none"
                    placeholder="Tell us what you're thinking..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitted}
                  className="bg-gradient-to-r from-primary to-primary-dark text-black font-bold py-3.5 rounded-xl mt-2 shadow-neon-purple hover:scale-[1.02] active:scale-[0.98] transition-all text-sm uppercase tracking-wider"
                >
                  {submitted ? 'Message Sent!' : 'Send Message'}
                </button>
              </form>

              {/* Toast feedback */}
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-6 left-6 right-6 bg-primary text-black font-semibold py-3 px-4 rounded-xl text-center text-xs shadow-neon-purple"
                >
                  Thank you! We've received your request.
                </motion.div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
