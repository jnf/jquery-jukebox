$(function() {
  $(".submit").click(function(event) {
    var form_tag = $(this).parent("form");
    var search_field = $(this).siblings("input[type=text]").val();
    var url = form_tag.attr("action") + "/" + search_field;
    apiCall(event, url);
  });
  $(".popular").click(function(event) {
    var url = "/popular";
    apiCall(event, url);
  });
  $(".random").click(function(event) {
    var url = "/randomizer";
    apiCall(event, url);
  });
});

function apiCall(event, url) {
  event.preventDefault();
  $(".results").empty();
  $.ajax(url, {
    type: "get",
    success: function (data) {
      parseResults(data);
    }
  });
}

function parseResults(data) {
  if (data.length == 0) {
    noResults(data);
  } else {
    displayResults(data);
  }
 $("input[type=text]").val("");
}

function displayResults(data) {
  for (var i = 0; i < data.length; i++) {
    var nextline = $("<br><br>");
    var via = data[i].via;
    var url = data[i].url;
    if (via == 'youtube' ) {
      embedYt(url);
    } else if (via == 'vimeo' ) {
      embedVim(url);
    } else {
      createLink(data, i);
    }
    $(".results").append(nextline);
  }
}

function embedYt(url) {
  var yt_link = url.substr(url.indexOf("=") + 1);
  $('<iframe />');
  $('<iframe />', {
    class: 'youtube',
    src: 'https://www.youtube.com/embed/' + yt_link
  }).appendTo(".results");
}

function embedVim(url) {
  var vim_link = url.substr(url.lastIndexOf("/") + 1);
  $('<iframe />');
  $('<iframe />', {
    class: 'vimeo',
    src: 'https://player.vimeo.com/video/' + vim_link
  }).appendTo(".results");
}

function createLink(data, i) {
  var anchor = $("<a></a>");
  anchor.text("Artist: " + data[i].artist +
              ", Song: " + data[i].title +
              " via: " + data[i].via);
  anchor.prop("href", data[i].url); //look up diff between attr and prop
  anchor.attr('target','_blank');
  anchor.addClass("link-style");
  $(".results").append(anchor);
}

function noResults(data) {
  $(".results").append("Uhh, what's that you wanted?");
  $(".results").append("<br>");
  $('<iframe />');
  $('<iframe />', {
    class: 'giphy',
    src: 'http://giphy.com/embed/tUmqyBrCWAyTC'
  }).appendTo(".results");
}
