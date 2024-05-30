require("dotenv").config();
const movieRoutes = require("./routes/movie-routes");
const reviewRoutes = require("./routes/review-routes");
const userRoutes = require("./routes/user-routes");
const express = require("express");
const app = express();

app.use(express.json());
/* app.use("/api/movies", movieRoutes);
app.use("/api/reviews", reviewRoutes);
 */
app.use("/api", userRoutes);


module.exports = app;