# Welcome to the Docker Sandboxes Workshop

## The story

You have an expense tracker app called **ExpenseFlow**. It connects to Stripe for payment receipts, AWS S3 for report exports, and PostgreSQL for data. Real credentials, real integrations.

You want to hand it to an AI coding agent and say:

> *"Refactor the codebase. Clean up old logs, optimize the DB queries, check for outdated dependencies."*

Simple enough. But where that agent runs — and what it can see — makes all the difference.

## The three threats

Without Docker Sandboxes, that agent gets:

| Threat | What the agent can access |
|--------|---------------------------|
| Filesystem | Your **entire home directory** — not just the project |
| Credentials | Every **environment variable** — including live Stripe and AWS keys |
| Network | **Any URL** — it can call external endpoints freely |

## You're already sandboxed

This Labspace **is itself an isolated container**. The terminal on the right runs inside it. Your Mac's `~/Videos`, `~/.aws`, and `~/.ssh` are not visible here — which is exactly the point.

In Labs 2–4 you'll observe each threat hands-on. In Lab 5, you'll learn how to replicate this safety locally with `sbx`.

## Meet the app

The project is already here. Take a look:

```bash
ls ~/project/
```

```bash
cat ~/project/.env.example
```

Note the credentials — Stripe key, AWS keys, S3 bucket. An agent that can read these can do anything with them.

Move to **Lab 2: Filesystem isolation** when ready.
