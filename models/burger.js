module.exports = function(sequelize, Datatype){

let Burger = sequelize.define("Burger", {
    name: Datatype.STRING,
    devoured: Datatype.BOOLEAN
});
return Burger;
}