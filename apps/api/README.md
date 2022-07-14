## Database

Dev prototyping workflow:
- Reset schema (dev): `prisma db push`
- Seed test data: `prisma db seed`

Workflow with migrations:
- First migration + seed: `prisma migrate dev --name init`

See
- https://www.prisma.io/docs/concepts/components/prisma-migrate#getting-started-with-prisma-migrate

See example
- https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-fastify
