const OrderService = require('../../services/OrderService');
const db = require('../../models');
// Mock the entire db module
jest.mock('../../models');

describe('OrderService', () => {
  let service;

  beforeAll(() => {
    service = new OrderService();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getAllOrders', () => {
    test('should get all Orders', async () => {
      // Arrange: Mock the findAll method to return some dummy data
      const findAllmock = jest.fn().mockResolvedValueOnce([{ id: 1, name: 'Order1' }, { id: 2, name: 'Order2' }]);
      db.Order.findAll = findAllmock;

      // Act: Call the getAllOrders method
      const result = await service.getAllOrders();

      // Assert: Check that the mock implementation is used
      expect(result).toEqual([{ id: 1, name: 'Order1' }, { id: 2, name: 'Order2' }]);
    });
  });

  describe('getOrder', () => {
    test('should get one Order', async () => {
      const mockData = { id: 1, name: 'Order1', totalCost: 15.15 }
      // Arrange: Mock the findAll method to return some dummy data
      const findOneMock = jest.fn().mockResolvedValueOnce(mockData);
      db.Order.findByPk = findOneMock;

      // Act: Call the getOrder method
      const result = await service.getOrder(1);

      // Assert: Check that the mock implementation is used
      expect(result).toEqual(mockData);
    });
  });

  describe('createOrder', () => {
    test('should create a new Order', async () => {
      const newData = {
        "totalCost": 0.00,
        "orderItems": [
          {
            "quantity": 2,
            "burrito": {
              "name": "Chicken Burrito",
              "size": "Regular",
              "price": 7.99
            }
          },
          {
            "quantity": 1,
            "burrito": {
              "name": "Beef Burrito",
              "size": "Small",
              "price": 6.99
            }
          }
        ]
      };

      // Arrange: Mock the create method on an instance of Order
      const createMock = jest.fn().mockResolvedValueOnce({ id: 3, ...newData });
      db.Order.create = createMock;

      const mockBurrito1 = { id: 1, ...newData.orderItems[0].burrito}
      const mockBurrito2 = { id: 2, ...newData.orderItems[1].burrito}
      const findOrCreateMock = jest.fn().mockResolvedValueOnce({ id: 2})
      db.Burrito.findOrCreate = findOrCreateMock;

      const createOrderItemMock = jest.fn().mockResolvedValueOnce({ id: 1, ...newData.orderItems[0]})
      db.OrderItem.create = createOrderItemMock

      // Act: Call the createOrder method
      const result = await service.createOrder(newData);

      // Assert: Check that the mock implementation is used
      expect(result).toEqual({ id: 3, ...newData });
      // Assert that the create method was called with the correct arguments
      expect(createMock).toHaveBeenCalledWith(newData);
    });
  });
});
