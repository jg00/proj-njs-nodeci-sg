const Page = require("./helpers/page");

let page;

beforeEach(async () => {
  page = await Page.build(); // returns proxy instance which is governing access to the custom page, the puppeteer page, and puppeteer browser

  await page.goto("http://localhost:3000");
});

afterEach(async () => {
  await page.close();
});

test("the header has the correct text", async () => {
  // .$eval runs document.querySelector()
  // const text = await page.$eval("a.brand-logo", (el) => el.innerHTML);
  const text = await page.getContentsOf("a.brand-logo");

  expect(text).toEqual("Blogster");
});

test("clicking login starts oauth flow", async () => {
  await page.click(".right a");

  const url = await page.url();

  expect(url).toMatch(/accounts\.google\.com/);
});

test("When signed in, shows logout button", async () => {
  // const id = "5fff798e6decdd177cd907df"; // Test app user id
  await page.login();

  const text = await page.$eval('a[href="/auth/logout"]', (el) => el.innerHTML);

  expect(text).toEqual("Logout");
});
