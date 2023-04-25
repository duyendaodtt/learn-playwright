import {test, expect } from "@playwright/test"

///
var url = "https://dummy.restapiexample.com";
var pathCreate = "https://fakerestapi.azurewebsites.net/api/v1/Books"; 
let bookId = 0;
/// Post
test.skip("Post method", async ({request}) =>{
     
    const postResponse = await request.post(`${pathCreate}`, {
        data: {
            "id": bookId,
            "title": "string",
            "description": "string",
            "pageCount": 0,
            "excerpt": "string",
            "publishDate": "2023-04-21T07:11:51.759Z"
          }, headers: {
            "content-type": "application/json"
          }
    }); 
    await expect(postResponse.status()).toBe(200)
    console.log(await postResponse.json())
    var jsonData = await postResponse.json();
    // let responseJson = JSON.parse(jsonData) ;
    console.log(jsonData)
    await expect(await postResponse.text()).toBeTruthy()
    await expect(await jsonData.id).toBe(bookId)
})
/// Get
var getUrl = "https://fakerestapi.azurewebsites.net/api/v1/Books/46666";
test("Get method - Failed case", async ({request}) =>{
  const getReq = await request.get(getUrl, {
    headers: {
      "content-type": "application/json"
    }
  })
  console.log(await getReq.json());
  expect(getReq.ok()).not.toBeTruthy() // expected response body is truthy (value != null or empty - this case: 404 not found, success: 200-299)
  expect(getReq).toBeTruthy()
})