module.exports = function (sequelize, DataTypes) {

    const Order = sequelize.define("Order", {
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
  
    return Order;
  };