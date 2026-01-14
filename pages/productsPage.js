const { By, until } = require("selenium-webdriver");

class ProductsPage {
  constructor(driver) {
    this.driver = driver;
  }

  async addBackpackToCart() {
    const addBtn = await this.driver.wait(
      until.elementLocated(By.id("add-to-cart-sauce-labs-backpack")),
      5000
    );
    await this.driver.executeScript("arguments[0].scrollIntoView(true);", addBtn);
    await addBtn.click();
  }

  async goToCart() {
    await this.driver.findElement(By.className("shopping_cart_link")).click();
  }

  async getCartBadgeCount() {
    const badges = await this.driver.findElements(By.className("shopping_cart_badge"));
    return badges.length ? await badges[0].getText() : "0";
  }
}

module.exports = ProductsPage;
