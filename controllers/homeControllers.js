//home , login_get, login_post, signup_get, signup_post
const UserDetails = require("../models/users_details");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const feedbackDetails = require("../models/feedback_details")

const createToken = (id) => {
    return jwt.sign({ id }, "adkhbaduah!@jG&IGSa&t7USj!3hkHskaSKUH*sq78t6s^Q");
}

const home = (req, res) => {
    res.render("index");
}

const login_get = (req, res) => {
    res.render("login", { error: null });
}

const login_post = async(req, res) => {
    const entered_user = req.body;
    const user = await UserDetails.findOne({ username: entered_user.username }).lean();
    if (!user) {
        res.render("login", { error: "username doesn't exit" });
    } else {

        if (await bcrypt.compare(entered_user.password, user.password)) {
            const token = createToken(user._id);
            res.cookie('jwt', token, { httpOnly: true });
            res.redirect("/dashboard");
        } else {
            res.render("login", { error: "Invalid username/password" });
        }
    }

}

const signup_get = (req, res) => {
    res.render("signup", { error: null });
}

const signup_post = async(req, res) => {
    req.body["password"] = await bcrypt.hash(req.body["password"], 12);

    var newUser = new UserDetails(req.body);
    newUser.save()
        .then((result) => {
            res.redirect("/login");
        })
        .catch((err) => {
            if (err.code === 11000) {
                res.render("signup", { error: 'username alredy in use' });
            }
        })
}

const feedback_get = (req, res) => {
    res.render("feedback");
}

const feedback_post = (req, res) => {
    var newfeedback = new feedbackDetails(req.body);
    newfeedback.save()
        .then((result) => {
            res.redirect("/");
        })
        .catch((err) => {
            console.log(err);
        })
}




module.exports = { home, login_get, login_post, signup_get, signup_post, feedback_get, feedback_post }