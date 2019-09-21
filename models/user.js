const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    userName: {
        type: String,
        lowercase: true,
        required : [true, "Can´t be blank"],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        index: { unique: true},
    },
    email: {
        type: String,
        lowercase: true,
        required : [true, "Can´t be blank"],
        match: [/\S+@\S+.\S+/, 'is invalid'],
        index: { unique: true},
    },
    password: {
        type: String,
        required : [true, "I need that"],
    },
});

UserSchema.pre('save', function(next){
    let user = this;

    if(!user.isModified('password')) return next();
    
    bcrypt.hash(user.password, SALT_ROUNDS, (err, hash ) => {
        if (err) return next(err);
        user.password = hash;
        next();
    });

});

UserSchema.methods.comparePass = function(testPass, callback){
    let user = this;
    bycrypt.compare(testPass, user.password, function(err, isMatch){
        if (err) return callback(err);

        callback(null, isMatch);
    })
}

module.exports = mongoose.model('users', UserSchema);