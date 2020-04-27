const { Builder, By, Key, until } = require('selenium-webdriver');

const asserts = require('assert');

(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get(
      'https://accounts.google.com/signin/v2/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&service=mail&sacu=1&rip=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin'
    );
    await driver.wait(
      until.elementIsVisible(await driver.findElement(By.id('identifierId'))),
      1000
    );
    await driver
      .findElement(By.id('identifierId'))
      .sendKeys('testcasemax@gmail.com', Key.RETURN);

    await driver.wait(until.elementLocated(By.name('password')), 10000);
    await driver
      .findElement(By.name('password'))
      .sendKeys('TestCaseMax123', Key.RETURN);

    const locator = By.className('gb_Ia gbii');
    await driver.wait(until.elementLocated(locator), 30000);
    const ispresent = await (await driver.findElement(locator)).isDisplayed();
    asserts.equal(
      ispresent,
      true,
      'Проверка на присутствие иконки пользователя'
    );
  } finally {
    // await driver.quit();
  }
})();
