const jwt = require("jsonwebtoken");
const UserDetails = require("../models/users_details");
const { AllActivites, UserActivites } = require("../models/all_activites");

const getActivitybyID = async(ids) => {

    if (ids.length > 0) {
        for (let i = 0; i < ids.length; i++) {
            var activity = await AllActivites.findOne({ _id: ids[i] }).lean();
            ids[i] = activity;
        }
        return ids;
    } else { return []; }
}

const main = async(req, res) => {
    if (req.cookies.jwt) {
        const cookie_id = jwt.verify(req.cookies.jwt, "adkhbaduah!@jG&IGSa&t7USj!3hkHskaSKUH*sq78t6s^Q");
        const user = await UserDetails.findOne({ _id: cookie_id.id }).lean();

        if (user) {
            var user_activites = await UserActivites.findOne({ username: user.username }).lean();
            if (user_activites === null) {
                res.render("dashboard", { userName: user.username, userActivity: [] });
            } else {
                user_activites = getActivitybyID(user_activites.activity_ids)
                    .then((results) => {
                        res.render("dashboard", { userName: user.username, userActivity: results });
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
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
    var newActivity_details = req.body;
    var hr = parseInt(newActivity_details.time.split(":")[0]);
    var mins = parseInt(newActivity_details.time.split(":")[1]);

    if (hr > 12) {
        hr -= 12;
        newActivity_details.time = hr + ":" + mins;
    }

    newActivity_details.time = newActivity_details.time + " " + newActivity_details.am_or_pm;
    var newActivity = new AllActivites(newActivity_details);
    newActivity.save()
        .then(async(result) => {
            const newActivity_id = result._id;
            const cookie_id = jwt.verify(req.cookies.jwt, "adkhbaduah!@jG&IGSa&t7USj!3hkHskaSKUH*sq78t6s^Q");
            const current_user = await UserDetails.findOne({ _id: cookie_id.id }).lean();

            const current_user_activity = await UserActivites.findOne({ username: current_user.username }).lean();

            if (!current_user_activity) {
                var newUserActivity = new UserActivites({ "username": current_user.username, "activity_ids": [newActivity_id] })
                newUserActivity.save()
                    .then((result) => {

                        res.redirect("/dashboard");
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            } else {
                current_user_activites = current_user_activity.activity_ids;

                current_user_activites.push(newActivity_id);
                UserActivites.updateOne({ "username": current_user.username }, { "activity_ids": current_user_activites }, (err, result) => {
                    if (err) { console.log(err); } else { res.redirect("/dashboard"); }
                });
            }
        })
        .catch((err) => {
            console.log(err);
        })



}


module.exports = { main, logout, createActivity }