import { DisclosurePage } from './DisclosurePage'
import termsContent from '../content/terms.md?raw'
import { disclosures } from '../content/disclosures'

const meta = disclosures['terms-of-use']

export function TermsPage() {
  return (
    <DisclosurePage
      title={meta.title}
      content={termsContent}
      updatedAt={meta.updatedAt}
      version={meta.version}
    />
  )
}
