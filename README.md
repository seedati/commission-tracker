# Commission Tracker (Azure Static Web Apps)

This repo is a ready-to-deploy static HTML site with an interactive evidence board.

## Quick start (local)
- Open `index.html` directly in your browser.

## Data
- The app loads data in this order:
  1) `/api/dataset` (optional)
  2) `/data/latest.json` (static fallback)

Update `data/latest.json` and commit to deploy new data.

## Optional API
- If you want server-side data, configure a `DATASET_URL` app setting.
- The included function fetches that URL server-side and returns JSON at `/api/dataset`.
