import { INTEGER, STRING, Model } from 'sequelize';
import db from '.';

class User extends Model {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

User.init(
  {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },

    username: { type: STRING(200), allowNull: false },

    role: { type: STRING(80), allowNull: false },

    email: { type: STRING(150), allowNull: false },

    password: { type: STRING(128), allowNull: false },
  },
  {
    sequelize: db,
    timestamps: false,
    underscored: true,
    modelName: 'users',
  },
);

export default User;
