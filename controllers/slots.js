const Slot = require('../models/slot');

const createSlot = async (req, res) => {
    try {
        const slot = await Slot.create(req.body);
        res.status(201).json({slot});
    } catch (error) {
        res.status(500).json({ msg : error});
    }
}

const getSlotByEventId = async (req, res) =>{
    try {
        const { id : eventId} = req.params;
        const slots = await Slot.find({eventId : eventId});
        res.status(200).json({slots});
    } catch (error) {
        res.status(500).json({ msg : error});
    }
}

module.exports = {
    createSlot,
    getSlotByEventId,
}