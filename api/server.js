import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import eventRoute from "./routes/event.route.js";
import userRoute from "./routes/user.route.js"

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.use("/api/events", eventRoute);
app.use("/api/users",userRoute)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
