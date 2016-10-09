/*
 14050-170
 13085-485
 14020-260
 1402-260

 */

$(document).ready(function () {


    function HomeViewModel() {
        $("#cep_value").mask('00000-000');

        var self = this, public_place, neighborhood, city, istate, zip_code, zip_code_temp, full_address;

        self.public_place = ko.observable("");
        self.neighborhood = ko.observable("");
        self.city = ko.observable("");
        self.istate = ko.observable("");
        self.zip_code = ko.observable("");
        self.full_address = ko.observable("");
        self.url_maps = ko.observable("");
        self.details_maps = ko.observable("");

        $("#cep_button").click(function () {
            self.public_place(public_place);
            self.neighborhood(neighborhood);
            self.city(city);
            self.istate(istate);
            self.zip_code(zip_code);
            self.full_address("");

            /* Disabled alerts messages */
            $("#cep_loading").css("display", "none");
            $("#cep_error").css("display", "none");
            $("#cep_warning").css("display", "none");

            /* Enable alerts messages */
            $("#cep_button").attr('disabled', true);
            $("#cep_loading").css("display", "block");

            /* Hiden save button */
            $("#save_cep_button").css("display", "none");

            /* Get the value CEP */
            var cep = $.trim($("#cep_value").val());
            cep = cep.replace("-", "");

            /* Check if CEP is invalid */
            if (cep == "" || cep.length < 7) {

                $("#cep_button").attr('disabled', false);
                $("#cep_loading").css("display", "none");
                $("#cep_error").css("display", "block");
                self.full_address("");

                setTimeout(function () {
                    $("#cep_error").css("display", "none");
                }, 10000);

            } else {
                /* Get the location by CEP */
                $.ajax({
                    type: "GET",
                    /*headers: {"Access-Control-Allow-Origin": "*"},*/
                    contentType: "application/json; charset=utf-8",
                    dataType: "jsonp",
                    url: "http://api.postmon.com.br/v1/cep/" + cep,
                    statusCode: {
                        200: function (data) {
                            full_address = "";
                            if (data.logradouro != null && data.bairro != null) {
                                public_place = data.logradouro;
                                neighborhood = data.bairro;
                                city = data.cidade;
                                istate = data.estado;
                                zip_code = data.cep;
                                zip_code = zip_code.substr(0, 5) + "-" + zip_code.substr(5, 8);
                                full_address = public_place + ", " + neighborhood + ", " + city + " - " + istate + ", "
                                    + zip_code;
                            } else {
                                public_place = "";
                                neighborhood = ""
                                city = data.cidade;
                                istate = data.estado;
                                zip_code = data.cep;
                                zip_code = zip_code.substr(0, 5) + "-" + zip_code.substr(5, 8);
                                full_address = city + " - " + istate + ", " + zip_code;
                            }

                            console.log(data);

                            /* Set value in inputs */
                            self.public_place(public_place);
                            self.neighborhood(neighborhood);
                            self.city(city);
                            self.istate(istate);
                            self.zip_code(zip_code);
                            self.full_address(full_address);
                            self.url_maps("http://maps.google.com/?q=" + zip_code);
                            self.details_maps("Location in Google Maps");

                            /* Hiden alerts and show save button */
                            $("#cep_button").attr('disabled', false);
                            $("#cep_loading").css("display", "none");
                            $("#save_cep_button").css("display", "initial");
                        },
                        201: function () {
                            console.log("201");
                            alerts_warning();
                        },
                        401: function () {
                            console.log("TIMEOUT: Token Access Expired");
                            alerts_warning();
                        },
                        403: function () {
                            console.log("UNAUTHORIZED: User Without Access");
                            alerts_warning();
                        },
                        404: function () {
                            console.log("ERROR 404: Not Found");
                            alerts_warning();
                        },
                        500: function () {
                            console.log("ERROR 500: Internal Server Error");
                            alerts_warning();
                        }
                    },
                    error: function (objRequest) {
                        console.log("objRequest");
                        alerts_warning();
                    }
                });
            }
        });

        $("#save_cep_button").click(function () {
            alert("Save");
        });

        /* Function to show warnings meessages */
        function alerts_warning() {
            self.full_address("");
            $("#cep_button").attr('disabled', false);
            $("#cep_loading").css("display", "none");
            $("#cep_warning").css("display", "block");

            setTimeout(function () {
                $("#cep_warning").css("display", "none");
            }, 10000);
        }
    }

    ko.applyBindings(new HomeViewModel());

});
