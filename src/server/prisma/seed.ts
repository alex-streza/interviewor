import { Prisma, PrismaClient } from '@prisma/client'

import questions from './questions.json'

const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding ...`)
  await prisma.question.deleteMany()

  for (const q of questions) {
    const question = await prisma.question.create({
      data: q,
    })
    console.log(`Created question with id: ${question.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
