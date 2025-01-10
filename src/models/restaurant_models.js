import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../commom/sequelize/init.sequeze.js";

// Define models
const FoodType = sequelize.define(
  "FoodType",
  {
    type_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "food_type",
    timestamps: false,
  }
);

const Food = sequelize.define(
  "Food",
  {
    food_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    food_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: FoodType,
        key: "type_id",
      },
    },
  },
  {
    tableName: "food",
    timestamps: false,
  }
);

const SubFood = sequelize.define(
  "SubFood",
  {
    sub_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sub_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sub_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    food_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Food,
        key: "food_id",
      },
    },
  },
  {
    tableName: "sub_food",
    timestamps: false,
  }
);

const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

const Restaurant = sequelize.define(
  "Restaurant",
  {
    res_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    res_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "restaurant",
    timestamps: false,
  }
);

const LikeRes = sequelize.define(
  "LikeRes",
  {
    like_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "user_id",
      },
    },
    res_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Restaurant,
        key: "res_id",
      },
    },
    date_like: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    tableName: "like_res",
    timestamps: false,
  }
);

const RateRes = sequelize.define(
  "RateRes",
  {
    rate_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "user_id",
      },
    },
    res_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Restaurant,
        key: "res_id",
      },
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date_rate: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    tableName: "rate_res",
    timestamps: false,
  }
);

const Order = sequelize.define(
  "Order",
  {
    order_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: "user_id",
      },
    },
    food_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Food,
        key: "food_id",
      },
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    arr_sub_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "orders",
    timestamps: false,
  }
);

// Define relationships
Food.belongsTo(FoodType, { foreignKey: "type_id" });
FoodType.hasMany(Food, { foreignKey: "type_id" });

SubFood.belongsTo(Food, { foreignKey: "food_id" });
Food.hasMany(SubFood, { foreignKey: "food_id" });

LikeRes.belongsTo(User, { foreignKey: "user_id" });
LikeRes.belongsTo(Restaurant, { foreignKey: "res_id" });
User.hasMany(LikeRes, { foreignKey: "user_id" });
Restaurant.hasMany(LikeRes, { foreignKey: "res_id" });

RateRes.belongsTo(User, { foreignKey: "user_id" });
RateRes.belongsTo(Restaurant, { foreignKey: "res_id" });
User.hasMany(RateRes, { foreignKey: "user_id" });
Restaurant.hasMany(RateRes, { foreignKey: "res_id" });

Order.belongsTo(User, { foreignKey: "user_id" });
Order.belongsTo(Food, { foreignKey: "food_id" });
User.hasMany(Order, { foreignKey: "user_id" });
Food.hasMany(Order, { foreignKey: "food_id" });

const RestaurantModels = {
  FoodType,
  Food,
  SubFood,
  User,
  Restaurant,
  LikeRes,
  RateRes,
  Order,
};

export default RestaurantModels;
