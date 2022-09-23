import { PrismaClient } from '@prisma/client'

import reactQuestions from './questions/react.json'
import javascriptQuestions from './questions/javascript.json'
import htmlQuestions from './questions/html.json'
import cssQuestions from './questions/css.json'
import categories from './categories.json'

const prisma = new PrismaClient()
const questions = [
  // ...javascriptQuestions,
  // ...reactQuestions,
  ...htmlQuestions,
  ...cssQuestions,
]

async function main() {
  console.log(`Start seeding ...`)
  // await prisma.question.deleteMany()
  // await prisma.category.deleteMany()

  // console.log(`Seeding ${categories.length} categories...`)
  // for (const c of categories) {
  //   const category = await prisma.category.create({
  //     data: c,
  //   })
  //   console.log(`Created category with id: ${category.id}`)
  // }

  console.log(`Seeding ${questions.length} questions...`)
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
