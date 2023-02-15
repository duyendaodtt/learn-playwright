import { test, expect, type Page } from '@playwright/test';
import { CommonFunction } from './commonFunc';
import  LoginLocatorPage  from '../../webElement/loginPageLocator';

export class LoginPage {
    async submitLoginForm(userName:string, pass:string, {page}) {
        console.log(LoginLocatorPage.userNameField)
        await page.fill(LoginLocatorPage.userNameField,userName); //using id
        await page.getByPlaceholder(LoginLocatorPage.pwField).fill(pass); //using placehoder value
        await page.click(LoginLocatorPage.submitButton); //using xpath locator
    }
}
