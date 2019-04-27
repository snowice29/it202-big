$(document).ready(function () {
    $("#search").click(function (e) {
        var auth = searchDB();
        $("#output").html(auth);
        if (auth.length == 0) {
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

                    resultHtml.append("<div class=\"result\" resourceId=\"" + result["results"][i]["id"] + "\">" + "<img src=\"" + image + "\" />" + "<p><a>" + "<strong> Title: </strong>" + result["results"][i]["original_title"] + "<strong> Rating: </strong> " + result["results"][i]["vote_average"] + "<strong> Released: </strong>" + result["results"][i]["release_date"] + "</a></p></div>");
                }

                resultHtml.append("</div>");
                $("#output").html(resultHtml);

            },
            error: function (xhr, status, error) {
                $("#output").html("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
            }
        });
    }

    function searchDB() {
        var erroroutput = "";
        if ($("#searchInput").val() == "") {
            erroroutput += "Enter Search Text";
        }
        return erroroutput;
    }
});



