var Formatter = function(data) {
  this.data = data;
};

Formatter.prototype.build = function() {
  var via_method = this.data["via"];
  var method     = this[via_method] || this["link_to"];

  return method.call(this) //execute the method in the current context
}

Formatter.prototype.link_to = function() {
  var anchor = $('<a></a>');
  
  anchor.prop('href', this.data["url"]);
  anchor.text(this.data["artist"] + ": " + this.data["title"]);
  return anchor;
}

Formatter.prototype.youtube = function() {
  var embed_reference = this.data["url"].split("=")[1];
  var iframe = $('<iframe></iframe>');

  iframe.prop("allowfullscreen","").prop('frameborder', 0);
  iframe.prop("src", "https://www.youtube.com/embed/" + embed_reference);
  return iframe;
}

Formatter.prototype.vimeo = function() {
  var embed_reference = this.data["url"].split("/").pop();
  var iframe = $('<iframe></iframe>');

  iframe.prop("allowfullscreen","").prop('frameborder', 0);
  iframe.prop("src", "https://player.vimeo.com/video/" + embed_reference);
  return iframe;
}

Formatter.prototype.soundcloud = function() {
  var embed_reference = encodeURI(this.data["url"]);
  var iframe = $('<iframe></iframe>');

  iframe.prop("allowfullscreen","").prop('frameborder', 0);
  iframe.prop("src", "https://w.soundcloud.com/player/?url=" + embed_reference);
  return iframe;
}
