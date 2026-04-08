# Lab 5: Running sbx on Your Own Machine

## What you've learned

| Threat | Without sbx | With sbx |
|--------|-------------|----------|
| Filesystem | Agent sees your entire home directory | Only project directory mounted |
| Credentials | All env vars exposed | No creds in env — injected via proxy |
| Network | Any URL reachable | Policy-defined allow list only |

## Install sbx

```bash
brew install docker/tap/sbx
```

```bash
sbx version
```

## Run ExpenseFlow safely

```bash
git clone https://github.com/ajeetraina/expenseflow
cd expenseflow
```

Before (risky):

```bash
claude "Refactor the codebase and clean up old files"
```

After (safe):

```bash
sbx run claude "Refactor the codebase and clean up old files"
```

One word added. Same task. Completely different trust boundary.

## YOLO mode — safely

```bash
sbx run claude --dangerously-skip-permissions \
  "Fix the N+1 query in src/db.js, fix the SQL injection in
   getMonthlyTotals, add connection pooling, update outdated
   packages, and delete log files older than 30 days."
```

Full autonomy. No approval prompts. Your host is completely safe.

## Review what changed

```bash
sbx stop
git diff
git add -p
```

The microVM is gone. The project changes are preserved. Nothing else was touched.

## Next steps

- [Docker Sandboxes docs](https://docs.docker.com/ai/sandboxes/)
- [ExpenseFlow on GitHub](https://github.com/ajeetraina/expenseflow)
- [Collabnix community](https://collabnix.com)
