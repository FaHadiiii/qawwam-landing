import { DisclosurePage } from './DisclosurePage'
import termsContent from '../content/terms.md?raw'

export function TermsPage() {
  return (
    <DisclosurePage
      title="Terms of Use"
      content={termsContent}
      updatedAt="2026-08-14"
      version="1.0.0"
    />
  )
}
