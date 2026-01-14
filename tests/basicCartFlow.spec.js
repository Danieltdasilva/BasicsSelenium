const { By, until } = require("selenium-webdriver");
const assert = require("assert");
const BrowserFactory = require("../components/browserFactory");
const MenuComponent = require("../components/logoutPage");
const LoginPage = require("../pages/loginPage");
const ProductsPage = require("../pages/productsPage");
const CartPage = require("../pages/cartPage");

describe("SauceDemo UI Automation", function () {
  this.timeout(30000);

  let driver, menu, loginPage, productsPage, cartPage;

  before(async function () {
    // Use BrowserFactory to disable Chrome password popups
    driver = await BrowserFactory.createChromeDriver();
    menu = new MenuComponent(driver);
    loginPage = new LoginPage(driver);
    productsPage = new ProductsPage(driver);
    cartPage = new CartPage(driver);
  });

  after(async function () {
    if (driver) await driver.quit();
  });

  it("logs in, adds item, verifies cart, logs out", async function () {
    // LOGIN
    await loginPage.open();
    await loginPage.login("standard_user", "secret_sauce");
    await loginPage.waitForLogin();

    // ADD ITEM
    await productsPage.addBackpackToCart();

    // Wait for cart badge to appear before asserting
    const badgeCount = await productsPage.getCartBadgeCount();
    assert.strictEqual(badgeCount, "1");

    // GO TO CART
    await productsPage.goToCart();

    // VERIFY ITEM EXISTS
    const itemPresent = await cartPage.verifyItemPresent();
    assert.ok(itemPresent);

    // REMOVE ITEM
    await cartPage.removeBackpack();
    await cartPage.waitUntilCartEmpty();

    // NAVIGATE BACK TO PRODUCTS TO FORCE HEADER REFRESH
    await cartPage.continueShopping();

    // VERIFY BADGE IS GONE
    const badgeAfterRemove = await productsPage.getCartBadgeCount();
    assert.strictEqual(badgeAfterRemove, "0");

    // LOGOUT
    await menu.logout();

    // VERIFY LOGIN PAGE IS BACK
    await driver.wait(until.elementLocated(By.id("login-button")), 5000);
  });
});
