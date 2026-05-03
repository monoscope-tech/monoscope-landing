---
title: Install & Authenticate
date: 2026-05-02
updatedDate: 2026-05-02
faLogo: download
menuWeight: 1
---

# Install & Authenticate

A single static binary on Linux and macOS, x86_64 and arm64. No runtime,
no Docker, no package-manager dance — `curl | bash` and you're done.

## Install

### One-liner (recommended)

```sh
curl -fsSL https://monoscope.tech/install.sh | bash
```

The script:

1. Detects your platform (`linux-x86_64`, `linux-arm64`, `darwin-x86_64`, `darwin-arm64`).
2. Downloads the matching release archive from GitHub.
3. Verifies the SHA256 checksum.
4. Installs `monoscope` into `~/.local/bin` (override with `MONOSCOPE_INSTALL_DIR`).

### Specific version

```sh
curl -fsSL https://monoscope.tech/install.sh | bash -s v1.2.3
```

### Custom install location

```sh
MONOSCOPE_INSTALL_DIR=/usr/local/bin curl -fsSL https://monoscope.tech/install.sh | bash
```

### Upgrading

Re-running the install script upgrades to the latest release. If the binary
is already current the script exits with `already up to date`. To force-reinstall
the same version, pass `--force`:

```sh
curl -fsSL https://monoscope.tech/install.sh | bash -s -- --force
```

### Verify

```sh
monoscope --version
monoscope --help
```

## Authenticate

### Browser-based login (interactive)

```sh
monoscope auth login
```

Opens your browser, prompts you to approve a device code, then writes a
session token to `~/.config/monoscope/tokens.json` (mode `0600`).

### Token-based login (CI / non-interactive)

For CI pipelines and any environment where opening a browser is impractical,
use a long-lived API key instead. Generate one in the dashboard
(*Settings → API Keys*) or via the CLI itself once you've logged in:

```sh
monoscope api-keys create "ci-pipeline" -o json | jq -r .key
```

Then:

```sh
monoscope auth login --token <api-key>
```

Or skip the file altogether and pass it through environment:

```sh
export MONOSCOPE_API_KEY=<api-key>
monoscope auth status
```

### Status & logout

```sh
monoscope auth status     # human-readable
monoscope --agent auth status   # JSON: {authenticated, method, api_url, project}
monoscope auth logout     # remove ~/.config/monoscope/tokens.json
```

```=html
<div class="callout">
  <i class="fa-solid fa-shield-halved"></i>
  <p><strong>Agent mode is non-interactive.</strong>
  In <code>--agent</code> mode (or with <code>MONOSCOPE_AGENT_MODE=1</code> /
  <code>CI=1</code> / <code>CLAUDE_CODE=1</code>),
  <code>auth login</code> without <code>--token</code> exits non-zero rather
  than launching a 5-minute device-code poll. Always pass a token when running
  unattended.</p>
</div>
```

## Configure

Configuration is resolved in this order (later wins):

1. `~/.config/monoscope/config.yaml` — global config
2. `.monoscope.yaml` — project-local config (searched up from cwd)
3. Environment variables

### Interactive setup

```sh
monoscope config init
```

### Manual

```sh
monoscope config set project <project-uuid>
monoscope config set api_url https://your-self-hosted-instance.example.com
monoscope config get             # show all
monoscope config get project     # show one value
monoscope --agent config get     # JSON output, suitable for piping
```

Valid keys: `api_url`, `project`, `api_key`.

### Environment variables

| Variable | Description |
|---|---|
| `MONOSCOPE_API_KEY` | API key — takes precedence over stored token. |
| `MONOSCOPE_PROJECT` | Default project UUID — overridable per-invocation with `--project/-p`. |
| `MONOSCOPE_API_URL` | API base URL (default: `https://api.monoscope.tech`). Point at `http://localhost:8080` to drive a self-hosted dev server. |
| `MONOSCOPE_AGENT_MODE` | Set to `1` to force JSON output and disable interactive prompts. Auto-detected when `CI` or `CLAUDE_CODE` is set. |
| `MONOSCOPE_DEBUG` | Set to `1` (or pass `--debug`) to print every outgoing request URL and params to stderr. Invaluable when an agent gets a 4xx and needs to inspect what it actually sent. |

## Shell completions

```sh
monoscope completion bash >> ~/.bashrc
monoscope completion zsh  >> ~/.zshrc
monoscope completion fish >> ~/.config/fish/completions/monoscope.fish
```

Unknown shells exit non-zero with a clear error rather than silently emitting
a bash script.

## See also

- [Command Reference](/docs/ai/cli/commands/) — every subcommand with examples.
- [Agentic Pipelines](/docs/ai/cli/agentic/) — the JSON contract agents rely on.
- [MCP Server](/docs/ai/mcp/) — same surface over the network, no install required.
