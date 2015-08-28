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

        display(result_array);
      }
    });
  });

  $(".popular").click(function(event){
    event.preventDefault();

    var button = $(this);
    var method = this.method;
    var url = this.action;
    clear();

    $.ajax(url, {
      type: method,
      success: function (data) {
        result_array = data;
        display(result_array);
      }
    })
  });

  $(".rando").click(function(event){
    event.preventDefault();

    var button = $(this);
    var method = this.method;
    var url = this.action;
    clear();

    $.ajax(url, {
      type: method,
      success: function (data) {
        result_array = data;
        display(result_array);
      }
    })
  });

  function display(result_array){
    var list = $('<ul></ul>')
    list.addClass('list-group')

    //Displays if no results are found. Try to refactor to not repeat code
    if (result_array.length == 0) {
        var listItem = $('<li></li>');
        listItem.addClass('list-group-item');
        iframe = failed_search();
        $(listItem).append(iframe);
        list.append(listItem);

    } else {
      for(i = 0; i < result_array.length; i++) {
        var listItem = $('<li></li>');
        listItem.addClass('list-group-item')
          if (result_array[i].via == 'youtube'){
              iframe = embed_youtube(result_array[i].url);
              $(listItem).append(iframe);
          } else if (result_array[i].via == 'vimeo') {
              iframe = embed_vimeo(result_array[i].url);
              $(listItem).append(iframe);
          } else  {
              anchor = makeLink(result_array[i]);
              $(listItem).append('Click to listen -> ');
              $(listItem).append(anchor);
          }
        list.append(listItem);
    }
  }

   $('div').append(list);
  }

  //clears results of old searchs or API calls
  function clear(){
    $('a').remove();
    $('br').remove();
    $('iframe').remove();
    $('ul').remove();
    $('li').remove();
  }

  function makeLink(url){
     var anchor = $('<a class="song"></a>');
      anchor.text(result_array[i].artist + " " + result_array[i].title);
      anchor.prop('href', result_array[i].url);

      return anchor
  }

  function embed_youtube(url) {
    var new_url = url.replace('http://', 'https://');
    var new_url = url.replace('watch?v=', "embed/");

    var iframe = $('<iframe width="560" height="315" src="' + new_url + '" frameborder="0" allowfullscreen></iframe>');

    return iframe
  }

  function embed_vimeo(url){
    var new_url = url.replace('http://vimeo.com/', 'https://player.vimeo.com/video/');

     var iframe = $('<iframe src="' + new_url + '" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');

      return iframe
  }

  function failed_search(){
    var iframe = $('<iframe width="560" height="315" src="https://www.youtube.com/embed/-WvmuqggTmY" frameborder="0" allowfullscreen></iframe>')

    return iframe
  }

});
