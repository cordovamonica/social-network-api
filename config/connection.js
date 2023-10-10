const { connect, connection } = require('mongoose');

const connectionString = process.env.MONGODB_URI || 'mongodb+srv://cordovamonica:Skrll_cat1@cluster0.tqdjvj8.mongodb.net/socialnetworkDB';

connect(connectionString);

module.exports = connection;