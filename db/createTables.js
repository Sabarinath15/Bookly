const AWS = require('aws-sdk');

AWS.config.update({
    region: 'local',
    endpoint: 'http://localhost:8000',
});

var dynamoDb = new AWS.DynamoDB(); //dynamodb instance


//User table creation

// var params = {

//     TableName: 'User',
//     KeySchema: [
//         {
//             AttributeName: 'email', //partition key
//             KeyType: 'HASH',
//         },
//         {
//             AttributeName: 'id', //sort key
//             KeyType: 'RANGE',
//         },
//     ],
//     AttributeDefinitions: [
//         {
//             AttributeName: 'email',
//             AttributeType: 'S',
//         },
//         {
//             AttributeName: 'id',
//             AttributeType: 'S',
//         }
//     ],
//     ProvisionedThroughput: {
//         ReadCapacityUnits: 10,
//         WriteCapacityUnits: 10,
//     },
// };

// dynamoDb.createTable(params, (err, data) => {
//     if (err) {
//         console.log('Unable to create the table. Error : ', JSON.stringify(err, null, 2));
//     } else {
//         console.log('User Table created successfully... ');
//     }
// });


//Events table creation

// var params = {

//     TableName : 'Events',
//     KeySchema : [
//         {
//             AttributeName : 'userId', //primary key
//             KeyType : 'HASH',
//         },
//         {
//             AttributeName : 'id', //sort key
//             KeyType : 'RANGE',
//         }
//     ],
//     AttributeDefinitions : [
//         {
//             AttributeName: 'userId',
//             AttributeType: 'S',
//         },
//         {
//             AttributeName : 'id',
//             AttributeType : 'S',
//         },
//     ],
//     ProvisionedThroughput : {
//         ReadCapacityUnits : 10,
//         WriteCapacityUnits : 10,
//     },
// };

// dynamoDb.createTable(params, (err, data) => {
//     if (err) {
//         console.log('Unable to create the table. Error : ', JSON.stringify(err, null, 2));
//     } else {
//         console.log('Events Table created successfully... ');
//     }
// });


//Slots table creation

// var params = {

//     TableName: 'Slots',
//     KeySchema: [
//         {
//             AttributeName: 'eventId',
//             KeyType: 'HASH',
//         },
//         {
//             AttributeName: 'userId',
//             KeyType: 'RANGE',
//         }
//     ],
//     AttributeDefinitions: [
//         {
//             AttributeName: 'eventId',
//             AttributeType: 'S',
//         },
//         {
//             AttributeName: 'userId',
//             AttributeType: 'S',
//         },
//     ],
//     ProvisionedThroughput: {
//         ReadCapacityUnits: 10,
//         WriteCapacityUnits: 10,
//     },
// };

// dynamoDb.createTable(params, (err, data) => {
//     if (err) {
//         console.log('Unable to create the table. Error : ', JSON.stringify(err, null, 2));
//     } else {
//         console.log('Slots Table created successfully... ');
//     }
// });