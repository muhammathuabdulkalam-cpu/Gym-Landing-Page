import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Features from './pages/Features'
import Contact from './pages/Contact'

// Scroll to top on route change helper
function ScrollToTop() {
  const { pathname } = useLocation()
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="relative min-h-screen flex flex-col justify-between bg-background text-white select-none">
        {/* Glow backdrop lines */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full border-x border-white/[0.02] pointer-events-none -z-10" />
        
        <Navbar />
        <main className="flex-grow pb-24 md:pb-0">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  )
}
