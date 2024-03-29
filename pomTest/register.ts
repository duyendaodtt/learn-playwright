import {test, expect} from "@playwright/test";
import RegisterPage from "../POM/registerPage";

test("Register TC_01", async({page ,baseURL})=>{
    const registerAccount = new RegisterPage(page); 
    await page.goto(`${baseURL}signup`)
    await registerAccount.submitFullRegisterForm('Ngo', 'sss', 'emailss', 'VN', '12345', '12345');
    await page.goto(`${baseURL}`)
    await registerAccount.submitFullRegisterForm('Ngo', 'Quyen', 'ngo.q@vietnam.com','Vietnam', 'Pw@12345', 'Pw2345')
})