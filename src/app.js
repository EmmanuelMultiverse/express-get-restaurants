const express = require("express");
const app = express();
const Restaurant = require("../models/index");
const db = require("../db/connection");

//TODO: Create your GET Request Route Below:

app.get("/restaurants", async (request, resposne) => {
    const restaurants = await Restaurant.findAll();
    resposne.json(restaurants);
})

app.get("/restaurants/:id", async (req, res, next) => {
    try {
        const restaurant = await Restaurant.findByPk(req.params.id);
        res.status(200).json(restaurant);
    } catch (err) {
        next(err);
    }
})

module.exports = app;
