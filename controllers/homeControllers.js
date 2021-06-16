//home , login_get, login_post, signup_get, signup_post
const UserDetails = require("../models/users_details");
const bcrypt = require("bcryptjs");

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

module.exports = { home, login_get, login_post, signup_get, signup_post }