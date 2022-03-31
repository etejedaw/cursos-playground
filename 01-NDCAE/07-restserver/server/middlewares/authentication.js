const jwt = require('jsonwebtoken');

let checkToken = (req, res, next) => {
    let token = req.get('token');
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if(err) return res.status(401).json({err});
        req.user = decoded.user;
        next();
    });
}

let checkAdmin_Role = (req, res, next) => {
    let user = req.user;
    if (user.role != "ADMIN_ROLE") 
    return res.status(400).json({msj: "User not ADMIN"});
    next();
}

let checkTokenImg = (req, res, next) => {
    let token = req.query.token;
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if(err) return res.status(401).json({err});
        req.user = decoded.user;
        next();
    });
}

module.exports = {
    checkToken,
    checkAdmin_Role,
    checkTokenImg
}