import { BeforeAll, AfterAll, Before, After, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext } from "@playwright/test";
import { fixture } from "./pageFixture"
import { createLogger, Logger } from "winston";
import { invokeBrowser } from "../helper/browsers/browserManager";
import { getEnv } from "../helper/env/env";
import { options } from "../helper/util/logger";

let browser:Browser;
let context: BrowserContext;

BeforeAll(async function () {
    getEnv();
    browser = await invokeBrowser();
});

Before(async function ({pickle}) {
    const scenarioName = pickle.name + pickle.id;
    context = await browser.newContext();
    const page = await context.newPage();
    fixture.page = page;
    fixture.logger = createLogger(options(scenarioName));
});

After(async function ({pickle,result}) {
    if(result?.status==Status.FAILED){
        const img = await fixture.page.screenshot({ path: `./test-results/screenshots/${pickle.name}.png` });
        try{
        await fixture.page.locator("//button[@id='react-burger-menu-btn']").click();
        await fixture.page.getByText("Logout").isVisible();
        await fixture.page.getByText("Logout").click();
        await fixture.page.locator("//div[@class='login_logo']").isVisible();}catch(error){
            console.error("logout button not found")
        }
    }
    
    await fixture.page.close();
    await context.close();
});

AfterAll(async function () {
    await browser.close();
    fixture.logger.close();
})
