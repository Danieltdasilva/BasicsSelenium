const { By, until } = require("selenium-webdriver");

class CartPage {
  constructor(driver) {
    this.driver = driver;
  }

  async verifyItemPresent() {
    const item = await this.driver.wait(
      until.elementLocated(
        By.xpath("//div[@class='inventory_item_name']")
      ),
      5000
    );
    return (await item.getText()).length > 0;
  }

  async removeBackpack() {
    await this.driver.findElement(By.id("remove-sauce-labs-backpack")).click();
  }

  async waitUntilCartEmpty() {
    await this.driver.wait(async () => {
      const items = await this.driver.findElements(By.className("cart_item"));
      return items.length === 0;
    }, 5000);
  }

  async continueShopping() {
    await this.driver.findElement(By.id("continue-shopping")).click();
  }
}

module.exports = CartPage;
