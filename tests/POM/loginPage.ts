import { test, expect, type Page } from '@playwright/test';
import { CommonFunction } from './commonFunc';
import  LoginLocatorPage  from '../../webElement/loginPageLocator';

export default class LoginPage {
    
    constructor (public page: Page){
        
    };

    async enterUsername(userName: string) {
        // await this.page.locator(LoginLocatorPage.userNameField).click()
        // await this.page.locator(LoginLocatorPage.userNameField)
        //             .fill(userName);
        await this.page.fill(LoginLocatorPage.userNameField, userName);
    };
    async enterPassword(password: string){
        await this.page.fill(LoginLocatorPage.pwField, password)
        // await this.page.getByPlaceholder("Password").fill(password)
    };
    async submitLogin(){
        await this.page.click(LoginLocatorPage.submitButton);
    };
    async submitLoginForm(userName:string, pass:string) {
        // console.log(LoginLocatorPage.userNameField)
        // this.enterUsername(userName);
        // const a = this.enterUsername(userName);
        // console.log(a)
        // this.enterPassword(pass);
        // this.submitLogin();
        
        await this.enterUsername(userName);
        await this.enterPassword(pass);
        await this.submitLogin();
        
        // await this.page.fill(LoginLocatorPage.userNameField,userName); //using id
        // await this.page.getByPlaceholder(LoginLocatorPage.pwField).fill(pass); //using placehoder value
        // await this.page.click(LoginLocatorPage.submitButton); //using xpath locator
    }
    async clickHidePwBtn(){
        await this.page.click(LoginLocatorPage.hiddenBtn);
    }
}
