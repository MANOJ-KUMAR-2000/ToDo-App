const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userschema = new Schema({
    "username": { type: String, required: true, unique: true },
    "name": { type: String, required: true },
    "mail_id": { type: String, required: true },
    "password": { type: String, required: true }
}, { timestamps: true })



const UserDetails = mongoose.model("UserDetails", userschema);
module.exports = UserDetails;