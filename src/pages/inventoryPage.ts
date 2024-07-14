import {expect, Page } from "@playwright/test"
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers"

export default class InventoryPage{
private base: PlaywrightWrapper

constructor(private page: Page){
    this.base = new PlaywrightWrapper(page)
}

private Elements={
    inventoryPageBanner: "//div[@class='app_logo']",
    inventoryPageTitle: "//span[@class='title']",
    cartLink : "//a[@class='shopping_cart_link']",
    youcartPageTitle: "//span[text()='Your Cart']",
    checkoutBtn : "//button[@id='checkout']",
    checkoutinfo: "//span[text()='Checkout: Your Information']",
    fname: "First Name",
    lname: "Last Name",
    pinCode: "Zip/Postal Code",
    continueBtn: "//input[@id='continue']",
    checkoutOverview: "//span[text()='Checkout: Overview']",
    finishBtn: "//button[@id='finish']",
    checkoutCompletePageTitle: "//span[text()='Checkout: Complete!']",
    orderCompleteImage: "pony-express",
    orderThankyouMsg: "//h2[@class='complete-header']",
    ordershippingMsg: "//div[@class='complete-text']",
    backHomeBtn:"//button[@id='back-to-products']",
    homePageTitle:"//span[@class='title']",
    bergerMenu: "//button[@id='react-burger-menu-btn']",
    logoutBtn: "//a[@id='logout_sidebar_link']",
    loginLogo:"//div[@class='login_logo']",
    quantityHeader: "QTY",
    descriptionHeader: "Description",
    paymentInfo_label: "Payment Information:",
    card_details: "SauceCard #31337",
    shipment_label:"Shipping Information:",
    shipment_details: "Free Pony Express Delivery!",
    totalprice_label: "Price Total"
}

 async addTocartItems (item) {
    await this.page.waitForLoadState();
    for(let i=1;i<=item;i++){
        await this.base.waitAndClick(`(//button[text()='Add to cart'])[${i}]`);
        await this.page.locator(`(//button[text()='Remove'])[${i}]`).isVisible();
    }
}

async navigateToCartPage () {
await this.page.locator(this.Elements.cartLink).scrollIntoViewIfNeeded();
await this.base.waitAndClick(this.Elements.cartLink);
await this.page.locator(this.Elements.youcartPageTitle).isVisible();
}

async checkOutItemFromCart () {
await this.page.locator(this.Elements.checkoutBtn).scrollIntoViewIfNeeded();
await this.base.waitAndClick(this.Elements.checkoutBtn);
await this.page.locator(this.Elements.checkoutinfo).isVisible();
}


async provideShipplingAddress (fname, lanme, zipCode) {
await this.page.getByPlaceholder(this.Elements.fname).fill(fname);
await this.page.getByPlaceholder(this.Elements.lname).fill(lanme);
await this.page.getByPlaceholder(this.Elements.pinCode).fill(zipCode);
}


async ContinueToFinishPage () {
await this.page.locator(this.Elements.continueBtn).scrollIntoViewIfNeeded();
await this.base.waitAndClick(this.Elements.continueBtn);
await this.page.locator(this.Elements.checkoutOverview).isVisible();
}

async validationForCheckoutPage () {
    expect((await this.page.locator(this.Elements.checkoutOverview).innerText()).toString()).toEqual("Checkout: Overview");
    expect((await this.page.locator(this.Elements.inventoryPageBanner).innerText()).toString()).toEqual("Swag Labs");
    expect((await this.page.getByText(this.Elements.quantityHeader).innerText()).toString()).toEqual("QTY");
    expect((await this.page.getByText(this.Elements.descriptionHeader).innerText()).toString()).toEqual("Description");
    await this.page.getByText("Finish").scrollIntoViewIfNeeded();
    expect((await this.page.getByText(this.Elements.paymentInfo_label).innerText()).toString()).toEqual("Payment Information:");
    expect((await this.page.getByText(this.Elements.card_details).innerText()).toString()).toEqual("SauceCard #31337");
    expect((await this.page.getByText(this.Elements.shipment_label).innerText()).toString()).toEqual("Shipping Information:");
    expect((await this.page.getByText(this.Elements.shipment_details).innerText()).toString()).toEqual("Free Pony Express Delivery!");
    expect((await this.page.getByText(this.Elements.totalprice_label).innerText()).toString()).toEqual("Price Total");
}


async finishCheckout () {
await this.base.waitAndClick(this.Elements.finishBtn);
await this.page.locator(this.Elements.checkoutCompletePageTitle).isVisible();
}


async getOderPlacedThanksMsg () {
await this.page.getByTestId(this.Elements.orderCompleteImage).isVisible();
const thanksMsg : string = (await this.page.locator(this.Elements.orderThankyouMsg).innerText()).toString();
expect(thanksMsg).toEqual("Thank you for your order!");
}

async getShipmentDetasilMsg () {
const shipmentMsg : string = (await this.page.locator(this.Elements.ordershippingMsg).innerText()).toString();
expect(shipmentMsg).toEqual("Your order has been dispatched, and will arrive just as fast as the pony can get there!")
}

async navigateBackToHomePage () {
await this.base.waitAndClick(this.Elements.backHomeBtn);
await this.page.locator(this.Elements.homePageTitle).isVisible();
}

async getHomePageTitle () {
await this.page.locator(this.Elements.inventoryPageBanner).isVisible();
const pagetitle = await this.page.locator(this.Elements.inventoryPageBanner)
return (await pagetitle.innerText()).toString();
}

async doLogout () {
await this.base.waitAndClick(this.Elements.bergerMenu);
await this.page.getByText(this.Elements.logoutBtn).isVisible();
await this.base.waitAndClick(this.Elements.logoutBtn);
await this.page.locator(this.Elements.loginLogo).isVisible();
}

async validateSuccessfulLogin(){
    const pageBanner: string= await this.page.locator(this.Elements.inventoryPageBanner).textContent();
    expect(pageBanner).toEqual("Swag Labs");

    const pagetitle:string = await this.page.locator(this.Elements.inventoryPageTitle).textContent();
    expect(pagetitle).toEqual("Products"); 
}


}