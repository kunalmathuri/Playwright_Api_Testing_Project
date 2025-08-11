//Load Playwright module
import { test, expect } from "@playwright/test";
import { stringFormat } from "../utils/comman";

const bookingAPIrequestBody = require("../test-data/post_dynamic_request_body.json");

//write a test

//Create POST api request
test("query parameters in Playwright", async ({ request }) => {
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

  const getAPIResponse = await request.get(`/booking/`, {
    params: {
      firstname: "Kunal",
      lastname: "Mathuri",
    },
  });
  console.log(await getAPIResponse.json());

  //You get booking IDs because you’re using the search API (params) — that’s by design.
  //  To get the full info, you have to call another endpoint with that ID.
  // Actually It depends on how the API is built — for example, in Restful Booker API, when you call:
  // const getAPIResponse = await request.get(`/booking/`, {
  //   params: {
  //     firstname: "Kunal",
  //     lastname: "Mathuri",
  //   },
  // }); which is nothing but, Playwright sends an HTTP GET request to: /booking?firstname=Kunal&lastname=Mathuri
  // i.e params → is just a query string builder. It turns your JavaScript object into ?firstname=Kunal&lastname=Mathuri automatically.
  // This works like in Postman when you set Query Params. It does not return all booking details by design of Restful booker API site,
  //  It returns only booking IDs that match the search criteria with in an array of objects. so This is intentional:

  //   /booking with params is a search endpoint → returns IDs.

  // /booking/:id is the detail endpoint → returns full booking info.

  //validate status code

  expect(getAPIResponse.ok()).toBeTruthy();
  expect(getAPIResponse.status()).toBe(200);
});
