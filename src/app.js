const express = require("express");
const app = express();
const Restaurant = require("../models/index");
const db = require("../db/connection");

app.use(express.json());
app.use(express.urlencoded());

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

app.post("/restaurants", async (req, res, next) => {
    try {
        const newRestaurant = await Restaurant.create(req.body);
        res.status(200).json(newRestaurant);
    } catch (err) {
        next(err);
    }
})

app.put("/restaurants/:id", async (req, res, next) => {
    try {
        const foundRestaurant = await Restaurant.findByPk(req.params.id);

        if (foundRestaurant) {
            await foundRestaurant.update(req.body);
            res.status(200).json(foundRestaurant);
        } else {
            res.status(400).send(`Restaurant with ${req.params.id} not found`);
        }
    } catch (err) {
        next(err);
    }
})

app.delete("/restaurants/:id", async (req, res, next) => {
    try {
        let foundRestaurant = await Restaurant.findByPk(req.params.id);

        if (foundRestaurant) {
            foundRestaurant = await foundRestaurant.destroy();
            console.log(foundRestaurant);
            res.status(200).json(foundRestaurant);
        } else {
            res.status(400).send(`Restaurant with ${req.params.id} not found`);
        }

    } catch (err) {
        next(err);
    }
})

module.exports = app;
