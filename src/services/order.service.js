import models from "../commom/sequelize/init.sequeze.js";

const orderService = {
  // thêm đơn đặt hàng
  addOrder: async (user_id, food_id, amount) => {
    try {
      // Kiểm tra user có tồn tại không
      const user = await models.users.findOne({
        where: { user_id },
        raw: true,
      });

      if (!user) {
        return {
          success: false,
          message: `Người dùng với ID ${user_id} không tồn tại.`,
        };
      }

      // Kiểm tra món ăn có tồn tại không
      const food = await models.food.findOne({
        where: { food_id },
        raw: true,
      });

      if (!food) {
        return {
          success: false,
          message: `Món ăn với ID ${food_id} không tồn tại.`,
        };
      }

      // Thêm đơn đặt hàng
      const order = await models.orders.create({
        user_id,
        food_id,
        amount,
        code: `ORD-${Date.now()}`,
        arr_sub_id: null,
      });

      return {
        success: true,
        message: `Đơn hàng đã được tạo thành công.`,
        data: order,
      };
    } catch (error) {
      throw new Error(`Lỗi khi thêm đơn hàng: ${error.message}`);
    }
  },
};

export default orderService;
