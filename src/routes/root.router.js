import express from "express";

import restaurantRouter from "./restaurant.router.js";
import likeResRouter from "./likeRes.router.js";

const rootRouter = express.Router();

rootRouter.get(`/`, (request, response, next) => {
  response.json(`ok`);
});

rootRouter.use(`/restaurant`, restaurantRouter);
rootRouter.use(`/likes`, likeResRouter);

export default rootRouter;
