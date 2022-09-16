import puppeteer from "puppeteer";
import fs from "fs";

(async () => {
	const browser = await puppeteer.launch({
		headless: false,
	});
	const page = await browser.newPage();
	await page.goto("https://github.com/sudheerj/reactjs-interview-questions/blob/master/README.md");

	await page.waitForSelector("#readme");

	const questions = await page.evaluate(() => {
		const questions = Array.from(document.querySelectorAll("article > ol > li > h3"));
		const answers = Array.from(document.querySelectorAll("article > ol > li"));

		answers.forEach((answer) => {
			answer.innerHTML = answer.innerHTML.replace(/<h3 dir="auto">.*<\/h3>/, "");
			answer.innerHTML = answer.innerHTML.replace(
				`<p dir="auto"><strong><a href="#table-of-contents"><g-emoji class="g-emoji" alias="arrow_up" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/2b06.png">⬆</g-emoji> Back to Top</a></strong></p>`,
				""
			);
			// remove <div class=\"zeroclipboard-container position-absolute right-0 top-0\">*<\/div>
			answer.innerHTML = answer.innerHTML.replace(
				/<div class=\"zeroclipboard-container position-absolute right-0 top-0\">.*<\/div>/gs,
				""
			);
		});

		const questionsArray = questions.map((question, index) => ({
			text: question.textContent,
			answer: answers[index]?.innerHTML,
			source: "https://github.com/sudheerj/reactjs-interview-questions/blob/master/README.md",
			category: "react",
			difficulty: "easy",
		}));

		return questionsArray;
	});

	console.log("questions", questions);

	fs.writeFileSync("./src/server/prisma/questions.json", JSON.stringify(questions));

	await browser.close();
})();
