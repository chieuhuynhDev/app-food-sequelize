import like_res from "../models/like_res.js";
import users from "../models/users.js";
import restaurant from "../models/restaurant.js";

const likeResService = {
  // like nhà hàng
  likeRestaurant: async (restaurant_id, user_id) => {
    // Kiểm tra xem nhà hàng có tồn tại không
    const restaurant = await like_res.findOne({
      where: { res_id: restaurant_id },
    });
    if (!restaurant) {
      throw new Error(`Không tìm thấy nhà hàng với ID: ${restaurant_id}`);
    }

    // Kiểm tra xem user có tồn tại không
    const user = await users.findOne({ where: { user_id } });
    if (!user) {
      throw new Error(`Không tìm thấy user với ID: ${user_id}`);
    }

    // Kiểm tra nếu user đã like nhà hàng
    const existingLike = await like_res.findOne({
      where: { res_id: restaurant_id, user_id },
    });
    if (existingLike) {
      return { alreadyLiked: true, message: "Bạn đã like nhà hàng này rồi." };
    }

    // Thực hiện like
    const newLike = await like_res.create({ res_id: restaurant_id, user_id });
    return { alreadyLiked: false, data: newLike, message: "Like thành công." };
  },

  // Unlike nhà hàng
  unlikeRestaurant: async (restaurant_id, user_id) => {
    // Kiểm tra xem nhà hàng có tồn tại không
    const restaurant = await like_res.findOne({
      where: { res_id: restaurant_id },
    });
    if (!restaurant) {
      throw new Error(`Không tìm thấy nhà hàng với ID: ${restaurant_id}`);
    }

    // Kiểm tra xem user có tồn tại không
    const user = await users.findOne({ where: { user_id } });
    if (!user) {
      throw new Error(`Không tìm thấy user với ID: ${user_id}`);
    }

    const existingLike = await like_res.findOne({
      where: { res_id: restaurant_id, user_id },
    });
    if (!existingLike) {
      return {
        success: false,
        message: `Bạn chưa like nhà hàng này. Không thể thực hiện unlike.`,
      };
    }
    // Xóa bản ghi like
    await existingLike.destroy();
    return {
      success: true,
      message: `Unlike thành công cho nhà hàng ID ${restaurant_id} từ người dùng ID ${user_id}.`,
    };
  },

  // Lấy danh sách like theo nhà hàng
  getLikesByRestaurant: async (restaurant_id) => {
    try {
      // Kiểm tra xem nhà hàng có tồn tại không
      const res = await restaurant.findOne({
        where: { res_id: restaurant_id },
        raw: true,
      });
      if (!res) {
        return {
          success: false,
          message: `Nhà hàng với ID ${restaurant_id} không tồn tại.`,
          data: [],
        };
      }

      // Lấy danh sách like
      const likes = await like_res.findAll({
        where: { res_id: restaurant_id },
        raw: true,
        include: [
          {
            model: users,
            as: "user",
            attributes: ["user_id", "full_name", "email"],
          },
        ],
      });

      if (likes.length === 0) {
        return {
          success: true,
          message: `Không có lượt like nào cho nhà hàng với ID ${restaurant_id}.`,
          data: [],
        };
      }

      return {
        success: true,
        message: `Lấy danh sách like thành công cho nhà hàng với ID ${restaurant_id}.`,
        data: likes,
      };
    } catch (error) {
      throw new Error(
        `Lỗi khi lấy danh sách like cho nhà hàng: ${error.message}`
      );
    }
  },

  // Lấy danh sách like theo user
  getLikesByUser: async (user_id) => {
    try {
      // Kiểm tra xem người dùng có tồn tại không
      const user = await users.findOne({ where: { user_id } });
      if (!user) {
        return {
          success: false,
          message: `Người dùng với ID ${user_id} không tồn tại.`,
          data: [],
        };
      }

      // Lấy danh sách like của user
      const likes = await like_res.findAll({
        where: { user_id },
        include: [
          {
            model: restaurant,
            as: "re",
            attributes: ["res_id", "res_name", "desc"],
          },
        ],
        raw: true,
      });

      if (likes.length === 0) {
        return {
          success: true,
          message: `Người dùng với ID ${user_id} chưa like nhà hàng nào.`,
          data: [],
        };
      }

      return {
        success: true,
        message: `Lấy danh sách like thành công cho người dùng với ID ${user_id}.`,
        data: likes,
      };
    } catch (error) {
      throw new Error(
        `Lỗi khi lấy danh sách like của người dùng: ${error.message}`
      );
    }
  },
};

export default likeResService;
