const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name necessary"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email necessary"]
    },
    password: {
        type: String,
        required: [true, "Password necessary"]
    },
    img: {
        type: String
    }, 
    role: {
        type: String,
        default: "USER_ROLE",
        enum: {
            values: ["ADMIN_ROLE", "USER_ROLE"],
            message: "{VALUE} is not valide"
        }
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
};

userSchema.plugin(uniqueValidator, {
    message: '{PATH} must unique'
});

module.exports = mongoose.model("User", userSchema);