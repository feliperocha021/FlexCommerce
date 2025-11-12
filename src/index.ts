import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import cookieParser from "cookie-parser";
import compression  from 'compression';
import passport from "./config/strategies"
import { ENV } from "./config/env.validation";
import { errorHandler } from "./middlewares/error.middleware";

import authRoutes from "./routes/auth.routes";

const app = express();
app.use(cors({
  credentials: true,
}))
app.use(express.json());
app.use(compression());
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));

// rotas
app.use("/api/v1/auth", authRoutes);

// erros
app.use(errorHandler);

mongoose.connect(ENV.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.error(err));

app.get("/", (req, res) => {
  res.send("FlexCommerce API rodando");
});

app.listen(ENV.PORT, () => {
  console.log(`Servidor rodando na porta ${ENV.PORT}`);
});
