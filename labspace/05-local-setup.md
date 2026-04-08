# Lab 5: Running sbx on Your Own Machine

## What you've learned

In Labs 2–4 you explored all three threat vectors from inside a sandboxed
Labspace environment:

| Threat | Without sbx | With sbx |
|--------|-------------|----------|
| Filesystem | Agent sees `~/Videos`, `~/.ssh`, everything | Only `~/expenseflow` mounted |
| Credentials | All env vars exposed, `~/.aws` readable | No creds in env, injected via proxy |
| Network | Any URL reachable, exfiltration possible | Policy-defined allow list only |

Now let's set this up on your actual machine.

## Install sbx

```bash
# macOS
brew install docker/tap/sbx

# Windows (PowerShell)
# winget install Docker.sbx

# Linux
# curl -fsSL https://get.docker.com/sbx | sh
```

Verify the install:

```bash
sbx version
```

## Clone ExpenseFlow

```bash
git clone https://github.com/ajeetraina/expenseflow
cd expenseflow
npm install
```

## Your first sandboxed agent run

```bash
# Without sbx — agent has full access (risky)
# claude "Refactor the codebase and clean up old files"

# With sbx — agent sees only this directory
sbx run claude "Refactor the codebase and clean up old files"
```

## YOLO mode — safely

The real power of sbx is enabling full agent autonomy without anxiety:

```bash
sbx run claude --dangerously-skip-permissions \
  "Refactor ExpenseFlow:
   1. Fix the N+1 query in src/db.js — use a JOIN instead
   2. Fix the SQL injection in getMonthlyTotals — use parameterized queries
   3. Add connection pooling (pool size 10)
   4. Update outdated npm packages
   5. Remove log files older than 30 days from logs/"
```

`--dangerously-skip-permissions` means no approval prompts. The agent works
unattended. And sbx means your host is completely safe regardless of what
the agent does inside the microVM.

## Works with any coding agent

```bash
sbx run gemini    "Review and refactor src/db.js"
sbx run opencode  "Fix the security issues in the codebase"
sbx run gh copilot "Suggest improvements for the expense routes"
```

## Dispose and repeat

```bash
# When the session ends, destroy the microVM
sbx stop

# The project files you asked the agent to change are saved (bind mount)
# Everything else — any tools installed, any side effects — is gone
git diff    # see exactly what the agent changed
git add -p  # review and selectively stage changes
```

## What's next

- [Docker Sandboxes documentation](https://docs.docker.com/ai/sandboxes/)
- [Collabnix community](https://collabnix.com) — more Docker AI tutorials
- Add `sbx run` to your team's contributing guide so every developer runs agents safely
