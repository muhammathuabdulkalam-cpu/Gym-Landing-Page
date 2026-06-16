import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiClock, FiPlus } from 'react-icons/fi'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Food() {
  const meals = [
    {
      type: "Breakfast",
      time: "08:00 AM",
      name: "Avocado Toast with Poached Eggs",
      calories: "450 kcal",
      protein: "22g",
      carbs: "38g",
      fat: "18g",
      items: ["Sourdough Bread (2 slices)", "Avocado (1/2 fruit)", "Poached Eggs (2 large)", "Cherry Tomatoes (50g)"],
      glow: "hover:border-purple-500/30 glow-card-purple"
    },
    {
      type: "Lunch",
      time: "01:15 PM",
      name: "Grilled Chicken Quinoa Salad",
      calories: "620 kcal",
      protein: "48g",
      carbs: "52g",
      fat: "14g",
      items: ["Chicken Breast (150g)", "Quinoa (cooked, 100g)", "Mixed Greens & Spinach", "Olive Oil Dressing (1 tbsp)"],
      glow: "hover:border-cyan/30 glow-card-cyan"
    },
    {
      type: "Dinner",
      time: "07:30 PM",
      name: "Baked Salmon & Sweet Potato",
      calories: "580 kcal",
      protein: "38g",
      carbs: "45g",
      fat: "22g",
      items: ["Atlantic Salmon Fillet (150g)", "Sweet Potato (baked, 150g)", "Broccoli florets (steamed, 100g)"],
      glow: "hover:border-purple-500/30 glow-card-purple"
    },
    {
      type: "Snacks",
      time: "04:30 PM",
      name: "Greek Yogurt with Mixed Berries",
      calories: "190 kcal",
      protein: "18g",
      carbs: "15g",
      fat: "4g",
      items: ["Greek Yogurt (non-fat, 150g)", "Blueberries & Raspberries (50g)", "Honey (1 tsp)"],
      glow: "hover:border-cyan/30 glow-card-cyan"
    }
  ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.fromTo('.food-header-anim',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.food-header-anim',
          start: 'top 85%',
        }
      }
    )

    gsap.fromTo('.food-card-anim',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.food-card-anim',
          start: 'top 80%',
        }
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section className="relative py-28 w-full bg-background overflow-hidden border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 food-header-anim">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-white">
              Log Your Meals <span className="text-purple-400 text-glow-purple">Effortlessly</span>
            </h2>
            <p className="text-zinc-400/80 font-medium mt-4 text-sm md:text-base">
              Track macros instantly. Search our extensive food library or scan barcodes to log ingredients directly from your camera roll.
            </p>
          </div>
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 text-sm">
            <FiPlus size={16} /> Add Custom Meal
          </button>
        </div>

        {/* Meal cards list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {meals.map((meal, idx) => (
            <div
              key={idx}
              className={`food-card-anim glass-panel p-6 rounded-2xl flex flex-col justify-between min-h-[340px] transition-all duration-300 relative overflow-hidden group ${meal.glow}`}
            >
              {/* Header */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/5 text-[9px] font-bold text-zinc-400 uppercase">
                    {meal.type}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-zinc-500 font-semibold">
                    <FiClock /> {meal.time}
                  </span>
                </div>
                <h4 className="text-base font-bold font-display text-white mb-2 leading-tight group-hover:text-purple-400 transition-colors">
                  {meal.name}
                </h4>
                <p className="text-xs text-purple-400 font-bold uppercase tracking-wider mb-4">
                  {meal.calories}
                </p>

                {/* Items detail */}
                <div className="border-t border-white/5 pt-4 flex flex-col gap-1.5">
                  {meal.items.map((item, i) => (
                    <span key={i} className="text-[11px] text-zinc-400/80 font-medium block truncate">
                      • {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Macros breakdown at the bottom */}
              <div className="flex justify-between border-t border-white/5 pt-4 mt-6 text-[10px] font-bold uppercase tracking-wider">
                <div className="text-center">
                  <span className="text-zinc-500 block">Prot</span>
                  <span className="text-white font-extrabold text-xs mt-0.5 block">{meal.protein}</span>
                </div>
                <div className="text-center">
                  <span className="text-zinc-500 block">Carb</span>
                  <span className="text-white font-extrabold text-xs mt-0.5 block">{meal.carbs}</span>
                </div>
                <div className="text-center">
                  <span className="text-zinc-500 block">Fat</span>
                  <span className="text-white font-extrabold text-xs mt-0.5 block">{meal.fat}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
