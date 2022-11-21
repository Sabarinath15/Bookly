const moongose = require('mongoose');

const userSchema = new moongose.Schema(
    {
        name : {
            type : String,
            required : [true, 'Must provide name'],
            trim : true,
            maxlength : [30, 'Name can not be more thyan 30'],
        },
        email : {
            type : String,
            required : [true, 'Must provide email'],
            trim : true,
        },
        password : {
            type : String,
            required : [true, 'Must provide password'],
            trim : true,
            minlength : [7, 'Password must be greater than or equal to 8 digits'],
        }
    }
);

module.exports = moongose.model('User', userSchema);