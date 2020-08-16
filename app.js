const express = require("express");
const bodyparser = require("body-parser");
const date = require(__dirname + "/date.js");


const app = express();

const items = ["Buy food", "Cook food", "Eat food"];
const workitems = [];
app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

app.get("/", function (req, res) {

   const day= date.getDate();

    res.render("list", {
        listtitle: day,
        newlistitems: items
    });
});

app.post("/", function (req, res) {
    const item = req.body.newitem;
    if (req.body.list == "work") {
        workitems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }


});

app.get("/work", function (req, res) {
    res.render("list", {
        listtitle: "work list",
        newlistitems: workitems
    });
});

app.get("/about", function (req, res) {
    res.render("about");
});

app.post("/work", function (req, res) {
    const item = req.body.newitem;
    workitems.push(item);
    res.redirect("/work");
})

app.listen(3000, function () {
    console.log("Server started on port 3000");
});