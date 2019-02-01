-- Create the database  and specified it for use.
CREATE DATABASE bamazon_db;
USE bamazon_db;

-- Create the table.
CREATE TABLE products
(
id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(255) NOT NULL,
department_name VARCHAR (100) NOT NULL,
price DEC (10, 2) default 0,
stock_quantity INT default 0,
PRIMARY KEY (id)
);

