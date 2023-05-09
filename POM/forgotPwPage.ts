import { test, expect, Page } from '@playwright/test';
import  ForgotPwPageLocator  from '../webElement/forgotPwLocator';

export default class ForgotPasswordPage {
    constructor  (public page: Page) {}
    async openForgotPwPopup() {
        // Start waiting for popup before clicking. Note no await.
        const popupPromise = this.page.waitForEvent('popup');
        await this.page.locator(ForgotPwPageLocator.forgotPwBtn1).click();
        const popup = await popupPromise;
        // Wait for the popup to load.
        await popup.waitForLoadState();
    }
    async inputEmail(email: string) {
        await this.page.locator(ForgotPwPageLocator.enterEmailField).fill(email);
    }
    async clickResetBtn(){
        // await this.page.locator(ForgotPwPageLocator.resetPwBtn).click({force: true});
        await this.page.click(ForgotPwPageLocator.resetPwBtn, {force: true})
    }
    async sendForgotPwEmail(email: string){
        await this.inputEmail(email);
        await this.clickResetBtn();
    }
}