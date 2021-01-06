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
    const newDate = new Date(dateStr);
    if (newDate.toString() === "Invalid Date") {
      return res.json({ error: "Invalid Date" });
    } else {
      res.json({ unix: newDate.valueOf(), utc: newDate.toUTCString() });
    }
  } else {
    // If only digits are passed, treat dateStr as a unix timestamp
    const dateInt = parseInt(dateStr);
    res.json({ unix: dateInt, utc: new Date(dateInt).toUTCString() });
  }
});

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
