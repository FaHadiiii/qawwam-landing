import { DisclosurePage } from './DisclosurePage'
import privacyContent from '../content/privacy.md?raw'

export function PrivacyPage() {
  return (
    <DisclosurePage
      title="Privacy Policy"
      content={privacyContent}
      updatedAt="2026-08-14"
      version="1.0.0"
    />
  )
}
