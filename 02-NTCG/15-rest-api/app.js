const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
const feedRoutes = require("./routes/feed");
const authRouter = require("./routes/auth");

const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "images"),
    filename: (req, file, cb)  => cb(null, `${new Date().toString()}-${file.originalname}`)
})
const fileFilter = (req, file, cb) => {
    if(file.mimetype === "image/png" || file.mimetype === "image/jpg", file.mimetype === "image/jpeg") cb(null, true);
    else cb(null, false);
}

app.use(express.json());
app.use(multer({storage: fileStorage, fileFilter}).single("image"));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use("/feed", feedRoutes);
app.use("/auth", authRouter);
app.use((err, req, res, next) => {
    const status = err.statusCode;
    const message = err.message;
    const data = err.data;
    res.status(status).json({message, data});
});

mongoose.connect("mongodb://localhost:27017/messages")
    .then(() => {
        console.log("DB on port 27017");
        app.listen(8800, () => console.log("Localhost on port 8800"));
    })
    .catch(x => console.log(x));