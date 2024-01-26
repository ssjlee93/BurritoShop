const BurritoService = require('../services/BurritoService');

class BurritoController {
  burritoService;

  constructor(burritoService) {
    this.burritoService = burritoService;
  }

  async getAllBurritos(req, res) {
    try {
        const burritos = await BurritoService.getAllBurritos();
        res.json(burritos);
    } catch (error) {
        console.error('Error fetching burritos:', error);
        return res.status(404).send('Not Found');
    }
  }

  async createBurrito(req, res) {
    const newBurrito = req.body;
    const createdBurrito = await BurritoService.createBurrito(newBurrito);
    res.status(201).json(createdBurrito);
  }

}

module.exports = new BurritoController();
