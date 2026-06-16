import { useEffect, useRef } from 'react'

/* ─── Canvas particle network (constellation style) ─── */
function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let W, H, particles = []
    const COUNT      = 90
    const LINK_DIST  = 130
    const COLORS     = ['#A855F7', '#7C3AED', '#00F0FF', '#EC4899', '#6366F1']

    function resize() {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight * 2.5   // tall enough for whole page
    }

    function mkParticle() {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      return {
        x:    Math.random() * W,
        y:    Math.random() * H,
        vx:   (Math.random() - 0.5) * 0.4,
        vy:   (Math.random() - 0.5) * 0.4,
        r:    Math.random() * 1.8 + 0.6,
        color,
        alpha: Math.random() * 0.6 + 0.3,
      }
    }

    function init() {
      resize()
      particles = Array.from({ length: COUNT }, mkParticle)
    }

    function draw() {
      ctx.clearRect(0, 0, W, H)

      /* draw links */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < LINK_DIST) {
            const op = (1 - dist / LINK_DIST) * 0.18
            ctx.beginPath()
            ctx.strokeStyle = `rgba(168,85,247,${op})`
            ctx.lineWidth   = 0.6
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      /* draw dots */
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color + Math.round(p.alpha * 255).toString(16).padStart(2, '0')
        ctx.fill()

        /* move */
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1
      })

      animId = requestAnimationFrame(draw)
    }

    init()
    draw()
    window.addEventListener('resize', () => { resize(); particles = Array.from({ length: COUNT }, mkParticle) })

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full pointer-events-none"
      style={{ zIndex: 0, opacity: 0.55 }}
    />
  )
}

/* ─── Aurora blobs (CSS animated) ─── */
function AuroraBlobs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Blob 1 — purple top-left */}
      <div
        className="absolute aurora-blob"
        style={{
          width: 700, height: 700,
          top: '-15%', left: '-10%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.28) 0%, rgba(109,40,217,0.12) 50%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'aurora1 22s ease-in-out infinite alternate',
          borderRadius: '60% 40% 55% 45% / 45% 55% 40% 60%',
        }}
      />
      {/* Blob 2 — cyan top-right */}
      <div
        className="absolute aurora-blob"
        style={{
          width: 600, height: 600,
          top: '-5%', right: '-10%',
          background: 'radial-gradient(circle, rgba(0,240,255,0.18) 0%, rgba(6,182,212,0.08) 50%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'aurora2 28s ease-in-out infinite alternate',
          borderRadius: '45% 55% 35% 65% / 60% 40% 65% 35%',
        }}
      />
      {/* Blob 3 — pink mid-left */}
      <div
        className="absolute aurora-blob"
        style={{
          width: 500, height: 500,
          top: '35%', left: '-8%',
          background: 'radial-gradient(circle, rgba(236,72,153,0.15) 0%, rgba(168,85,247,0.06) 60%, transparent 80%)',
          filter: 'blur(70px)',
          animation: 'aurora3 18s ease-in-out infinite alternate',
          borderRadius: '55% 45% 60% 40% / 40% 60% 45% 55%',
        }}
      />
      {/* Blob 4 — indigo mid-right */}
      <div
        className="absolute aurora-blob"
        style={{
          width: 550, height: 550,
          top: '50%', right: '-5%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, rgba(79,70,229,0.08) 50%, transparent 70%)',
          filter: 'blur(90px)',
          animation: 'aurora4 24s ease-in-out infinite alternate',
          borderRadius: '40% 60% 50% 50% / 55% 45% 60% 40%',
        }}
      />
      {/* Blob 5 — emerald bottom-center */}
      <div
        className="absolute aurora-blob"
        style={{
          width: 400, height: 400,
          bottom: '5%', left: '35%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'aurora1 30s ease-in-out infinite alternate-reverse',
          borderRadius: '50% 50% 40% 60% / 60% 40% 55% 45%',
        }}
      />
    </div>
  )
}

/* ─── Animated perspective grid ─── */
function PerspectiveGrid() {
  return (
    <div
      className="fixed bottom-0 left-0 w-full pointer-events-none"
      style={{ zIndex: 0, height: '55vh', perspective: '600px' }}
    >
      <div
        style={{
          position:    'absolute',
          inset:       0,
          transform:   'rotateX(70deg)',
          transformOrigin: '50% 100%',
          backgroundImage: `
            linear-gradient(rgba(168,85,247,0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168,85,247,0.12) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          animation:   'gridScroll 6s linear infinite',
          maskImage:   'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 80%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 80%)',
        }}
      />
    </div>
  )
}

/* ─── Main export ─── */
export default function AnimatedBackground() {
  return (
    <>
      {/* Base dark gradient */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          background: 'linear-gradient(135deg, #040408 0%, #080812 35%, #060610 65%, #030305 100%)',
        }}
      />

      {/* Aurora blobs */}
      <AuroraBlobs />

      {/* Perspective grid at bottom */}
      <PerspectiveGrid />

      {/* Particle network */}
      <ParticleCanvas />

      {/* Noise overlay for texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.025]"
        style={{
          zIndex: 1,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Top edge glow line */}
      <div
        className="fixed top-0 left-0 w-full h-[1px] pointer-events-none"
        style={{
          zIndex: 1,
          background: 'linear-gradient(90deg, transparent 0%, rgba(168,85,247,0.6) 25%, rgba(0,240,255,0.4) 60%, rgba(168,85,247,0.3) 80%, transparent 100%)',
        }}
      />
    </>
  )
}
