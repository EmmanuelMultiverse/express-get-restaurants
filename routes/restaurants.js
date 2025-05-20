const express = require("express");
const Restaurant = require("../models");

const router = express.Router();

router.use(express.json());

router.get("/", async (req, res, next) => {
    try {

        const restaurants = await Restaurant.findAll();

        if (restaurants) {
            res.status(200).json(restaurants);
        } else {
            res.status(400).send("Cannot find restaurants");
        }

    } catch (err) {
        next(err);
    }
})

router.get("/:id", async (req, res, next) => {
    try {

        const restaurant = await Restaurant.findByPk(req.params.id);

        if (restaurant) {
            res.status(200).json(restaurant);
        } else {
            res.status(400).send(`Cannot find ${req.params.id}`);
        }

    } catch (err) {
        next(err);
    }
})

router.post("/", async (req, res, next) => {
    try {

        const restaurant = await Restaurant.create(req.body);

        if (restaurant) {
            res.status(200).json(restaurant);
        } else {
            res.status(400).send(`Cannot find ${req.params.id}`);
        }

    } catch (err) {
        next(err);
    }
})

router.put("/:id", async (req, res, next) => {
    try {

        const restaurant = await Restaurant.findByPk(req.params.id);

        if (restaurant) {
            const updatedRestaurant = await restaurant.update(req.body);
            res.status(200).json(updatedRestaurant);
        } else {
            res.status(400).send(`Cannot find ${req.params.id}`);
        }

    } catch (err) {
        next(err);
    }
})

router.delete("/:id", async (req, res, next) => {
    try {

        const restaurant = await Restaurant.findByPk(req.params.id);

        if (restaurant) {
            const deletedRestaurant = await restaurant.destroy();
            res.status(200).json(deletedRestaurant);
        } else {
            res.status(400).send(`Cannot find ${req.params.id}`);
        }

    } catch (err) {
        next(err);
    }
})




module.exports = router;