const express=require("express");
const sql=require("mssql");
const dboperations = require("./dboperations");
const app=express(); 


var Db = require('./dboperations');
var Produtos = require('./produtos');

dboperations.getProdutos().then(result => {
    console.log(result);

});




app.listen(3002, () => {
    console.log('_xunda_no_sql_')
});