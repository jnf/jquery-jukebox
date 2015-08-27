$('document').ready(function() {
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

var Formatter = function(data) {
  this.data = data;
};

Formatter.prototype.build = function() {
  switch(this.data["via"]) {
    case "youtube":
      var code = this.youtube_embed();
      break;
    case "vimeo":
      var code = this.vimeo_embed();
      break;
    case "soundcloud":
      var code = this.soundcloud_embed();
      break;
    default:
      var code = this.link_to();
  }

  return $('<li></li>').html(code);  
}

Formatter.prototype.link_to = function() {
  var anchor = $('<a></a>');
  
  anchor.prop('href', this.data["url"]);
  anchor.text(this.data["artist"] + ": " + this.data["title"]);
  return anchor;
}

Formatter.prototype.youtube_embed = function() {
  var embed_reference = this.data["url"].split("=")[1];
  var iframe = $('<iframe></iframe>');

  iframe.prop("allowfullscreen","").prop('frameborder', 0);
  iframe.prop("src", "https://www.youtube.com/embed/" + embed_reference);
  return iframe;
}

Formatter.prototype.vimeo_embed = function() {
  var embed_reference = this.data["url"].split("/").pop();
  var iframe = $('<iframe></iframe>');

  iframe.prop("allowfullscreen","").prop('frameborder', 0);
  iframe.prop("src", "https://player.vimeo.com/video/" + embed_reference);
  return iframe;
}

Formatter.prototype.soundcloud_embed = function() {
  var embed_reference = encodeURI(this.data["url"]);
  var iframe = $('<iframe></iframe>');

  iframe.prop("allowfullscreen","").prop('frameborder', 0);
  iframe.prop("src", "https://w.soundcloud.com/player/?url=" + embed_reference);
  return iframe;
}
