$(function() {
  $(".button_to").submit(function(event) {
    event.preventDefault();
    var url = $(this).attr("action");
    var method = $(this).attr("method") ? $(this).attr("method") : "get";

    console.log(url);
    console.log(method);

    $.ajax(url, {
      type: method,
      success: function (data) {
        for (i = 0; i < data.length; i++) {
          var anchor = $('<a></a>');
          $('ul').append('<li></li>').append(anchor);
          anchor.text(data[i].artist + "," + data[i].title);
          anchor.prop("href", data[i].url);
        }
      }
    })
  });
});

