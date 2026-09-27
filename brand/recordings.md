# Homepage Recording Shot List

Three screen recordings carry the homepage. Each plays twice: in the hero tab strip (Know · Prove · Fix) and as the single visual of its chapter. Until a file exists at `assets/videos/<filename>`, each slot shows a stand-in (the Explore and Dashboard screenshots for Know and Prove, a mocked Slack message for Fix) with a small filename badge. Drop the file in and it plays, no markup change needed.

Format: 16:9, 1920x1080, no audio, 25–30 seconds, loops cleanly (end where you started, or fade). Record inside the app at 100% zoom with the browser chrome cropped out; the page adds its own window frame. Hide anything with real customer names.

| File | Chapter | What's on screen | Length |
|------|---------|------------------|--------|
| `know.mp4` | 01 Know | Issues list. Open an issue. The request that triggered it: headers, request body, response body, then the trace tab. Click a log line, then the session replay. | 25–30s |
| `prove.mp4` | 02 Prove | Outgoing requests. Open a request to a supplier API (payments or logistics). Request body, then the 200 response with its acknowledgement body and the timestamp. End on the share link. | 20–25s |
| `fix.mp4` | 03 Fix | Slack: a message from a routine with the root cause, the failing request and a PR link. Click through to the PR diff on GitHub. Back in Slack, type "Why is checkout slower than yesterday?" and show the answer with a chart. | 25–30s |

Two code blocks sit under the Prove and Fix recordings (DuckDB and the CLI). They are static, nothing to record.

## Retired

No longer referenced by the homepage; they carry old APItoolkit branding. Delete once nothing else uses them: `ask-like-colleague.mp4`, `change-detection.mp4`, `from-anywhere.mp4`, `know-instantly.mp4`, `measure-anything.mp4`, `see-everything.mp4`, `weekly-reports.mp4`.
