module.exports = function (sequelize, DataTypes) {

  const Burrito = sequelize.define("Burrito", {
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