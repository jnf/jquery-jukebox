$(function() {
  $("input[type=submit]").click(function(event) {
    event.preventDefault();
    var form_tag = $(this).parent("form");
    var method = form_tag.attr("method");
    var search_field = $(this).siblings("input[type=text]").val();
    var url = form_tag.attr("action") + "/" + search_field;
    $(".results").empty();
    $.ajax(url, {
      type: method,
      success: function (data) {

       for (var i = 0; i < data.length; i++) {
         var anchor = $("<a></a>");
         var nextline = $("<br><br>");
         anchor.text("Artist: " + data[i].artist + ", Song: " + data[i].title);
         anchor.prop("href", data[i].url); //look up diff between attr and prop
         $(".results").append(anchor);
         $(".results").append(nextline);
       }
      }
    });
  });
});
