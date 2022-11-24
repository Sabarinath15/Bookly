const express = require('express');
const router = express.Router();

const { createUser, getUser, checkUser } = require('../controllers/account');


router.route('/newuser').post(createUser);
router.route('/checkuser/:email').get(checkUser);
router.route('/user/:email').get(getUser);

module.exports = router;