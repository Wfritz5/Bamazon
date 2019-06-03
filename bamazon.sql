DROP DATABASE IF EXISTS bamazon;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Dubbydb767!';

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE product (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
  price DECIMAL(6,2) NULL,
    stock_quantity INTEGER(10) NULL,
    product_sales DECIMAL(6,2) NULL,
  PRIMARY KEY (item_id)
);

CREATE TABLE departments (
department_id INT NOT NULL AUTO_INCREMENT,
department_name VARCHAR(100) NULL,
overhead_costs DECIMAL(6,2) NULL,
PRIMARY KEY (department_id)
);