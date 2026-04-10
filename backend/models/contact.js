'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
this.belongsTo(models.User, { foreignKey: 'UserId' });    }
  }
  contact.init({
    name: DataTypes.STRING,
    num: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'contact',
  });
  return contact;
};