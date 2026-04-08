# Lab 2: Filesystem — When "Clean Up" Goes Wrong

## What an agent sees without isolation

Without Docker Sandboxes, an AI agent on your laptop can see your **entire
home directory**. Let's simulate that. Run this to see what the agent would
discover:

```bash
find /root -maxdepth 3 -type d 2>/dev/null | head -30
```

On a real developer machine, this would show directories like:

```
/root
/root/Videos          ← 61G of family photos and videos
/root/builds          ← 19G of old build artifacts
/root/expenseflow     ← your project
/root/.aws            ← AWS credentials
/root/.ssh            ← SSH keys
```

When you ask the agent to "clean up disk space", it sees ALL of that.

## The disaster scenario

Here's what actually happened to a developer who ran:

```
claude "My disk is almost full. Clean up old logs and unused files."
```

The agent ran `du -sh ~/*`, saw `~/Videos` was 61GB — the biggest directory —
and helpfully deleted it. That was 10 years of family photos. With `rm -rf`,
there's no undo.

## What the sandboxed view looks like

Now check what's visible from inside this Labspace:

```bash
find /root -maxdepth 2 -type d 2>/dev/null
```

Notice there's no `Videos`, no `.aws`, no `.ssh`. Just the project.

Now look at what the agent CAN clean up — the old log files:

```bash
ls -lh ~/project/logs/
```

```bash
# This is safe — only project files are in scope
find ~/project/logs -name "*.log" -mtime +30 2>/dev/null || \
find ~/project/logs -name "*.log"
```

```bash
# Delete only the old logs
rm -v ~/project/logs/app-2024-01.log ~/project/logs/app-2024-02.log
```

```bash
ls ~/project/logs/
```

The agent cleaned up exactly what it should — nothing more. Your `~/Videos`
folder (on your real machine) would never be at risk.

## The sbx guarantee

With `sbx run`, the mount is explicit:

```
sbx run claude "Clean up old logs."
#    └─ only ~/expenseflow mounted inside the microVM
#       ~/Videos, ~/.aws, ~/.ssh → invisible, unreachable
```

**Key principle:** The sandbox doesn't require the agent to be careful.
It makes it physically impossible to touch anything outside the mount.

Move to Lab 3 to see the credentials threat.
