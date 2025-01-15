import rateResService from "../services/rateRestaurant.service.js";

const rateResController = {
  // Thêm đánh giá
  async addRating(req, res, next) {
    const { id } = req.params;
    const restaurant_id = parseInt(id, 10);
    const { user_id, amount } = req.body;

    if (isNaN(restaurant_id)) {
      return res.status(400).json({
        success: false,
        message: "ID nhà hàng không hợp lệ.",
      });
    }

    try {
      const result = await rateResService.addRating(
        restaurant_id,
        user_id,
        amount
      );

      if (!result.success) {
        return res.status(400).json(result);
      }

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  // lấy đánh giá theo nhà hàng
  async getRatingsByRestaurant(req, res, next) {
    const { id } = req.params;
    const restaurant_id = parseInt(id, 10);

    if (isNaN(restaurant_id)) {
      return res
        .status(400)
        .json({ success: false, message: "ID nhà hàng không hợp lệ." });
    }

    try {
      const result = await rateResService.getRatingsByRestaurant(restaurant_id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  // lấy đánh giá theo user
  async getRatingsByUser(req, res, next) {
    const { user_id } = req.params;
    const userId = parseInt(user_id, 10);

    if (isNaN(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "ID người dùng không hợp lệ." });
    }

    try {
      const result = await rateResService.getRatingsByUser(userId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
};

export default rateResController;
