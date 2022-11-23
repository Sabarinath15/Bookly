const { v4: uuidv4 } = require('uuid');
const {
    createItem,
    getItem,
    queryItem,
    deleteItem,
    updateItem, } = require('../db/docClientActions');


const createUser = async (req, res) => { //create user in db
    try {
        var id = uuidv4();
        var params = {
            TableName: 'User',
            Item: {
                "id": id,
                "name": req.body.name,
                "email": req.body.email,
                "password": req.body.password,
            },
        };

        await createItem(params); //create user by calling doc client method
        res.status(201).json({ id });

    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

const checkUser = async (req, res) => { //check the user have acc.
    try {

        const { email: email } = req.params;
        var params = {
            TableName: 'User',
            KeyConditionExpression: 'email = :e',
            ExpressionAttributeValues: {
                ':e': email,
            }
        };
        const data = await queryItem(params);
        if (data.Count != 0) {
            res.status(200).json({ 'have': true });
        } else {
            res.status(200).json({ 'have': false });
        }
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

const getUser = async (req, res) => { //get the user by email
    try {
        const { email: email, id: id } = req.params;
        var params = {
            TableName: 'User',
            Key: {
                'email': email,
                'id': id,
            }
        };

        var data = await getItem(params);
        if (data.Count != 0) {
            res.status(200).json({ data });
        } else {
            throw error;
        }
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

const getUserDetail = async (req, res) => { //get the user by id
    try {
        const { id: id } = req.params;
        var params = {
            TableName: 'User',
            KeyConditionExpression: 'id = :id',
            ExpressionAttributeValues: {
                ':id': id,
            }
        };

        const data = await queryItem(params);
        if (data.Count != 0) {
            res.status(200).json({ data });
        } else {
            throw error;
        }
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}

module.exports = {
    createUser,
    getUser,
    checkUser,
    getUserDetail,
}
