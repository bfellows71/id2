

$(document).ready(function(){
    $(".clickable-1, .clickable-2, .clickable-3, .clickable-4").click(function(){
        $(this).next().slideToggle();
    });
});
