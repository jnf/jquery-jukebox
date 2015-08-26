$(function() {
  $(".search").click(function() {
    event.preventDefault();

    $('ul').empty();

    var form = $(this).parent();
    var url = form.attr("action");
    var method = form.attr("method");

    $.ajax(url, {
      type: method,
      data: { 'artist' : $("#artist").val() },
      success: function (data) {
        formatData(data);
      }
    });
  });

  function formatData(data) {
    for (var i = 0; i < data.length; i++) {
      var anchor = $('<a></a>');
      anchor.text(data[i].artist + " - " + data[i].title);
      anchor.prop('href', data[i].url);
      $('ul').append(anchor);

      $('a').wrap('<li></li>');
    }
  }
});
