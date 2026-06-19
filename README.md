# Playwright E2E Demo — SauceDemo

[![Playwright Tests](https://github.com/Luke-systems/playwright-demo/actions/workflows/playwright.yml/badge.svg)](https://github.com/Luke-systems/playwright-demo/actions/workflows/playwright.yml)

An end-to-end test suite for [SauceDemo](https://www.saucedemo.com) (a public e-commerce
practice app), built with [Playwright](https://playwright.dev) and TypeScript. It covers the
core purchase journey — **login → add to cart → checkout** — using the page-object pattern and
runs automatically in CI on every push.

This is a portfolio piece demonstrating my **AI-accelerated QA** workflow: I pair with an AI
coding agent (Claude) to move fast, then apply QA judgment to make the suite reliable.

## What it covers

| Spec | Scenarios |
|---|---|
| `tests/login.spec.ts` | Valid login, locked-out user error, wrong-password error |
| `tests/cart.spec.ts` | Cart badge updates, multiple items reflected in the cart |
| `tests/checkout.spec.ts` | Full end-to-end purchase, checkout form validation |

## Structure

```
pages/      Page objects (Login, Inventory, Cart, Checkout)
tests/      Test specs grouped by feature
playwright.config.ts   Config: baseURL, data-test locators, CI retries, Chromium + Firefox
.github/workflows/     GitHub Actions CI
```

## Running locally

```bash
npm install
npx playwright install        # download browsers
npm test                      # run the suite headless
npm run test:headed           # watch it run in a browser
npm run report                # open the HTML report
```

## Notes on design

- **Stable locators.** SauceDemo exposes `data-test` attributes, so the config sets
  `testIdAttribute: 'data-test'` and tests use `getByTestId(...)` instead of brittle CSS/XPath.
- **Page objects** keep selectors in one place, so a UI change is a one-line fix, not a
  find-and-replace across specs.
- **CI-aware config** — retries and single-worker runs only on CI for stable, repeatable results.

## How this was built (the AI-accelerated part)

- **What the agent (Claude) did:** scaffolded the framework, drafted the page objects and the
  first cut of each test, and wrote the GitHub Actions workflow.
- **What I did:** chose which flows were worth covering (the high-risk purchase path), hardened
  the locators to stable `data-test` hooks, removed flaky waits, and reviewed every generated
  test to confirm it actually asserts something meaningful — not just that the page loaded.
- **What I'd change next time:** add visual-regression checks on key screens, parametrize the
  suite across more viewports/browsers, and introduce API-level setup to make tests faster and
  less dependent on the UI for state.
