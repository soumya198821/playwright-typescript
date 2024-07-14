import {expect, Page } from "@playwright/test"
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers"

export default class loginPage{
    private base: PlaywrightWrapper

    constructor(private page: Page){
        this.base = new PlaywrightWrapper(page)
    }

    private Elements={
        userInput: "Username",
        passwordInput: "Password",
        loginBtn: "//input[@id='login-button']",
        errorMessage: "//h3[@data-test='error']"
    }

    async naviageToLoginPage(url: string){
        await this.base.goto(url);
    }

    async enterUsername(username : string){
        await this.page.getByPlaceholder(this.Elements.userInput).fill(username);
    }

    async enterPassword(password : string){
        await this.page.getByPlaceholder(this.Elements.passwordInput).fill(password);
    }

    async clickOnLoginBtn(){
        await this.base.waitAndClick(this.Elements.loginBtn)
    };

    async getErrorMessage(){
        const errorMsg: string= await this.page.locator(this.Elements.errorMessage).textContent();
        expect(errorMsg).toEqual("Epic sadface: Username and password do not match any user in this service")
    }

    async userLogin(username: string, password: string){
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickOnLoginBtn();
    }
}