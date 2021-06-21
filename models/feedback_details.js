const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    "name": { type: String, required: true },
    "email": { type: String, required: true },
    "feed": { type: String, required: true },
}, { timestamps: true })



const feedbackDetails = mongoose.model("feedbackDetails", feedbackSchema);

module.exports = feedbackDetails;