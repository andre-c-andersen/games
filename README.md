# 🌙 Moon Lander

A classic lunar lander arcade game for the browser — with sci-fi defense cannons, droppable bombs, and full Xbox controller support. Single self-contained HTML file, no dependencies, no build step.

## Play

Once published with GitHub Pages, the game runs at:

```
https://<your-username>.github.io/<repo-name>/
```

Or just open `index.html` in any modern browser.

## How to play

Land gently on the green pads. A safe landing needs low speed and a nearly upright ship — the VX/VY readouts turn red when you're coming in too hot. Two cannons track you and fire slow slugs: dodge them, or bomb them (+75 points each). Leftover fuel adds to your score. Pads are marked ×2 / ×4 for their score multiplier.

### Keyboard

| Key | Action |
|---|---|
| ← / → (or A / D) | Rotate |
| ↑ / Space (or W) | Thrust |
| B / S / ↓ | Drop bomb |
| L | Toggle level assist |
| ESC | Settings menu |
| Space / Enter | Retry / next level |

### Xbox controller

| Input | Action |
|---|---|
| Left stick / D-pad | Rotate (analog) |
| Right trigger | Thrust (analog throttle) |
| A | Full thrust / retry / next level |
| B / LB | Drop bomb |
| X | Toggle level assist |
| Back | Settings menu |

The settings menu has adjustable rotation sensitivity, stick deadzone, and trigger threshold — saved in your browser.

## Publishing on GitHub Pages (website only, no git needed)

1. On [github.com](https://github.com), click **+** → **New repository**. Name it (e.g. `moon-lander`), set it to **Public**, and create it.
2. On the new repo page, click **uploading an existing file**, drag in `index.html` and `README.md`, and click **Commit changes**.
3. Go to **Settings → Pages**. Under *Build and deployment*, set **Source** to *Deploy from a branch*, pick branch **main** and folder **/ (root)**, and click **Save**.
4. Wait a minute, then visit `https://<your-username>.github.io/moon-lander/` — your game is live.
