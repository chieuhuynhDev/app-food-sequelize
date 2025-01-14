import express from "express";
import likeResController from "../controller/likeRes.controller.js";

const likeResRouter = express.Router();

likeResRouter.post("/:id/like", likeResController.likeRestaurant);
likeResRouter.post("/:id/unlike", likeResController.unlikeRestaurant);
likeResRouter.get("/:id/likes", likeResController.getLikesByRestaurant);
likeResRouter.get("/user/:user_id/likes", likeResController.getLikesByUser);

export default likeResRouter;
