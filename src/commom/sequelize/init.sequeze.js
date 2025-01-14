import { Sequelize } from "sequelize";
import initModels from "../../models/init-models.js";
import { DATABASE_URL } from "../consant/app.constant.js";
console.log("dfg");

export const sequelize = new Sequelize(DATABASE_URL, { logging: false });
const models = initModels(sequelize);

// Kiểm tra kết nối với cở sở dữ liệu (db)
sequelize
  .authenticate()
  .then(() => {
    console.log(`Kết nối với db thành công`);
  })
  .catch(() => {
    console.log(`Kết nối với db KHÔNG thành công`);
  });

export default models;
