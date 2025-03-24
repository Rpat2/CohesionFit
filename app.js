

// App.js

var express = require('express');   // We are using the express library for the web server


var app     = express();            // We need to instantiate an express object to interact with the server in our code

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))


var PORT = process.env.PORT || 9230;                // Set a port number at the top so it's easy to change in the future


// Database
var db = require('./database/db-connector')


//HandleBars 
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


/*
    ROUTES
*/


// app.js


app.get('/', function(req, res){
    res.render('index')

});

   
app.get('/classes', function(req, res){

    let query1 = "SELECT * FROM Classes;";
    db.pool.query(query1, function(error, rows, fields) {
        // console.log(rows);
        res.render('classes', {data:rows});

    })
});


app.get('/customers', function(req, res){
    
    let query1 = "SELECT Customers.customerID, Customers.firstName, Customers.lastName, Customers.email, Customers.phone, Memberships.tier FROM Customers INNER JOIN Memberships ON Customers.memID = Memberships.memID ORDER BY Customers.customerID";

    let query2 = "SELECT * FROM Memberships";


    db.pool.query(query1, function(error, rows, fields){
        // console.log("customer",rows)
        let customerInfo = rows;

        db.pool.query(query2, function(error, rows, fields) {

            let membershipInfo = rows;
            res.render('customers', {customerData:customerInfo, membershipData: membershipInfo})

        })
    })

    
});





app.post('/add-customer-ajax', function(req,res){

    let data = req.body;
    // console.log("The data is",data);
    query1 = `INSERT INTO Customers (firstName, lastName, email, phone, memID) VALUES ('${data.fname}','${data.lname}', '${data.email}', '${data.phone}', ${data.memID})` 

    db.pool.query(query1, function(error, rows, fields){
        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else {
            query2 = "SELECT Customers.customerID, Customers.firstName, Customers.lastName, Customers.email, Customers.phone, Memberships.tier FROM Customers INNER JOIN Memberships ON Customers.memID = Memberships.memID ORDER BY Customers.customerID";
            db.pool.query(query2, function(error, rows, fields){
                if (error) {
                    console.log(error)
                    res.sendStatus(400);
                }
                else {
                    console.log("The Rows I am sending back are:", rows)
                    res.send(rows);
                }
            })
        }


    })
});


app.delete('/delete-customer-ajax', function(req, res, next){
    let data = req.body;
    let customerID = parseInt(data.id);

    let deleteCustomerInter = `DELETE FROM CustomerClasses WHERE customerID = ?`;
    let deleteCustomer = `DELETE FROM Customers WHERE customerID = ?`

    db.pool.query(deleteCustomerInter, [customerID], function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            db.pool.query(deleteCustomer, [customerID], function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.sendStatus(204);
                }
            })
        }
    })

    
});



app.put('/put-customer-ajax', function(req,res,next){

    let data = req.body;
    console.log("data in app.js is ", data);
  
    let customerID = parseInt(data.fullname);
    let firstName = data.firstName;
    let lastName = data.lastName;
    let email = data.emailValue;
    let phone = data.phoneValue;
    let memID = parseInt(data.memIDVal);
    

    let queryUpdateCustomer =  `UPDATE Customers SET Customers.firstName = ?, Customers.lastName = ?, Customers.email = ?, Customers.phone = ?, Customers.memID = ? WHERE Customers.customerID = ?`
    let queryUpdatedCustomerTable = `SELECT Customers.customerID, Customers.firstName, Customers.lastName, Customers.email, Customers.phone, Memberships.tier FROM Customers INNER JOIN Memberships ON Customers.memID = Memberships.memID WHERE customerID = ?`


    db.pool.query(queryUpdateCustomer, [firstName, lastName, email, phone, memID, customerID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {

            db.pool.query(queryUpdatedCustomerTable, [customerID], function(error,rows, fields) {
                if (error){
                    console.log(error);
                    res.sendStatus(400);
                }


                else {
                    console.log("The data I am sending back to add_customer is", rows)
                    res.send(rows);
                }
            })
        }
    })
})




  










/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});

