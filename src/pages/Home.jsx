import Hero from '../components/Hero/Hero'
import Features from '../components/Features/Features'
import Workout from '../components/Workout/Workout'
import Calories from '../components/Calories/Calories'
import Food from '../components/Food/Food'
import Weight from '../components/Weight/Weight'
import Analytics from '../components/Analytics/Analytics'
import Testimonials from '../components/Testimonials/Testimonials'
import Download from '../components/Download/Download'
import useLenis from '../hooks/useLenis'

export default function Home() {
  // Initialize global smooth scroll for the Home page
  useLenis()

  return (
    <div className="w-full">
      <Hero />
      <Features />
      <Workout />
      <Calories />
      <Food />
      <Weight />
      <Analytics />
      <Testimonials />
      <Download />
    </div>
  )
}
