import express from "express";
import restaurantController from "../controller/restaurant.controller.js";

const restaurantRouter = express.Router();

restaurantRouter.get("/list", restaurantController.restaurantList);

export default restaurantRouter;
