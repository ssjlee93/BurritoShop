const express = require('express');
const bodyParser = require('body-parser');
const BurritoController = require('../../controllers/BurritoController');
const BurritoService = require('../../services/BurritoService');

jest.mock('../../services/BurritoService', () => ({
  getAllBurritos: jest.fn(),
  createBurrito: jest.fn(),
}));

describe('BurritoController', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(bodyParser.json());
    app.get('/api/burritos', BurritoController.getAllBurritos);
    app.post('/api/burritos', BurritoController.createBurrito);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('GET /api/burritos', () => {
    it('should get all burritos', async () => {
      const mockBurritos = [{ id: 1, name: 'Burrito1' }, { id: 2, name: 'Burrito2' }];

      BurritoService.getAllBurritos.mockResolvedValueOnce(mockBurritos);

      const req = { method: 'GET', url: '/api/burritos' };
      const res = { status: jest.fn(), json: jest.fn() };

      await BurritoController.getAllBurritos(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockBurritos);
    });

    it('should handle errors during burrito retrieval', async () => {
      BurritoService.getAllBurritos.mockRejectedValueOnce(new Error('Database error'));

      const req = { method: 'GET', url: '/api/burritos' };
      const res = { status: jest.fn(), send: jest.fn() };

      await BurritoController.getAllBurritos(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith('Not Found');
    });
  });

  describe('POST /api/burritos', () => {
    it('should create a new burrito', async () => {
      const newBurrito = { name: 'NewBurrito' };

      BurritoService.createBurrito.mockResolvedValueOnce(newBurrito);

      const req = { method: 'POST', url: '/api/burritos', body: newBurrito };
      const res = { status: jest.fn(), json: jest.fn() };

      await BurritoController.createBurrito(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newBurrito);
    });

    it('should handle errors during burrito creation', async () => {
      const newBurrito = { name: 'NewBurrito' };

      BurritoService.createBurrito.mockRejectedValueOnce(new Error('Database error'));

      const req = { method: 'POST', url: '/api/burritos', body: newBurrito };
      const res = { status: jest.fn(), send: jest.fn() };

      await BurritoController.createBurrito(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith('Not Found');
    });
  });
});
