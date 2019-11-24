/* global $ */ 
  
const express = require("express");
const mysql   = require("mysql");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public")); //folder for images, css, js

//routes
app.get("/", async function(req, res){

  let categories = await getCategories();
  //console.log(categories);
  res.render("index", {"categories":categories});//   , "authors":authors

});//root

app.get("/quotes", async function(req, res)
{

  let rows = await getQuotes(req.query);
  res.render("quotes", {"records":rows});

});//quotes

app.get("/authorInfo", async function(req, res)
{

  let rows = await getAuthorInfo(req.query.authorID);
  res.send("rows:"+rows ); 


});//quotes

function getAuthorInfo(query)
{
    let conn = dbConnection();
    return new Promise(function(resolve, reject){
        conn.connect(function(err) {
           if (err) throw err;
           console.log("Connected!");
           let sql = `SELECT *
                      FROM q_author
                      WHERE authorId = ${query.authorId}`;
           console.log("sql is: " + sql); 
        
           conn.query(sql, function (err, rows, fields) {
              if (err) throw err;
              resolve(rows);
           });
        
        });//connect
    });//promise

}//end getAuthorInfo

function getQuotes(query){
    
    let keyword = query.keyword;
    
    let conn = dbConnection();
    
    return new Promise(function(resolve, reject){
        conn.connect(function(err) {
           if (err) throw err;
           console.log("Connected!");
        //   conn.end();
           let params = []; 
           let sql = `SELECT quote, firstName, lastName, category FROM q_quotes
                      NATURAL JOIN q_author
                      WHERE 
                      quote LIKE '%${keyword}%'`;
        
           if (query.category) { //user selected a category
              sql += " AND category = ?";
           }
           params.push(query.category)
           console.log("SQL:", sql)
           conn.query(sql, params, function (err, rows, fields) {
              if (err) throw err;
              //res.send(rows);
              resolve(rows);
           });
        
        });//connect
    });//promise
    
}//END getQuotes


function getCategories(){
    
    let conn = dbConnection();
    
    return new Promise(function(resolve, reject){
        conn.connect(function(err) {
           if (err) throw err;
           console.log("Connected!");
        
           let sql = `SELECT DISTINCT category 
                      FROM q_quotes
                      ORDER BY category`;
        
           conn.query(sql, function (err, rows, fields) {
              if (err) throw err;
              //res.send(rows);
              resolve(rows);
           });
        
        });//connect
    });//promise
    
}//getQuotes

app.get("/dbTest", function(req, res){

    let conn = dbConnection();
    
    conn.connect(function(err) {
       if (err) throw err;
       console.log("Connected!");
    
       let sql = "SELECT * FROM q_author WHERE sex = 'F'";
    
       conn.query(sql, function (err, rows, fields) {
          if (err) throw err;
          res.send(rows);
       });
    
    });

});//dbTest

//values in red must be updated
function dbConnection(){

   let conn = mysql.createConnection({
                 host: "cst336db.space",
                 user: "cst336_dbUser9",
             password: "1zglno",
             database: "cst336_db9"
       }); //createConnection

return conn;

}




//starting server
app.listen(process.env.PORT, process.env.IP, function(){
    var num =0;
    console.log("Hello Mr. Dilbeck, server is booting up");
    for(let i = 5 ; i > num; i--)
    {
        console.log("Opening in " + i);
    }
console.log("Express server is running...");
});

