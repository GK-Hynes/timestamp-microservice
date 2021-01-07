const express = require("express");
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by fCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// If no timestamp is provided, return the current date
app.get("/api/timestamp", (req, res) => {
  const date = new Date();
  return res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

app.get("/api/timestamp/:date", (req, res) => {
  const dateStr = req.params.date;

  // If non-digit characters are passed, check if dateStr is a valid ISO-8601 date
  if (/\D/.test(dateStr)) {
    const ISODate = new Date(dateStr);
    if (ISODate.toString() === "Invalid Date") {
      return res.json({ error: "Invalid Date" });
    } else {
      res.json({ unix: ISODate.valueOf(), utc: ISODate.toUTCString() });
    }
  } else {
    // If only digits are passed, check if dateStr is a valid unix timestamp
    const dateInt = parseInt(dateStr);
    const UnixDate = new Date(dateInt);
    if (UnixDate.toString() === "Invalid Date") {
      return res.json({ error: "Invalid Date" });
    } else {
      res.json({ unix: dateInt, utc: UnixDate.toUTCString() });
    }
  }
});

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
