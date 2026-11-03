import type { ReactNode } from 'react'
import { Navbar } from '../components/Navbar'
import { FooterSection } from '../components/FooterSection'

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <FooterSection />
    </div>
  )
}
