const { Builder, By, until } = require('selenium-webdriver');
describe('Login', () => {
  it("Login with standard_user credentials", async () => {
    let driver = new Builder().forBrowser('chrome').build();
    console.log('entro')
    try {
      await driver.get('https://www.saucedemo.com/');
      await driver.findElement(By.id('user-name')).sendKeys('standard_user');
      await driver.findElement(By.id('password')).sendKeys('secret_sauce');
      await driver.findElement(By.id('login-button')).click();


      await driver.sleep(5000);

      //Get cards container
      const cards = await driver.findElements(By.css(".inventory_item"));

      const cardArray = [];
      for (let i = 0; i < cards.length; i++) {
        const name = await cards[i].findElement(By.css('.inventory_item_name ')).getText();
        const description = await cards[i].findElement(By.css('.inventory_item_desc')).getText();
        const price = await cards[i].findElement(By.css('.inventory_item_price')).getText();
        const imgItem = await cards[i].findElement(By.css('.inventory_item_img'));
        const imgSrc = await imgItem.findElement(By.css('img.inventory_item_img')).getAttribute('src');
        //console.log('name: ', name);
        //console.log('description: ', description);
        //console.log('price: ', price);

        const cardItem = {
          name: name || '',
          description: description || '',
          price: price || '',
          img: imgSrc || ''
        }

        //Push into cardArray

        cardArray.push(cardItem);
      }

      console.log('cardArray: ', cardArray);
    }

    catch (error) {
      console.error('Error:', error);
    } finally {
      // Cerrar el navegador
      //await driver.quit();
    }
  })
})