import { DisclosurePage } from './DisclosurePage'
import privacyContent from '../content/privacy.md?raw'
import { disclosures } from '../content/disclosures'

const meta = disclosures['privacy-policy']

export function PrivacyPage() {
  return (
    <DisclosurePage
      title={meta.title}
      content={privacyContent}
      updatedAt={meta.updatedAt}
      version={meta.version}
    />
  )
}
