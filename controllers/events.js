const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

AWS.config.update({
    region : 'local',
    endpoint : 'http://localhost:8000',
}); //config region and endpoint

var docClient = new AWS.DynamoDB.DocumentClient(); //instance of doc client

const createEvent = async (req, res) => {
    var id = uuidv4();
    var params = {
        TableName : 'Events',
        Item : {
            "id" : id,
            "userId" : req.body.userId,
            "event" : req.body,
        }
    }
    docClient.put(params, (err, data) => {
        if (err) {
            console.log('Error : Cannot put item : ', JSON.stringify(err, null, 2));
            res.status(500).json({ msg : err});
        } else {
            //console.log('New Event created successfully... ');
            res.status(201).json({id});
        }
    });
}

const getEventByUserId = async (req, res) => {
    const { id : id} = req.params;
    var params = {
        TableName : 'Events',
        IndexName : 'user_id',
        KeyConditionExpression : 'userId = :id', 
        ExpressionAttributeValues : {
            ':id' : id,        
        }
    }

    docClient.query(params, (err, data) => {
        if (err) {
            console.log('Unable to get the User. Error : ', JSON.stringify(err, null, 2));
            res.status(500).json({ msg : err});
        } else {
            //console.log('Events : ', data.Items);
            var items = data.Items;
            res.status(200).json({ items });
        }
    });
}

const getAllEvents = async (req, res) => {
    params = {
        TableName : 'Events',
    }
        
    docClient.scan(params, (err, data) => {
        if (err) {
            console.log('Unable to scan the table. Error :', JSON.stringify(err));
            res.status(500).json({ msg : err});
        } else {
            //console.log('Scanning success...');
            res.status(200).json({ data });
        }
    });
}

const getEventById = async (req, res) => {
    const { id : id} = req.params;
    var params = {
        TableName : 'Events',
        Key : {
            'id' : id,
        }
    };

    docClient.get(params, (err, data) => {
        if (err) {
            console.log('Unable to scan the table. Error :', JSON.stringify(err));
            res.status(500).json({ msg : err});
        } else {
            //console.log('Event by Id :', data);
            res.status(200).json({ data });
        }
    });
}

const deleteEventById = async (req, res) => {
    const { id : id} = req.params;
    var params = {
        TableName : 'Events',
        Key : {
            'id' : id,
        },
    }

    docClient.delete(params, (err, data) => {
        if (err) {
            console.log('Unable to delete the event. Error :', JSON.stringify(err));
            res.status(500).json({ msg : err});
        } else {
            res.status(200).json({ data });
        }
    });
}

const updateEventById = async (req, res) => {
    const { id : id} = req.params;
    var params = {
        TableName : 'Events',
        Key : {
            'id' : id,
        },
        UpdateExpression: "set event = :body",
        ExpressionAttributeValues:{
            ":body" : req.body,
        },
        ReturnValues:"UPDATED_NEW"
    }

    docClient.update(params, (err, data) => {
        if (err) {
            console.log('Unable to update the event. Error :', JSON.stringify(err));
            res.status(500).json({ msg : err});
        } else {
            //console.log('Event Updated...');
            res.status(200).json({ data });
        }
    });
}


module.exports = {
    createEvent,
    getEventById,
    getAllEvents,
    getEventByUserId,
    deleteEventById,
    updateEventById,
}