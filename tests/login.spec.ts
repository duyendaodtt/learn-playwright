import {chromium, test, expect, Page} from "@playwright/test";
import  LoginPage from "./POM/loginPage";
import LoginLocatorPage from "../webElement/loginPageLocator";
import CommonFunction from "./POM/commonFunc"

test.beforeEach( async ({page}) =>{
    await page.goto('/');
    
})
test.describe("Test suite: Login", () =>{
    // const commonFunc = new CommonFunction();
    // const _page = commonFunc.createNewPage();
    // const loginFunc = new LoginPage(_page);

    test('LC01-Verify title of page', async ({page}) => {
        let pageTitle = await page.title();
        expect(pageTitle).toContain('Log in');
        expect(await page.title()).toContain('ServiceNow');
    })
    test('LC03 - Verify hidden button', async({page}) =>{
        expect(await page.$(LoginLocatorPage.hiddenBtn)).not.toBeNull();
        expect(await page.locator(LoginLocatorPage.hiddenBtn).isVisible()).toBe(true);
    })
    test('LC02- Verify label of textbox in login form', async({page}) =>{
        var parentUsernameTextbox = await page.$(LoginLocatorPage.labelUsernameField);
        // console.log(LoginLocatorPage.labelUsernameField)
         expect(await parentUsernameTextbox?.$eval('.control-label', node => node.textContent)).toEqual("User name");
         var parentPwTextbox = await page.$(LoginLocatorPage.pwLabelParent); 
        //expect(await parentPwTextbox?.$eval('.control-label', node => (node as HTMLElement).innerText)).toEqual("Password"); // return error = undefined
         expect(await parentPwTextbox?.$eval('.control-label', node => node.textContent)).toEqual("Password")          
    })
    test.only("Verify Hidden button after first clicking",async ({page}) =>{
        /** check label is changed to hide pw
         * check password value is not encypted
         */
         const loginFunc = new LoginPage(page);
        var pwValue = "Test3335"
        await loginFunc.enterPassword(pwValue); // enter password
        await loginFunc.clickHidePwBtn(); // click on hiden btn to show password
        const pwFieldEle = await page.locator(LoginLocatorPage.pwField); // get locator of this ele
        const pwFieldValue = await pwFieldEle.evaluate(e =>(e as HTMLInputElement).value )  // get properties 'value' of this ele
        console.log(pwFieldValue)
        await expect(pwFieldValue).toEqual(pwValue) // expected password show as input data
        
    })

    test.skip('login script 1', async ({page})=>{
        // const browser = await chromium.launch();
        // const context = await browser.newContext();
        // const page = await context.newPage();
        const loginPage = new LoginPage(page);
    
        // await page.goto('https://ecommerce-playground.lambdatest.io/');
        // await page.hover("//a[@data-toggle='dropdown']//span[contains(., 'My account')]");
        // await page.click("text = Login");
    
        //asert login form title
         let pageTitle = await page.title();
        //  await expect(pageTitle).toEqual('Account Login')
            await expect(await page.title()).toEqual('Account Login')
            
        // fill login form
            // await loginPage.enterUsername('zd@3344')
            // await loginPage.enterPassword('123456')
            // await loginPage.submitLogin();
            // await page.waitForTimeout(5000);
            await loginPage.submitLoginForm('admin', 'zt=*o4sSMMO8');
        
        // let errorMessLocator = "//div[@id='account-login']//div[(text()=' Warning: No match for E-Mail Address and/or Password.')]";
        // //await page.locator(errorMessLocator).screenshot();
        // await expect(page.locator(errorMessLocator)).toBeVisible();
        // await expect(page.locator("(//div[@id='account-login']//div)[1]"))
        //             .toHaveText(" Warning: No match for E-Mail Address and/or Passwordx.")
    })
})



