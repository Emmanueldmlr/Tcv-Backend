const express = require('express');

const eventController = require('../controllers/eventController')

const router = express.Router();

//fetch all events
router.get("/", eventController.fetchEvents)

//fetch latest events
router.get("/latestEvents", eventController.fetchLatestEvents)

//fetch a single event with slug
router.get("/:slug", eventController.findEvent)

//create event
router.post("/", eventController.create)

// //search event
// router.get("/search", eventController.searchEvent)

// //update event
// router.put("/:id", eventController.update)

//delete event
router.delete("/:id", eventController.delete)

module.exports = router;