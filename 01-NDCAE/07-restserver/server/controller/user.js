const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const _ = require('underscore');
const User = require('../model/user');
const {checkToken, checkAdmin_Role} = require('../middlewares/authentication');
const app = express();

app.get('/user', checkToken, (req, res) => {
    let from = Number(req.query.from) || 0;
    let to = Number(req.query.to) || 5;
    User.find({status:true}, "name email role status google img")
        .skip(from)
        .limit(to)
        .exec((err, users) => {
            if (err) return res.status(400).json({err});
            User.count({status:true}, (err, count) => {
                res.json({users,count});
            });
        });
});
  
app.post('/user', [checkToken, checkAdmin_Role], (req, res) => {
    let body = req.body;
    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, saltRounds),
        role: body.role
    });
    user.save((err, userDB) => {
        if(err) return res.status(400).json({err});
        res.json({user: userDB});
    });
});
  
app.put ('/user/:id', [checkToken, checkAdmin_Role], (req, res) => {
    let id = req.params.id;
    let body = _.pick(
        req.body, 
        ["name", "email", "img", "role", "status"]
    );
    User.findByIdAndUpdate(id, 
        body, 
        {new: true, runValidators: true}, 
        (err, userDB) => {
            if (err) return res.status(400).json({err: "User invalid"});
            res.json({user: userDB});
        }
    );
});
  
app.delete('/user/:id', [checkToken, checkAdmin_Role], (req,res) => {
    let id = req.params.id;
    User.findByIdAndUpdate(id, {status: false}, {new: true}, (err, userDelete) => {
        if (err) return res.status(400).json({err});
        if (!userDelete) return res.status(400).json({err});
        res.json({userDelete});
    });
});

module.exports = app;