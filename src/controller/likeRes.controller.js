import { responseSuccess } from "../commom/helpers/reposonse.helper.js";
import likeResService from "../services/likeRes.service.js";

const likeResController = {
  async likeRestaurant(req, res, next) {
    const { id } = req.params;
    const restaurant_id = parseInt(id, 10);
    const { user_id } = req.body;
    try {
      const result = await likeResService.likeRestaurant(
        restaurant_id,
        user_id
      );

      if (result.alreadyLiked) {
        // Nếu đã like, trả về thông báo tương ứng
        return res.status(200).json({
          success: false,
          message: result.message,
        });
      }

      // Nếu chưa like, trả về dữ liệu mới
      const resData = {
        success: true,
        message: result.message,
        data: result.data,
      };
      res.status(200).json(resData);
    } catch (error) {
      next(error);
    }
  },
  async unlikeRestaurant(req, res, next) {
    const { id } = req.params;
    const restaurant_id = parseInt(id, 10);
    const { user_id } = req.body;
    try {
      const result = await likeResService.unlikeRestaurant(
        restaurant_id,
        user_id
      );
      if (!result.success) {
        return res.status(400).json(result);
      }
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
  // Lấy danh sách like theo nhà hàng
  async getLikesByRestaurant(req, res, next) {
    const { id } = req.params;
    const restaurant_id = parseInt(id, 10);

    if (isNaN(restaurant_id)) {
      return res.status(400).json({
        success: false,
        message: "ID nhà hàng không hợp lệ.",
      });
    }

    try {
      const result = await likeResService.getLikesByRestaurant(restaurant_id);

      if (!result.success) {
        return res.status(404).json(result);
      }

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  // Lấy danh sách like theo user
  async getLikesByUser(req, res, next) {
    const { user_id } = req.params;
    const userId = parseInt(user_id, 10);

    if (isNaN(userId)) {
      return res.status(400).json({
        success: false,
        message: "ID người dùng không hợp lệ.",
      });
    }

    try {
      const result = await likeResService.getLikesByUser(userId);

      if (!result.success) {
        return res.status(404).json(result);
      }

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
};

export default likeResController;
