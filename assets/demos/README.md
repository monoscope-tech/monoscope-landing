# Homepage demos

Three looping product demos play in the hero tab strip and in the Know / Prove / Fix chapters. They are HTML, not video: real dashboard screens captured as DOM snapshots (dark mode), driven by a small storyboard. Crisp at any size, ~1 MB total, and every caption, click and pause is a line of JSON.

## Files

| Path | What |
|---|---|
| `know.html`, `prove.html`, `fix.html` | One demo each: the list of screens it uses and its storyboard |
| `screens/*.html` | Snapshots of real dashboard pages (body HTML, shadow roots serialised, images inlined). Generated, do not hand-edit |
| `screens/app.css` | The app's stylesheet, purged to what the screens use. Generated |
| `index.html` | Viewer: `/assets/demos/index.html?demo=prove` (add `&step=3` to hold on a step for screenshots) |
| `../js/demo-scene.js` | The player (`<demo-scene src="/assets/demos/know.html">`) |
| `../../scripts/demo-snapshot.mjs` | Captures the screens from a running monoscope on `localhost:8080` |

## Iterating

**Change the story:** edit the storyboard at the bottom of `know.html` / `prove.html` / `fix.html` and reload. Steps run in order and loop:

```json
{ "screen": "request", "caption": "Open one: the exact request that caused it", "focus": "text=Request", "wait": 2400 }
{ "cursor": "text=View trace", "click": true, "caption": "", "wait": 150 }
```

| Field | Meaning |
|---|---|
| `screen` | show this screen (crossfade) |
| `caption` | subtitle; `""` hides it |
| `cursor` | CSS selector, `text=Visible label`, or `[x%, y%]`; the cursor glides there |
| `click` | press ripple at the cursor |
| `focus` | soft highlight ring on the element |
| `reveal` / `swap` / `tab` / `type` | fade elements in, switch two blocks, mark a tab active, type into an element |
| `wait` | hold in ms after the step (default 900) |

The camera never zooms. Keep one idea per demo, 12–15 s per loop, captions in the site voice (`brand/voice.md`).

**Refresh the screens** (after a product UI change, or to add a page):

```sh
node scripts/demo-snapshot.mjs            # all scenes
node scripts/demo-snapshot.mjs catalog ai # only these
```

Scenes are listed in `SCENES` at the top of the script: a URL under the demo project plus optional clicks to reach the state you want. Components that cannot be serialised (the results list is a closed shadow root) are captured as 2× images in place; everything else stays real HTML.
