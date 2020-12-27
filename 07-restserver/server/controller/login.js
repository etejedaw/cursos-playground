const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {OAuth2Client, CodeChallengeMethod} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const User = require('../model/user');
const app = express();

app.post('/login', (req, res) => {
    let body = req.body;
    User.findOne({email: body.email}, (err, userDB) => {
        if(err) return res.status(500).json({err});
        if (!userDB) return res.status(400).json({
            err: {message: "EMAIL or password not found"}
        });
        if(!bcrypt.compareSync(body.password, userDB.password))
        return res.status(400).json({
            err: {message: "email or PASSWORD not found"}
        });
        let token = jwt.sign(
            {user: userDB},
            process.env.SEED,
            {expiresIn: process.env.EXPIRATION_TOKEN}
        );
        res.json({
            user: userDB,
            token
        });
    });
});

app.post('/google', async (req, res) => {
    let token = req.body.idtoken;
    let googleUser = await verify(token)
        .catch(e => {
            return res.status(403).json({ err: e })
        });
    User.findOne({ email: googleUser.email }, (err, userDB) => {
        if (err) return res.status(500).json({ err });
        if (userDB) {
            if (userDB.google === false) return res.status(400).json({ err: { msge: "Use normal login" } });
            else {
                let token = jwt.sign(
                    { user: userDB },
                    process.env.SEED,
                    { expiresIn: process.env.EXPIRATION_TOKEN }
                );
                return res.json({ ok: true, user: userDB, token });
            }
        }
        else {
            let user = new User();
            user.name = googleUser.name;
            user.email = googleUser.email;
            user.img = googleUser.img;
            user.google = true;
            user.password = "null";
            user.save((err, userDB) => {
                if (err) return res.status(400).json({ err });
                let token = jwt.sign(
                    { user: userDB },
                    process.env.SEED,
                    { expiresIn: process.env.EXPIRATION_TOKEN }
                );
                return res.json({
                    user: userDB,
                    token
                });
            });
        }
    });
});

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    });
    const payload = ticket.getPayload();
    return {
        name: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }
}

module.exports = app;