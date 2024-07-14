import { Given, When, Then,setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { fixture } from "../../hooks/pageFixture";
import LoginPage from "../../pages/loginPage";
import Assert from "../../helper/wrapper/assert";

let loginpage: LoginPage;
let assert : Assert

setDefaultTimeout(60 * 1000 * 2)

Given('User navigates to the application', async function () {
      loginpage = new LoginPage(fixture.page);
      assert = new Assert(fixture.page)
      fixture.logger.info("base url is:"+ process.env.BASEURL)
      await loginpage.naviageToLoginPage(process.env.BASEURL)   
      await assert.assertURL(process.env.BASEURL)
      await assert.assertTitle("Swag Labs")
    });

Given('User enter the username as {string}', async function (username) {
        await loginpage.enterUsername(username);
    });

Given('User enter the password as {string}', async function (password) {
        await loginpage.enterPassword(password);
    });

When('User click on the login button', async function () {
        await loginpage.clickOnLoginBtn();
    });
Given('User login with valid credentail as {string} and {string}', async function (username, password) {
  await loginpage.enterUsername(username);
  await loginpage.enterPassword(password);
  await loginpage.clickOnLoginBtn();
    });

Then('Validate unsuccessful login', async function () {
  await loginpage.getErrorMessage();
      // expect((await fixture.page.locator("//h3[@data-test='error']").innerText()).toString()).toEqual("Epic sadface: Username and password do not match any user in this service");
    });

