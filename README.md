# birdie ✕ san francisco 🌉

A 5-day advent calendar counting down to the SF trip (july 9–13, 2026). One door
per day, each with a silly unlock gesture, a little game, and a postcard with a
love note + SF lore on the back.

| day | date | unlock | inside |
|---|---|---|---|
| 1 | thu jul 9 | scratch-off golden ticket | tiny SF crossword |
| 2 | fri jul 10 | shake the fortune cookie | **birdle** (wordle, answer: `POPPY`) |
| 3 | sat jul 11 | wipe away karl the fog | semantle-ish (answer: `golden`) |
| 4 | sun jul 12 | pet max until he moves | playlist + song |
| 5 | mon jul 13 | unzip the suitcase | boarding passes 🎉 |

Doors unlock at **midnight (her phone's local time)** on their date.

## run it locally

```bash
npm install
npm run dev
```

Open the `http://192.168.x.x:5173` URL it prints **on your iPhone** (same wifi).

**Preview mode** — add `?preview=1` to the URL to open every door early for
testing. Progress is saved in localStorage; to reset, Safari → clear website data
(or use a private tab while testing).

> Heads up: the shake-to-crack cookie needs HTTPS for motion sensors (iOS rule),
> so on plain-http localhost it falls back to tap-to-crack automatically. It'll
> shake for real once deployed on Render.

## ✏️ your to-do list (all edits in `src/content.ts`)

1. **Love notes** — I drafted all 5 (`note`, `ps` per day). Make them yours.
2. **Flight time** — `TRIP.departISO` powers the countdown clock.
3. **Playlist** — paste your link into `PLAYLIST.url` (spotify links get an
   embedded player) and set `PLAYLIST.songLabel`.
4. **The song** — drop an mp3 at `public/song.mp3`. It plays right after she
   pets Max (with a play-button fallback if Safari blocks autoplay).
5. **Sunday night** — screenshot the boarding passes, save as
   `public/boarding-pass-1.png` (+ `-2.png`), commit & push. Render redeploys
   automatically. Until then day 5 shows a cute placeholder.
   - ⚠️ the site URL is public — anyone with the link can see the passes.
     Consider cropping out the barcode/record locator.
6. Semantle words/scores/easter eggs: `src/games/semantleData.ts`.

## deploy to Render (free)

1. Push this repo to GitHub.
2. Render dashboard → **New → Static Site** → connect the repo.
3. It reads `render.yaml` automatically (build `npm ci && npm run build`,
   publish `dist`). Done — you get an https URL to text her thursday morning.

To update content later: edit, commit, push — Render auto-deploys in ~a minute.
