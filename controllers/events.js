const Event = require('../models/event');

const createEvent = async (req, res) => {
    try {
        const event = await Event.create(req.body);
        res.status(201).json({event});
    } catch (error) {
        res.status(500).json({ msg : error});
    }
}

const getEventsById = async (req, res) => {
    try {
        const { id : createrId} = req.params;
        const events = await Event.find({createrId : createrId});
        res.status(200).json({events});
    } catch (error) {
        res.status(500).json({ msg : error});
    }
}

const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json({events});
    } catch (error) {
        res.status(500).json({ msg : error});
    }
}

const getEventById = async (req, res) => {
    try {
        const { id : eventId} = req.params;
        const event = await Event.find({_id : eventId});
        res.status(200).json({event});
    } catch (error) {
        res.status(500).json({ msg : error});
    }
}

const deleteEventById = async (req, res) => {
    try {
        const { id : eventId} = req.params;
        const event = await Event.deleteOne({_id : eventId});
        res.status(200).json({event});
    } catch (error) {
        res.status(500).json({ msg : error});
    }
}

const updateEventById = async (req, res) => {
    try {
        const { id : eventId } = req.params;
        const event = await Event.findOneAndUpdate({ _id : eventId }, req.body);
        res.status(200).json({event});
    } catch (error) {
        res.status(500).json({ msg : error});
    }
}


module.exports = {
    createEvent,
    getEventsById,
    getAllEvents,
    getEventById,
    deleteEventById,
    updateEventById,
}