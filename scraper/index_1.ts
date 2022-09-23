import puppeteer from 'puppeteer'
import fs from 'fs'

const source =
  'https://github.com/sudheerj/javascript-interview-questions/blob/master/README.md'
const category = 'javascript'

;(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  })
  const page = await browser.newPage()
  await page.goto(source)

  await page.waitForSelector('#readme')

  const questions = await page.evaluate(() => {
    const questions = Array.from(
      document.querySelectorAll('article > ol > li > h3'),
    )
    const answers = Array.from(document.querySelectorAll('article > ol > li'))

    answers.forEach((answer) => {
      answer.innerHTML = answer.innerHTML.replace(/<h3 dir="auto">.*<\/h3>/, '')
      answer.innerHTML = answer.innerHTML.replace(
        `<p dir="auto"><strong><a href="#table-of-contents"><g-emoji class="g-emoji" alias="arrow_up" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/2b06.png">⬆</g-emoji> Back to Top</a></strong></p>`,
        '',
      )
      // remove <div class=\"zeroclipboard-container position-absolute right-0 top-0\">*<\/div>
      answer.innerHTML = answer.innerHTML.replace(
        /<div class=\"zeroclipboard-container position-absolute right-0 top-0\">.*<\/div>/gs,
        '',
      )
    })

    const questionsArray = questions.map((question, index) => ({
      text: question.textContent,
      answer: answers[index]?.innerHTML,
      category_id: 3,
      source:
        'https://github.com/sudheerj/javascript-interview-questions/blob/master/README.md',
    }))

    return questionsArray
  })

  console.log('questions', questions)

  fs.writeFileSync(
    `./src/server/prisma/questions/${category}.json`,
    JSON.stringify(questions),
  )

  await browser.close()
})()
