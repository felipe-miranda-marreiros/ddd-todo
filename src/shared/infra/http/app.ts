import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";
import { connectToDb } from "../database";
import { v1Router } from "./api/v1";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));

app.use("/api/v1", v1Router);

const port = process.env.PORT || 5000;

app.listen(port, async () => {
  console.log(`[App]: Listening on port ${port}`);
  await connectToDb()
});
