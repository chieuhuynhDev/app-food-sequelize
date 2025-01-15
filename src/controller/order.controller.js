import orderService from "../services/order.service.js";

const orderController = {
  // thêm đơn hàng
  async addOrder(req, res, next) {
    const { user_id, food_id, amount } = req.body;

    // Kiểm tra đầu vào
    if (!user_id || !food_id || !amount) {
      return res.status(400).json({
        success: false,
        message:
          "Dữ liệu không đầy đủ. Vui lòng cung cấp user_id, food_id và amount.",
      });
    }

    try {
      const result = await orderService.addOrder(user_id, food_id, amount);

      if (!result.success) {
        return res.status(400).json(result);
      }

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },
};

export default orderController;
