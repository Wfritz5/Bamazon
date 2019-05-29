const mysql = require('mysql');
const inquirer = require('inquirer');
const connection = require('./constructors/keys.js');

//connection to mysql database.
connection.connect(function (err) {
    if (err) throw err;
    searchProducts();
});

function buyItem() {
    connection.query("SELECT * FROM product WHERE stock_quantity > 0", function (err, results) {
        if (err) throw err;
        inquirer.prompt([{
                name: "choice",
                type: "list",
                choices: function () {
                    let choices = [];
                    for (let i = 0; i < results.length; i++) {
                        choices.push(results[i].product_name);
                    }
                    return choices;
                },
                message: "Which item would you like to order?"
            },
            {
                name: "quantity",
                type: "input",
                message: "Please enter the quantity you would like to order.",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ]).then(function (answer) {

            let itemChosen;
            for (let i = 0; i < results.length; i++) {
                if (results[i].product_name === answer.choice) {
                    itemChosen = results[i];
                }
            }
            //find out quantity of item and check if item is available..

            if (itemChosen.stock_quantity >= parseInt(answer.quantity)) {
                //reduce stock 
                let newQuantity = parseInt(itemChosen.stock_quantity) - parseInt(answer.quantity);
                let totalPrice = parseFloat(itemChosen.price) * answer.quantity;
                connection.query(
                    "UPDATE product SET ? WHERE ?",
                    [{
                            stock_quantity: newQuantity,
                            product_sales: (parseFloat(itemChosen.product_sales) + parseFloat(totalPrice)).toFixed(2)
                        },
                        {
                            item_id: itemChosen.item_id
                        }
                    ],
                    function (error) {
                        if (error) throw error;
                        console.log("Thank you for shopping with us! Your total today is $" + totalPrice + ".\n");
                        continueShopping();
                    }
                )
            } else {
                console.log("Low inventory. Sorry! We only have " + itemChosen.stock_quantity + "in stock.\n");
            }
        });
    });
}

function continueShopping() {
    inquirer
    .prompt([
        {
            name : "again",
            type : "confirm",
            message : "Would you like to continue shopping?\n"
        }
    ]).then(function(answer) {
        if(answer.again) {
            searchProducts();
        }
        else {
            console.log("OK, see you next time.\n");
            connection.end()
        }
    });
}

function searchProducts() {
    connection.query("SELECT * FROM product WHERE stock_quantity > 0", function(err, res) {
        if(err) throw err;
        console.log("+----+------------------------------------------+------------------+----------+");
		console.log("|  # | NAME                                     | DEPARTMENT       | PRICE    |");
        console.log("+----+------------------------------------------+------------------+----------+");
        
        for(let i = 0; i < res.length; i++) {
            let item_id = res[i].item_id.toString();
            let product_name = res[i].product_name;
            let department_name = res[i].department_name;
            let price = "$" + res[i].price;
            while(item_id.length < 2) {
                item_id = " " + item_id;
            }
            while(product_name.length < 50) {
                product_name = product_name + " ";
            }
            while(department_name_name.length < 20) {
                department_name = department_name + " ";
            }
            while(price.length < 10) {
                price = " " + price;
            }
            console.log("| " + item_id + " | " + product_name + " | " + department_name + " | " + price + " | ");
        }
        console.log("+----+------------------------------------------+------------------+----------+\n")
    });
    buyItem();
}