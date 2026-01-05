const { By, Builder, until } = require("selenium-webdriver");
const assert = require("assert");
const pause = (ms) => new Promise((r) => setTimeout(r, ms));


describe("Admlucid UI", function () {
  this.timeout(30000); // give Selenium time

  let driver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
  });

  after(async function () {
    if (driver) await driver.quit();
  });

  it("loads the home page and verifies the title", async function () {
    await driver.get("https://admlucid.com");
    await pause(1500);


    const title = await driver.getTitle();
    console.log("****Home Page Title**** " + title);

    assert.strictEqual(title, "Home Page - Admlucid");
  });

  it("loads the Selenium page and verifies the header", async function () {
    await driver.get("https://admlucid.com/Home/Selenium");
    await pause(1500);


    const header = await driver.wait(
      until.elementLocated(By.css("#Selenium h1")),
      10000
    );

    const value = (await header.getText()).trim();
    console.log("****Page Header**** " + value);

    // 👇 VISUAL / DEBUG SECTION
    await driver.executeScript(
      "window.scrollTo(0, document.body.scrollHeight)"
    );

    assert.strictEqual(value, "Selenium Automation Testing");
  });
});
