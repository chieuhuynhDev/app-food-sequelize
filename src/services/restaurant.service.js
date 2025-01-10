import { BadRequestException } from "../commom/helpers/error.helper.js";
import { sequelize } from "../commom/sequelize/init.sequeze.js";
import RestaurantModels from "../models/restaurant_models.js";

const restaurantService = {
  restaurantList: async (req) => {
    // Lỗi kiểm soát được
    // 400, 403, 401
    // const passNguoiDungGuiLen = 123
    // const passLayTrongDb = 1235

    // if(passNguoiDungGuiLen !== passLayTrongDb) {
    //    throw new BadRequestException(`Mật khẩu không chính xác`)
    // }

    // Lỗi không kiểm soát được
    // mã code: 500
    // abc

    // const res = await sequelize.query(`SELECT * FROM restaurant`);
    const res = await RestaurantModels.Restaurant.findAll({ raw: true });

    return res;
  },
  likeRestaurant: async (restaurant_id, user_id) => {
    // kiem user nay da like nha hang chua
    // neu chua -> them hang vao bang like_res
    // neu da co -> khong lam gi
  },
};

export default restaurantService;
