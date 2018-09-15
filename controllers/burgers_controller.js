const express = require("express");
const burger = require("../models/burger");
const router = express.Router();

router.get("/", (req, res) => {
    burger.selectAll((data) => {
        let burgers = {
            burgers: data
        }
        console.log(burgers);
        res.render("index", burgers);
    });
});

router.post("/api/addBurger", (req, res) => {
    console.log("burger name: " + req.body["burger_name"]);
    burger.insertOne(["burger_name", "devoured"], [req.body.burger_name, 0], (result) => {
        res.json({ id: result.insertId });
    });
});

router.put("/api/updateBurger/:id", (req, res) => {
    let condition = `id = ${req.params.id}`;
    burger.updateOne({ devoured: 1 }, condition, (result) => {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

module.exports = router;