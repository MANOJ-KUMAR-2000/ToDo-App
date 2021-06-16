const express = require('express');
const mongoose = require("mongoose");
const homeRoutes = require("./routes/homeRoutes.js");
const dashboardRoutes = require("./routes/dashboardRoutes.js");
app = express();


const dburi = "mongodb+srv://smk00:smkaimldl@cluster0.embt6.mongodb.net/ToDoDB?retryWrites=true&w=majority";
mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((res) => {
        app.listen(3300);
        console.log("Listening on 3300");
    })
    .catch((err) => console.log(err))

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

//Routes for home pages
app.use(homeRoutes);

// User dashboard
app.use(dashboardRoutes);


//404 page
app.use((req, res) => {
    res.status(404).render("404");
})