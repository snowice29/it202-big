// for multiscreen
$(document).ready(function () {
    function hideScreens() {
        $(".content").hide();
    }
    $(".nav-link").on("click", function () {
        hideScreens();
        var target = $(this).attr("href");
        $(target).show();
    });
});

