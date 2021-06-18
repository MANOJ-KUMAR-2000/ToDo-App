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

const dburi = process.env.MONGODB_URI;
mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((res) => {
        app.listen(process.env.PORT||3300);
        console.log("Listening on 3300");
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
