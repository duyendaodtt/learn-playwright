import {chromium, test, expect} from "@playwright/test";
export class CommonFunction {
    async createNewPage(){
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        return page;
    }
}