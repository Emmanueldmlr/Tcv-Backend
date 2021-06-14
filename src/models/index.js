
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const db = {}

db.mongoose = mongoose

db.url = process.env.MONGO_URI

db.categories = require("./Category")(mongoose)

db.events = require("./Event")(mongoose)

module.exports = db

