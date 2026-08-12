Deluxe Saloon — a 24/7 Hindi film radio player, built with [Next.js](https://nextjs.org).

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result. The page auto-updates as you edit files under `app/` and `components/`.

## Environment variables

Copy `.env.example` to `.env` and adjust as needed:

```bash
cp .env.example .env
```

| Variable               | Purpose                                         | Production value                  |
| ----------------------- | ------------------------------------------------ | ---------------------------------- |
| `NEXT_PUBLIC_API_URL`   | Base URL of the FastAPI backend                  | `https://api.deluxesalonsongs.com` |

`NEXT_PUBLIC_*` variables are inlined into the browser bundle at **build time**, not read at runtime — see [Docker build](#docker-build) below for how the production value is supplied during image builds.

## Production build (without Docker)

```bash
npm run build
npm start
```

## Docker

The app builds a minimal production image using Next.js [standalone output](https://nextjs.org/docs/app/api-reference/config/next-config-js/output) (`output: "standalone"` in `next.config.ts`), so the final image only ships the traced runtime files, not the full `node_modules`.

### Docker build

```bash
docker build -t deluxsalon-frontend .
```

To bake a different `NEXT_PUBLIC_API_URL` into the build (defaults to the production API if omitted):

```bash
docker build \
  --build-arg NEXT_PUBLIC_API_URL=https://api.deluxesalonsongs.com \
  -t deluxsalon-frontend .
```

### Docker run

```bash
docker run --rm -p 3000:3000 deluxsalon-frontend
```

Then verify at [http://localhost:3000](http://localhost:3000) and confirm the browser's network calls (once the app makes any) target `https://api.deluxesalonsongs.com`, not `localhost` or a VPS IP.

The container listens on `0.0.0.0:3000` and runs `node server.js` (the Next.js standalone entrypoint) — it never runs `next dev`.

## GHCR image

CI builds and pushes the image to GitHub Container Registry on every push to `main` (see `.github/workflows/build-and-push.yml`):

```text
ghcr.io/gauravraj1141/deluxsalon-frontend:latest
ghcr.io/gauravraj1141/deluxsalon-frontend:<commit-sha>
```

The workflow authenticates with the built-in `GITHUB_TOKEN` (no manually managed registry credentials) and bakes `NEXT_PUBLIC_API_URL=https://api.deluxesalonsongs.com` in as a build argument, so the production API URL is what actually ends up embedded in the shipped bundle.

## VPS deployment

The VPS only needs the compose file and the prebuilt image — not this repository's source code.

`docker-compose.production.yml` (or the equivalent service block in the VPS's main compose file):

```yaml
frontend:
  image: ghcr.io/gauravraj1141/deluxsalon-frontend:latest
  container_name: deluxsalon-frontend
  restart: unless-stopped
  ports:
    - "127.0.0.1:3000:3000"
  networks:
    - deluxsalon-network
```

Port 3000 is bound to `127.0.0.1` only — it is never exposed publicly. [Caddy](https://caddyserver.com/) on the VPS terminates TLS and reverse-proxies `https://deluxesalonsongs.com` to `127.0.0.1:3000` (and `https://api.deluxesalonsongs.com` to the FastAPI container on `127.0.0.1:8000`). This repo does not configure Caddy.

Deploy/update on the VPS:

```bash
docker compose -f docker-compose.production.yml pull
docker compose -f docker-compose.production.yml up -d
```

### Deployment flow

```text
push to main → GitHub Actions → Docker build → GHCR (latest + <sha>)
                                                       │
                                                       ▼
                                    VPS: docker compose pull && up -d
```

## Learn more

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Docker deployment guide](https://nextjs.org/docs/app/building-your-application/deploying#docker-image)
