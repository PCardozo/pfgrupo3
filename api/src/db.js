require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,DB_NAME,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false, 
  native: false, 
});
const basename = path.basename(__filename);

const modelDefiners = [];


fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });


modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { Product, Animal, Animal_type,Product_type,Product_product_type,Product_animal_type } = sequelize.models;

// Relations
// Product.hasMany(Reviews);
Product.belongsToMany(Animal_type,{through:'product_animal_types'});
Animal_type.belongsToMany(Product,{through:'product_animal_types'});
Product.belongsToMany(Product_type,{through:'product_product_types'});
Product_type.belongsToMany(Product,{through:'product_product_types'});


Product.hasMany(Photo)
Animal.hasMany(Photo)
Animal.belongsTo(User)
Product.hasMany(Review)


module.exports = {
  ...sequelize.models, 
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
