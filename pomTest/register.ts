import {test, expect} from "@playwright/test";
import RegisterPage from "../POM/registerPage";

test("Register TC_01", async({page ,baseURL})=>{
    const registerAccount = new RegisterPage(page); 
<<<<<<< HEAD:pomTest/register.ts
    await page.goto(`${baseURL}signup`)
    await registerAccount.submitFullRegisterForm('Ngo', )
=======
    await page.goto(`${baseURL}`)
    await registerAccount.submitFullRegisterForm('Ngo', 'Quyen', 'ngo.q@vietnam.com','Vietnam', 'Pw@12345', 'Pw2345')

>>>>>>> 4aba4d86c0d78741a2cd2ed8b6be251a3814a266:pomTest/register.test.ts
})