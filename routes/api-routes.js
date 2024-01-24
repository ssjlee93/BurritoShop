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
          const burritos = await db.Burrito.findAll();
          res.json(burritos);
        } catch (error) {
          console.error('Error fetching burritos:', error);
          return res.status(404).send('Not Found');
        }
    });

    app.post("/api/burrito", async (req, res) => {
        try {
        const dbResult = await db.Burrito.create(req.body)
        res.json(dbResult);
        } catch (error) {
            console.error("Error creating burritos", error)
            res.status(500).send("Internal Server Error")
        }
    });


    app.get("/api/pr/:name", async function(req, res) {
      // 1. Add a join to include all of each Author's Posts
      const dbResult = await db.Burrito.findOne({ 
        where: {
        routineName: req.params.name
      }
    })
      res.json(dbResult);
    });

    app.post("/api/pr", async function(req, res) {
      // 1. Add a join to include all of each Author's Posts
      const dbResult = await db.Burrito.create(req.body)
      res.json(dbResult);
    });


    app.put("/api/pr/:id", async function(req, res) {
      // Update takes in an object describing the properties we want to update, and
      // we use where to describe which objects we want to update
      
      const {routineName, sets, exerciseOne, exerciseTwo, exerciseThree, repOne, repTwo, repThree} = req.body;
  
      const dbResult = await db.Burrito.update({
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
      const dbResult = await db.Burrito.destroy({
          where: {
            id: req.params.id
          }
        })
        res.json(dbResult);
  });

};