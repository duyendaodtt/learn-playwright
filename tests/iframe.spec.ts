import {test, expect} from "@playwright/test";

test("example with iframe",async ({page}) => {
    await page.goto('https://letcode.in/frame');
    const allFrames = page.frames();
    let frameNo = allFrames.length;
    console.log(`Count of frames in this page: ${frameNo}`)
    const parentFrame = page.frame('firstFr'); //using frame name
    await parentFrame?.fill("input[name='fname']", "Test1" );
    await parentFrame?.fill("input[name='lname']", "Last name");

    // const emailFrame = page.frame('googlefcPresent');
    
    //failed so only run first expected
        // expect(await parentFrame?.locator("p.has-text-info").textContent()).toContain("You have entered Test2")
        // expect(await parentFrame?.locator("p.has-text-info").textContent()).toContain("You have entered Test1")
    //fail on expect 2 so still run first one
    expect(await parentFrame?.locator("p.has-text-info").textContent()).toContain("You have entered Test1")
    expect(await parentFrame?.locator("p.has-text-info").textContent()).toContain("You have entered Test2")
})
test('using id frame', async({page}) =>{
    await page.goto('https://letcode.in/frame');
    const allFrames = page.frames();
    let frameNo = allFrames.length;
    console.log(`Count of frames in this page: ${frameNo}`)
    const parentFrame = page.frameLocator('#firstFr')
    await parentFrame.locator("input[name='fname']" ).fill( "Test1");
    await parentFrame.locator("input[name='lname']" ).fill( "Test2");

    expect(await parentFrame?.locator("p.has-text-info").textContent()).toContain("You have entered Test1")
})

test.only('inner iFrame', async({page}) =>{
    await page.goto('https://letcode.in/frame');
    const allFrames = page.frames();
    let frameNo = allFrames.length;
    console.log(`Count of frames in this page: ${frameNo}`)
    const parentFrame = page.frameLocator('#firstFr')
    // const innerFrame = page.frameLocator("iframe[src='innerFrame']");
    const emailFrame = parentFrame.frameLocator("iframe[src='innerFrame']"); 
    await emailFrame.locator("input[name='email']").fill('test123@offline.com');

})