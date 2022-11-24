const AWS = require('aws-sdk');

AWS.config.update({
    region: 'local',
    endpoint: 'http://localhost:8000',
}); //config region and endpoint

var docClient = new AWS.DynamoDB.DocumentClient(); //instance of doc client

const createItem = async (params) => {
    try {
        return await docClient.put(params).promise();
    } catch (error) {
        console.log(error);
    }
}

const getItem = async (params) => {
    try {
        return await docClient.get(params).promise();
    } catch (error) {
        console.log(error);
    }
}

const queryItem = async (params) => {
    try {
        return await docClient.query(params).promise();
    } catch (error) {
        console.log(error);
    }
}

const scanItem = async (params) => {
    try {
        return await docClient.scan(params).promise();
    } catch (error) {
        console.log(error);
    }
}

const deleteItem = async (params) => {
    try {
        return await docClient.delete(params).promise();
    } catch (error) {
        console.log(error);
    }
}

const updateItem = async (params) => {
    try {
        return await docClient.update(params).promise();
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createItem,
    getItem,
    queryItem,
    deleteItem,
    updateItem,
    scanItem,
}