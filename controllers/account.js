const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');


AWS.config.update({
    region: 'local',
    endpoint: 'http://localhost:8000',
}); //config region and endpoint

var docClient = new AWS.DynamoDB.DocumentClient(); //instance of doc client

const createUser = async (req, res) => { //create user in db
    var id = uuidv4();
    var params = {
        TableName: 'User',
        Item: {
            "id": id,
            "name": req.body.name,
            "email": req.body.email,
            "password": req.body.password,
        },
    }

    docClient.put(params, (err, data) => {
        if (err) {
            console.log('Error : Cannot put item : ', JSON.stringify(err, null, 2));
            res.status(500).json({ msg: err });
        } else {
            //console.log('New user created successfully... ');
            res.status(201).json({ id });
        }
    });
}

const checkUser = async (req, res) => { //check the user have acc.
    const { email: userMail } = req.params;
    var params = {
        TableName: 'User',
        IndexName: 'user_email',
        KeyConditionExpression: 'email = :emailVal',
        ExpressionAttributeValues: {
            ':emailVal': userMail,
        }
    }
    docClient.query(params, (err, data) => {
        if (err) {
            console.log('Unable to get the User. Error : ', JSON.stringify(err, null, 2));
            res.status(500).json({ msg: err });
        } else {
            //console.log('Check item successed : ', data);
            if (data.Count == 0) {
                res.status(200).json({ 'have': false })
            } else {
                res.status(200).json({ 'have': true });
            }
        }
    });
}

const getUser = async (req, res) => { //get the user by email
    const { email: userMail } = req.params;
    var params = {
        TableName: 'User',
        IndexName: 'user_email',
        KeyConditionExpression: 'email = :emailVal',
        ExpressionAttributeValues: {
            ':emailVal': userMail,
        }
    }
    docClient.query(params, (err, data) => {
        if (err) {
            console.log('Unable to get the User. Error : ', JSON.stringify(err, null, 2));
            res.status(500).json({ msg: err });
        } else {
            //console.log('Get item successed : ', data);
            res.status(200).json({ data });
        }
    });
}

const getUserDetail = async (req, res) => { //get the user by id
    const { id: id } = req.params;
    var params = {
        TableName: 'User',
        Key: {
            'id': id,
        }
    }

    docClient.get(params, (err, data) => {
        if (err) {
            console.log('Unable to get the User. Error : ', JSON.stringify(err, null, 2));
            res.status(500).json({ msg: err });
        } else {
            //console.log('Get item successed : ', data);
            res.status(200).json({ data });
        }
    });
}

module.exports = {
    createUser,
    getUser,
    checkUser,
    getUserDetail,
}


//scan
// params = {
//     TableName : 'User',
//     //ProjectionExpression : 'id, user.name, user.email, user.password',
// }

// docClient.scan(params, (err, data) => {
//     if (err) {
//         console.log('Unable to scan the table. Error :', JSON.stringify(err));
//     } else {
//         console.log('Scanning success...');
//         data.Items.forEach(el => {
//             console.log(el.id);
//             console.log(el.user);
//         });
//     }
// });
