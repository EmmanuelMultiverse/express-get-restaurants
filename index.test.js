const app = require("./src/app");
const request = require("supertest");

const { seedRestaurant } = require("./seedData");

describe("/restaurants endpoint", () => {

    test("GET /restaraunts route", async () => {

        const res = await request(app).get("/restaurants");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(3);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body).toMatchObject(seedRestaurant);
    })

    test("GET /restaurants/:id route", async () => {
        const res = await request(app).get("/restaurants/1");
        
        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject({
            id: 1,
            name: "AppleBees",
            location: "Texas",
            cuisine: "FastFood",
        })
    })

    test("POST /restaurants route", async () => {
        const restaurant = {
            name: "INOINOINOINO",
            location: "Irving",
            cuisine: "Fast-Food",

        }

        const res = await request(app).post("/restaurants").send(restaurant);

        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject(restaurant);
    })

    test("POST /restaurants route with bad request - no name should return error", async () => {
        // Bad request because it is missing name field
        const badRequest = {
            location: "Irving",
            cuisine: "Fast-Food",

        }

        const res = await request(app).post("/restaurants").send(badRequest);
        
        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject({
            "error": [
                {
                    "type": "field",
                    "msg": "Invalid value",
                    "path": "name",
                    "location": "body"
                },
                {
                    "type": "field",
                    "value": "",
                    "msg": "Invalid value",
                    "path": "name",
                    "location": "body"
                }
            ]
        })
    })

    test("POST /restaurants route with bad request - invalid length should return error", async () => {
        // Bad request because it is missing name field
        const badRequest = {
            name: "longNameeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
            location: "Irving",
            cuisine: "Fast-Food",

        }

        const res = await request(app).post("/restaurants").send(badRequest);
        
        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject({
            "error": [
                {
                    "type": "field",
                    "value": "longNameeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
                    "msg": "Invalid value",
                    "path": "name",
                    "location": "body"
                }
            ]
        })
    })

    test("PUT /restaurants/:id route", async () => {
        const restaurant = {
            name: "INO",
            location: "Irving",
            cuisine: "Fast-Food",

        };

        const res = await request(app).put("/restaurants/1").send(restaurant);
        
        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject(restaurant);
    })

    // test("DELETE /restaurants/:id route", async () => {
    //     const res = await request(app).delete("/restaurants/1")

    //     expect(res.statusCode).toBe(200);
    //     expect(res.body).toMatchObject({
    //         id: 1,
    //         name: "INO",
    //         location: "Irving",
    //         cuisine: "Fast-Food"
    //     })
    // })
})