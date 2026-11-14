import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer";

// Start Vite/preview first. This check never submits forms or contacts production.
const base = process.env.PORTFOLIO_BASE_URL || "http://127.0.0.1:8080";
const origin = new URL(base).origin;
assert(["127.0.0.1", "localhost"].includes(new URL(base).hostname), "Use a local test server");
const artifacts = process.env.PORTFOLIO_ARTIFACTS || "/tmp/renovivo-portfolio-check";
await mkdir(artifacts, { recursive: true });
const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH || "/usr/bin/chromium",
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const results = [];
try {
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on("request", request => {
    if (request.url().startsWith(origin + "/") || request.url().startsWith("data:")) request.continue();
    else request.abort();
  });
  const runtimeErrors = [];
  page.on("pageerror", error => runtimeErrors.push(error.message));
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem("cookie_consent_v1", JSON.stringify({ version: 1, updatedAt: new Date().toISOString(), analytics: false, marketing: false, functional: false, thirdParty: false }));
  });
  await page.goto(base, { waitUntil: "domcontentloaded" });
  for (const language of ["bg", "en"]) {
    await page.evaluate(language => localStorage.setItem("renovivo-language", language), language);
    for (const width of [390, 1440]) {
      await page.setViewport({ width, height: 900 });
      await page.goto(base + "/portfolio", { waitUntil: "networkidle0" });
      const cards = await page.$$eval("article > a[href^='/portfolio/apartment-']", links => links.map(link => link.getAttribute("href")));
      const visitorCopy = await page.$eval("main", node => node.innerText);
      assert(!/генериран|концепци|пет дома|пет различни|generated|design concept|five homes|five different/i.test(visitorCopy), "Visitor copy uses natural project language");
      assert.equal(cards.length, 5, "Exactly five apartment cards");
      assert.equal(new Set(cards).size, 5, "Each card opens a different apartment");
      assert.equal(await page.$$eval("main", elements => elements.length), 1, "One main landmark");
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), "Catalog does not overflow");
      if (language === "bg") await page.screenshot({ path: path.join(artifacts, `portfolio-${width}.png`), fullPage: true });
      const headings = new Set();
      for (const route of cards) {
        await page.goto(base + route, { waitUntil: "networkidle0" });
        assert.equal(new URL(page.url()).pathname, route, "Direct URL stays on the selected project");
        const heading = await page.$eval("h1", node => node.textContent);
        const projectCopy = await page.$eval("main", node => node.innerText);
        assert(!/генериран|концепци|generated|concept/i.test(projectCopy), "Project copy uses neutral interior language");
        assert(!headings.has(heading), "Distinct project heading");
        headings.add(heading);
        assert.equal(await page.$eval("link[rel=canonical]", node => node.href), "https://www.renovivo.bg" + route);
        assert.equal(await page.$$eval("main", nodes => nodes.length), 1);
        const expectedRoomCount = /02|05/.test(route) ? 6 : 5;
        assert.equal(await page.$$eval("article[id^='room-']", rooms => rooms.length), expectedRoomCount, "Every specified room is present");
        await page.$$eval("#project-rooms img", images => Promise.all(images.map(image => {
          image.loading = "eager";
          return image.decode();
        })));
        const roomSources = await page.$$eval("#project-rooms img", images => images.map(image => image.getAttribute("src")));
        const projectId = route.split("/").at(-1);
        assert(roomSources.every(src => src.startsWith(`/images/portfolio/${projectId}/`)), "Room imagery belongs to the selected project");
        assert(roomSources.some(src => src.endsWith("/hall.webp")), "A project-specific hallway image exists");
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), "Project does not overflow");
        const roomButton = `button[aria-label^='${language === "bg" ? "Увеличи" : "Enlarge"}']`;
        await page.click(roomButton);
        await page.waitForSelector("[role=dialog]", { visible: true });
        assert.equal(await page.$eval("[role=dialog] img", image => image.getAttribute("src")), roomSources[0], "Enlargement shows the selected room");
        await page.keyboard.press("Escape");
        await page.waitForSelector("[role=dialog]", { hidden: true });
        assert(await page.$eval(roomButton, node => node === document.activeElement), "Focus returns after closing photo");
        if (language === "bg" && projectId === "apartment-02") {
          await page.screenshot({ path: path.join(artifacts, `family-project-${width}.png`), fullPage: true });
        }
        results.push({ route, language, width, rooms: expectedRoomCount, status: "PASS" });
      }
    }
  }
  await page.evaluate(() => localStorage.setItem("renovivo-language", "bg"));
  await page.setViewport({ width: 390, height: 900 });
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.goto(base, { waitUntil: "networkidle0" });
  assert.equal(await page.$$eval("#home-project-gallery > a", links => links.length), 5);
  const lastDot = "button[aria-label='Покажи Дом с място за работа']";
  await page.click(lastDot);
  await page.waitForFunction(selector => document.querySelector(selector)?.getAttribute("aria-current") === "true", {}, lastDot);
  assert(await page.$eval("button[aria-label='Следващ проект']", node => node.disabled), "Next is disabled at the last project");
  await page.click("button[aria-label='Предишен проект']");
  await page.waitForFunction(() => !document.querySelector("button[aria-label='Следващ проект']").disabled);
  await page.$eval("#projects", node => node.scrollIntoView());
  await page.screenshot({ path: path.join(artifacts, "home-project-gallery-390.png") });
  await page.goto(base + "/portfolio/not-a-real-project", { waitUntil: "networkidle0" });
  assert.equal(await page.$eval("h1", node => node.textContent), "404", "Unknown project has a real not-found view");
  assert.deepEqual(runtimeErrors, [], "No JavaScript runtime errors in tested scenarios");
  await writeFile(path.join(artifacts, "results.json"), JSON.stringify({ base, results, carousel: "PASS", photoDialog: "PASS", unknownProject: "PASS", runtimeErrors }, null, 2));
  console.log(`PASS: ${results.length} project/language/viewport combinations; five catalog entries; image dialogs; gallery controls; unknown-project view. Artifacts: ${artifacts}`);
} finally {
  await browser.close();
}
