import { PrismaClient } from '@prisma/client'

import questions from './questions.json'
import categories from './categories.json'

const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding ...`)
  await prisma.category.deleteMany()
  await prisma.question.deleteMany()

  for (const c of categories) {
    const category = await prisma.category.create({
      data: c,
    })
    console.log(`Created category with id: ${category.id}`)
  }

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
