$('document').ready(function() {
  $('#artist-search').submit(function(event) {
    event.preventDefault();
    var artist = $(this).find('input[name=artist]').val();
    var url    = "/search/" + encodeURI(artist);

    console.log(url);
    if (artist) {
      $.get(url, function(response) {
        var anchors = $.map(response, function(data) {
          var anchor = $('<a></a>');
          
          anchor.prop('href', data["url"]);
          anchor.text(data["artist"] + ": " + data["title"]);

          return $('<li></li>').html(anchor);
        });


        $('.links').html(anchors);
      });
    }
  });  
});

var Formatter = function(data){
  this.data = data;
};

Formatter.prototype.build = function() {
  console.log(this);
  $('<li></li>').html(this.link_to(data));
}

Formatter.prototype.link_to = function(data) {

  return anchor;
}
