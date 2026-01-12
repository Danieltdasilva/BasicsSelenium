console.log("🔥 login.spec.js loaded");
const { By, Builder, until } = require("selenium-webdriver");
const assert = require("assert");

const pause = (ms) => new Promise((r) => setTimeout(r, ms));

describe("SauceDemo UI Automation", function () {
  this.timeout(30000);

  let driver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
  });

  after(async function () {
    if (driver) await driver.quit();
  });

  it("logs in, adds an item to cart, and logs out", async function () {
    // 1️⃣ Go to login page
    await driver.get("https://www.saucedemo.com/");
    await pause(1000);

    // 2️⃣ Login
    await driver.findElement(By.id("user-name")).sendKeys("standard_user");
    await driver.findElement(By.id("password")).sendKeys("secret_sauce");
    await driver.findElement(By.id("login-button")).click();

    // 3️⃣ Verify successful login
    await driver.wait(until.elementLocated(By.className("inventory_list")), 10000);
    const title = await driver.findElement(By.className("title")).getText();
    assert.strictEqual(title, "Products");

    // 4️⃣ Add item to cart (CREATE action)
    await driver
      .findElement(By.id("add-to-cart-sauce-labs-backpack"))
      .click();
  });
});