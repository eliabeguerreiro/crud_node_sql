//Tutorial guia: https://www.youtube.com/watch?v=Uvy_BlgwfLI&ab_channel=Geek97 
var config = require('./dbconfig');
const sql = require('mssql');



async function getProdutos(){
    try{
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT * from app_farma_produtos");
        return products.recordsets;

    }
    catch (erro){
        console.log(erro)
    }
}

async function getProduto(sku){
    try{
        let pool = await sql.connect(config);
        let products = await pool.request()
            .input('input_parameter', sql.Int, sku)
            .query("SELECT * FROM app_farma_produtos WHERE sku = @input_parameter");
        return products.recordsets;

    }
    catch (erro){
        console.log(erro)
    }
}

/*
async function addProduto(produto){
    try{
        let poll = await sql.connect(config);
        let insertProduct = await poll.request()
            .input('Id', sql.Int, produto.Id)
            .input('Title', sql.NVarChar, produto.Title)
            .input('Quantity', sql.Int, produto.Quantity)
            .input('Messsage', sql.NVarChar, produto.Message)
            .input('City', sql.NVarChar, produto.City)
            .execute('InsertProduto');
        return insertProduct.recordsets;

    }catch (erro){
        console.log(erro)
    }

};
*/


module.exports ={
    getProdutos : getProdutos,
    getProduto : getProduto/*,
    addProduto : addProduto*/
}