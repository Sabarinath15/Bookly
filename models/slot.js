const moongose =  require('mongoose');

const slotSchema = new moongose.Schema(
    {
        eventId : {
            type : String,
            required : [true, 'Must provide creater ID'],
            trim : true,
        },
        slotDate : {
            type : Date,
            required : [true, 'Must provide start date'],
            trim : true,
        },
        slotTime : {
            type : String,
            required : [true, 'Must provide time'],
            trim : true,
        },
        name : {
            type : String,
            required : [true, 'Must provide name'],
            trim : true,
            maxlength : [20, 'Name can not be more thyan 20'],
        },
        email : {
            type : String,
            required : [true, 'Must provide email'],
            trim : true,
        },
        contact : {
            type : String,
            required : [true, 'Must provide password'],
            trim : true,
            minlength : [10, 'Mobile must be 10 digit.'],
        }
    }
);

module.exports = moongose.model('Slot', slotSchema);