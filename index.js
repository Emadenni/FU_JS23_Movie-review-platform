const app = require("./app");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const URL = process.env.URL || "127.0.0.1";
const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(PORT, URL, () => {
      console.log(`Server running at http://${URL}:${PORT}`);
    });
  })

  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

