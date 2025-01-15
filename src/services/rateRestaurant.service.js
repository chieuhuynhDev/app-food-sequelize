import models from "../commom/sequelize/init.sequeze.js";

const rateResService = {
  // Thêm đánh giá
  addRating: async (restaurant_id, user_id, amount) => {
    try {
      // Kiểm tra nhà hàng có tồn tại không

      const res = await models.restaurant.findOne({
        where: { res_id: restaurant_id },
        raw: true,
      });

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

      const existingRating = await models.rate_res.findOne({
        where: { res_id: restaurant_id, user_id },
      });
      if (existingRating)
        return {
          success: false,
          message: "Người dùng đã đánh giá nhà hàng này.",
        };

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

  //Lấy đánh giá theo nhà hàng
  getRatingsByRestaurant: async (restaurant_id) => {
    try {
      const ratings = await models.rate_res.findAll({
        where: { res_id: restaurant_id },
        as: "user",
        include: [
          {
            model: models.users,
            as: "user",
            attributes: ["user_id", "full_name", "email"],
          },
        ],
        raw: true,
      });

      if (!ratings.length) {
        return {
          success: false,
          message: `Không có đánh giá nào cho nhà hàng với ID ${restaurant_id}.`,
        };
      }

      return {
        success: true,
        message: "Lấy danh sách đánh giá thành công.",
        data: ratings,
      };
    } catch (error) {
      throw new Error(`Lỗi khi lấy danh sách đánh giá: ${error.message}`);
    }
  },
  // lấy đánh giá rating theo user
  getRatingsByUser: async (user_id) => {
    try {
      const ratings = await models.rate_res.findAll({
        where: { user_id },
        include: [
          {
            model: models.restaurant,
            as: "re",
            attributes: ["res_id", "res_name"],
          },
        ],
        raw: true,
      });

      if (!ratings.length) {
        return {
          success: false,
          message: `Người dùng với ID ${user_id} chưa thực hiện đánh giá nào.`,
        };
      }

      return {
        success: true,
        message: "Lấy danh sách đánh giá thành công.",
        data: ratings,
      };
    } catch (error) {
      throw new Error(`Lỗi khi lấy danh sách đánh giá: ${error.message}`);
    }
  },
};

export default rateResService;
