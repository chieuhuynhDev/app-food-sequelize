import express from "express";

import likeResRouter from "./likeRes.router.js";
import rateResRouter from "./rateRestaurant.router.js";

const rootRouter = express.Router();

rootRouter.get(`/`, (request, response, next) => {
  response.json(`ok`);
});

rootRouter.use(`/ratings`, rateResRouter);
rootRouter.use(`/likeres`, likeResRouter);

export default rootRouter;
