const express = require("express");
const app = express();

const cors = require('cors'); 
const router = express.Router();

const jwt = require('jsonwebtoken');
const SECRET = 'r2d2ph1rm1';

//token deve ser inserido em todas as requisições

var Produtos = require('./produtos');
const dboperations = require("./dboperations");
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);


router.use((req,res,next)=>{
    console.log('middleware');
    next();
});

/*
router.route('/produtos').get((req,res)=>{

});
*/

//middleware de verificação
function verifyJWT(req,res,next){
    const token = req.headers['x-acess-token'];
    jwt.verify(token, SECRET, (err, decoded) =>{
        if(err) return res.status(401).end();
    
        req.userId = decoded.userId;
        next();
    })
}

router.route('/produtos/todos').get(verifyJWT, (req,res)=>{
    console.log(res.userId + 'fez esta chamada!');
    dboperations.getProdutos().then(result => {
        //console.log(result);
        res.send(result);
    })

});

router.route('/login').post((req,res) =>{
    if(req.body.user === 'hants' && req.body.password ==='hants12'){
        const token = jwt.sign({userId: 1}, SECRET, {expiresIn: 1200});
        return res.json({auth: true, token});;
    }
    res.status(401).end();
});





router.route('/produtos/:sku').get((req,res)=>{

    dboperations.getProduto(req.params.sku).then(result => {

        res.send(result);
    })

});

/*
INSERIR DADOS

router.route('/produtos').post((req,res)=>{
    let produto = {...req.body}

    dboperations.addProduto(produto).then(result => {
        res.status(201).result;
    })

});
*/




var port = process.env.PORT || 8090;
app.listen(port);
console.log('Api de pedidos está na porta ' + port);

/*
app.listen(3002, () => {
    console.log('_xunda_no_sql_')
});
*/