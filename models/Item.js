const db = require("../db/connection");
const Sequelize = require("sequelize");

const Item = db.define("Item", {
    name: Sequelize.STRING,
    image: Sequelize.STRING,
    price: Sequelize.NUMBER,
    vegetarian: Sequelize.BOOLEAN,
})

module.exports = Item;