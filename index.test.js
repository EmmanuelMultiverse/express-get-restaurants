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
            name: "INO",
            location: "Irving",
            cuisine: "Fast-Food",

        }

        const res = await request(app).post("/restaurants").send(restaurant);

        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject(restaurant);
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