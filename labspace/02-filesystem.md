# Lab 2: Filesystem Isolation

## What can go wrong

A developer asked their AI coding agent:

> *"My disk is almost full. Clean up old logs and unused files."*

The agent ran `du -sh ~/*` to find the biggest directories. It found `~/Videos` at 61GB — the largest — and deleted it. Those were 10 years of family photos. `rm -rf` has no undo.

The agent wasn't malicious. It was doing exactly what was asked. It just had no boundary.

## Step 1 — See what this sandbox can see

```bash
find /root -maxdepth 3 -type d 2>/dev/null | head -20
```

No `/root/Videos`, no `/root/.aws`, no `/root/.ssh`. Only the project. On a real Mac without sbx, that same command would show your entire home directory.

## Step 2 — Check what the agent CAN clean up

```bash
ls -lh ~/project/logs/
```

Old log files are here. Because only the project is mounted, that's all the agent can touch.

## Step 3 — Clean up safely

```bash
rm -v ~/project/logs/app-2024-01.log ~/project/logs/app-2024-02.log
```

```bash
ls ~/project/logs/
```

Logs deleted. Everything outside `~/project/` is untouched — because it was never visible.

## The sbx guarantee

```bash
sbx run claude "My disk is almost full. Clean up old logs."
# Agent runs in microVM — only ~/expenseflow/ mounted
# ~/Videos invisible. ~/. aws invisible. Hard boundary, not policy.
```

Move to **Lab 3: Credentials isolation**.
