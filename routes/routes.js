

const db = require("../models")

module.exports = function(app){

//HTML Routes
//----------------------------------------------
    app.get("/", function (req, res){
        db.Burger.findAll({
        }).then(function(results){
        //   console.log(JSON.stringify(results))
        res.render("index", {burger: results})
        })
    })
//----------------------------------------------



//API Routes
//----------------------------------------------
    
    // Creates new entery in database
    //----------------------------------------------
        app.post("/api/new", function(req, res){
            console.log(req.body)
            db.Burger.create({
                name: req.body.name,
                devoured: req.body.devoured
            }).then(function(results){
                res.end();
            })
        })

    // Updates burgers to Devoured in database
    //----------------------------------------------
        app.post("/api/", function(req, res){

            const reqBurger = {
                name: req.body.name,
                devoured: true
            }
        
            db.Burger.update(reqBurger, {
                where: {
                    id: req.body.id
                }
            }).then(function(){
                res.end();
            })
        })
}
//----------------------------------------------
