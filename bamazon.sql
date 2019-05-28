DROP DATABASE IF EXISTS bamazon;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Dubbydb767!';

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE product (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
  price INTEGER(10) NULL,
    stock_quantity INTEGER(10) NULL,
    product_sales INTEGER(10) NULL,
  PRIMARY KEY (item_id)
);