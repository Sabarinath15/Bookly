const moongose =  require('mongoose');

const eventSchema = new moongose.Schema(
    {
        createrId : {
            type : String,
            required : [true, 'Must provide creater ID'],
            trim : true,
        },
        createrName : {
            type : String,
            required : [true, 'Must provide event name'],
            trim : true,
            maxlength : [20, 'Name can not be more thyan 20'],
        },
        eventName : {
            type : String,
            required : [true, 'Must provide event name'],
            trim : true,
            maxlength : [20, 'Name can not be more thyan 20'],
        },
        duration : {
            type : Number,
            required : [true, 'Must provide duration'],
            trim : true,
        },
        durationFormat :  {
            type : String,
            required : [true, 'Must provide duration format'],  
            trim : true,
        },
        startDate : {
            type : Date,
            required : [true, 'Must provide start date'],
            trim : true,
        },
        noOfDays : {
            type : Number,
            required : [true, 'Must provide no of days'],
            trim : true,
        },
        workingDays : {
            type : Object,
            required : [true, 'Must provide working days'],
            trim : true,
        }
    }
);

module.exports = moongose.model('Event', eventSchema);