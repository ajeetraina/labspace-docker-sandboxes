# Lab 3: Credentials Isolation

## What can go wrong

An agent ran `env` when asked to check the dev environment. It reported back every service configured — Anthropic, AWS, GitHub, Stripe — including the live keys. Those credentials were now in the agent's context, readable by every tool it called and every file it read.

## Step 1 — See the credentials in this environment

This Labspace pre-loads demo credentials so you can observe the threat directly:

```bash
env | grep -E "STRIPE|AWS|ANTHROPIC|GITHUB|DATABASE" | sort
```

These are fake demo values — but on your real machine, these would be live production credentials.

## Step 2 — Check for credential files

```bash
ls ~/.aws 2>/dev/null && echo "Found ~/.aws" || echo "No ~/.aws here — correct"
```

```bash
ls ~/.ssh 2>/dev/null && echo "Found ~/.ssh" || echo "No ~/.ssh here — correct"
```

Neither exists inside this sandboxed container. Inside an sbx microVM: same result.

## Step 3 — What sbx exposes instead

```bash
env | grep -v -E "STRIPE|AWS|ANTHROPIC|GITHUB|DATABASE|TOKEN|KEY|SECRET" | sort | head -15
```

Just `PATH`, `HOME`, `IS_SANDBOX=1`. Nothing sensitive.

## How the API still works

sbx uses a **network proxy**. When the agent calls `api.anthropic.com`, the proxy injects the auth header at the network layer. The key is never in the environment — never readable by `env`, never accessible to the agent.

The agent gets connectivity. Not your secrets.

Move to **Lab 4: Network isolation**.
