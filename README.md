# Playwright e-commerce automation

This is a complete end-to-end project. The purchase test in `tests/checkout.spec.ts` walks one shopper through the whole store: sign in, choose products, validate the cart, enter shipping details, confirm the total, and place the order.

The site under test is the public [Sauce Demo](https://www.saucedemo.com/) store. Playwright is the tool that drives the browser. Sauce Demo publishes the practice logins used in `src/data/users.data.ts`.

Sauce Demo is a practice site. The usernames and password in `src/data/users.data.ts` are published by that site for training.

## Prerequisites

- Node.js 18 or newer (this project was created with Node.js 24)
- npm
- Git, if you want version control

## Setup

From this folder:

```bash
npm install
npx playwright install chromium
```

`npm install` adds the Playwright test runner and TypeScript to this project only. It does not change system-wide settings. `npx playwright install chromium` downloads the Chromium browser Playwright controls.

## Run the tests

```bash
npm test
```

Other useful commands:

| Command | What it does |
| --- | --- |
| `npm run test:headed` | Runs tests in a visible browser window |
| `npm run test:ui` | Opens Playwright's interactive test UI |
| `npm run test:debug` | Pauses on each action so you can step through |
| `npm run report` | Opens the HTML report from the last run |
| `npm run typecheck` | Checks TypeScript without running the browser |

## Project structure

```text
playwright.config.ts          Runner settings: site URL, browser, reports
src/data/                     Usernames, products, and checkout details
src/pages/                    Page objects: one class per screen
src/flows/                    Shared steps, such as signing in
src/fixtures/test.fixture.ts  Creates page objects for each test
src/utils/money.ts            Price formatting and tax math
tests/                        The scenarios you run
```

Tests describe what a shopper does. Page objects know how to click and assert on one screen. That split keeps a checkout test readable when the website's buttons change: you update the page object, not every test.

## What the tests cover

- Login with a valid user, a locked-out user, and missing fields
- Adding products and checking names, prices, and quantities in the cart
- Removing a product from the cart
- Checkout information, item total, tax, grand total, and the order confirmation
- Checkout blocked when the first name is missing

## GitHub

The project is published at [19PA1A0416/Playwright-Automation-Project](https://github.com/19PA1A0416/Playwright-Automation-Project).

After you change tests, commit from this folder and push:

```bash
git add .
git commit -m "Describe what you changed"
git push
```

`git status` should not list `node_modules/`, `test-results/`, or `playwright-report/`. Those folders are listed in `.gitignore`.

GitHub Actions runs `npm test` on each push. The workflow file is `.github/workflows/playwright.yml`.

## Debug a failure

Playwright saves a screenshot, video, and trace when a test fails (traces are saved on retry; locally, rerun the failed test with `--trace on`):

```bash
npx playwright test tests/checkout.spec.ts --trace on
npx playwright show-trace test-results\<trace-folder>\trace.zip
```

The HTML report also lists the failed step and the screenshot:

```bash
npm run report
```
