import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const alice = await prisma.user.upsert({
    where: {email: 'alice@blogger.io'},
    update: {},
    create: {
      email: 'alice@blogger.io',
      profile: {
        create: {
          name: 'Alice',
          posts: {
            create: [
              {
                title: 'My first post',
                content: 'Hello, all!',
                published: true,
              },
            ],
          },
        },
      },
    },
  })

  const bob = await prisma.user.upsert({
    where: {email: 'bob@blogger.io'},
    update: {},
    create: {
      email: 'bob@blogger.io',
      profile: {
        create: {
          name: 'Bob',
          posts: {
            create: [
              {
                title: 'My favorite movies',
                content: 'Terminator is my fav',
                published: true,
              },
              {
                title: 'My favorite shows',
                content: 'I love Last Week Tonight',
                published: true,
              },
            ],
          },
        },
      },
    },
  })

  console.log({alice, bob})
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
