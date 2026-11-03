import { DisclosurePage } from './DisclosurePage'
import accountDeletionContent from '../content/account-deletion.md?raw'

export function AccountDeletionPage() {
  return (
    <DisclosurePage
      title="Account Deletion"
      content={accountDeletionContent}
    />
  )
}
