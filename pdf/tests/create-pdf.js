const http = require("http");
const fs = require("fs");

const options = {
  hostname: "localhost",
  port: 3000,
  path: "/",
  method: "POST"
};

const req = http.request(options, res => {
  const chunks = [];

  res.on("data", chunk => {
    chunks.push(chunk);
  });
  res.on("end", () => {
    fs.writeFileSync(
      __dirname + "/invoice.pdf",
      new Buffer.concat(chunks).toString("binary"),
      "binary"
    );
  });
});

req.on("error", e => {
  console.error(`problem with request: ${e.message}`);
});

req.write(fs.readFileSync(__dirname + "/fixtures/invoice/invoice.html"));
//req.write(fs.readFileSync(__dirname + "/fixtures/simple.html"));
req.end();
