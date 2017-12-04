var orm = require("../config/orm.js");
//create the code that will call the ORM functions using burger specific input for the ORM
//Here is wher you setup a model for how to interface with the database
//useing orm to modify the burgers database we had created
//all - grab all burgers from datbase
//create - create new burger in database
//update - update burger within our database 

var burger = {
	all: function (cb) {
		//console.log('\n\n:::controller.js invoked burger.all with this callback function as a param:::\n', cb)

		orm.all("burgers", function (res) {
			//this function invokes the original call back with 'res' which will be passed back from the orm. 'res' will be the results of the db query
			cb(res);
			console.log(res);
		});
	},//this bracket closes just "all"

	create: function(cols, vals, cb) {
		orm.create("burgers", cols, vals, function (res) {
			cb(res);
			//console.log(res);
		});
	},//this bracket closes just "create"
	update: function (objColVals, condition, cb) {
		orm.update("burgers", objColVals, condition, function (res) {
			cb(res);
		});
	}

};//this bracket closes all of var burger























// Export the database functions for the controller (burgers_controller.js).
module.exports = burger;