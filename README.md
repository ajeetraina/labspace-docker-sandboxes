# Docker Sandboxes Labspace

Hands-on workshop: run AI coding agents safely with Docker Sandboxes.

**The story:** A developer uses an AI agent to refactor ExpenseFlow, a Node.js
expense tracker with live Stripe and AWS keys. Three threat vectors — filesystem,
credentials, network — are explored hands-on, then eliminated with `sbx run`.

## Launch the Labspace

```bash
docker compose -f oci://ajeetraina/labspace-docker-sandboxes up -d
```

Then open http://localhost:3030

Or use the [Labspace Docker Extension](https://hub.docker.com/extensions/dockersamples/labspace-extension).

## Local dev mode

```bash
git clone https://github.com/ajeetraina/labspace-docker-sandboxes
cd labspace-docker-sandboxes
CONTENT_PATH=$PWD docker compose up --watch
```

## Labs

| Lab | Topic |
|-----|-------|
| 01 | Introduction — meet the app and the three threats |
| 02 | Filesystem isolation |
| 03 | Credentials isolation |
| 04 | Network isolation |
| 05 | Installing and running sbx locally |

## Related

- [ExpenseFlow companion app](https://github.com/ajeetraina/expenseflow)
- [Docker Sandboxes docs](https://docs.docker.com/ai/sandboxes/)
- [Collabnix community](https://collabnix.com)
