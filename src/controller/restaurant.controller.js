import {
  responseError,
  responseSuccess,
} from "../commom/helpers/reposonse.helper.js";
import restaurantService from "../services/restaurant.service.js";

const restaurantController = {
  restaurantList: async (req, res, next) => {
    try {
      const restaurants = await restaurantService.restaurantList(req);
      const resData = responseSuccess(
        restaurants,
        `Get List Car Successfully`,
        200
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },

  likeRestaurant: async (req, res, next) => {
    try {
      const resData = responseSuccess({}, `Successfully`, 200);
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
};

export default restaurantController;
