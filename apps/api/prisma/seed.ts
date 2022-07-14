import {Prisma, PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    email: 'alice@blogger.io',
    blog: {
      create: {
        name: 'Cooking with Tina',
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
  {
    email: 'bob@blogger.io',
    blog: {
      create: {
        name: "Bob's hobbies",
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
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.upsert({
      where: {email: u.email},
      update: {},
      create: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
