import { DisclosurePage } from './DisclosurePage'
import acknowledgementContent from '../content/acknowledgement.md?raw'

export function AcknowledgementPage() {
  return (
    <DisclosurePage
      title="Acknowledgement"
      content={acknowledgementContent}
      updatedAt="2026-08-14"
      version="1.0.0"
    />
  )
}
