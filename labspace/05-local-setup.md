# Lab 5: Running sbx on Your Own Machine

> **Run these commands on your Mac terminal — not in the Labspace terminal.**
> Open a new terminal window on your Mac to follow along.

## What you've learned

| Threat | Without sbx | With sbx |
|--------|-------------|----------|
| Filesystem | Agent sees your entire home directory | Only project directory mounted |
| Credentials | All env vars exposed | Injected via network proxy |
| Network | Any URL reachable | Policy-defined allow list only |

## Install sbx on your Mac

```bash
brew install docker/tap/sbx
```

```bash
sbx version
```

## Clone ExpenseFlow

```bash
git clone https://github.com/ajeetraina/expenseflow
cd expenseflow
```

## Run the agent safely

Without sbx — agent has full access to your Mac:

```bash
claude "Refactor the codebase and clean up old files"
```

With sbx — agent runs in an isolated microVM:

```bash
sbx run claude "Refactor the codebase and clean up old files"
```

One word added. Your `~/Videos`, `~/.aws`, `~/.ssh` — completely out of reach.

## YOLO mode — now actually safe

```bash
sbx run claude --dangerously-skip-permissions \
  "Fix the N+1 query in src/db.js, fix the SQL injection in
   getMonthlyTotals, add connection pooling, update outdated
   packages, delete log files older than 30 days."
```

Full autonomy. No approval prompts. Your host is untouched.

## Works with any agent

```bash
sbx run gemini    "Review src/db.js"
sbx run opencode  "Fix the security issues"
sbx run codex     "Update all dependencies"
```

## Review what changed

```bash
sbx stop       # destroy the microVM
git diff       # see exactly what the agent changed
git add -p     # stage only what you want
```

## Next steps

- [Docker Sandboxes docs](https://docs.docker.com/ai/sandboxes/)
- [ExpenseFlow on GitHub](https://github.com/ajeetraina/expenseflow)
- [Collabnix community](https://collabnix.com)
