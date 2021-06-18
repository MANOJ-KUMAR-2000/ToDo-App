const express = require('express');
const mongoose = require("mongoose");
const homeRoutes = require("./routes/homeRoutes.js");
const dashboardRoutes = require("./routes/dashboardRoutes.js");
const cookieParser = require("cookie-parser");

app = express();


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
console.log(process.env.MONGODB_URI);
const dburi = process.env.MONGODB_URI || "mongodb+srv://smk00:smkaimldl@cluster0.embt6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const port = process.env.PORT || 3300;
mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((res) => {
        app.listen(port);
        console.log(`Listening on ${port}`);
    })
    .catch((err) => console.log(err))


//Routes for home pages
app.use(homeRoutes);

// User dashboard
app.use(dashboardRoutes);


//404 page
app.use((req, res) => {
    res.status(404).render("404");
})