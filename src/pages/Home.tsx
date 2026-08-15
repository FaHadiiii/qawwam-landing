import { Navbar } from '../components/Navbar'
import { Hero } from '../components/Hero'
import { Features } from '../components/Features'
import { QuranShowcase } from '../components/QuranShowcase'
import { Demos } from '../components/Demos'
import { Stats } from '../components/Stats'
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
        <Features />
        <QuranShowcase />
        <Demos />
        <Stats />
        <Testimonials />
        <FAQ />
        <DownloadCTA />
      </main>
      <Footer />
    </div>
  )
}
