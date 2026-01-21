const { By, until } = require("selenium-webdriver");
const assert = require("assert");
const BrowserFactory = require("../components/browserFactory");
const MenuComponent = require("../components/logoutPage");
const LoginPage = require("../pages/loginPage");
const ProductsPage = require("../pages/productsPage");
const CartPage = require("../pages/CartPage");
const CheckoutPage = require("../pages/checkoutPage");
const users = require("../data/users.json");

describe("Checkout Flow Automation", function () {
  this.timeout(40000);

  let driver, menu, loginPage, productsPage, cartPage, checkoutPage;

  before(async function () {
    driver = await BrowserFactory.createChromeDriver();
    menu = new MenuComponent(driver);
    loginPage = new LoginPage(driver);
    productsPage = new ProductsPage(driver);
    cartPage = new CartPage(driver);
    checkoutPage = new CheckoutPage(driver);
  });

  after(async function () {
    if (driver) await driver.quit();
  });

  it("logs in, adds multiple items, checks out, and completes order", async function () {
    // Login
    const user1 = users.user1;
    await loginPage.open();
    await loginPage.login(user1.username, user1.password);
    await loginPage.waitForLogin();

    // Add items to cart
    await productsPage.addBackpackToCart();
    await productsPage.addBikeToCart();

    // Verify cart badge
    let badge = await productsPage.getCartBadgeCount();
    assert.strictEqual(badge, "2");

    // Go to cart and verify items
    await productsPage.goToCart();
    let itemsExist = await cartPage.verifyItemPresent();
    assert.ok(itemsExist);

    // Proceed to checkout
    await cartPage.goToCheckout();

    // Fill customer info
    await checkoutPage.customerInfo(user1.firstName, user1.lastName, user1.zipcode);

    // Verify Overview page
    let overviewVisible = await checkoutPage.isOverviewPageDisplayed();
    assert.ok(overviewVisible);

    // Finish checkout
    await checkoutPage.clickFinish();

    // Verify completion
    let completed = await checkoutPage.isCheckoutComplete();
    assert.ok(completed);

    // Test done, browser will close in after()
  });
});
