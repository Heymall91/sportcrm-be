import {DataTypes} from 'sequelize';
import sequelize from "../config/db";

const User = sequelize.define('User', {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
  firstName: { type: DataTypes.STRING(255), allowNull: false },
  lastName: { type: DataTypes.STRING(255), allowNull: false },
  phone: {type: DataTypes.STRING(255), allowNull: false},
  email: { type: DataTypes.STRING(255), allowNull: false},
  password: {type: DataTypes.STRING(255), allowNull: false},
  gender: {type: DataTypes.ENUM('male', 'female'), allowNull: false}
}, {
  tableName: 'users',
  timestamps: true,
  paranoid: true
});

export default User;