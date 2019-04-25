$(document).ready(function () {
    $("#search").click(function (e) {
        var validate = Validate();
        $("#output").html(validate);
        if (validate.length == 0) {
            CallAPI(1);
        }
    });


    // https://api.themoviedb.org/3/search/multi?api_key=5097001ce81d7992e77ee1c379801e36&language=en-US&query=TOm&page=1&include_adult=false
    

    function CallAPI(page) {
        $.ajax({
            url: "https://api.themoviedb.org/3/search/movie?language=en-US&query=" + $("#searchInput").val() + "&page=" + page + "&include_adult=false",
            data: { "api_key": "5097001ce81d7992e77ee1c379801e36" },
            dataType: "json",
            success: function (result, status, xhr) {
                var resultHtml = $("<div class=\"resultDiv\"><p>Results:</p>");
                for (i = 0; i < result["results"].length; i++) {
 
                    var image = result["results"][i]["poster_path"] == null ? "Image/no-image.png" : "https://image.tmdb.org/t/p/w500/" + result["results"][i]["poster_path"];

                    resultHtml.append("<div class=\"result\" resourceId=\"" + result["results"][i]["id"] + "\">" + "<img src=\"" + image + "\" />" + "<p><a>" + "<strong> Title: </strong>" + result["results"][i]["original_title"] + "<strong> Rating: </strong> "+ result["results"][i]["vote_average"] + "<strong> Released: </strong>" + result["results"][i]["release_date"] +"</a></p></div>");
                }
 
                resultHtml.append("</div>");
                $("#output").html(resultHtml);

            },
            error: function (xhr, status, error) {
                $("#output").html("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
            }
        });
    }
 
    function Validate() {
        var erroroutput = "";
        if ($("#searchInput").val() == "") {
            erroroutput += "Enter Search Text";
        }
        return erroroutput;
    }
});

// for map
    // Initialize and add the map
    function initMap() {
        var chicago = { lat: 41.8781, lng: -87.6298 };
        var map = new google.maps.Map(
            document.getElementById('map'), { zoom: 14, center: chicago });
        $.get("https://data.cityofchicago.org/resource/cdmx-wzbz.json",
            function (response) {
                console.log("in data callback");
                var data = response;
                createMarkers(map, data);
            });
    }
    function createMarkers(map, data) {
        // console.log(data);
        $.each(data, function (i, v) {
            var location = { lat: parseFloat(v.latitude), lng: parseFloat(v.longitude) }
            var marker = new google.maps.Marker({ position: location, map: map });
            var contentString = '<strong>Address</strong>: ' + v.street_address + ', <strong>Service Request</strong>: ' + v.service_request_number + ', <strong>Where the graffiti is located: </strong>' + v.where_is_the_graffiti_located_ + ', <strong>Surface: </strong>' + v.what_type_of_surface_is_the_graffiti_on_ + ', <strong>Status: </strong>' + v.status +
                ', <strong>Completion Date: </strong>' + v.completion_date;
            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });
            
            marker.infowindow = infowindow;
            marker.addListener('click', function () {
                infowindow.open(map, marker);
            });
        });
    }

    
