$(function() {
  $(".search").click(function(event) {
    event.preventDefault();

    var button = $(this);
    var formTag = button.parent('form');
    var heading = formTag.siblings('h1');
    var input = formTag.children('input#artist');
    var value = input.val();
    var query = { 'artist' : value};
    var url = formTag.attr('action');
    var method = formTag.attr('method');

    $.ajax(url, {
      type: method,
      data: query,
      success: function (data) {
        heading.addClass("success");

        result_array = data;

        clear();

        for(i = 0; i < result_array.length; i++) {
          var anchor = $('<a></a>');
          anchor.text(result_array[i].artist + " " + result_array[i].title);
          anchor.prop('href', result_array[i].url);
          var line = $('<br>')

          $('body').append(anchor);
          $('body').append(line);
        }
      }
    });

  });

  function clear(){
    $('a').remove();
    $('br').remove();
  }
});
