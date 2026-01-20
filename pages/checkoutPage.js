const { By, until } = require("selenium-webdriver");

class CheckoutPage {
  constructor(driver) {
    this.driver = driver;
  }


  async isCheckoutInfoDisplayed() {
    const item = await this.driver.wait(
      until.elementLocated(
        By.xpath("//div[@id='checkout_info_container']")
      ),
      5000
    );
    return (await item.getText()).length > 0;
  }

  async customerInfo(firstName, lastName, zipcode) {
    await this.driver.findElement(By.id("first-name")).sendKeys(firstName);
    await this.driver.findElement(By.id("last-name")).sendKeys(lastName);
    await this.driver.findElement(By.id("postal-code")).sendKeys(zipcode);
    await this.driver.findElement(By.id("continue")).click();
  }

  async isOverviewPageDisplayed() {
    const overviewTitle = await this.driver.wait(
      until.elementLocated(By.className("title")),
      5000
    );
    return (await overviewTitle.getText()) === "Checkout: Overview";

  }

  async clickFinish() {
    await this.driver.findElement(By.id("finish")).click();
    await this.driver.wait(
      until.elementLocated(By.className("pony_express")),
      5000
    );
  }
  async isCheckoutComplete() {
    const completeHeader = await this.driver.wait(
      until.elementLocated(By.className("complete-header")),
      5000
    );
    return (await completeHeader.getText()).includes("THANK YOU FOR YOUR ORDER");

  }


}

module.exports = CheckoutPage;
