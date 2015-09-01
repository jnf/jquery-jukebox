$('document').ready(function() {
  $('.popular_jams').click(function(event) {
    event.preventDefault();

    console.log('popular');
    $.get("http://api.thisismyjam.com/1/explore/popular.json", function(response) {
      console.log(response)
    })
  });

  $('#artist-search').submit(function(event) {
    event.preventDefault();
    var artist = $(this).find('input[name=artist]').val();
    var url    = "/search/" + encodeURI(artist);

    if (artist) {
      $.get(url, function(response) {
        var anchors = $.map(response, function(data) {
          var formatter = new Formatter(data);
          return $('<li></li>').html(formatter.build());
        });

        $('.links').html(anchors);
      });
    }
  });  
});
