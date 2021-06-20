const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activites_schema = new Schema({
    "todo": { type: String, required: true },
    "date": { type: String, required: true },
    "time": { type: String, required: true },
    "time2spent": { type: String },
    "description": { type: String }
}, { timestamps: true })

const user_activity_schema = new Schema({
    "username": { type: String, required: true },
    "activity_ids": { type: Array, required: true }
}, { timestamps: true })

const AllActivites = mongoose.model("AllActivites", activites_schema);
const UserActivites = mongoose.model("UserActivites", user_activity_schema);

module.exports = { AllActivites, UserActivites };