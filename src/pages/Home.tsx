import { Navbar } from '../components/Navbar'
import { Hero } from '../components/Hero'
import { ConnectionSection } from '../components/ConnectionSection'
import { Features } from '../components/Features'
import { ScreenshotShowcase } from '../components/ScreenshotShowcase'
import { Testimonials } from '../components/Testimonials'
import { FAQ } from '../components/FAQ'
import { DownloadCTA } from '../components/DownloadCTA'
import { Footer } from '../components/Footer'

export function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ConnectionSection />
        <Features />
        <ScreenshotShowcase />
        <Testimonials />
        <FAQ />
        <DownloadCTA />
      </main>
      <Footer />
    </div>
  )
}
