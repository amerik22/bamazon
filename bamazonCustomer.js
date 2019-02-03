var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    queryProducts();

  });

function queryProducts(){

    connection.query("SELECT * FROM products", function(err, res){
        if(err) throw err;
        console.log("Welcome to BAMAZON");
        console.log("-----------------------------------");
        for (var i = 0; i < res.length; i++){
            console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price)
        }
        console.log("-----------------------------------");

        buyProduct();
    });
        console.log(" ");
        
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
            //console.log(res);
            for (var i = 0; i < res.length; i++){
                if (user.choose_qty < res[i].stock_quantity){
                    console.log("-----------------------------------");
                    console.log("That item is in stock ");
                    console.log("Your total is: " + res[i].price * user.choose_qty + " dollars");
                    console.log("-----------------------------------");
                    var updateStock = (res[i].stock_quantity - user.choose_qty);
                    var purchaseId = user.choose_id;
                    //console.log(updateStock, purchaseId);
                    confirmPurchase(updateStock, purchaseId); 
                    
                }

                else {
                    console.log("-----------------------------------");
                    console.log("Sorry that item is not in stock");
                    console.log("-----------------------------------");
                    inquirer.prompt(
                        [{
                            type: "confirm",
                            name: "newPurchase",
                            message: "Do you want to buy something else?",
                            default: true
                        }]
                    ).then(function(userResponse){
                        if(userResponse.newPurchase){
                            queryProducts();
                        }
                        else{
                            console.log("Ok Goodbye.");
                            connection.end();
                        }
                    })
                }

                
                
            }
           
        });  
       
    });

}

    function confirmPurchase(updateStock, purchaseId){
        inquirer.prompt(
            [{
                type: "confirm",
                name: "confirmPurchase",
                message: "Do you want to make this purchase?",
                default: true
            }]
        )
        .then(function(userConfirm){
            if(userConfirm.confirmPurchase){
                connection.query("UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: updateStock
                    },
                    
                    {
                        id: purchaseId
                    }
                ],
                function(err){
                    if (err) throw err;
                    console.log("Thank you for your purchase!");
                    console.log("-----------------------------------");
                    inquirer.prompt(
                        [{
                            type: "confirm",
                            name: "newPurchase",
                            message: "Do you want to buy something else?",
                            default: true
                        }]
                    ).then(function(userResponse){
                        if(userResponse.newPurchase){
                            queryProducts();
                        }
                        else{
                            console.log("Ok Goodbye.");
                            connection.end();
                        }
                    })
                });   
            }
            else{
                console.log("No worries.");
                console.log("-----------------------------------");
                inquirer.prompt(
                    [{
                        type: "confirm",
                        name: "newPurchase",
                        message: "Do you want to buy something else?",
                        default: true
                    }]
                ).then(function(userResponse){
                    if(userResponse.newPurchase){
                        queryProducts();
                    }
                    else{
                        console.log("Ok Goodbye.");
                        connection.end();
                    }
                })
            }      
        })
    }

