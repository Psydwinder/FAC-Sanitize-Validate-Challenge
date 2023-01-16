const test = require("node:test");
const assert = require("node:assert");
const { request } = require("./helpers.js");

test("POST without nickname re-renders page with error", async () => {
  const { status, body } = await request("/", {
    method: "POST",
    body: "nickname=&message=hello",
    headers: { "content-type": "application/x-www-form-urlencoded" },
  });
  assert.equal(status, 400);
  assert.match(body, /<form/i, "Page should include the form");
  assert.match(
    body,
    /please enter your nickname/i,
    `Expected HTML to include "please enter your nickname", but received:\n${body}`
  );
});

test("POST without message re-renders page with error", async () => {
  const { status, body } = await request("/", {
    method: "POST",
    body: "nickname=oli&message=",
    headers: { "content-type": "application/x-www-form-urlencoded" },
  });
  assert.equal(status, 400);
  assert.match(body, /<form/i, "Page should include the form");
  assert.match(
    body,
    /please enter a message/i,
    `Expected HTML to include "please enter a message", but received:\n${body}`
  );
});

test("POST without either re-renders page with both errors", async () => {
  const { status, body } = await request("/", {
    method: "POST",
    body: "nickname=&message=",
    headers: { "content-type": "application/x-www-form-urlencoded" },
  });
  assert.equal(status, 400);
  assert.match(body, /<form/i, "Page should include the form");
  assert.match(
    body,
    /please enter your nickname/i,
    `Expected HTML to include "please enter your nickname", but received:\n${body}`
  );
  assert.match(
    body,
    /please enter a message/i,
    `Expected HTML to include "please enter a message", but received:\n${body}`
  );
});

test("STRETCH GOAL: POST without message preserves nickname", async () => {
  const { status, body } = await request("/", {
    method: "POST",
    body: "nickname=oli&message=",
    headers: { "content-type": "application/x-www-form-urlencoded" },
  });
  assert.equal(status, 400);
  assert.match(
    body,
    /value="oli"/i,
    `Nickname input should have value attribute set to "oli", but received:\n${body}`
  );
});
