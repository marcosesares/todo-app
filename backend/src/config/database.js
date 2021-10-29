const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.exports = mongoose.connect("mongodb://localhost/todo");
