import {test, expect} from "@playwright/test";
import RegisterPage from "../POM/registerPage"

const registerPage = new RegisterPage()
test("multiple tabs 1", async({page})=>{
    await page.goto("https://www.lambdatest.com/selenium-playground/window-popup-modal-demo");
    console.log(page.url());

    const [newWindow] = await Promise.all([
        page.waitForEvent('popup'),
        page.click("'Follow On Twitter'")
    ]);
    console.log(newWindow.url());
})
test.only("")