module.exports = function(sequelize, Datatype){

const Burger = sequelize.define("Buger", {
    name: Datatype.STRING,
    devoured: Datatype.BOOLEAN
});
return Burger;
}