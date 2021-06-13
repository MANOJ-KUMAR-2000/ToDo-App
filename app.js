const express = require('express');

app = express();
app.listen(3300);

app.set('view engine', 'ejs');
app.use(express.static('public'));


app.get("/", (req, res) => {
    res.render("index");
})