import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './lib/theme'
import { ScrollToTop } from './components/ScrollToTop'
import { Home } from './pages/Home'
import { TermsPage } from './pages/TermsPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { AcknowledgementPage } from './pages/AcknowledgementPage'
import { AccountDeletionPage } from './pages/AccountDeletionPage'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/acknowledgement" element={<AcknowledgementPage />} />
          <Route path="/account-deletion" element={<AccountDeletionPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
