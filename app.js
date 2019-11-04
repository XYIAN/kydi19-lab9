/* global $ */
const express = require('express'); 
const app = express(); 
const mysql = require('mysql'); 
// app.engine('html', require('ejs').renderFile);//render other files
app.set("view engine", "ejs"); 
app.use(express.static("public"));//access img css js or any external file

app.get("/", function(req,res)//root route
{
   //res.render(""); 
   
});




app.use(express.static("public")); 

app.get("/dbTest", function(req, res){

let conn = dbConnection();

conn.connect(function(err) {
   if (err) throw err;
   console.log("Connected!");

   let sql = "SELECT CURDATE()";

   conn.query(sql, function (err, rows, fields) { //creating query 
      if (err) throw err;
      res.send(rows);//no render to bypass view- direct display in browser
   });

});

});//dbTest END

//values in red must be updated
function dbConnection(){

   let conn = mysql.createConnection({
                 host: "cst336db.space",
                 user: "cst336_dbUser9",
          password: "1zglno",
           database:"cst336_db9"
       }); //createConnection


return conn;

}//DB CONNECTION END



//server listener - run server w/ port number STARTING SERVER======
//8081(have to include in url) , "0, 0 , 0 , 0" -used for php type
app.listen(process.env.PORT, process.env.IP , function()//using local host port 8080 127
{
    console.log("Express Server is Running...");
});
//end basic express code