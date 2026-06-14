import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";
import goalRoutes from "./routes/goalRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
console.log("APP.JS LOADED");
const app =
  express();

app.use(

  cors({

    origin: true,

    credentials: true,

  })

);
app.use(
  express.json()
);

app.use(
  "/api/auth",
  authRoutes
);
app.use(
  "/api/transactions",
  transactionRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.use(
  "/api/budgets",
  budgetRoutes
);

app.get("/", (
  req,
  res
) => {
  res.send(
    "API Running"
  );
});

app.use(
  "/api/goals",
  goalRoutes
);

app.use(errorMiddleware);

export default app;