const User = require('../models/user');

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({user});
    } catch (error) {
        res.status(500).json({ msg : error});
    }
}

const checkUser = async (req, res) => {
    try {
        const {email : userMail} = req.params;
        const userHave = await User.findOne({email : userMail});
        if (userHave) {
            return res.status(200).json({have : true});
        }
        res.status(200).json({have : false});
    } catch (error) {
        res.status(500).json({ msg : error});
    }
}


const getUser =  async (req, res) => {
    try {
        const {email : userMail} = req.params;
        const user = await User.findOne({email : userMail});
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({ msg : error});
    }
}

const getUserDetail =  async (req, res) => {
    try {
        const {id : userId} = req.params;
        const user = await User.findOne({_id : userId});
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({ msg : error});
    }
}

module.exports = {
    createUser,
    getUser,
    checkUser,
    getUserDetail,
}