const express = require('express');
const router = express.Router();

const { createEvent, getEventByUserId, getAllEvents, getEventById, deleteEventById, updateEventById } = require('../controllers/events');

router.route('/createEvent').post(createEvent);
router.route('/:id').get(getEventByUserId);
router.route('/').get(getAllEvents);
router.route('/event/:id').get(getEventById).delete(deleteEventById).put(updateEventById);

module.exports = router;