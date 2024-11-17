const { Builder, By, until } = require('selenium-webdriver');
const xlsx = require('xlsx');

describe('Scrapping', async () => {
  let extractArray = [];

  let driver = new Builder().forBrowser('chrome').build();
  let url = 'https://classic.aia.org/firm-directory';

  it('Get Data from web page', async () => {
    try {
      await driver.get(url);
      await driver.sleep(2000);

      const modalSelector = By.css('.notification-modal');

      await driver.wait(until.elementLocated(modalSelector), 10000);

      //Cerramos el modal
      const closeButton = await driver.findElement(By.css('.notification-modal-x'));

      // Haz clic en el botón para cerrar el modal
      await closeButton.click();

      //wait
      await driver.wait(until.elementLocated(By.css('tbody#ember1860 tr')), 10000);
      const rows = await driver.findElements(By.css('tbody#ember1860 tr'));
      for (let i = 0; i < rows.length; i++) {
        //Primer Td
        const elementsTD = await rows[i].findElements(By.css('td'));
        // Busca todos los elementos 'p' dentro de ese 'td'
        let firstTD = elementsTD[0];
        const lastParagraph = await firstTD.findElement(By.css('p:last-of-type')).getText();
        console.log('lastParagraph: ', lastParagraph);
        /*if (lastParagraph) {
          let elementA = await lastParagraph.findElement(By.css('a'));
          if (elementA) {
            let src = await elementA.getAttribute('src') || '';
            console.log('src: ', src);
          }

          //let src = await lastParagraphText.findElement(By.css('a')).getAttribute('src') || '';
          //console.log('src: ', src);
        }
        */


        //const secondTD = await rows[i].findElements(By.css('td'))[1];


      }
    } catch (error) {
      console.error('Error:', error);
    }
  })
});

//Funcion para exportar la informacion a un MS Excel
function createExcelFile(data) {
  let workSheet = xlsx.utils.json_to_sheet(data);
  let worBook = xlsx.utils.book_new();

  xlsx.utils.book_append_sheet(worBook, workSheet, 'Data_Scrapped');
  xlsx.writeFile(worBook, 'data_scrapped.xlsx');
  console.log('Scrappin in xlsx');
}