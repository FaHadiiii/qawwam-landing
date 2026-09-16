import { DisclosurePage } from './DisclosurePage'
import acknowledgementContent from '../content/acknowledgement.md?raw'
import { disclosures } from '../content/disclosures'

const meta = disclosures.acknowledgement

export function AcknowledgementPage() {
  return (
    <DisclosurePage
      title={meta.title}
      content={acknowledgementContent}
      updatedAt={meta.updatedAt}
      version={meta.version}
    />
  )
}
