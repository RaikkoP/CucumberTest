const { Given, When, Then, And } = require('cucumber');
const puppeteer = require('puppeteer');

let browser, page;

// Access Kaup24 Homepage
Given('I am on the Kaup24 homepage', async () => {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
  await page.goto('https://kaup24.ee/et/');
  await page.setViewport({ width: 1080, height: 1024 });
});

// Search feature
When('I search for {string}', async (searchTerm) => {
  const searchBox = '#searchInput';
  await page.waitForSelector(searchBox);
  await page.type(searchBox, searchTerm);
  const searchButton = '.c-icon--search';
  await page.click(searchButton);
});

// Don't really know what to add here
Then('I should see search results', async () => {
});

// Click on the first product on the page
When('I click on the first product', async () => {
  const productLink = '.product-image-container';
  const product = await page.waitForSelector(productLink);
  await product.click();
});

// Add the product to your cart
And('I add the product to the cart', async () => {
    const addToCartButton = '.c-btn--primary.h-btn-intent--atc';
    const addToCart = await page.waitForSelector(addToCartButton);
    await addToCart.click();
    await new Promise(resolve => setTimeout(resolve, 2000));
    const cartButton = '#buy';
    const cart = await page.waitForSelector(cartButton);
    await cart.click();
});

// Product should be in your cart
Then('the product should be in the cart', async () => {
});

/// Find TV menu
When('I navigate through the menus to find a TV', async () => {
  const departmentId = '#department-274';
  await page.waitForSelector(departmentId);
  await page.click(departmentId);
  const tvProducts = (await page.$$('.category-list-item-wrap.all-categories-visible'))[1];
  if (tvProducts) {
    await page.evaluate(element => element.scrollIntoView(), tvProducts);
    await tvProducts.click();
  } else {
    console.error('TV Products not found');
    return;
  }
  const tvSection = (await page.$$('.category-list-item-wrap.all-categories-visible'))[3];
  if (tvSection) {
    await page.evaluate(element => element.scrollIntoView(), tvSection);
    await tvSection.click();
  } else {
    console.error('TV Section not found');
    return;
  }
});

Then('I should see TV products', async () => {
  // Add your assertion logic here
});

// Close the browser after all scenarios
After(async () => {
  await browser.close();
});