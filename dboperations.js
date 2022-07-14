var config = require('./dbconfig');
const sql = require('mssql');



async function getProdutos(){
    try{
        let pool = await sql.connect(config);
        let products = await pool.request().query("select * from app_farma_produtos where sku < 5");
        return products.recordsets;

    }
    catch (erro){
        console.log(erro)
    }
}

module.exports ={
    getProdutos : getProdutos
}