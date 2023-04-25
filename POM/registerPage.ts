import { test, expect, Page } from '@playwright/test';
import  RegisterPageLocator  from '../webElement/registerPageLocator';

export default class RegisterPage {
    constructor (public page: Page){

    };
    async enterFirstName(firstName: string) {
        await this.page.locator(RegisterPageLocator.firstNameField)
                    .type(firstName);
    };
    async enterLastName(lastName: string) {
        await this.page.locator(RegisterPageLocator.lastNameField)
                    .type(lastName);
    };
    async enterEmail(email: string) {
        await this.page.locator(RegisterPageLocator.emailField)
                    .type(email);
    };
    async selectCountry(countryName: string) {
        // await this.page.selectOption(RegisterPageLocator.countrySelector, countryName);
        await this.page.locator("select")
                        .locator('option', {
                            hasText: countryName
                        })
    };
    async enterPassword(password: string){
        await this.page.locator(RegisterPageLocator.passwordField)
                    .fill(password);
    };
    async enterConfirmPassword(confirmPassword: string){
        await this.page.locator(RegisterPageLocator.confirmPasswordField)
                    .fill(confirmPassword);
    };
    async clickCaptchaCheckbox(){
        await this.page.click(RegisterPageLocator.robotCheckbox);
    }
    async clickPolicyCheckbox(){
        await this.page.locator(RegisterPageLocator.policyCheckbox).click();
    }
    async submitSignUpBtn(){
        await this.page.click(RegisterPageLocator.signUpBtn);
    };
    async submitFullRegisterForm(firstName:string, lastName:string, email: string, country: string, password: string, confirmPass: string) {
        // console.log(RegisterPageLocator.firstNameField)
        this.enterFirstName(firstName);
        this.enterLastName(lastName);
        this.enterEmail(email);
        this.selectCountry(country);
        this.enterPassword(password);
        this.enterConfirmPassword(confirmPass);
        this.clickCaptchaCheckbox();
        this.clickPolicyCheckbox();
        this.submitSignUpBtn();
    }
}
