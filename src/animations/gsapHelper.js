import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register plugins once
gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

/**
 * Helper to apply a smooth reveal fade animation using ScrollTrigger
 * @param {string|Element} target 
 * @param {object} options 
 */
export const createFadeReveal = (target, options = {}) => {
  const {
    delay = 0,
    duration = 1,
    direction = 'y', // 'y', 'x', or 'none'
    distance = 40,
    trigger = target,
    start = 'top 85%',
    toggleActions = 'play none none reverse',
  } = options

  const vars = {
    opacity: 0,
    duration,
    delay,
    ease: 'power3.out',
    scrollTrigger: {
      trigger,
      start,
      toggleActions,
    }
  }

  if (direction !== 'none') {
    vars[direction] = distance
  }

  return gsap.from(target, vars)
}

/**
 * Helper to count up standard numeric values
 * @param {string|Element} target 
 * @param {number} endValue 
 * @param {object} options 
 */
export const createCountUp = (target, endValue, options = {}) => {
  const {
    duration = 2,
    delay = 0,
    trigger = target,
    start = 'top 90%',
  } = options

  const obj = { value: 0 }
  
  return gsap.to(obj, {
    value: endValue,
    duration,
    delay,
    ease: 'power1.out',
    scrollTrigger: {
      trigger,
      start,
      toggleActions: 'play none none none',
    },
    onUpdate: () => {
      const el = typeof target === 'string' ? document.querySelector(target) : target
      if (el) {
        el.textContent = Math.floor(obj.value).toLocaleString()
      }
    }
  })
}
