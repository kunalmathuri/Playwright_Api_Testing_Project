//Load Playwright module
import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
const { DateTime } = require("luxon");

// const bookingAPIrequestBody = require("../test-data/post_request_body.json");

//write a test

//Create POST api request
test("Create POST api request using dynamic request body", async ({
  request,
}) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const totalPrice = faker.number.int(1000);

  const checkInDate = DateTime.now().toFormat("yyyy-MM-dd");
  const checkOutDate = DateTime.now().plus({ day: 5 }).toFormat("yyyy-MM-dd");

  const postAPIResponse = await request.post("/booking", {
    data: {
      firstname: firstName,
      lastname: lastName,
      totalprice: totalPrice,
      depositpaid: true,
      bookingdates: {
        checkin: checkInDate,
        checkout: checkOutDate,
      },
      additionalneeds: "Breakfast",
    },
  });
  //Validate Status Code

  expect(postAPIResponse.ok()).toBeTruthy();
  expect(postAPIResponse.status()).toBe(200);

  const postAPIResponseBody = await postAPIResponse.json();
  console.log(postAPIResponseBody);

  //validate JSON api response
  expect(postAPIResponseBody.booking).toHaveProperty("firstname", firstName);
  expect(postAPIResponseBody.booking).toHaveProperty("lastname", lastName);

  //validate nested JSON Objects
  expect(postAPIResponseBody.booking.bookingdates).toHaveProperty(
    "checkin",
    checkInDate
  );
  expect(postAPIResponseBody.booking.bookingdates).toHaveProperty(
    "checkout",
    checkOutDate
  );
});
