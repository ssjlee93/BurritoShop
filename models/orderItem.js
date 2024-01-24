module.exports = function (sequelize, DataTypes) {

    const OrderItem = sequelize.define("OrderItem", {
        burritoB: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    OrderItem.associate = (models) => {
        // associations can be defined here
        OrderItem.belongsTo(models.Burrito);
    };
    return OrderItem;
};