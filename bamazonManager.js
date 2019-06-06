const mysql = require('mysql');
const inquirer = require('inquirer');
const connection = require('./constructors/keys.js');

options();
//display options menu
function options() {
    inquirer.prompt([{
        name: "choice",
        type: "list",
        choices: ["Products for Sale", "Low Inventory", "Add Inventory", "New Product", "Exit Application"],
        message: "Which would you like to do?"
    }]).then(function (answer) {
        if (answer.choice === "Products for Sale") {
            products();
        } else if (answer.choice === "Low Inventory") {
            products(true);
        } else if (answer.choice === "Add Inventory") {
            addToInventory();
        } else if (answer.choice === "New Product") {
            addNewProduct();
        } else {
            console.log("OK, See you next time.");
            connection.end();
        }
    });
}
//for sale and low inventory
function products(low) {
    let q = "SELECT * FROM product";
    if (low) {
        q = "SELECT * FROM product WHERE stock_quantity < 5";
    }
    connection.query(q, function (err, res) {
        if (err) throw err;

        //displaying all items
        console.table(res);

        options();
    });
}
//add inventory
let addToInventory = () => {
    connection.query("SELECT item_id, product_name, stock_quantity FROM product", function (err, results) {
        if (err) throw err;
        inquirer.prompt([{
                name: "choice",
                type: "list",
                choices: function () {
                    let choiceArray = [];
                    for (let i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].product_name);
                    }
                    return choiceArray;
                },
                message: "Which item would you like to add more inventory to?"
            },
            {
                name: "quantity",
                type: "input",
                message: "How many shall we order?"
            }
        ]).then(function (answer) {
            let itemChosen;
            for (let i = 0; i < results.length; i++) {
                if (results[i].product_name === answer.choice) {
                    itemChosen = results[i];
                }
            }
            let updateStockCount = parseInt(itemChosen.stock_quantity) + parseInt(answer.quantity);
            connection.query(
                "UPDATE product SET ? WHERE ?",
                [{
                        stock_quantity: updateStockCount
                    },
                    {
                        item_id: itemChosen.item_id
                    }
                ],
                function (error) {
                    if (error) throw error;
                    console.log(`You have successfully added ${answer.quantity} units to your inventory. You now have a total of ${updateStockCount}.`);
                    options();
                }
            );
        });
    });
}
//adding a new product
let addNewProduct = () => {
    connection.query("SELECT department_name FROM departments", function (err, results) {
        if (err) throw err;
        inquirer.prompt([{
                name: "product_name",
                type: "input",
                message: "What is the new product you will be adding?"
            },
            {
                name: "department_name",
                type: "list",
                choices: function () {
                    let choiceArray = [];
                    for (let i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].department_name);
                    }
                    return choiceArray;
                },
                message: "Which department does this belong to?"
            },
            {
                name: "price",
                type: "input",
                message: "How much does this item cost? (Please enter number)",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "stock_quantity",
                type: "input",
                message: "How many of this item would you like to order?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ]).then(function (answer) {
            connection.query(
                "INSERT INTO product (product_name, department_name, price, stock_quantity) VALUES ('" + answer.product_name + "', '" + answer.department_name + "', '" + answer.price + "', '" + answer.stock_quantity + "')",
                function (error) {
                    if (error) {
                        console.log(error);
                        throw error;
                    }
                    console.log(`You have successfully added ${answer.stock_quantity} units of ${answer.product_name}.`);
                    options();
                }
            );
        });
    });
}