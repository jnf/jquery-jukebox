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

        if (result_array.length == 0){
          failed_search();
        } else {
          for(i = 0; i < result_array.length; i++) {
            if (result_array[i].via == 'youtube'){
                embed_youtube(result_array[i].url);
            } else if (result_array[i].via == 'vimeo') {
                embed_vimeo(result_array[i].url);
            } else  {
                makeLink(result_array[i]);
            }
          }
        }
        }
    });

  });

  function clear(){
    $('a').remove();
    $('br').remove();
    $('iframe').remove();
  }

  function makeLink(url){
     var anchor = $('<a class="song"></a>');
      anchor.text(result_array[i].artist + " " + result_array[i].title);
      anchor.prop('href', result_array[i].url);

      $('div').append(anchor);

  }

  function embed_youtube(url) {
    var new_url = url.replace('http://', 'https://');
    var new_url = url.replace('watch?v=', "embed/");

    var iframe = $('<iframe width="560" height="315" src="' + new_url + '" frameborder="0" allowfullscreen></iframe>');

    $('div').append(iframe);
  }

  function embed_vimeo(url){
    var new_url = url.replace('http://vimeo.com/', 'https://player.vimeo.com/video/');

     var iframe = $('<iframe src="' + new_url + '" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');

      $('div').append(iframe);
  }

  function failed_search(){
    var iframe = $('<iframe width="560" height="315" src="https://www.youtube.com/embed/-WvmuqggTmY" frameborder="0" allowfullscreen></iframe>')

    $('div').append(iframe);
  }
});
