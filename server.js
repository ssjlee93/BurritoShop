// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
const express = require("express");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = 3000;

// Requiring our models for syncing
const db = require("./models");

// Requiring our models for syncing
// const db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
// app.use(express.static("public"));

// Routes
// =============================================================
// require("./routes/api-routes.js")(app);

const burritos = [
  { id: 1, name: 'Chicken Burrito', size: 'Regular', price: 7.99 },
  { id: 2, name: 'Vegetarian Burrito', size: 'Large', price: 8.99 },
  // Add more burritos as needed
];

// Sync models with the database
db.sequelize.sync({ force: true })
  .then(() => {
    // Populate Burrito table with dummy data
    console.log(db.Burrito)
    console.log(db.burrito)
    return db.Burrito.bulkCreate(burritos);
  })
  .then(() => {
    console.log('Database synchronized and populated with dummy data.');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

app.get('/api/burrito', async (req, res) => {
  try {
    const burritos = await db.Burrito.findAll();
    res.json(burritos);
  } catch (error) {
    console.error('Error fetching burritos:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});