import express from "express";

import likeResRouter from "./likeRes.router.js";
import rateResRouter from "./rateRestaurant.router.js";
import orderRouter from "./order.router.js";

const rootRouter = express.Router();

rootRouter.get(`/`, (request, response, next) => {
  response.json(`ok`);
});

rootRouter.use(`/ratings`, rateResRouter);
rootRouter.use(`/likeres`, likeResRouter);
rootRouter.use(`/orders`, orderRouter);

export default rootRouter;
