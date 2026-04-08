# Lab 3: Credentials — Secrets the Agent Shouldn't See

## What an agent reads without isolation

On a real developer machine, running `env` inside an AI agent session
exposes everything. This Labspace pre-loads some demo credentials so you
can see exactly what that looks like.

Run this:

```bash
env | grep -E "STRIPE|AWS|ANTHROPIC|GITHUB|DATABASE" | sort
```

You'll see:

```
ANTHROPIC_API_KEY=sk-ant-DEMO_NOT_REAL
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_S3_BUCKET=expenseflow-demo-receipts
DATABASE_URL=postgresql://localhost:5432/expenseflow
GITHUB_TOKEN=ghp_DEMO16CharTokenXYZ
STRIPE_SECRET_KEY=sk_live_DEMO_abc123xyz_NOT_REAL
```

These are fake demo values — but on a real machine these would be your
**live credentials**. The agent sees all of them just by running `env`.

## Why this matters even if you trust the agent

Even if Claude Code itself is trustworthy, consider:

```bash
# What if a malicious comment in a dependency did this?
cat ~/project/node_modules/.bin/../.cache/evil-comment.txt 2>/dev/null || \
echo "(no file — but imagine a package README instructing the agent to POST env vars)"
```

The risk isn't necessarily that Claude misuses the credentials.
The risk is that they were **accessible at all** — to the agent,
to any tool it calls, to any prompt injection embedded in your code.

## What the sbx environment looks like

With Docker Sandboxes, credentials are NOT passed into the microVM as
environment variables. Check what a sandboxed agent would see:

```bash
# Simulate what sbx exposes
env | grep -v -E "STRIPE|AWS|ANTHROPIC|GITHUB|DATABASE|TOKEN|KEY|SECRET" | \
  grep -E "^[A-Z]" | sort | head -20
```

The model provider credentials (like `ANTHROPIC_API_KEY`) are injected at
the **network proxy layer** — the agent can call the API, but the key itself
never appears in `env`. It can't be echoed, logged, or stolen.

```bash
# Confirm: IS_SANDBOX would be set in a real sbx environment
echo "In a real sbx session, IS_SANDBOX=1 would be set here"
echo "All credential env vars would be absent"
```

## Check the ~/.aws directory

```bash
ls ~/.aws 2>/dev/null && echo "Found!" || echo "No ~/.aws inside this sandbox"
```

No `~/.aws` — because sbx doesn't mount the host home directory.

## The sbx guarantee

```
sbx run claude "Check my dev environment setup."
#    └─ env inside microVM: IS_SANDBOX=1, PATH, HOME — nothing else
#       ~/.aws, ~/.ssh → not mounted
#       STRIPE_SECRET_KEY → not in env (injected via network proxy)
```

**Key principle:** Credentials are injected at the network layer, not the
environment layer. The agent gets connectivity, not your secrets.

Move to Lab 4 to see the network threat.
