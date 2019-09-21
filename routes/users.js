var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');

router.post('/', (req, res, next) => {
    const body = req.body;
    User.create(body)
        .then(result => {
            if(result) {
                res.status(201).json({
                    message: "Sing up complete",
                    user: result
                })    
            } else {
            next({
                message: "Cant crate user",
                name: "Invalid"
                })
            }
        })
        .catch(next);
});

router.post('/', (req, res, next) => {
    const body = req.body;

    if(!body.username || !body.password) return next ({
        message: "Username or password is missing",
        name: "Invalid"
    });

    User.findOne({ username: body.username})
        .then(result => {
            if(result) {
                result.comparePass(body.password, function(err, isMatch) {
                    if(err) throw(err);
                    
                    if(isMatch){
                        res.status(200).json({
                            message: "Successfully logged in",
                            name: "user",
                        })

                    } else {
                        res.status(401).json({
                            message: "Usebame or passwor are incorrect",
                            name: "Forbidden"
                        })
                    }
                })
            } else {
                next({
                    massage: "Username or password are incorrect",
                    name: "Forbidden"
                })
            }
        })
        .catch(next);
});

module.exports = router;