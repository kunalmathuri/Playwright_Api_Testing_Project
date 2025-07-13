import { test, expect, request } from "@playwright/test";

// test("Add API Key in Header", async () => {
//   const apiContext = await request.newContext({
//     baseURL: "https://reqres.in/",
//     extraHTTPHeaders: {
//       "x-api-key": "reqres-free-v1",
//     },
//   });
// });
test("API Delete Request", async ({ request }) => {
  const response = await request.delete("https://reqres.in/api/users/2", {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "reqres-free-v1",
    },
  });
  expect(response.status()).toBe(204);
});

test("API PUT Request", async ({ request }) => {
  const response = await request.put("https://reqres.in/api/users/2", {
    headers: {
      "content-type": "application/json",
      "x-api-key": "reqres-free-v1",
    },
    data: {
      name: "Kunal",
      job: "Tester",
    },
  });
  expect(response.status()).toBe(200);
  const text = await response.text();
  expect(text).toContain("Kunal");
  console.log(await response.json());
});

test("API POST Request", async ({ request }) => {
  const response = await request.post("https://reqres.in/api/users", {
    headers: {
      "content-type": "application/json",
      "x-api-key": "reqres-free-v1",
    },
    data: {
      name: "Kunal",
      job: "Tester",
    },
  });
  expect(response.status()).toBe(201);
  const text = await response.text();
  expect(text).toContain("Kunal");
  console.log(await response.json());
});
test.only("API GET Request", async ({ request }) => {
  const response = await request.get("https://reqres.in/api/users/2", {
    headers: {
      "Content-Type": "Application/json",
      "x-api-key": "reqres-free-v1",
    },
  });
  expect(response.status()).toBe(200);
  const text = await response.text();
  expect(text).toContain("Janet");
  console.log(await response.json());
});
