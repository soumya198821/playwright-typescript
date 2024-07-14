import { When, Then,setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { fixture } from "../../hooks/pageFixture";
import LoginPage from "../../pages/loginPage";
import InventoryPage from "../../pages/inventoryPage";
import Assert from "../../helper/wrapper/assert";

setDefaultTimeout(60 * 1000 * 2)
let loginpage: LoginPage;
let assert : Assert;
let inventoryPage: InventoryPage;

Then('Validate successful login', async function () {
      inventoryPage = new InventoryPage(fixture.page)
      assert = new Assert(fixture.page)
      await inventoryPage.validateSuccessfulLogin();
      });

 When('User select any {int} items from the swag labs page', async function (item) {
      await inventoryPage.addTocartItems(item)
  });

  When('User click on cart icon to go ahead with checkout of added items', async function () {
      await inventoryPage.navigateToCartPage();
  });


  When('User click on checkout button on cart page', async function () {
      await inventoryPage.checkOutItemFromCart();
  });


  When('User provide {string} , {string} and {string}', async function (fname, lanme, zipCode) {
      await inventoryPage.provideShipplingAddress(fname,lanme,zipCode);
  });


  When('User click on continue button', async function () {
       await inventoryPage.ContinueToFinishPage();
  });


  When('User validate price , payment and shipping info', async function () {
      await inventoryPage.validationForCheckoutPage();

  });


  Then('User click on finish button', async function () {
      await inventoryPage.finishCheckout();
  });


  Then('Validate checkout complete successful message', async function () {
      await inventoryPage.getOderPlacedThanksMsg();
      await inventoryPage.getShipmentDetasilMsg();
  });


  Then('click on Backhome button', async function () {
      await inventoryPage.navigateBackToHomePage();
  });

  

  Then('Logout of the application', async function () {
      await inventoryPage.doLogout();
      });
