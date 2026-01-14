const { By, until } = require("selenium-webdriver");

class MenuComponent {
  constructor(driver) {
    this.driver = driver;
  }

  async logout() {
    // Open menu
    const menuBtn = await this.driver.wait(
      until.elementLocated(By.id("react-burger-menu-btn")),
      5000
    );

    await this.driver.wait(until.elementIsVisible(menuBtn), 5000);
    await menuBtn.click();

    // Click logout
    const logoutBtn = await this.driver.wait(
      until.elementLocated(By.id("logout_sidebar_link")),
      5000
    );

    await this.driver.wait(until.elementIsVisible(logoutBtn), 5000);
    await this.driver.wait(until.elementIsEnabled(logoutBtn), 5000);
    await logoutBtn.click();
  }
}

module.exports = MenuComponent;
