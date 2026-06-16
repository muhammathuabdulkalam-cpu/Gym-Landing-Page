import { Link, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHome, FiInfo, FiActivity, FiMail, FiDownload } from 'react-icons/fi'

export default function Navbar() {
  const links = [
    { name: 'Home',     path: '/',         icon: <FiHome     size={20} /> },
    { name: 'About',    path: '/about',    icon: <FiInfo     size={20} /> },
    { name: 'Features', path: '/features', icon: <FiActivity size={20} /> },
    { name: 'Contact',  path: '/contact',  icon: <FiMail     size={20} /> },
  ]

  return (
    <>
      {/* ─── Top Header (all viewports) ──────────────────────── */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="fixed top-0 left-0 w-full z-[100]
                   flex justify-between items-center
                   px-5 py-3.5 md:px-12 md:py-4
                   bg-background/75 backdrop-blur-xl border-b border-white/[0.06]"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg
                          bg-gradient-to-tr from-purple-500 to-indigo-500
                          flex items-center justify-center shadow-neon-purple
                          group-hover:scale-105 transition-transform">
            <span className="font-display font-extrabold text-white text-xs">T</span>
          </div>
          <span className="font-display font-bold text-sm md:text-base tracking-wider text-white">
            TRANZIO<span className="text-purple-400">FIT</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6
                        bg-white/5 px-6 py-2 rounded-full
                        border border-white/5 backdrop-blur-sm">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative px-3 py-1 font-sans text-sm font-medium tracking-wide transition-colors ${
                  isActive ? 'text-primary' : 'text-zinc-400 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-[2px]
                                 bg-gradient-to-r from-primary to-secondary"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Download CTA — always visible, compact on mobile */}
        <a
          href="#download"
          className="flex items-center gap-1.5 shrink-0
                     bg-gradient-to-r from-purple-600 to-indigo-600 text-white
                     font-bold text-xs md:text-sm
                     px-3.5 py-2 md:px-5 md:py-2.5
                     rounded-full shadow-neon-purple
                     hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <span>Get App</span>
          <FiDownload size={12} />
        </a>
      </motion.header>

      {/* ─── Mobile-Only Bottom Nav Dock ─────────────────────── */}
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
        className="md:hidden
                   fixed bottom-4 left-0 right-0
                   mx-auto z-[100]
                   w-[88vw] max-w-[360px]"
      >
        {/* Dock container */}
        <div
          className="relative flex items-center justify-around
                     bg-[#0b0c15]/95 border border-white/10
                     backdrop-blur-2xl
                     rounded-[28px] px-1.5 py-1.5
                     shadow-[0_12px_48px_rgba(0,0,0,0.65),0_0_0_1px_rgba(168,85,247,0.06)]"
        >
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative flex flex-col items-center gap-[3px]
                 px-3 py-2 rounded-[20px] flex-1
                 transition-colors duration-200 ${
                   isActive ? 'text-primary' : 'text-zinc-500 hover:text-zinc-300'
                 }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="mob-pill"
                      className="absolute inset-0 rounded-[20px]
                                 bg-purple-500/10 border border-purple-500/20"
                      transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                    />
                  )}
                  <span className="relative z-10">{link.icon}</span>
                  <span className="relative z-10 text-[8.5px] font-bold uppercase tracking-widest font-display">
                    {link.name}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </motion.nav>
    </>
  )
}
