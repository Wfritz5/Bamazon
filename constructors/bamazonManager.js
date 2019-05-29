const mysql = require('mysql');
const inquirer = require('inquirer');
const connection = require('./constructors/keys.js');

options();
//display options menu

let option = () => {
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
        console.log("+----+------------------------------------------+------------------+----------+-----+");
        console.log("|  # | NAME                                     | DEPARTMENT       | PRICE    | QTY |");
        console.log("+----+------------------------------------------+------------------+----------+-----+");
        //displaying all items
        for (let i = 0; i < res.length; i++) {
            let item_id = res[i].item_id.toString();
            let product_name = res[i].product_name;
            let department_name = res[i].department_name;
            let price = "$" + res[i].price;
            let stock_quantity = res[i].stock_quantity.toString();

            while (item_id.length < 2) {
                item_id = " " + item_id;
            }
            while (product_name.length < 50) {
                product_name = product_name + " ";
            }
            while (department_name.length < 20) {
                department_name = department_name + " ";
            }
            while (price.length < 10) {
                price = " " + price;
            }
            while (stock_quantity.length < 5) {
                stock_quantity = " " + stock_quantity;
            }
            console.log("| " + item_id + " | " + product_name + " | " + department_name + " | " + price + " | " + stock_quantity + " |");
        }
        console.log("+----+------------------------------------------+------------------+----------+-----+\n");
        listOptions();
    });

}