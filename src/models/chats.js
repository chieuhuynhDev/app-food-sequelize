import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class chats extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    chat_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    user_id_sender: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    user_id_recipient: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    tableName: 'chats',
    timestamps: true,
    timestamp: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "chat_id" },
        ]
      },
      {
        name: "user_id_sender",
        using: "BTREE",
        fields: [
          { name: "user_id_sender" },
        ]
      },
      {
        name: "user_id_recipient",
        using: "BTREE",
        fields: [
          { name: "user_id_recipient" },
        ]
      },
    ]
  });
  }
}
