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
    await driver.executeScript("arguments[0].scrollIntoView(true);", addBtn);
    await addBtn.click();

    // VERIFY CART BADGE = 1
    const cartBadge = await driver.wait(
      until.elementLocated(By.className("shopping_cart_badge")),
      5000
    );
    assert.strictEqual(await cartBadge.getText(), "1");

    // GO TO CART
    await driver.findElement(By.className("shopping_cart_link")).click();

    // VERIFY ITEM EXISTS (XPath)
    const itemName = await driver.wait(
      until.elementLocated(
        By.xpath("//div[@class='inventory_item_name']")
      ),
      5000
    );
    assert.ok((await itemName.getText()).length > 0);

    // REMOVE ITEM
    await driver.findElement(By.id("remove-sauce-labs-backpack")).click();

    // FIX: WAIT FOR CART ITEM TO DISAPPEAR (NOT BADGE)
    await driver.wait(async () => {
      const items = await driver.findElements(By.className("cart_item"));
      return items.length === 0;
    }, 5000);

    // OPTIONAL: NAVIGATE BACK TO PRODUCTS TO FORCE HEADER REFRESH
    await driver.findElement(By.id("continue-shopping")).click();

    // VERIFY BADGE IS GONE (NOW SAFE)
    const badges = await driver.findElements(By.className("shopping_cart_badge"));
    assert.strictEqual(badges.length, 0);

    // LOGOUT
    await driver.findElement(By.id("react-burger-menu-btn")).click();

    const logoutBtn = await driver.wait(
      until.elementLocated(By.id("logout_sidebar_link")),
      5000
    );
    await driver.wait(until.elementIsVisible(logoutBtn), 5000);
    await driver.wait(until.elementIsEnabled(logoutBtn), 5000);
    await logoutBtn.click();

    // VERIFY LOGIN PAGE
    await driver.wait(until.elementLocated(By.id("login-button")), 5000);
  });
});
