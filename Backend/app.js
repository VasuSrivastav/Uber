const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const connectDB = require("./db/db");
const userRouter = require("./routes/user.route");
const captainRouter = require("./routes/captain.route");
const mapsRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.routes');

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", userRouter);
app.use("/captains", captainRouter);
app.use('/maps', mapsRoutes);
app.use('/rides', rideRoutes);

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
//     });
module.exports = app;
