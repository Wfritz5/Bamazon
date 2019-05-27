const mysql = require('mysql');
const inquirer = require('inquirer');
const connection = require('./constructors/keys.js');

//connection to mysql database.
connection.connect(function(err) {
    if (err) throw err;
    readProducts();
});

function buyItem() {
    connection.query("SELECT * FROM products WHERE stock_quantity > 0", function(err, results) {
        if(err) throw err;
        inquirer.prompt([
            {
                name : "choice",
                type : "list",
                choices: function() {
                    let choices = [];
                    for ( let i = 0; i < results.length; i++) {
                        choices.push(results[i].product_name);
                    }
                    return choices;
                },
                message : "Which item would you like to order?"
            },
            {
                name : "quantity",
                type : "input",
                message: "Please enter the quantity you would like to order.",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ]).then(function(answer) {

            let itemChosen;
            for (let i = 0; i < results.length; i++) {
                if (results[i].product_name === answer.choice) {
                    itemChosen = results[i];
                }
            }
            //find out quantity of item and check if item is available.
        })
    })
}