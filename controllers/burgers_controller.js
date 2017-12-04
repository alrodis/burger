var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
//Here is where you create all the functions that will do the routing for your app
//router.get, router.post, router.put

router.get("/", function (req, res) {
	burger.all(function (data) {
		var hbsObject = {
			burgers: data
		};
		res.render("index", hbsObject);
		//console.log(hbsObject);
	});
});

router.post("/api/burgers", function (req, res) {
    burger.create([
    "name", "devoured"
  ], [
    req.body.name, req.body.devoured
  ], function (result) {
        // Send back the ID of the new burger
        res.json({
            id: result.insertId
        });
    });
});

router.put("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    cat.update({
        devoured: req.body.devoured
    }, condition, function (result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});


// Export routes for server.js to use.
module.exports = router;