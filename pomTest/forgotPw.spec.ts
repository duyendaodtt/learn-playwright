import { test, expect, Page } from '@playwright/test';
import ForgotPasswordPage from "../POM/forgotPwPage";
import Variables from '../POM/variables';
import ForgotPwPageLocator from '../webElement/forgotPwLocator';

let url = 'https://letcode.in/signin'
test.describe("Forgot password", () =>{
    test.beforeEach(async({page}) =>{
        await page.goto(url);
        await page.locator(ForgotPwPageLocator.forgotPwBtn1).click();
        const forgotPassword = new ForgotPasswordPage(page);
    })
    test.describe("Scenario: Verify UI", () =>{
        test("Verify popup UI: Title", async({page})=>{
            expect(await page.locator(ForgotPwPageLocator.forgotPwPopupTitle)).toHaveText(Variables.forgotPwPopupTitle);
        })
        test("Verify popup UI: Close button", async({page})=>{
            expect(await page.locator(ForgotPwPageLocator.forgotPwPopupClose)).toBeVisible();
        })
        test("Verify Email icon", async({page}) =>{
            expect(await page.locator(ForgotPwPageLocator.popupEmailIcon)).toBeVisible();
        })
        test("Verify Email input field", async({page}) =>{
            expect(await page.locator(ForgotPwPageLocator.enterEmailField)).toBeVisible();
        })
        test("Verify Reset button", async({page}) =>{
            expect(await page.locator(ForgotPwPageLocator.resetPwBtn)).toBeVisible();
        })
        test("Verify place holder text of email field", async({page}) =>{
            expect(await page.locator(ForgotPwPageLocator.enterEmailField)).toHaveAttribute('placeholder', 'Enter registered email');
        })
        
    })
    test.describe("Scenario: Positive cases", () =>{     
        test("Enter valid email", async({page}) =>{
            const forgotPassword = new ForgotPasswordPage(page);
            let successMess = 'Reset password link has been sent to your email, Please check to continue'
            await forgotPassword.inputEmail('salina2702@gmail.com');
            // await forgotPassword.clickResetBtn();
            await page.locator(ForgotPwPageLocator.resetPwBtn).click();
            await page.waitForTimeout(3000)
            //console.log(await page.locator(ForgotPwPageLocator.messageLocator).textContent())
            expect (await page.locator(ForgotPwPageLocator.messageLocator)).toHaveText(successMess);
            
        })
        test("Check close button", async({page}) =>{
            const forgotPassword = new ForgotPasswordPage(page);
            // await forgotPassword.clickResetBtn();
            await page.locator(ForgotPwPageLocator.forgotPwPopupClose).click();
            await page.waitForTimeout(2000);
            expect (await page.locator('.modal.is-active')).not.toBeVisible(); 
            expect (await page.locator('.modal')).not.toBeVisible();
        })
        test("Close after entering invalid email", async({page}) =>{
            const forgotPassword = new ForgotPasswordPage(page);
            // await forgotPassword.clickResetBtn();
            await forgotPassword.inputEmail(Variables.invalidEmail);
            await page.locator(ForgotPwPageLocator.forgotPwPopupClose).click();
            await page.waitForTimeout(2000);
            expect (await page.locator('.modal')).not.toBeVisible();
        })
        test("Close after entering valid email", async({page}) =>{
            const forgotPassword = new ForgotPasswordPage(page);
            // await forgotPassword.clickResetBtn();
            await forgotPassword.inputEmail(Variables.validForgotPwEmail);
            await page.locator(ForgotPwPageLocator.forgotPwPopupClose).click();
            await page.waitForTimeout(2000);
            expect (await page.locator('.modal')).not.toBeVisible();
        })
        test("Close after entering non existed email", async({page}) =>{
            const forgotPassword = new ForgotPasswordPage(page);
            // await forgotPassword.clickResetBtn();
            await forgotPassword.inputEmail(Variables.notExistedEmail);
            await page.locator(ForgotPwPageLocator.forgotPwPopupClose).click();
            await page.waitForTimeout(2000);
            expect (await page.locator('.modal')).not.toBeVisible();
        })
        
    })
    test.describe("Scenario: Nagative case", () =>{
        test("Check reset button", async({page}) =>{
            //let errMess = 'Error: The email address is badly formatted.'
            const forgotPassword = new ForgotPasswordPage(page);
            // await forgotPassword.clickResetBtn();
            await forgotPassword.sendForgotPwEmail(''); //submit form without enter email value
            expect (await page.locator('.notification.is-danger')).toHaveText(Variables.invalidEmailErrMess);
        })
        test("Check invalid format email", async({page}) =>{
            //let errMess = 'Error: The email address is badly formatted.'
            const forgotPassword = new ForgotPasswordPage(page);
            // await forgotPassword.inputEmail('salina27');
            // await forgotPassword.clickResetBtn();
            await forgotPassword.sendForgotPwEmail('salina27');
            expect (await page.locator('.notification.is-danger')).toHaveText(Variables.invalidEmailErrMess);
        })
        test("Check entering not existed email case", async({page}) =>{
            const forgotPassword = new ForgotPasswordPage(page);
            await forgotPassword.sendForgotPwEmail('salina27@gmail.com');
            await page.waitForTimeout(3000);
            expect (await page.locator('.notification.is-danger')).toHaveText(Variables.notExistedEmailErrMess);
        })
        test("Check close function after entering invalid format email", async({page}) =>{
            const forgotPassword = new ForgotPasswordPage(page);
            await forgotPassword.sendForgotPwEmail('salina27');
            await page.locator(ForgotPwPageLocator.forgotPwPopupClose).click();
            await page.waitForTimeout(2000);
            expect (await page.locator('.modal')).not.toBeVisible();
        })
    })
})
