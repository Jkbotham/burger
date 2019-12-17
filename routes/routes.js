

const db = require("../models")

module.exports = function(app){

//HTML Routes
//----------------------------------------------
    app.get("/", function (req, res){
        db.Burgers.findAll({}).then(function(results){
        res.render("index", {bugers: results})
        })
    })
//----------------------------------------------



//API Routes
//----------------------------------------------

    app.post("/api/new", function(req, res){
        db.Burger.create({
            name: req.body.name,
            devoured: req.body.devoured
        }).then(function(burger){console.log(burger)})
    })

    app.post("api/:id", function(req, res){

        const reqBurger = {
            id: req.body.id,
            name: req.body.name,
            devoured: req.body.devoured
        }
        
        db.Burger.update(reqBurger, {
            where: {
                id: reqBurger.id
            }
        }).then(function(update){
            console.log(update)
        })
    })
}

//----------------------------------------------
