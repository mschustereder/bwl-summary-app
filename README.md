# BWL Chapter Summary App

Studying for the WU Aufnahmetest (Bachelor Wirtschafts- und Sozialwissenschaften). Created using OpenCode/DeepSeek V4 Flash Free and the official BWL script "Wirtschaft verstehen" for the WU entrance exam 2026/27.

A simple local web app to view per-chapter summaries of the BWL script. The summaries vary in depth based on chapter importance — Chapter 3 (Unternehmen) is the most detailed.

## Quick Start (anyone)

```bash
git clone <repo-url>
cd bwl-summary-app
python3 server.py
```

Then open **http://127.0.0.1:8001** in your browser.

Requires Python 3 (stdlib only — no pip install needed).

### Local convenience wrapper

If you have `~/.local/bin/` in your PATH, you can symlink the server for quick access:

```bash
ln -s "$(pwd)/server.py" ~/.local/bin/bwl-summary
bwl-summary
```

## Chapter Depth

| # | Title | Words | Depth |
|---|-------|-------|-------|
| 1 | Warum wir wirtschaften | ~1050 | Medium |
| 2 | Wirtschaft & Gesellschaft/Umwelt | ~870 | Medium-light |
| 3 | Was Wirtschaften für Unternehmen bedeutet | ~2170 | Very detailed |
| 4 | Digitalisierung & Vernetzung | ~480 | Light |

Summaries use exact wording from the official script and are written in German.

## Tech Stack

- Python 3 (stdlib HTTP server, no dependencies)
- Vanilla JS, HTML, CSS (no frameworks)

## Repository

- `server.py` — HTTP server on port 8001
- `index.html`, `style.css`, `app.js` — SPA frontend
- `chapters/` — chapter summary JSON files

