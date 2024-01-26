const BurritoController = require('../../controllers/BurritoController');

const BurritoService = require('../../services/BurritoService');
jest.mock('../../services/BurritoService')

describe('BurritoController', () => {
  let controller;
  let service

  beforeAll(() => {
    service = new BurritoService();
    controller = new BurritoController();
  })

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('GET /api/burritos', () => {
    test('should get all burritos', async () => {
      const mockBurritos = [
        { id: 1, name: 'Burrito1', size: 'size1', price: 11.11 },
        { id: 2, name: 'Burrito2', size: 'size1', price: 11.11 }];
      const getAllmock = jest.fn().mockResolvedValueOnce(mockBurritos);
      service.getAllBurritos = getAllmock;
      
      const req = { method: 'GET', url: '/api/burritos' };
      const res = { status: jest.fn(), json: jest.fn() };

      await controller.getAllBurritos(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockBurritos);
    });

    it('should handle errors during burrito retrieval', async () => {
      service.getAllBurritos.mockRejectedValueOnce(new Error('Database error'));

      const req = { method: 'GET', url: '/api/burritos' };
      const res = { status: jest.fn(), send: jest.fn() };

      await controller.getAllBurritos(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith('Not Found');
    });
  });

  describe('POST /api/burritos', () => {
    it('should create a new burrito', async () => {
      const newBurrito = { name: 'NewBurrito' };

      service.createBurrito.mockResolvedValueOnce(newBurrito);

      const req = { method: 'POST', url: '/api/burritos', body: newBurrito };
      const res = { status: jest.fn(), json: jest.fn() };

      await controller.createBurrito(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newBurrito);
    });

    it('should handle errors during burrito creation', async () => {
      const newBurrito = { name: 'NewBurrito' };

      service.createBurrito.mockRejectedValueOnce(new Error('Database error'));

      const req = { method: 'POST', url: '/api/burritos', body: newBurrito };
      const res = { status: jest.fn(), send: jest.fn() };

      await controller.createBurrito(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith('Not Found');
    });
  });
});
