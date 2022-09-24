import puppeteer from 'puppeteer'
import fs from 'fs'

const source = 'https://github.com/aershov24/typescript-interview-questions'
const category = 'typescript'

;(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  })
  const page = await browser.newPage()
  await page.goto(source)

  await page.waitForSelector('main')

  const questions = await page.evaluate(() => {
    function getHTMLNodesBetween<T extends HTMLElement | ChildNode>(
      rootNode: T,
      startNode: T,
      endNode: T,
    ) {
      let pastStartNode = false,
        reachedEndNode = false

      const htmlNodes: T[] = []

      function getHTMLNodes(node: T) {
        if (node == startNode) {
          pastStartNode = true
        } else if (node == endNode) {
          reachedEndNode = true
        } else if (node.nodeType == 3) {
          if (
            pastStartNode &&
            !reachedEndNode &&
            !/^\s*$/.test(node.nodeValue ?? '')
          ) {
            htmlNodes.push(node)
          }
        } else {
          for (
            let i = 0, len = node.childNodes.length;
            !reachedEndNode && i < len;
            ++i
          ) {
            getHTMLNodes(node.childNodes[i] as T)
          }
        }
      }

      getHTMLNodes(rootNode)
      return htmlNodes
    }

    let questions = Array.from(document.querySelectorAll('h3'))
    questions = questions.slice(0, questions.length - 10)

    const separators = questions.slice(1, questions.length)
    const answers: any = []

    questions.forEach((question, i) => {
      const answer = getHTMLNodesBetween(
        document.querySelector('#readme') as any,
        question,
        separators[i],
      )
      answers.push(
        answer
          .map((node) => node.nodeValue)
          .join(' ')
          .replace(/\s\s+/g, ' '),
      )
    })

    const questionsArray = questions.map((question, index) => ({
      text: question.textContent?.replaceAll('⭐', '').trim(),
      answer: answers[index].replaceAll('⭐', '').trim(),
      category_id: 3,
      source: 'https://github.com/aershov24/typescript-interview-questions',
    }))

    // return questions.map((separator, index) => separator.textContent)
    // return separators.map((separator, index) => separator.textContent)
    return questionsArray
  })

  console.log('first', questions)

  fs.writeFileSync(
    `./src/server/prisma/questions/${category}.json`,
    JSON.stringify(questions),
  )

  await browser.close()
})()
