$(function () {
  $("form").submit(function(event) {
    event.preventDefault();
    var button = $(":submit");
    var form = $("form");
    var method = form.attr("method");
    var url = form.attr("action");
    $.ajax(url, {
      type: method,
      success: function(data) {
        console.log(data);
      }
    });
  });
});

// var anchor = $("<a></a>"); // new anchor element
// anchor.text("text on the page");
// anchor.prop("href", "/link/to/place");
// $("body").append(anchor); // <a href="/link/to/place">text on the page</a>
