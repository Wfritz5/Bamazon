var mysql = require('mysql');
var inquirer = require('inquirer');
var connection = require('./constructors/keys.js');

options();

function options() {
	// Display options
	inquirer.prompt([{
			name: "choice",
			type: "list",
			choices: ["View Department Sales", "Create New Department", "Quit"],
			message: "What would you like to do?"
		}])
		.then(function (answer) {
			if (answer.choice === "View Department Sales") {
				viewProductSales();
			} else if (answer.choice === "Create New Department") {
				createDepartment();
			} else {
				console.log("OK, See you later! \n");
				connection.end();
			}
		});
}

function viewProductSales() {
	let q = "SELECT departments.department_id, departments.department_name, departments.overhead_costs, SUM(product.product_sales) AS total_sales " +
		"FROM departments LEFT JOIN product ON departments.department_name = product.department_name " +
		"GROUP BY departments.department_name ORDER BY total_sales DESC";
	connection.query(q, function (err, res) {
		if (err) throw err;
		console.table(res);
		options();
	});
}
// Add New Product
function createDepartment() {
	inquirer.prompt([{
				name: "department_name",
				type: "input",
				message: "What is the name of the new department?"
			},
			{
				name: "overhead_costs",
				type: "input",
				message: "What is the overhead of this department? (Please only input a number.)",
				validate: function (value) {
					if (isNaN(value) === false) {
						return true;
					}
					return false;
				}
			}
		])
		.then(function (answer) {
			connection.query(
				"INSERT INTO departments (department_name, overhead_costs) VALUES ('" + answer.department_name + "', '" + answer.overhead_costs + "')",
				function (error) {
					if (error) {
						console.log(error);
						throw error;
					}
					console.log(`You have added a ${answer.department_name} department with an overhead cost of $${answer.overhead_costs}.\n`);
					options();
				}
			);
		});
}