import models from "../commom/sequelize/init.sequeze.js";

const rateResService = {
  // Thêm đánh giá
  addRating: async (restaurant_id, user_id, amount) => {
    try {
      // Kiểm tra nhà hàng có tồn tại không
      console.log("Checking restaurant existence...");
      const res = await models.restaurant.findOne({
        where: { res_id: restaurant_id },
        raw: true,
      });

      console.log("Restaurant:", res);
      console.log("Checking user existence...");
      if (!res) {
        return {
          success: false,
          message: `Nhà hàng với ID ${restaurant_id} không tồn tại.`,
        };
      }

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

      // Thêm đánh giá
      const rating = await models.rate_res.create({
        res_id: restaurant_id,
        user_id,
        amount,
      });

      return {
        success: true,
        message: `Đánh giá thành công cho nhà hàng với ID ${restaurant_id}.`,
        data: rating,
      };
    } catch (error) {
      throw new Error(`Lỗi khi thêm đánh giá: ${error.message}`);
    }
  },
};

export default rateResService;
