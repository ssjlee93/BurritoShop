const db = require("../models");

module.exports = (app) => {
    /*
    Finds all burritos in the database
    @param : req 
    @param : res
    @returns list of all available burritos
    */
    app.get('/api/burrito', async (req, res) => {
        try {
          const burritos = await db.burrito.findAll();
          res.json(burritos);
        } catch (error) {
          console.error('Error fetching burritos:', error);
          res.status(404).send('Not Found');
        }
    });

    app.post("/api/burrito", async (req, res) => {
        const dbResult = await db.burrito.create(req.body)
        res.json(dbResult);
    });


    app.get("/api/pr/:name", async function(req, res) {
      // 1. Add a join to include all of each Author's Posts
      const dbResult = await db.burrito.findOne({ 
        where: {
        routineName: req.params.name
      }
    })
      res.json(dbResult);
    });

    app.post("/api/pr", async function(req, res) {
      // 1. Add a join to include all of each Author's Posts
      const dbResult = await db.burrito.create(req.body)
      res.json(dbResult);
    });


    app.put("/api/pr/:id", async function(req, res) {
      // Update takes in an object describing the properties we want to update, and
      // we use where to describe which objects we want to update
      
      const {routineName, sets, exerciseOne, exerciseTwo, exerciseThree, repOne, repTwo, repThree} = req.body;
  
      const dbResult = await db.burrito.update({
        routineName,
        sets,
        exerciseOne,
        exerciseTwo,
        exerciseThree,
        repOne,
        repTwo,
        repThree
      },{
        where: {
          id: req.params.id
        }
      })
      res.json(dbResult);
    });

    app.delete("/api/pr/:id", async function (req, res) {
      const dbResult = await db.burrito.destroy({
          where: {
            id: req.params.id
          }
        })
        res.json(dbResult);
  });

};