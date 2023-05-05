import {chromium, test, expect} from "@playwright/test";
export default class CommonFunction {
    async createNewPage(){
        const browser = await chromium.launch();
        const context = await browser.newContext();
        const page = await context.newPage();
        return page;
    }
    async checkEncrypt(str:string) {
        const mapping = str.split('');
        const valid = mapping.findIndex(x => x !== "•");
        if(valid === -1) return true;
        return false;
      }
}