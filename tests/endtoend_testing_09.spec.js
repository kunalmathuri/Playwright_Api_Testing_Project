//Load Playwright module
import { test, expect } from "@playwright/test";
import { stringFormat } from "../utils/comman";

const bookingAPIrequestBody = require("../test-data/post_dynamic_request_body.json");
const tokenRequestBody = require("../test-data/token_request_body.json");
const patchRequestBody = require("../test-data/patch_request_body.json");

//write a test
console.log("==POST API==");

//Create POST api request
test("Create PUT api request in Playwright", async ({ request }) => {
  const dynamicRequestBody = stringFormat(
    JSON.stringify(bookingAPIrequestBody),
    "Kunal",
    "Mathuri",
    "Mango"
  );

  const postAPIResponse = await request.post("/booking", {
    data: JSON.parse(dynamicRequestBody),
  });
  //Validate Status Code

  expect(postAPIResponse.ok()).toBeTruthy();
  expect(postAPIResponse.status()).toBe(200);

  const postAPIResponseBody = await postAPIResponse.json();
  console.log(postAPIResponseBody);

  const bId = postAPIResponseBody.bookingid;

  //validate JSON api response
  expect(postAPIResponseBody.booking).toHaveProperty("firstname", "Kunal");
  expect(postAPIResponseBody.booking).toHaveProperty("lastname", "Mathuri");

  //validate nested JSON Objects
  expect(postAPIResponseBody.booking.bookingdates).toHaveProperty(
    "checkin",
    "2018-01-01"
  );
  expect(postAPIResponseBody.booking.bookingdates).toHaveProperty(
    "checkout",
    "2019-01-01"
  );

  //GET API call

  console.log("==GET API==");

  const getAPIResponse = await request.get(`/booking/${bId}`);
  console.log(await getAPIResponse.json());

  //validate status code

  expect(getAPIResponse.ok()).toBeTruthy();
  expect(getAPIResponse.status()).toBe(200);

  //Generate Token

  const tokenResponse = await request.post(`/auth`, {
    data: tokenRequestBody,
  });
  const tokenAPIResponseBody = await tokenResponse.json();
  const tokenNo = tokenAPIResponseBody.token;
  console.log("Token no. is :" + tokenNo);

  console.log("==PATCH API==");

  //PUT API Call
  const patchAPIResponse = await request.patch(`/booking/${bId}`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${tokenNo}`,
    },
    data: patchRequestBody,
  });
  const patchAPIResponseBody = await patchAPIResponse.json();
  console.log(patchAPIResponseBody);

  //Validate status code

  expect(patchAPIResponse.status()).toBe(200);

  console.log("==DELETE API==");
  // DELETE API call
  const deleteAPIResponse = await request.delete(`/booking/${bId}`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${tokenNo}`,
    },
  });

  await expect(deleteAPIResponse.status()).toEqual(201);
  await expect(deleteAPIResponse.statusText()).toBe("Created");
});
