# Agents

**Do NOT deploy to production (Cloudflare Workers/Pages) without explicit user consent.**

Commands:
- Dev: `yarn dev` (Vite on :5173, Functions on :8787)
- Build: `yarn build`
- Test: `yarn test` / `yarn test:run`
- Deploy: `yarn deploy`

Lint/typecheck: `yarn lint && yarn type-check`

Files:
- src/main.ts - Vue app entry
- src/router/index.ts - Routes
- src/views/*.vue - Views
- src/components/*.vue - Components
- functions/api/polities.ts - API routes
- functions/polity-response.json - Mock data