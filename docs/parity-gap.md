# Parity Gap Notes

## Canonical Contract

Website tab v2 is the canonical audit contract for grouped semantics.

That means the app should be treated as authoritative when it groups findings
into:

- sitewide blockers
- diagnosis groups
- repeated template patterns
- core-page failures
- low-value discovered URL noise

## Current OSS Position

The OSS skill repo should follow the same narrative semantics even when a public
artifact example or future CLI output shape catches up later.

Explicitly:

- grouped diagnoses are canonical before raw page-by-page repetition
- utility routes, `cdn-cgi`, cart, checkout, and stale legacy URLs should be
  down-ranked unless they affect core crawl or revenue-critical flows
- missing `llms.txt` is optional and low-priority, not a critical blocker

## Remaining Gap

Website tab v2 may present grouped semantics in richer app UX before every OSS
artifact or wrapper surface fully reflects that structure. If there is any
mismatch, preserve the Website tab v2 grouping logic in the public narrative and
update the OSS examples and prompts to match as they catch up.
