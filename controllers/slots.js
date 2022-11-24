const { v4: uuidv4 } = require('uuid');
const {
    createItem,
    queryItem,
} = require('../db/docClientActions');

const createSlot = async (req, res) => {
    try {
        var id = uuidv4();
        var params = {
            TableName: 'Slots',
            Item: {
                "id": id,
                "userId": req.body.userId,
                "eventId": req.body.eventId,
                "slot": req.body,
            }
        }

        await createItem(params);
        res.status(201).json({ id });

    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

const getSlotByEventId = async (req, res) => {
    try {
        const { eventId: eventId } = req.params;
        var params = {
            TableName: 'Slots',
            KeyConditionExpression: 'eventId = :eid',
            ExpressionAttributeValues: {
                ':eid': eventId,
            },
        }
        const data = await queryItem(params);
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

module.exports = {
    createSlot,
    getSlotByEventId,
}