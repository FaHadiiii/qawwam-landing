import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'motion/react'
import { ThemeProvider } from './lib/theme'
import { GalleryProvider } from './lib/gallery'
import { ScrollToTop } from './components/ScrollToTop'
import { Home } from './pages/Home'
import { TermsPage } from './pages/TermsPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { AcknowledgementPage } from './pages/AcknowledgementPage'
import { AccountDeletionPage } from './pages/AccountDeletionPage'
import { KhatamInvitePage } from './pages/KhatamInvitePage'

function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <GalleryProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/acknowledgement" element={<AcknowledgementPage />} />
              <Route path="/account-deletion" element={<AccountDeletionPage />} />
              <Route path="/khatam/:token" element={<KhatamInvitePage />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </GalleryProvider>
      </MotionConfig>
    </ThemeProvider>
  )
}

export default App
