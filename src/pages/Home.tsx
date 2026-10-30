import { Navbar } from '../components/Navbar'
import { Hero } from '../components/Hero'
import { FeaturesGrid } from '../components/FeaturesGrid'
import { ConnectionSection } from '../components/ConnectionSection'
import { Testimonials } from '../components/Testimonials'
import { FAQ } from '../components/FAQ'
import { FooterSection } from '../components/FooterSection'

export function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeaturesGrid />
        <ConnectionSection />
        <Testimonials />
        <FAQ />
      </main>
      <FooterSection />
    </div>
  )
}
