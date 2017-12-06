var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
//Here is where you create all the functions that will do the routing for your app
//router.get, router.post, router.put

router.get("/", function (req, res) {
	console.log('we hit this route ---')
	burger.all(function (data) {
		// var hbsObject = {
		// 	burgers: data
		// };
		console.log('data we are sending to the page', data);
		
		res.render("index", {
			burgers: data
		});
		//console.log(hbsObject);
	});
});

router.get("/burgers", function (req, res) {
	
	burger.all(function (data) {

		res.render("index", {
			burgers: data
		});
	});
});

router.post("/burgers/create", function (req, res) {
    burger.create([
    "burger_name"
  ], [
    req.body.burger_name
  ], function (result) {
        // Send back the ID of the new burger
        res.redirect("/burgers")

    });
});

router.put("/burgers/update/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.update({
        devoured: req.body.devoured
    }, condition, function (data) {
    	res.redirect("/burgers");
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
