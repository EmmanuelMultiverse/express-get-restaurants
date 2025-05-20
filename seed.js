const { Restaurant, Menu, Item } = require("./models/index");
const { seedRestaurant, seedItem, seedMenu } = require("./seedData");

const db = require("./db/connection");

const syncSeed = async () => {
  await db.sync({ force: true });
  await Restaurant.bulkCreate(seedRestaurant);
  // BONUS: Update with Item and Menu bulkCreate

  await Menu.bulkCreate(seedMenu);
  await Item.bulkCreate(seedItem);

  const restaraunts = await Restaurant.findAll();
  const menus = await Menu.findAll();
  const items = await Item.findAll();

  await restaraunts[0].addMenu(menus[0]);
  await restaraunts[0].addMenu(menus[1]);

  await menus[0].addItem(items[0]);
  await menus[0].addItem(items[1]);

};

syncSeed();
