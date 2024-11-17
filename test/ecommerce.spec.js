const { Builder, By, until } = require('selenium-webdriver');
const xlsx = require('xlsx');

describe('Scrappin in Huntintong Web Ecommerce', async () => {
  let itemArray = [];

  let driver = new Builder().forBrowser('chrome').build();
  let urlTshirts = 'https://www.huntington.pe/product-category/polos/';
  //
  /* beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  //
  afterAll(async () => {
    await driver.quit();
    //
    createExcelFile(itemArray);
  })
  */


  it('Scrapping an Ecommerce', async () => {
    try {

      let existNextPage = true;
      await driver.get(urlTshirts);
      await driver.sleep(2000);

      while (existNextPage) {

        //Wait 
        await driver.wait(until.elementLocated(By.css('li.product.type-product')), 10000);

        const cards = await driver.findElements(By.css('li.product.type-product'));

        for (let i = 0; i < cards.length; i++) {
          const link = await cards[i].findElement(By.css('a.woocommerce-LoopProduct-link'));
          const imgItem = await link.findElement(By.css('img.attachment-woocommerce_thumbnail.size-woocommerce_thumbnail')).getAttribute('src');
          const description = await link.findElement(By.css('h2.woocommerce-loop-product__title')).getText();
          const prevPrice = await link.findElement(By.css('.price del .woocommerce-Price-amount.amount')).getText();
          const currPrice = await link.findElement(By.css('.price ins .woocommerce-Price-amount.amount')).getText();
          const cardItem = {
            id: i + 1,
            img: imgItem,
            description: description,
            previousPrice: prevPrice,
            currentPrice: currPrice
          };

          itemArray.push(cardItem);

          console.log(cardItem);
        }

        //Documentarrrr
        try {

          let existNextButton = await driver.findElement(By.css('nav.woocommerce-pagination ul.page-numbers li a.next.page-numbers'));

          // Haz clic en el botón de "Siguiente página"
          await existNextButton.click();

          //documentar
          await driver.wait(until.stalenessOf(existNextButton), 10000);

        } catch (error) {
          //If doesn't exist the next page, ends bucle
          console.error('Error:', error);
          console.log("There are not more pages.");
          existNextPage = false;
        }
      }

      createExcelFile(itemArray);
    } catch (error) {
      console.error('Error:', error);
    }
  });
});

//Funcion para exportar la informacion a un MS Excel
function createExcelFile(data) {
  let workSheet = xlsx.utils.json_to_sheet(data);
  let worBook = xlsx.utils.book_new();

  xlsx.utils.book_append_sheet(worBook, workSheet, 'Data_Scrapped');
  xlsx.writeFile(worBook, 'data_scrapped.xlsx');
  console.log('Scrappin in xlsx');
}