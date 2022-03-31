const express = require('express');
const {checkToken} = require('../middlewares/authentication');

let app = express();
let Product = require('../model/product');

app.get('/product', checkToken, (req, res) => {
    let from = Number(req.query.from) || 0;
    let to = Number(req.query.to) || 5;
    Product.find({enable: true})
        .skip(from)
        .limit(to)
        .populate("user", "name email")
        .populate("categorie", "description")
        .exec((err, products) => {
            if(err) return res.status(500).json({err});
            res.json(products);
        });
});

app.get('/product/:id', checkToken, (req, res) => {
    let id = req.params.id;
    Product.findById(id, (err, productDB) => {
        if(err) return res.status(500).json({err});
        if(!productDB) return res.status(400).json({err});
        res.json({product: productDB});
    })
    .populate("user", "name email")
    .populate("categorie", "description");
});

app.get('/product/search/:word', checkToken, (req, res) => {
    let word = req.params.word;
    let regex = new RegExp(word, 'i');
    Product.find({name: regex})
        .populate("categorie", "name")
        .exec((err, product) => {
            if(err) return res.status(500).json({err});
            res.json(product);
        });
});

app.post('/product', checkToken ,(req, res) => {
    let body = req.body;
    let product = new Product({
        name: body.name,
        price: body.price,
        description: body.description,
        categorie: body.categorie,
        user: req.user._id
    });
    product.save((err, productDB) => {
        if(err) return res.status(500).json({err});
        if(!productDB) return res.status(400).json({err});
        res.json({product: productDB});
    });
});

app.put("/product/:id", checkToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;
    Product.findByIdAndUpdate(id,
        body,
        {new: true, runValidators: true},
        (err, productDB) => {
            if(err) return res.status(500).json({err});
            if(!productDB) res.status(400).json({err});
            res.json({product: productDB});
        });
});

app.delete('/product/:id', checkToken, (req, res) => {
    let id = req.params.id;
    Product.findByIdAndUpdate(
        id, 
        {enable: false},
        (err, productDelete) => {
            if(err) return res.status(500).json({err});
            if(!productDelete) return res.status(500).json({err});
            res.json({productDelete});
        });
});

module.exports = app;