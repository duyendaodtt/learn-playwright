import {chromium, test, expect} from "@playwright/test";
import  LoginPage from "./POM/loginPage";

test('login script 1', async ({page})=>{
    // const browser = await chromium.launch();
    // const context = await browser.newContext();
    // const page = await context.newPage();
    const loginPage = new LoginPage(page);

    await page.goto('https://ecommerce-playground.lambdatest.io/');
    await page.hover("//a[@data-toggle='dropdown']//span[contains(., 'My account')]");
    await page.click("text = Login");
    //await page.waitForTimeout(30000);
    //asert login form title
     let pageTitle = await page.title();
    //  await expect(pageTitle).toEqual('Account Login')
        await expect(await page.title()).toEqual('Account Login')
        
    // fill login form
        loginPage.submitLoginForm('k11123', 'Pass123')
        await page.waitForTimeout(5000);

        // await page.fill('id=input-email', 'k1112');
        // // await page.fill('id=input-password', '123P');
        // await page.getByPlaceholder("Password").fill("Pass123");
        // // await page.locator("text = Login");
        // await page.click('//input[@type="submit"]');
    
    let errorMessLocator = "//div[@id='account-login']//div[(text()=' Warning: No match for E-Mail Address and/or Password.')]";
    //await page.locator(errorMessLocator).screenshot();
    await expect(page.locator(errorMessLocator)).toBeVisible();
    await expect(page.locator("(//div[@id='account-login']//div)[1]"))
                .toHaveText(" Warning: No match for E-Mail Address and/or Password.")
})