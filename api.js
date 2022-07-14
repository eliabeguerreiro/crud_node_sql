//const express = require("express");
const sql = require("mssql");
var Produtos = require('./produtos');
const dboperations = require("./dboperations");

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors'); 
var app = express();
var router = express.Router();




app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);


router.use((req,res,next)=>{
    console.log('middleware');
    next();
});

router.route('/produtos').get((req,res)=>{

    dboperations.getProdutos().then(result => {
        //console.log(result);
        res.send(result);
    })

});


var port = process.env.PORT || 8090;
app.listen(port);
console.log('Api de pedidos está na porta ' + port);

/*
app.listen(3002, () => {
    console.log('_xunda_no_sql_')
});
*/