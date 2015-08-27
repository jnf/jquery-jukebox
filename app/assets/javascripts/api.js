$(function() {
  $(".search").click(function(event) {
    event.preventDefault();

    var button = $(this);
    var formTag = button.parent('form');
    var input = formTag.children('input#artist');
    var value = input.val();
    var query = { 'artist' : value };
    var url = formTag.attr('action');
    var method = formTag.attr('method');

    $.ajax(url, {
      type: method,
      data: query,
      success: function (data) {
        result_array = data;
        clear();

        for(i = 0; i < result_array.length; i++) {
          if (result_array[i].via != 'youtube') {
            var anchor = $('<a></a>');
            anchor.text(result_array[i].artist + " " + result_array[i].title);
            anchor.prop('href', result_array[i].url);
            var line = $('<br>')

            $('div').append(anchor);
            $('div').append(line);
          } else if (result_array[i].via == 'youtube'){
              embed(result_array[i].url);

          }

          }
        }
    });

  });

  function clear(){
    $('a').remove();
    $('br').remove();
  }

  function embed(url) {

    var new_url = url.replace('http://', 'https://')
    var new_url = url.replace('watch?v=', "embed/")

    var iframe = $('<iframe width="560" height="315" src=' + new_url +  'frameborder="0" allowfullscreen></iframe>')

    $('div').append(iframe);

  }
});
