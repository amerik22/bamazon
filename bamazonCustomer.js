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

        buyProduct(res);
    });
        console.log(" ");
        
    }



function buyProduct(res){
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
                }

                else {
                    console.log("-----------------------------------");
                    console.log("Sorry that item is not in stock");
                    console.log("-----------------------------------");
                    connection.end();
                }

                
                
            }
            confirmPurchase(updateStock, purchaseId);
            console.log(updateStock, purchaseId);
            //confirmPurchase(user.choose_qty, user.choose_id);
            //console.log(user.choose_qty, user.choose_id);
        });  
       
    });

}

    function confirmPurchase(updateStock, purchaseId){
        inquirer.prompt(
            [{
                type: "confirm",
                name: "confirmPurchase",
                message: "Do you want to make this purchase?"
            }]
        )
        .then(function(updateStock, purchaseId){
            console.log(updateStock, purchaseId)
            connection.query("UPDATE products SET ? WHERE ?",
            [
                {
                    stock_quantity: updateStock
                },
                {
                    id: purchaseId
                }
            ],
            function(error){
                if (error) throw err;
                console.log("Thank you for your purchase");
                connection.end();
            });               
        })
    }


/*function confirmPurchase(updateStock, purchaseId){
    
    inquirer.prompt(
        [{
            type: "confirm",
            name: "confirmPurchase",
            message: "Do you want to make this purchase?"
        }]
    )
    .then(function(updateStock, purchaseId){
        connection.query("UPDATE products SET ? WHERE ?", 
        [
           {
               stock_quantity: updateStock
           }, 
           {
               id: purchaseId
           }
        ],function(error){
            if (error) throw err;
            console.log("Thank you for your purchase");
        }
      }
    }
    
    


   

/*function confirmPurchase(qty, id){
   //console.log(qty, id);
    inquirer.prompt(
        [{
            type: "confirm",
            name: "confirmPurchase",
            message: "Do you want to make this purchase?"
        }]
    )
    .then(function(qty, id){

    }*/
