import {Prisma, PrismaClient} from '@prisma/client'
import {hash} from '../src/utils/password'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    email: 'alice@blogger.io',
    pwdHash: '1234', // will be hashed in main()
    blog: {
      create: {
        name: 'Cooking with Tina',
        posts: {
          create: [
            {
              title: 'My first post',
              content: 'Hello, all!',
              publishedAt: new Date('2022-01-05'),
            },
            {
              title: 'Draft of second post',
              content: 'Working...',
            },
          ],
        },
      },
    },
  },
  {
    email: 'bob@blogger.io',
    pwdHash: '1234', // will be hashed in main()
    blog: {
      create: {
        name: "Bob's hobbies",
        posts: {
          create: [
            {
              title: 'My favorite movies',
              content: 'Terminator is my fav',
              publishedAt: new Date('2022-01-01'),
            },
            {
              title: 'My favorite shows',
              content: 'I love Last Week Tonight',
              publishedAt: new Date('2022-01-09'),
            },
          ],
        },
      },
    },
  },
  {
    email: 'andy@blogger.io',
    pwdHash: '1234', // will be hashed in main()
    blog: {
      create: {
        name: 'Andy Garson',
        posts: {
          create: [
            'One',
            'Two',
            'Three',
            'Four',
            'Five',
            'Six',
            'Seven',
            'Eight',
            'Nine',
          ].map((title, i) => ({
            title,
            content: `Post number ${title}!`,
            publishedAt: new Date(
              `2022-01-${(i + 1).toString().padStart(2, '0')}`
            ),
          })),
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
      create: {
        ...u,
        pwdHash: await hash(u.pwdHash),
      },
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
