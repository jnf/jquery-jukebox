$(document).ready(function() {
  $(".search").click(function(event) {
    event.preventDefault();
    var button = $(this);
    var searchBox = button.siblings("input[type=text]")
    var formTag = button.parent();
    var body = formTag.parent();
    var url = "/search/" + searchBox.val(); 
    var method = formTag.attr("method");

    $.ajax(url,{
      type: method,
      dataType: "json",
      success: function (data) {
        console.log(data);
        body.append("hi mom");
      }
    });
  });
});
