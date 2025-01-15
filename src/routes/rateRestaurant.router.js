import express from "express";
import rateResController from "../controller/rateRestaurant.controller.js";

const rateResRouter = express.Router();

rateResRouter.post("/:id/rate", rateResController.addRating);
rateResRouter.get("/:id/ratings", rateResController.getRatingsByRestaurant);
rateResRouter.get("/user/:user_id/ratings", rateResController.getRatingsByUser);

export default rateResRouter;
