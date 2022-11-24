const express = require('express');
const router = express.Router();

const { createSlot, getSlotByEventId } = require('../controllers/slots');

router.route('/bookslot').post(createSlot);
router.route('/:eventId').get(getSlotByEventId);

module.exports = router;