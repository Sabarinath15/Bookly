const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

AWS.config.update({
    region: 'local',
    endpoint: 'http://localhost:8000',
}); //config region and endpoint

var docClient = new AWS.DynamoDB.DocumentClient(); //instance of doc client

const createSlot = async (req, res) => {
    var id = uuidv4();
    var params = {
        TableName: 'Slots',
        Item: {
            "id": id,
            "eventId": req.body.eventId,
            "slot": req.body,
        }
    }
    docClient.put(params, (err, data) => {
        if (err) {
            console.log('Error : Cannot put item : ', JSON.stringify(err, null, 2));
            res.status(500).json({ msg: err });
        } else {
            //console.log('New slot created successfully... ');
            res.status(201).json({ id });
        }
    });
}

const getSlotByEventId = async (req, res) => {
    const { id: id } = req.params;
    var params = {
        TableName: 'Slots',
        IndexName: 'event_id',
        KeyConditionExpression: 'eventId = :id',
        ExpressionAttributeValues: {
            ':id': id,
        }
    }

    docClient.query(params, (err, data) => {
        if (err) {
            console.log('Unable to get the slots. Error : ', JSON.stringify(err, null, 2));
            res.status(500).json({ msg: err });
        } else {
            //console.log('Slots : ', data);
            var items = data.Items;
            res.status(200).json({ items });
        }
    });
}

module.exports = {
    createSlot,
    getSlotByEventId,
}