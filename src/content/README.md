# Disclosure content

`terms.md`, `privacy.md`, `acknowledgement.md` and `disclosures.ts` here are
**generated from the API** — do not edit them by hand.

`qawwam-api` (`src/services/disclosure.service.ts`) is the source of truth for
these documents. The app renders the same markdown from the same endpoint, so a
hand edit in this repo only makes the landing disagree with the app, and the next
sync discards it without saying so.

```bash
npm run disclosures:sync     # write from the API, then commit
npm run disclosures:check    # verify; exits non-zero when behind
```

Both need `API_TOKEN` in the environment or in `.env.local`. Dev and prod use
different token values and neither works against the other's base:

```bash
npm run disclosures:sync -- --base https://qawwam-api.hadiayo39.workers.dev
```

`account-deletion.md` is **not** generated: the API has no account-deletion
endpoint, so it and `AccountDeletionPage.tsx` are hand-written.
