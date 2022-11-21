const express = require('express');
const router = express.Router();

const { createEvent, getEventsById, getAllEvents, getEventById, deleteEventById, updateEventById } = require('../controllers/events');

router.route('/createEvent').post(createEvent);
router.route('/:id').get(getEventsById);
router.route('/').get(getAllEvents);
router.route('/event/:id').get(getEventById).delete(deleteEventById).put(updateEventById);

module.exports = router;