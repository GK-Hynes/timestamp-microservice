const express = require("express");

const app = express();

app.get("/api/timestamp", (req, res) => {
  const unix = Date.now();
  const utc = Date();

  res.json({ unix, utc });
});

app.get("/api/timestamp/:date", (req, res) => {
  const dateStr = req.params.date;

  // if dateStr has 5 or more sequential numbers, treat as unix timestamp
  if (/\d{5,}/.test(dateStr)) {
    const dateInt = parseInt(dateStr);
    res.json({ unix: dateInt, utc: new Date(dateInt).toUTCString() });
  } else {
    // check if dateStr is valid ISO-8601 date
    const newDateObj = new Date(dateStr);
    if (newDateObj.toString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({ unix: newDateObj.valueOf(), utc: newDateObj.toUTCString() });
    }
  }
});

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
