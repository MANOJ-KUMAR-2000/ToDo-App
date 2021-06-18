const jwt = require("jsonwebtoken");
const UserDetails = require("../models/users_details");

const main = async(req, res) => {
    if (req.cookies.jwt) {
        const cookie_id = jwt.verify(req.cookies.jwt, "adkhbaduah!@jG&IGSa&t7USj!3hkHskaSKUH*sq78t6s^Q");
        const user = await UserDetails.findOne({ _id: cookie_id.id }).lean();
        if (user) {
            res.render("dashboard", { userName: user.username });
        } else {
            res.redirect("/");
        }
    } else {
        res.redirect("/");
    }
}
const logout = async(req, res) => {
    if (req.cookies.jwt) {
        const cookie_id = jwt.verify(req.cookies.jwt, "adkhbaduah!@jG&IGSa&t7USj!3hkHskaSKUH*sq78t6s^Q");
        const user = await UserDetails.findOne({ _id: cookie_id.id }).lean();
        if (user) {
            res.cookie('jwt', {}, { httpOnly: true, maxAge: 1 });
            res.redirect("/");
        } else {
            res.redirect("/");
        }
    } else {
        res.redirect("/");
    }
}

const createActivity = (req, res) => {
    const newActivity_details = req.body;


}

const comingsoon = async(req, res) => {
    if (req.cookies.jwt) {
        const cookie_id = jwt.verify(req.cookies.jwt, "adkhbaduah!@jG&IGSa&t7USj!3hkHskaSKUH*sq78t6s^Q");
        const user = await UserDetails.findOne({ _id: cookie_id.id }).lean();
        if (user) {
            res.render("comingsoon", { userName: user.username });
        } else {
            res.redirect("/");
        }
    } else {
        res.redirect("/");
    }
}
module.exports = { main, logout, createActivity, comingsoon }