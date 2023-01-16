const server = require("../challenge/server.js");

async function request(pathname, options = {}) {
  const app = server.listen(0);
  const { port } = app.address();
  const url = new URL(pathname, `http://localhost:${port}`);
  const response = await fetch(url, options);
  app.close();
  const body = await response.text();
  const headers = Object.fromEntries(response.headers);
  return { status: response.status, body, headers };
}

function assert_attr(body, name, expected, msg) {
  const get_attr = new RegExp(`${name}="([^"]*)"`, "i");
  const match = body.match(get_attr);
  if (!match && !expected.includes("")) {
    console.log({ name, expected, match });
    throw new Error(msg);
  }
  if (match) {
    // [0] is the full match, [1] is the bit between the quotes
    const attr = match[1];
    if (!expected.includes(attr)) {
      throw new Error(msg);
    }
  }
}

module.exports = { request, assert_attr };
