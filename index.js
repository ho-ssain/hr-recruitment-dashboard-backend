import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import generalRoutes from "./routes/general.js";
import requirementRoutes from "./routes/requirement.js";

/*--- CONFIGURATIONS ---*/
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/*--- CONNECTING TO  DATABASE ---*/
mongoose
  .connect(process.env.DB_CONNECTION_STRING, {
    autoIndex: true,
    dbName: "hr-dashboard",
  })
  .then((c) => console.log(`Connected to ${c.connection.name} Database`))
  .catch((err) => console.log(err));

/*--- ROUTES ---*/
app.use("/general", generalRoutes);
app.use("/requirement", requirementRoutes);

/*--- START THE SERVER ---*/
app.listen(process.env.PORT || 4000, () => {
  console.log(`Listening the Server on Port: ${process.env.PORT}`);
});
