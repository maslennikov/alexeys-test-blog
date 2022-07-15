import {Prisma, PrismaClient} from '@prisma/client'
import {hash} from '../src/utils/password'
import {faker} from '@faker-js/faker'

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
              summary: "My name is Tina, and I'll teach you cooking",
              content: faker.lorem.text(),
              publishedAt: new Date('2022-01-05'),
            },
            {
              title: 'Draft of second post',
              summary: 'Work in progress...',
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
          create: ['2022-01-01', '2022-01-09'].map((date) => ({
            title: faker.fake(
              '{{hacker.ingverb}} {{hacker.adjective}} {{hacker.noun}}'
            ),
            summary: faker.hacker.phrase(),
            content: faker.lorem.paragraphs(),
            publishedAt: new Date(date),
          })),
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
          create: Array.from(Array(10)).map((_, i) => ({
            title: faker.commerce.productName(),
            summary: faker.commerce.productDescription(),
            content: faker.lorem.paragraphs(),
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
