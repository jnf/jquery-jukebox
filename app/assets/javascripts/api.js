$(function() {
  $(".btn").mouseup(function(){
    $(this).blur();
  });

  $('.search').click(function() {
    event.preventDefault();

    var form = $(this).parent();
    var url = form.attr('action');
    var method = form.attr('method');

    $.ajax(url, {
      type: method,
      data: { 'artist' : $('#artist').val() },
      success: function (data) {
        formatData(data);
      }
    });
  });

  $('.random').click(function() {
    event.preventDefault();

    var url = $(this).attr('url');
    var method = $(this).attr('method');

    $.ajax(url, {
      type: method,
      success: function (data) {
        formatData(data);
      }
    });
  });

  function formatData(data) {
    $('ul').empty();
    if (data.length == 0) {
      var listItem = $('<li></li>');
      listItem.addClass('empty');
      listItem.text('Sorry, there were no jams for this artist.');
      $('ul').append(listItem);

      var jarImage = $('<img>');
      jarImage.attr('src', '/assets/emptyjar.gif')
      $('.empty').append(jarImage);

    } else {
      for (var i = 0; i < data.length; i++) {
        var anchor = $('<a></a>');
        anchor.text(data[i].artist + " - " + data[i].title);
        anchor.prop('href', data[i].url);
        $('ul').append(anchor);
      }

      $('a').wrap('<li></li>');
    }

    $('li').addClass('list-group-item');
  }
});
