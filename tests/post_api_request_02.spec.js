//Load Playwright module
import { test, expect } from "@playwright/test";

const bookingAPIrequestBody = require("../test-data/post_request_body.json");

//write a test

//Create POST api request
test("Create POST api request using static json file", async ({ request }) => {
  const postAPIResponse = await request.post("/booking", {
    data: bookingAPIrequestBody,
  });
  //Validate Status Code

  expect(postAPIResponse.ok()).toBeTruthy();
  expect(postAPIResponse.status()).toBe(200);

  const postAPIResponseBody = await postAPIResponse.json();
  console.log(postAPIResponseBody);

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
});
