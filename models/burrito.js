const { Sequelize, DataTypes, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Burrito = sequelize.define("Burrito", {
    burritoId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT(11, 2),
      allowNull: false
    }
  });
  Burrito.associate = (models) => {
    // associations can be defined here
    Burrito.hasOne(models.OrderItem);
  };
  return Burrito;
};