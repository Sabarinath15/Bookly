const AWS = require('aws-sdk');

AWS.config.update({
    region : 'local',
    endpoint : 'http://localhost:8000',
});

var dynamoDb = new AWS.DynamoDB(); //dynamodb instance


//User table creation 

// var params = {
    
//     TableName : 'User',
//     KeySchema : [
//         {
//             AttributeName : 'id',
//             KeyType : 'HASH',
//         }
//     ],
//     AttributeDefinitions : [
//         {
//             AttributeName : 'id',
//             AttributeType : 'S',
//         },
//         {
//             AttributeName : 'email',
//             AttributeType : 'S',
//         },
//     ],
//     ProvisionedThroughput : {
//         ReadCapacityUnits : 10,
//         WriteCapacityUnits : 10,
//     },
//     GlobalSecondaryIndexes : [
//         {
//             IndexName : 'user_email',
//             KeySchema : [
//                 {
//                     AttributeName : 'email',
//                     KeyType : 'HASH',
//                 }
//             ],
//             Projection : {
//                 ProjectionType : 'ALL',
//             },
//             ProvisionedThroughput : {
//                 ReadCapacityUnits : 10,
//                 WriteCapacityUnits : 10,
//             },
//         }
//     ]
// };

// dynamoDb.createTable(params, (err, data) => {
//     if (err) {
//         console.log('Unable to create the table. Error : ', JSON.stringify(err, null, 2));
//     } else {
//         console.log('User Table created successfully... ');
//     }
// });


//Events table creation

params = {
    
    TableName : 'Events',
    KeySchema : [
        {
            AttributeName : 'id',
            KeyType : 'HASH',
        }
    ],
    AttributeDefinitions : [
        {
            AttributeName : 'id',
            AttributeType : 'S',
        },
        {
            AttributeName : 'userId',
            AttributeType : 'S',
        },
    ],
    ProvisionedThroughput : {
        ReadCapacityUnits : 10,
        WriteCapacityUnits : 10,
    },
    GlobalSecondaryIndexes : [
        {
            IndexName : 'user_id',
            KeySchema : [
                {
                    AttributeName : 'userId',
                    KeyType : 'HASH',
                }
            ],
            Projection : {
                ProjectionType : 'ALL',
            },
            ProvisionedThroughput : {
                ReadCapacityUnits : 10,
                WriteCapacityUnits : 10,
            },
        }
    ]
};

dynamoDb.createTable(params, (err, data) => {
    if (err) {
        console.log('Unable to create the table. Error : ', JSON.stringify(err, null, 2));
    } else {
        console.log('Events Table created successfully... ');
    }
});


// //Slots table creation

// params = {
    
//     TableName : 'Slots',
//     KeySchema : [
//         {
//             AttributeName : 'id',
//             KeyType : 'HASH',
//         }
//     ],
//     AttributeDefinitions : [
//         {
//             AttributeName : 'id',
//             AttributeType : 'S',
//         }
//     ],
//     ProvisionedThroughput : {
//         ReadCapacityUnits : 10,
//         WriteCapacityUnits : 10,
//     }
// };

// dynamoDb.createTable(params, (err, data) => {
//     if (err) {
//         console.log('Unable to create the table. Error : ', JSON.stringify(err, null, 2));
//     } else {
//         console.log('Slots Table created successfully... ');
//     }
// })