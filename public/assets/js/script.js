

$(document).ready(function() {

    // Posts burger name to server to be saved in database
    //----------------------------------------------
    $(".subButton").on("click", function (event) {
        event.preventDefault();
        console.log($("#newBurger").val());

        let newBurger = {
            name: $("#newBurger").val().trim(),
            devoured: false
        }

        $.post("/api/new", newBurger).then(function(){
            location.reload();
        })
    })

    // Posts ID to update devoured to true after being devoured
    //----------------------------------------------
    $(".burgerBtn").on("click",function(){

        let = burgerData = {
             id: $(this).data().id,
             name: $(this).data().name
        }

        $.post("/api/", burgerData).then(function(){
            window.location.reload();
        })
    })
})