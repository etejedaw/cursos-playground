const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const User = require('../model/user');
const Product = require('../model/product');
app.use(fileUpload());
const fs = require('fs');
const path = require('path');

app.put('/upload/:type/:id', function(req, res){
    let file = req.files.file;
    let type = req.params.type;
    let id = req.params.id;
    let extension = getExtension(file.name);
    if(!req.files) return res.status(400).json({err: "No file selected"});
    if (!checkType(type)) return res.status(400).json({err: "Type not valid"});
    if(!checkExtension(extension)) return res.status(400).json({err: "Not valid extension"});
    let nameFile = `${id}-${new Date().getMilliseconds()}.${extension}`;
    file.mv(`uploads/${type}/${nameFile}`, (err) => {
        if(err) return res.status(500).json({err});
        if(type === 'users') userImage(id, res, nameFile);
        else productImage(id, res, nameFile);
    });
});

function getExtension(nameFile){
    let cutName = nameFile.split('.');
    return extension = cutName[cutName.length-1];
}

function checkType(type){
    let validType = ["products", "users"];
    if(validType.indexOf(type) == -1) return false;
    else return true;
}

function checkExtension(extension){
    let validExt = ["png", "jpg", "jpeg"];
    if(validExt.indexOf(extension) == -1) return false;
    else return true;
}

function userImage(id, res, nameFile){
    User.findById(id, (err, userDB) => {
        if(err) {
            delFile('users', nameFile);
            return res.status(500).json({err});
        }
        if(!userDB) {
            delFile('users', nameFile)
            return res.status(400).json({err: "User not Found"});
        }
        delFile('users', userDB.img);
        userDB.img = nameFile;
        userDB.save((err, userDB) => {
            if(err) return res.status(400).json({err});
            res.json({
                user: userDB,
                img: nameFile
            });
        });
    });
}

function productImage(id, res, nameFile){
    Product.findById(id, (err, productDB) => {
        if(err) {
            delFile('products', nameFile);
            return res.status(500).json({err});
        }
        if(!productDB) {
            delFile('products', nameFile)
            return res.status(400).json({err: "Product not Found"});
        }
        delFile('products', productDB.img);
        productDB.img = nameFile;
        productDB.save((err, productDB) => {
            if(err) return res.status(400).json({err});
            res.json({
                product: productDB,
                img: nameFile
            });
        });
    });
}

function delFile(type, imgName){
    let pathImg = path.resolve(__dirname, `../../uploads/${type}/${imgName}`);
    if(fs.existsSync(pathImg)) fs.unlinkSync(pathImg);
}

module.exports = app;