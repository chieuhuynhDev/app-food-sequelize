import express from "express";
import carRouter from "./car.router.js";
import authRouter from "./auth.router.js";
import restaurantRouter from "./restaurant.router.js";

const rootRouter = express.Router();

rootRouter.get(`/`, (request, response, next) => {
  response.json(`ok`);
});

rootRouter.use(`/car`, carRouter);
rootRouter.use(`/auth`, authRouter);
rootRouter.use(`/restaurant`, restaurantRouter);

export default rootRouter;
