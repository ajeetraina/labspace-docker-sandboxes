# Welcome to the Docker Sandboxes Workshop

## The story

You are a developer working on **ExpenseFlow** — a Node.js expense tracker with Stripe, AWS S3, and PostgreSQL integrations. You want to hand it to an AI coding agent to refactor, clean up, and optimize.

Reasonable request. But what the agent can access determines whether this is safe or catastrophic.

## Containers vs microVMs — the core difference

Not all sandboxes are equal. Toggle between the two to see why.

<html>
<style>
.cvmt{display:flex;border:0.5px solid #ccc;border-radius:100px;overflow:hidden;font-size:13px;width:fit-content;margin:0 0 14px}
.cvmt button{padding:6px 16px;background:transparent;border:none;cursor:pointer;color:#666}
.cvmt button.active{background:#f0f0f0;color:#111;font-weight:500}
.cvmr{display:flex;gap:8px;margin:5px 0;align-items:flex-start;font-size:13px;color:#555}
.cvmd{width:8px;height:8px;border-radius:50%;flex-shrink:0;margin-top:4px}
.cvmv{font-size:13px;font-weight:500;padding:10px 14px;border-radius:8px;margin-top:12px}
</style>
<div class="cvmt">
  <button id="cvm-bc" class="active" onclick="cvmShow('c')">Container sandbox</button>
  <button id="cvm-bm" onclick="cvmShow('m')">MicroVM sandbox (sbx)</button>
</div>
<svg width="100%" viewBox="0 0 620 285" style="display:block;margin-bottom:10px">
<defs><marker id="ca" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>
<g id="cvm-gc">
  <rect x="10" y="8" width="600" height="268" rx="12" fill="none" stroke="#bbb" stroke-width="0.5" stroke-dasharray="5 3"/>
  <text x="26" y="27" font-size="12" fill="#888" font-family="sans-serif">Host machine (your Mac)</text>
  <rect x="26" y="38" width="108" height="44" rx="6" fill="#f5f5f5" stroke="#ddd" stroke-width="0.5"/>
  <text x="80" y="56" text-anchor="middle" font-size="12" fill="#666" font-family="sans-serif">~/Videos</text>
  <text x="80" y="72" text-anchor="middle" font-size="11" fill="#999" font-family="sans-serif">61 GB</text>
  <rect x="148" y="38" width="108" height="44" rx="6" fill="#f5f5f5" stroke="#ddd" stroke-width="0.5"/>
  <text x="202" y="56" text-anchor="middle" font-size="12" fill="#666" font-family="sans-serif">~/.aws</text>
  <text x="202" y="72" text-anchor="middle" font-size="11" fill="#999" font-family="sans-serif">credentials</text>
  <rect x="270" y="38" width="108" height="44" rx="6" fill="#f5f5f5" stroke="#ddd" stroke-width="0.5"/>
  <text x="324" y="56" text-anchor="middle" font-size="12" fill="#666" font-family="sans-serif">~/.ssh</text>
  <text x="324" y="72" text-anchor="middle" font-size="11" fill="#999" font-family="sans-serif">private keys</text>
  <rect x="392" y="38" width="108" height="44" rx="6" fill="#f5f5f5" stroke="#ddd" stroke-width="0.5"/>
  <text x="446" y="56" text-anchor="middle" font-size="12" fill="#666" font-family="sans-serif">env vars</text>
  <text x="446" y="72" text-anchor="middle" font-size="11" fill="#999" font-family="sans-serif">STRIPE_KEY…</text>
  <rect x="75" y="122" width="390" height="130" rx="10" fill="none" stroke="#e05a30" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="92" y="141" font-size="11" fill="#993c1d" font-family="sans-serif">Container — shared kernel</text>
  <rect x="155" y="156" width="160" height="68" rx="8" fill="#e8f4fc" stroke="#5ba3d0" stroke-width="0.5"/>
  <text x="235" y="186" text-anchor="middle" font-size="13" fill="#185fa5" font-family="sans-serif" font-weight="500">Claude Code</text>
  <text x="235" y="204" text-anchor="middle" font-size="11" fill="#378add" font-family="sans-serif">AI coding agent</text>
  <line x1="80" y1="82" x2="185" y2="156" stroke="#e05a30" stroke-width="0.5" stroke-dasharray="3 2" fill="none" marker-end="url(#ca)"/>
  <line x1="202" y1="82" x2="216" y2="156" stroke="#e05a30" stroke-width="0.5" stroke-dasharray="3 2" fill="none" marker-end="url(#ca)"/>
  <line x1="324" y1="82" x2="268" y2="156" stroke="#e05a30" stroke-width="0.5" stroke-dasharray="3 2" fill="none" marker-end="url(#ca)"/>
  <line x1="446" y1="82" x2="290" y2="156" stroke="#e05a30" stroke-width="0.5" stroke-dasharray="3 2" fill="none" marker-end="url(#ca)"/>
  <text x="356" y="180" font-size="12" fill="#993c1d" font-family="sans-serif">Shared kernel</text>
  <text x="356" y="197" font-size="12" fill="#993c1d" font-family="sans-serif">→ can escape</text>
</g>
<g id="cvm-gm" style="display:none">
  <rect x="10" y="8" width="600" height="268" rx="12" fill="none" stroke="#bbb" stroke-width="0.5" stroke-dasharray="5 3"/>
  <text x="26" y="27" font-size="12" fill="#888" font-family="sans-serif">Host machine (your Mac)</text>
  <rect x="26" y="38" width="108" height="44" rx="6" fill="#f9f9f9" stroke="#eee" stroke-width="0.5"/>
  <text x="80" y="56" text-anchor="middle" font-size="12" fill="#bbb" font-family="sans-serif">~/Videos</text>
  <text x="80" y="72" text-anchor="middle" font-size="11" fill="#ccc" font-family="sans-serif">invisible</text>
  <rect x="148" y="38" width="108" height="44" rx="6" fill="#f9f9f9" stroke="#eee" stroke-width="0.5"/>
  <text x="202" y="56" text-anchor="middle" font-size="12" fill="#bbb" font-family="sans-serif">~/.aws</text>
  <text x="202" y="72" text-anchor="middle" font-size="11" fill="#ccc" font-family="sans-serif">invisible</text>
  <rect x="270" y="38" width="108" height="44" rx="6" fill="#f9f9f9" stroke="#eee" stroke-width="0.5"/>
  <text x="324" y="56" text-anchor="middle" font-size="12" fill="#bbb" font-family="sans-serif">~/.ssh</text>
  <text x="324" y="72" text-anchor="middle" font-size="11" fill="#ccc" font-family="sans-serif">invisible</text>
  <rect x="392" y="38" width="108" height="44" rx="6" fill="#f9f9f9" stroke="#eee" stroke-width="0.5"/>
  <text x="446" y="56" text-anchor="middle" font-size="12" fill="#bbb" font-family="sans-serif">env vars</text>
  <text x="446" y="72" text-anchor="middle" font-size="11" fill="#ccc" font-family="sans-serif">invisible</text>
  <rect x="55" y="114" width="510" height="150" rx="10" fill="none" stroke="#1d9e75" stroke-width="1.5"/>
  <text x="74" y="133" font-size="11" fill="#0f6e56" font-family="sans-serif" font-weight="500">MicroVM — own kernel, hard boundary</text>
  <rect x="74" y="148" width="158" height="68" rx="8" fill="#e1f5ee" stroke="#1d9e75" stroke-width="0.5"/>
  <text x="153" y="178" text-anchor="middle" font-size="13" fill="#085041" font-family="sans-serif" font-weight="500">Claude Code</text>
  <text x="153" y="196" text-anchor="middle" font-size="11" fill="#0f6e56" font-family="sans-serif">AI coding agent</text>
  <rect x="258" y="148" width="280" height="68" rx="8" fill="#e1f5ee" stroke="#1d9e75" stroke-width="0.5"/>
  <text x="398" y="178" text-anchor="middle" font-size="13" fill="#085041" font-family="sans-serif" font-weight="500">~/expenseflow only</text>
  <text x="398" y="196" text-anchor="middle" font-size="11" fill="#0f6e56" font-family="sans-serif">nothing else mounted or visible</text>
  <line x1="232" y1="182" x2="258" y2="182" stroke="#1d9e75" stroke-width="0.5" fill="none" marker-end="url(#ca)"/>
  <line x1="80" y1="82" x2="80" y2="112" stroke="#1d9e75" stroke-width="1" fill="none"/>
  <text x="48" y="108" font-size="10" fill="#0f6e56" font-family="sans-serif">blocked</text>
  <line x1="202" y1="82" x2="202" y2="112" stroke="#1d9e75" stroke-width="1" fill="none"/>
  <text x="170" y="108" font-size="10" fill="#0f6e56" font-family="sans-serif">blocked</text>
  <line x1="324" y1="82" x2="324" y2="112" stroke="#1d9e75" stroke-width="1" fill="none"/>
  <text x="292" y="108" font-size="10" fill="#0f6e56" font-family="sans-serif">blocked</text>
  <line x1="446" y1="82" x2="446" y2="112" stroke="#1d9e75" stroke-width="1" fill="none"/>
  <text x="414" y="108" font-size="10" fill="#0f6e56" font-family="sans-serif">blocked</text>
</g>
</svg>
<div id="cvm-dc">
  <div class="cvmr"><div class="cvmd" style="background:#e24b4a"></div><span>Shared kernel — container breakout attacks are possible</span></div>
  <div class="cvmr"><div class="cvmd" style="background:#e24b4a"></div><span>Host dirs accessible via bind mounts or volume escapes</span></div>
  <div class="cvmr"><div class="cvmd" style="background:#e24b4a"></div><span>Env vars readable — Stripe, AWS, GitHub keys all visible</span></div>
  <div class="cvmv" style="background:#fcebeb;color:#a32d2d">Isolation by policy. One misconfiguration = full host access.</div>
</div>
<div id="cvm-dm" style="display:none">
  <div class="cvmr"><div class="cvmd" style="background:#1d9e75"></div><span>Own kernel — hypervisor boundary is hardware-enforced, not policy</span></div>
  <div class="cvmr"><div class="cvmd" style="background:#1d9e75"></div><span>~/Videos, ~/.aws, ~/.ssh physically absent — not hidden, just gone</span></div>
  <div class="cvmr"><div class="cvmd" style="background:#1d9e75"></div><span>No credentials in env — auth injected at network proxy layer</span></div>
  <div class="cvmv" style="background:#e1f5ee;color:#085041">Isolation by architecture. The agent can't access what doesn't exist in its VM.</div>
</div>
<script>
function cvmShow(m){var i=m==='m';document.getElementById('cvm-gc').style.display=i?'none':'';document.getElementById('cvm-gm').style.display=i?'':'none';document.getElementById('cvm-dc').style.display=i?'none':'';document.getElementById('cvm-dm').style.display=i?'':'none';document.getElementById('cvm-bc').className=i?'cvmt button':'cvmt button active';document.getElementById('cvm-bm').className=i?'cvmt button active':'cvmt button';}
</script>
</html>

## The three threats you'll explore

| Lab | Threat | What goes wrong without sbx |
|-----|--------|-----------------------------|
| 2 | Filesystem | Agent deletes your family photos trying to free disk space |
| 3 | Credentials | Agent reads your live Stripe and AWS keys |
| 4 | Network | A hidden instruction exfiltrates your secrets |

> **Note:** Labs 1–4 use the Labspace terminal on the right. Lab 5 uses your Mac terminal.

## Step 1 — Meet the app

```bash
ls ~/project/
```

```bash
cat ~/project/.env.example
```

## Step 2 — See the intentional issues

```bash
cat ~/project/src/db.js
```

Three problems baked in for the agent to fix: SQL injection in `getMonthlyTotals`, N+1 query in `getExpensesForUser`, and no connection pooling.

Move to **Lab 2: Filesystem isolation**.
