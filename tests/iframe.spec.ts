import {test} from "@playwright/test";

test("example with iframe",async ({page}) => {
    await page.goto('https://letcode.in/frame');
    const allFrames = page.frames();
    console.log(`Count of frames in this page: ${allFrames}`)
    const parentFrame = page.frame('firstFr');
    await parentFrame?.fill("fname", "Test1" );
    await parentFrame?.fill("lname", "Last name");

    const emailFrame = page.frame('googlefcPresent');
    await emailFrame?.fill("email", 'test123@offline.com');
})