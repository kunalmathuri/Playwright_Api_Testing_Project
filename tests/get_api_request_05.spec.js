//Load Playwright module
import { test, expect } from "@playwright/test";
import { stringFormat } from "../utils/comman";

const bookingAPIrequestBody = require("../test-data/post_dynamic_request_body.json");

//write a test

//Create POST api request
test("Create GET api request in Playwright", async ({ request }) => {
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

  console.log("======================");

  const getAPIResponse = await request.get(`/booking/${bId}`);
  console.log(await getAPIResponse.json());

  //validate status code

  expect(getAPIResponse.ok()).toBeTruthy();
  expect(getAPIResponse.status()).toBe(200);
});
