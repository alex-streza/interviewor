import puppeteer from 'puppeteer'
import fs from 'fs'

// const source = 'https://learning-zone.github.io/html-interview-questions/'
const source = 'https://learning-zone.github.io/css-interview-questions/'
const category = 'css'

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

    let questions = Array.from(document.querySelectorAll('h2'))
    questions = questions.slice(2, questions.length - 1)
    const separators = Array.from(
      document.querySelectorAll('#content > div > b > a'),
    )
    const answers: any = []

    questions.forEach((question, i) => {
      const answer = getHTMLNodesBetween(
        document.querySelector('#content') as any,
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
      text: question.textContent,
      answer: answers[index],
      category_id: 6,
      source: 'https://learning-zone.github.io/css-interview-questions/',
    }))

    return questionsArray
  })

  fs.writeFileSync(
    `./src/server/prisma/questions/${category}.json`,
    JSON.stringify(questions),
  )

  await browser.close()
})()
