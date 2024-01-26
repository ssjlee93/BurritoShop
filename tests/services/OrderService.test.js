// ./tests/services/OrderService.test.js

const db = require('../../models');
const OrderService = require('../../services/OrderService');

jest.mock('../../models');

describe('OrderService', () => {
    beforeEach(() => {
        db.Order.create.mockClear();
        db.Order.findByPk.mockClear();
        db.Order.findAll.mockClear();
    });

    describe('getAllOrders', () => {
        test('should get all Orders', async () => {
            // Arrange: Mock the findAll method to return some dummy data
            const expectedOrders = [{ id: 1, name: 'Order1' }, { id: 2, name: 'Order2' }];
            db.Order.findAll.mockResolvedValueOnce(expectedOrders);

            // Act: Call the getAllOrders method
            const orderService = new OrderService();
            const result = await orderService.getAllOrders();

            // Assert: Check that the mock implementation is used
            expect(result).toEqual(expectedOrders);
        });
    });

    test('getOrder returns the order with associated order items and burritos', async () => {
        const orderId = 1;
        const expectedOrder = { id: orderId, orderItems: [{ id: 1, burrito: { id: 1 } }] };
        db.Order.findByPk.mockResolvedValue(expectedOrder);
        const orderService = new OrderService();
        const result = await orderService.getOrder(orderId);
        expect(result).toEqual(expectedOrder);
    });

    test('createOrder creates a new order and associated order items', async () => {
        const orderData = { id: 1 };
        const burritoData = { id: 1, price: 5 };
        const orderItemData = { quantity: 2, burrito: burritoData };
        const createdOrder = { ...orderData, totalCost: orderItemData.quantity * orderItemData.burrito.price };
        db.Order.create.mockResolvedValue(createdOrder);
        db.Burrito.findOrCreate.mockResolvedValue(burritoData);
        db.OrderItem.create.mockResolvedValue(orderItemData);
        const orderService = new OrderService();
        const result = await orderService.createOrder({ ...orderData, orderItems: [orderItemData] });
        expect(result).toEqual(createdOrder);
    });
});