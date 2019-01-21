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

-- Insert a set of records.
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("blenders", "kitchen", 50.00, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("marshmallows", "food", 2.00, 10000);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("flashlight", "tools", 10.00, 5000);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("shower gel", "bath", 3.50, 15000);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("dvd player", "electronics", 35.00, 500);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("toaster oven", "kitchen", 42.00, 300);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("granola bars", "food", 1.25, 4000);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("hammer", "tools", 15.00, 400);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("loofah", "bath", 9.00, 10000);
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("headphones", "electronics", 85.00, 100);