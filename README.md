# Alexey's Test Blogging Hub
This is a test project developed as a part of job search.

## Explore
- app: https://alexeys-test-blog.vercel.app/
- api: https://powerful-forest-69756.herokuapp.com/documentation


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
- api status check: `http://localhost:5000/_app/status`
- api docs: `http://localhost:5000/documentation`
- webapp: `http://localhost:5173`
