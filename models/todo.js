import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

export const Todo = sequelize.define(
  'Todo',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    description: {
      type: DataTypes.STRING
    }
  },
  {
    timestamps: true
  }
);
