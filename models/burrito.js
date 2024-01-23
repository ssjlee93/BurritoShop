module.exports = function (sequelize, DataTypes) {

  const Burrito = sequelize.define("Burrito", {
    name: {
      type: DataTypes.STRING,
      allowNull: true
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

  return Burrito;
};