const express = require('express');
const {checkToken, checkAdmin_Role} = require('../middlewares/authentication');
const Categorie = require('../model/categorie');
let app = express();

app.get('/categorie', checkToken, (req, res) => {
    Categorie.find({})
        .sort("description")
        .populate("user", "name email")
        .exec((err, categories) => {
            if(err) return res.status(500).json({err});
            res.json({categories})
        });
});

app.get('/categorie/:id', checkToken, (req,res) => {
    let id = req.params.id;
    Categorie.findById(id, (err, categorieDB) => {
        if(err) return res.status(500).json({err});
        if(!categorieDB) return res.status(400).json({err});
        res.json({categorie: categorieDB});
    });
});

app.post('/categorie', checkToken, (req, res) => {
    let body = req.body;
    let categorie = new Categorie({
        description: body.description,
        user: req.user._id
    });
    categorie.save((err, categorieDB) => {
        if(err) return res.status(500).json({err});
        if(!categorieDB) return res.status(400).json({err});
        res.json({categorie: categorieDB});
    });
});

app.put('/categorie/:id', checkToken ,(req, res) => {
    let id = req.params.id;
    let body = req.body;
    Categorie.findByIdAndUpdate(id,
        body, 
        {new: true, runValidators: true}, 
        (err, categorieDB) => {
            if(err) return res.status(500).json({err});
            if(!categorieDB) return res.status(400).json({err});
            res.json({categorie: categorieDB});
        });
});

app.delete('/categorie/:id', [checkToken, checkAdmin_Role], (req, res) => {
    let id = req.params.id;
    Categorie.findByIdAndRemove(id, (err, categorieDetele) => {
        if (err) return res.status(500).json({err});
        if (!categorieDetele) return res.status(400).json({err});
        res.json({message: "Category Delete"});
    });
});

module.exports = app;