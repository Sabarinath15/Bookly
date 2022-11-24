const { v4: uuidv4 } = require('uuid');
const {
    createItem,
    getItem,
    queryItem,
    deleteItem,
    updateItem,
    scanItem,
} = require('../db/docClientActions');

const createEvent = async (req, res) => {
    try {
        var id = uuidv4();
        var params = {
            TableName: 'Events',
            Item: {
                "id": id,
                "userId": req.body.userId,
                "event": req.body,
            }
        }

        await createItem(params);
        res.status(201).json({ params });

    } catch (error) {
        res.status(500).json({ msg: err });
    }
}

const getEventByUserId = async (req, res) => {
    try {
        const { id: id } = req.params;
        var params = {
            TableName: 'Events',
            KeyConditionExpression: 'userId = :id',
            ExpressionAttributeValues: {
                ':id': id,
            }
        };

        const data = await queryItem(params);
        res.status(200).json({ data });

    } catch (error) {
        res.status(500).json({ msg: err });
    }
}

const getAllEvents = async (req, res) => {
    try {
        params = {
            TableName: 'Events',
        };

        var data = await scanItem(params);
        res.status(200).json({ data });
        if (typeof data.LastEvaluatedKey != "undefined") {
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            data = await scanItem(params);
            res.status(200).json({ data });
        }

    } catch (error) {
        res.status(500).json({ msg: err });
    }
}

const getEventById = async (req, res) => {
    try {
        const { id: id, userId: userId } = req.params;

        var params = {
            TableName: 'Events',
            Key: {
                'id': id,
                'userId': userId,
            }
        };

        const data = await getItem(params);
        res.status(200).json({ data });

    } catch (error) {
        res.status(500).json({ msg: err });
    }
}

const deleteEventById = async (req, res) => {
    try {
        const { id: id, userId: userId } = req.params;

        var params = {
            TableName: 'Events',
            Key: {
                'id': id,
                'userId': userId,
            }
        };

        const data = await deleteItem(params);
        res.status(200).json({ data });

    } catch (error) {
        res.status(500).json({ msg: err });
    }
}

const updateEventById = async (req, res) => {
    try {
        const { id: id, userId: userId } = req.params;

        var params = {
            TableName: 'Events',
            Key: {
                'id': id,
                'userId': userId,
            },
            UpdateExpression: "set event = :body",
            ExpressionAttributeValues: {
                ":body": req.body,
            },
            ReturnValues: "UPDATED_NEW",
        };

        const data = await updateItem(params);
        res.status(200).json({ data });

    } catch (error) {
        res.status(500).json({ msg: err });
    }
}


module.exports = {
    createEvent,
    getEventById,
    getAllEvents,
    getEventByUserId,
    deleteEventById,
    updateEventById,
}