const test = require("node:test");
const assert = require("node:assert");
const { request } = require("./helpers.js");

test("POST with script tag is correctly sanitized", async () => {
  const { status, body } = await request("/", {
    method: "POST",
    body: "nickname=oli&message=<script>alert('uh oh')</script>",
    headers: { "content-type": "application/x-www-form-urlencoded" },
  });
  assert.equal(status, 200);
  assert.match(
    body,
    /&lt;script>alert\('uh oh'\)&lt;\/script>/i,
    `Expected <script> to have '<' replaced with '&lt;', but received:\n${body}`
  );
});
