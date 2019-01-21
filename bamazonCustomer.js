var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

connection.connect(function(err){
    if (err) throw err;
    console.log("connected as id " + connection.threadId)
    queryProducts();
    buyProduct();
});



function queryProducts(){
    console.log("Welcome to BAMAZON");
    console.log("-----------------------------------");
    connection.query("SELECT * FROM products", function(err, res){
        for (var i = 0; i < res.length; i++){
            console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price)
        }
        console.log("-----------------------------------");
    })
}

function buyProduct(){
    inquirer.prompt(
        [{
            type: "input",
            name: "choose_id",
            message: "Which product would you like to buy? (Choose 1-10)",
            
        },
        {
            type: "input",
            name: "choose_qty",
            message: "How many would you like to buy?",
            

         }]
    )
    .then(function(user){
        connection.query("SELECT * FROM products WHERE id=?", user.choose_id, function(err, res){
            for (var i = 0; i < res.length; i++){
                if (user.choose_qty < res[i].stock_quantity){
                    console.log("-----------------------------------");
                    console.log("That item is in stock ");
                    console.log("Your total is: " + res[i].price * user.choose_qty)
                }
            }
        } )
    
        
    })
}

