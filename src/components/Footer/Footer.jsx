import { Link } from 'react-router-dom'
import { FiGithub, FiInstagram, FiTwitter } from 'react-icons/fi'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-background border-t border-white/5 py-16 px-6 md:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
        
        {/* Branding & Description */}
        <div className="max-w-xs flex flex-col gap-4">
          <Link to="/" className="group w-max">
            <span className="font-display font-black italic text-lg tracking-[0.18em] text-white">
              TRANZIO<span className="text-purple-400">FIT</span>
            </span>
          </Link>
          <p className="text-xs text-zinc-500 font-medium leading-relaxed">
            Premium fitness tracking ecosystem designed for individuals who strive for consistent progress and data-driven metabolic habits.
          </p>
        </div>

        {/* Links Navigation */}
        <div className="flex gap-16">
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Product</span>
            <Link to="/features" className="text-xs text-zinc-400 hover:text-white font-medium transition-colors">Features</Link>
            <a href="#download" className="text-xs text-zinc-400 hover:text-white font-medium transition-colors">Downloads</a>
            <a href="#integrations" className="text-xs text-zinc-400 hover:text-white font-medium transition-colors">Integrations</a>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Company</span>
            <Link to="/about" className="text-xs text-zinc-400 hover:text-white font-medium transition-colors">About Us</Link>
            <Link to="/contact" className="text-xs text-zinc-400 hover:text-white font-medium transition-colors">Contact</Link>
            <a href="#privacy" className="text-xs text-zinc-400 hover:text-white font-medium transition-colors">Privacy Policy</a>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex flex-col items-start md:items-end gap-4">
          <div className="flex gap-4">
            <a href="#twitter" className="w-9 h-9 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/10 transition-all"><FiTwitter size={16} /></a>
            <a href="#instagram" className="w-9 h-9 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/10 transition-all"><FiInstagram size={16} /></a>
            <a href="#github" className="w-9 h-9 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/10 transition-all"><FiGithub size={16} /></a>
          </div>
          <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mt-1">
            © {currentYear} TranzioFit. All Rights Reserved.
          </span>
        </div>

      </div>

    </footer>
  )
}
