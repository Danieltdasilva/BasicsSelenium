const { By, until } = require("selenium-webdriver");
const assert = require("assert");
const BrowserFactory = require("../components/browserFactory");
const MenuComponent = require("../components/logoutPage");
const LoginPage = require("../pages/loginPage");
const ProductsPage = require("../pages/productsPage");
const CartPage = require("../pages/CartPage");
const CheckoutPage = require("../pages/checkoutPage");
const users = require("../Users/users.json");


describe("SauceDemo UI Automation - Checkout Cart Flow", function () {
  this.timeout(30000);

  let driver;
  let loginPage, productsPage, cartPage, checkoutPage;

  const user = users.user1;


  before(async function () {
    driver = await BrowserFactory.createChromeDriver();

    loginPage = new LoginPage(driver);
    productsPage = new ProductsPage(driver);
    cartPage = new CartPage(driver);
    checkoutPage = new CheckoutPage(driver);
  });

  // after(async function () {
  //   if (driver) await driver.quit();
  // });

  it("logs in, adds item, completes checkout, and closes browser", async function () {
    // LOGIN
    await loginPage.open();
    await loginPage.login(user.username, user.password);
    await loginPage.waitForLogin();

    // ADD ITEM
    await productsPage.addBackpackToCart();
    const badgeCount = await productsPage.getCartBadgeCount();
    assert.strictEqual(badgeCount, "1");

    // GO TO CART
    await productsPage.goToCart();
    assert.ok(await cartPage.verifyItemPresent());

    // CHECKOUT
    await cartPage.clickCheckout();
    assert.ok(await checkoutPage.isCheckoutInfoDisplayed());

    // CUSTOMER INFO
    await checkoutPage.customerInfo(
      user.firstName,
      user.lastName,
      user.zipCode
    );

    assert.ok(await checkoutPage.isOverviewPageDisplayed());

    // FINISH CHECKOUT
    await checkoutPage.clickFinish();
    assert.ok(await checkoutPage.isCheckoutComplete());
  });

  after(async function () {
    if (driver) {
      await driver.quit();
    }

    // Test done, browser will close in after()
  });
});
