# The App and the Problem

## Meet ExpenseFlow

Your working directory contains ExpenseFlow — a Node.js expense tracker
with real-world integrations. Take a look:

```bash
ls -la ~/project/
```

```bash
cat ~/project/package.json
```

This app connects to PostgreSQL, Stripe (for receipts), and AWS S3 (for report exports).
The `.env.example` shows what credentials a real deployment uses:

```bash
cat ~/project/.env.example
```

## The developer's intent

Imagine you want to hand this codebase to an AI coding agent:

```
"Refactor the codebase. Clean up old logs, optimize the DB queries,
 remove unused files, and check for outdated dependencies."
```

Simple and reasonable. But without Docker Sandboxes, that agent gets:

- **Full filesystem access** — not just `~/project/`, but everything visible
- **All environment variables** — including your live Stripe and AWS keys
- **Unrestricted network** — it can call any external API

## The three threat vectors

Over the next three labs you'll explore exactly what that means — from *inside*
a sandboxed environment (this Labspace), which already limits what you can see.

| Lab | Threat | The risk |
|-----|--------|----------|
| Lab 2 | Filesystem | Agent deletes files outside your project |
| Lab 3 | Credentials | Agent reads and potentially exfiltrates your secrets |
| Lab 4 | Network | Agent makes outbound calls to unintended endpoints |
| Lab 5 | All three safe | Everything protected with `sbx run` on your machine |

> **You're already sandboxed.** This Labspace is itself a container with limited
> access. Labs 2–4 let you observe both the risky and the safe behavior.
> Lab 5 shows you how to replicate that safety locally using `sbx`.

## Before you continue

Confirm you can see the project files:

```bash
ls ~/project/src/
```

You should see `app.js`, `db.js`, and `routes/`. Ready — move to Lab 2.
