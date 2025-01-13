import { raw } from "mysql2";
import { BadRequestException } from "../commom/helpers/error.helper.js";
import models from "../commom/sequelize/init.sequeze.js";

const restaurantService = {
  restaurantList: async (req) => {
    // Lỗi kiểm soát được
    // 400, 403, 401
    // const passNguoiDungGuiLen = 123
    // const passLayTrongDb = 1235

    // Lỗi không kiểm soát được
    // mã code: 500
    // abc

    const res = await models.restaurant.findAll({ raw: true });

    return res;
  },
  likeRestaurant: async (restaurant_id, user_id) => {
    // kiem user nay da like nha hang chua
    // neu chua -> them hang vao bang like_res
    // neu da co -> khong lam gi
  },
};

export default restaurantService;
