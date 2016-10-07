$(document).ready(function () {

    console.log("CLICK, DISCONECTED!");

    $("#cep_button").click(function () {
        var cep = $.trim($("#cep_value").val());
        alert(cep.length);
        if (cep == "" || cep.length < 8) {
            $("#cep_error").css("display", "block");
            setTimeout(function() {
                $("#cep_error").css("display", "none");
            }, 10000);
        } else {

        }


    });
});
