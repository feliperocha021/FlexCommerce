import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import cookieParser from "cookie-parser";
import compression  from 'compression';
import { ENV } from "./config/env.validation";

const app = express();
app.use(cors({
  credentials: true,
}))
app.use(express.json());
app.use(compression());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(ENV.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.error(err));

app.get("/", (req, res) => {
  res.send("FlexCommerce API rodando");
});

app.listen(ENV.PORT, () => {
  console.log(`Servidor rodando na porta ${ENV.PORT}`);
});
