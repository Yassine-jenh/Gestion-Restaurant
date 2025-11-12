const { Sequelize } = require('sequelize');

// Create a Sequelize instance
const sequelize = new Sequelize('zenobia', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

// Export the Sequelize instance
module.exports = sequelize;