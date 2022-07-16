# Alexey's Test Blogging Hub
This is a test project developed as a part of job search.

## Develop locally

Make sure you have sufficient dev environment:
- NodeJS v18: https://nodejs.org/
- Docker with compose v3: https://www.docker.com/
- PNPM v7.x: https://pnpm.io/

After that, clone this repo and run following commands from the project root:
```bash
# install deps:
pnpm i

# launch database and seed test data
docker compose up -d postgres
pnpm --filter ./apps/api exec prisma migrate reset

# run the apps locally
pnpm -r dev
```

If all commands have run successfully, you'll have following endpoints accessible:
- api: `http://localhost:5000`
- api docs: `http://localhost:5000/documentation`
- webapp: `http://localhost:5173`