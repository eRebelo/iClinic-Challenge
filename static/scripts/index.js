$(document).ready(function () {

    $("#cep_button").click(function () {
        $("#cep_button").attr('disabled', true);
        $("#cep_loading").css("display", "block");

        var cep = $.trim($("#cep_value").val());

        if (cep == "" || cep.length < 8) {

            $("#cep_button").attr('disabled', false);
            $("#cep_loading").css("display", "none");
            $("#cep_error").css("display", "block");

            setTimeout(function () {
                $("#cep_error").css("display", "none");
            }, 10000);

        } else {

            $.ajax({
                type: "GET",
                //headers: { "Authorization": 'Bearer ' + token },
                header: ("Access-Control-Allow-Origin: *"),
                contentType: "application/json; charset=utf-8",
                dataType: "jsonp",
                url: "http://api.postmon.com.br/v1/cep/" + cep,
                statusCode: {
                    200: function (data) {
                        //self.projects([]);
                        //self.projects(data.items);
                        //$('[data-toggle="tooltip"]').tooltip();
                        /*for (var i in data) {
                            for (var j in data[i]) {
                                console.log(data[i][j].nameProject);
                            }
                        }*/
                        console.log(data)
                    },
                    401: function () {
                        console.log("TIMEOUT: token access expired");
                    },
                    403: function () {
                        console.log("UNAUTHORIZED: user without access");
                    },
                    500: self.showErrorMessage
                }
            }).error(function () {
                console.log("UNAUTHORIZED: user without access");
            });

            $("#cep_button").attr('disabled', false);
            $("#cep_loading").css("display", "none");
        }


    });
});
