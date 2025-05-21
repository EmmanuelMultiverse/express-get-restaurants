const express = require("express");
const { Restaurant, Menu, Item} = require("../models");
const { check, validationResult } = require("express-validator");

const router = express.Router();

router.use(express.json());

router.get("/", async (req, res, next) => {
    try {
        const restaurants = await Restaurant.findAll({
            include: [
                {
                    model: Menu,
                    include: [
                        {
                            model: Item,    
                        }
                    ]
                }
            ]
        });

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

router.post("/", [
    check("name").not().isEmpty().trim(),
    check("location").not().isEmpty().trim(),
    check("cuisine").not().isEmpty().trim(),
], async (req, res, next) => {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(200).json({error: errors.array()});
        }

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