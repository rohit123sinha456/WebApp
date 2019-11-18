var mongoose = require("mongoose")

var schema = mongoose.Schema

var adminppl = new schema({
    aid: String,
    username: String,
    password: String
})

module.exports = mongoose.model("admindb",adminppl,"admindb")


