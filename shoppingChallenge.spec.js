console.log("login.spec.js loaded");
const { By, Builder, until } = require("selenium-webdriver");
const assert = require("assert");

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

  it("logs in, adds item, verifies cart, logs out", async function () {
    await driver.get("https://www.saucedemo.com/");

    // LOGIN
    await driver.findElement(By.id("user-name")).sendKeys("standard_user");
    await driver.findElement(By.id("password")).sendKeys("secret_sauce");
    await driver.findElement(By.id("login-button")).click();

    // WAIT FOR PRODUCTS PAGE
    await driver.wait(until.elementLocated(By.className("inventory_list")), 10000);

    // ADD ITEM
    const addBtn = await driver.wait(
      until.elementLocated(By.id("add-to-cart-sauce-labs-backpack")),
      5000
    );
    await addBtn.click();

    // VERIFY CART BADGE = 1
    const cartBadge = await driver.wait(
      until.elementLocated(By.className("shopping_cart_badge")),
      5000
    );
    const badgeText = await cartBadge.getText();
    assert.strictEqual(badgeText, "1");

    // GO TO CART
    await driver.findElement(By.className("shopping_cart_link")).click();

    // VERIFY ITEM EXISTS USING XPATH
    const itemName = await driver.wait(
      until.elementLocated(
        By.xpath("//div[@class='inventory_item_name']")
      ),
      5000
    );

    const nameText = await itemName.getText();
    assert.ok(nameText.length > 0);

    // REMOVE ITEM
    await driver.findElement(By.id("remove-sauce-labs-backpack")).click();

    // VERIFY BADGE IS GONE
    const badges = await driver.findElements(By.className("shopping_cart_badge"));
    assert.strictEqual(badges.length, 0);

    // LOGOUT
    await driver.findElement(By.id("react-burger-menu-btn")).click();
    await driver.wait(until.elementLocated(By.id("logout_sidebar_link")), 5000);
    await driver.findElement(By.id("logout_sidebar_link")).click();

    // VERIFY LOGIN PAGE
    await driver.wait(until.elementLocated(By.id("login-button")), 5000);
  });
});
