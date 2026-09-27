# Homepage demos

The homepage no longer needs screen recordings. The three chapter demos (Know / Prove / Fix) are HTML: real dashboard screens captured as DOM snapshots and driven by a storyboard. See `assets/demos/README.md` for how to edit a storyboard or refresh the screens from a running monoscope.

If real video is ever wanted instead, drop `know.mp4`, `prove.mp4` or `fix.mp4` into `assets/videos/` and remove the matching `demo:` key in `index.md`; the slot falls back to `<video>`.
