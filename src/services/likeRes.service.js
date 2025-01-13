import like_res from "../models/like_res.js";
import users from "../models/users.js";

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
};

export default likeResService;
