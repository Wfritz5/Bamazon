# Bamazon

Javascript, Node and MySQL

This application is similar to an e-commerce store where the user can add, order, and sell product from their inventory.
The inventory is stored within a MySQL database.
There are 3 sides to the project. 
You can access one of three roles at a time. 
The three roles are manager, supervisor, and the customer.

In the bamazonCustomer.js side of the application, the user is able to...
-see the inventory
-buy items
-see their total for the items purchased

In the bamazonManager.js side of the application, the user is able to...
-see the inventory
-adjust the inventory by purchasing more items
-add new or existing items to the inventory

In the bamazonSupervisor.js side of the application the user is able to...
-view the sales and/or profits of a specific department
-create a new department so that the manager may add more iventory to a NEW department.