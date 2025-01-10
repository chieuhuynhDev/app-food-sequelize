import express from "express";
import restaurantController from "../controller/restaurant.controller.js";

const restaurantRouter = express.Router();

restaurantRouter.get("/list", restaurantController.restaurantList);
restaurantRouter.post("/:id/like", restaurantController.likeRestaurant);
// restaurantRouter.post('/:id/unlike', restaurantController.unLikeRestaurant); // Unlike API
// restaurantRouter.get('/:id/likes', restaurantController.likesByRestaurant); // Get likes by restaurant
// restaurantRouter.get('/user/:user_id/likes', restaurantController.likesByUser); // Get likes by user

export default restaurantRouter;
