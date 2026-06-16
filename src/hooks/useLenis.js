import Lenis from 'lenis'
import { useEffect } from 'react'

export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    // Connect Lenis with GSAP ScrollTrigger
    lenis.on('scroll', () => {
      // Trigger GSAP ScrollTrigger updates on scroll
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        ScrollTrigger.update();
      });
    });

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])
}
