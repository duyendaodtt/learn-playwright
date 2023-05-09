import {chromium, test, expect, Page} from "@playwright/test";
import LoginLocatorPage from "../webElement/loginPageLocator";
import Variables from "../POM/variables";
import LoginPage from '../tests/POM/loginPage';

test.beforeEach( async ({page}) =>{
    await page.goto('/');
    
})
test.describe("Verify Login form", () =>{
    // const commonFunc = new CommonFunction();
    // const _page = commonFunc.createNewPage();
    // const loginFunc = new LoginPage(_page);

    test('LC01-Verify title of page', async ({page}) => {
        let pageTitle = await page.title();
        expect(pageTitle).toContain('Log in');
        expect(await page.title()).toContain('ServiceNow');
    })
    test('LC02 - Verify hidden button', async({page}) =>{
        expect(await page.$(LoginLocatorPage.hiddenBtn)).not.toBeNull();
        expect(await page.locator(LoginLocatorPage.hiddenBtn).isVisible()).toBe(true);
    })
    test('LC03 - Verify label of textbox in login form', async({page}) =>{
        var parentUsernameTextbox = await page.$(LoginLocatorPage.labelUsernameField);
        // console.log(LoginLocatorPage.labelUsernameField)
         expect(await parentUsernameTextbox?.$eval('.control-label', node => node.textContent)).toEqual("User name");
         var parentPwTextbox = await page.$(LoginLocatorPage.pwLabelParent); 
        //expect(await parentPwTextbox?.$eval('.control-label', node => (node as HTMLElement).innerText)).toEqual("Password"); // return error = undefined
         expect(await parentPwTextbox?.$eval('.control-label', node => node.textContent)).toEqual("Password")          
    })
    test("LC04 - Verify Hidden button after first clicking",async ({page}) =>{
        /** check label is changed to hide pw
         * check password value is not encypted
         */
         const loginFunc = new LoginPage(page);
        var pwValue = "Test3335"
        await loginFunc.enterPassword(pwValue); // enter password
        await loginFunc.clickHidePwBtn(); // click on hiden btn to show password
        const pwFieldEle = await page.locator(LoginLocatorPage.pwField); // get locator of this ele
        const pwFieldValue = await pwFieldEle.evaluate(e =>(e as HTMLInputElement).value )  // get properties 'value' of this ele
        //console.log(pwFieldValue)
        await expect(pwFieldValue).toEqual(pwValue) // expected password show as input data
        
    })
    test("LC05 - Verify Hidden button function after second clicking",async ({page}) =>{
        /** check label is changed to hide pw
         * check password value is not encypted
         */
         const loginFunc = new LoginPage(page);
        //  const commonFunc = new CommonFunction(page);
        var pwValue = "Test3335"
        await loginFunc.enterPassword(pwValue); // enter password
        await loginFunc.clickHidePwBtn(); // click on hiden btn to show password
        await page.waitForSelector(LoginLocatorPage.hiddenBtn);
        await loginFunc.clickHidePwBtn(); // click on hiden btn to turn on hide pw mode
        const pwFieldEle = await page.locator(LoginLocatorPage.pwField); // get locator of this ele
        expect(await pwFieldEle.getAttribute('type')).toBe('password')
        //let isEncryptPw = await commonFunc.checkEncrypt(inputPwValue) // check if pw is encrypt true or false
         //expect(await isEncryptPw).toBe(true);
    })
    
})
test.describe("Login Positive case", ()=>{
    test('login script 1', async ({page})=>{
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
            await loginPage.submitLoginForm(Variables.username, Variables.password);
        
        // let errorMessLocator = "//div[@id='account-login']//div[(text()=' Warning: No match for E-Mail Address and/or Password.')]";
        // //await page.locator(errorMessLocator).screenshot();
        // await expect(page.locator(errorMessLocator)).toBeVisible();
        // await expect(page.locator("(//div[@id='account-login']//div)[1]"))
        //             .toHaveText(" Warning: No match for E-Mail Address and/or Passwordx.")
    })
})
test.describe("Login Nagative case", () =>{
    test("User clicks on the login button", async({page}) =>{
        const loginPage = new LoginPage(page);
        // await loginPage.submitLogin();
        await page.locator(LoginLocatorPage.submitButton).dblclick();
        await page.waitForSelector(LoginLocatorPage.errMesLocator);
        expect (await page.locator(LoginLocatorPage.errMesLocator)).toHaveText('Invalid input in user name!')
    })
    test.only("Only input username field", async({page}) =>{
        const loginPage = new LoginPage(page);
        var errMess = "User name or password invalid. To reset your admin password click "
        await loginPage.enterUsername(Variables.username);
        await page.locator(LoginLocatorPage.submitButton).dblclick();
        await page.waitForSelector(LoginLocatorPage.invalidAccErrMes);
        expect(page.locator(LoginLocatorPage.invalidAccErrMes)).toHaveText(errMess);
    })
})
test.describe("After Login successfully", ()=>{
    test("LGC06 - Verify language dropdown has label of Language", async({page}) =>{
        const login = new LoginPage(page);
        await login.submitLoginForm(Variables.username, Variables.password);
        await page.locator('.concourse-pickers').click(); 
        //check if text for button is visible after clicking language icon or not
        expect(await page.locator('.label').getByText('Application scope: Global')).toBeVisible() 
    })

    
})


