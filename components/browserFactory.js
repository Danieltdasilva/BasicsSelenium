const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

class BrowserFactory {
  static async createChromeDriver() {
    const options = new chrome.Options();

    // Disable Chrome password manager completely
    options.setUserPreferences({
      "credentials_enable_service": false,
      "profile.password_manager_enabled": false,
      "profile.default_content_setting_values.automatic_downloads": 1, // optional: avoid download prompts
    });

    const driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();

    await driver.manage().window().maximize();
    return driver;
  }
}

module.exports = BrowserFactory;
