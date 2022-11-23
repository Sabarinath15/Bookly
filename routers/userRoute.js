const express = require('express');
const router = express.Router();

const { createUser, getUser, checkUser, getUserDetail } = require('../controllers/account');


router.route('/newuser').post(createUser);
router.route('/checkuser/:email').get(checkUser);
router.route('/user/:email').get(getUser);
router.route('/userdetail/:id&:email').get(getUserDetail);

module.exports = router;