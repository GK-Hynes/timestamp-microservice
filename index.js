const express = require("express");

const app = express();

// If no timestamp is provided, return the current date
app.get("/api/timestamp", (req, res) => {
  res.json({ unix: Date.now(), utc: Date() });
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
