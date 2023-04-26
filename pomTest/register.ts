import {test, expect} from "@playwright/test";
import RegisterPage from "../POM/registerPage";


test("Register TC_01", async({page ,baseURL})=>{
    const registerAccount = new RegisterPage(page); 
    await page.goto(`${baseURL}signup`)
    await registerAccount.submitFullRegisterForm('Ngo', )
})