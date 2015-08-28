var emptyResponseUrl = "https://www.youtube.com/embed/B62P6Gm9jpE?rel=0&autoplay=1";
var noArtistMessage = "No one has heard of that artist! You must be the coolest!";
var failedRandoMessage = "Our randomizer broke! Try again.";
var errorMsg = "Something terrible has happened. Run for the hills.";
var startIndex = 1;
var sweep = "li, iframe, a, .btn-play, .fa, .message, .first-song";

$(function() {
  $(".btn-search").click(function(event) {
    event.preventDefault();
    var artist = $(".artist").val();
    var url = ("/search/" + artist);

    $.getJSON(url, function(data) {
      $(sweep).remove();
      if (data.length === 0) {
        noData(noArtistMessage);
      } else {
        var firstResult = data[0];
        displayOne(firstResult);
        if (firstResult.via === "youtube") { showYoutube(firstResult.url); }
        if (firstResult.via === "vimeo") { showVimeo(firstResult.url); }
        if (firstResult.via === "soundcloud") { hearSoundcloud(firstResult.url); }

        displayTIMJdata(data);
      }
    }).fail(function() {
      alert(errorMsg);
    });
  });


  $(".btn-chance").click(function(event) {
    event.preventDefault();
    var url = ("/chance");

    $.getJSON(url, function(data) {
      $(sweep).remove();

      if (data.length === 0) {
        noData(failedRandoMessage);
      } else {
        var firstResult = data[0];
        displayOne(firstResult);
        if (firstResult.via === "youtube") { showYoutube(firstResult.url); }
        if (firstResult.via === "vimeo") { showVimeo(firstResult.url); }
        if (firstResult.via === "soundcloud") { hearSoundcloud(firstResult.url); }

        displayTIMJdata(data);
      }
    }).fail(function() {
      alert(errorMsg);
    });
  });

});

function noData(message) {
  var frame = $("<iframe id='frame' width='640' height='360' src='' frameborder='0' autoplay='1' allowfullscreen></iframe>");
  var addMessage = $("<h4 class='message'>" + message + "</h4>");
  $(".vid-frame").prepend(addMessage);
  $(".vid-frame").append(frame);
  frame.attr("src", emptyResponseUrl);
}

function displayTIMJdata(data) {
  for (var i = startIndex; i < data.length; i++) {
    var thisArtist = data[i];
    var id = "song" + i;
    var listItem = $('<li class="list-item"></li>');
    var anchor = $('<a></a>');

    anchor.text(thisArtist.artist + ", " + thisArtist.title);
    anchor.prop("href", thisArtist.url);
    $(listItem).append(anchor);

    if (thisArtist.via === "youtube") {
      var youtubeIcon = $('<button class="btn btn-play" id=' + id + '><i class="fa fa-youtube-play fa-lg"></i></button>');
      listItem.append(youtubeIcon);
    } else if (thisArtist.via === "vimeo") {
      var vimeoIcon = $('<button class="btn btn-play" id=' + id + '><i class="fa fa-vimeo-square fa-lg"></i></button>');
      listItem.append(vimeoIcon);
    } else if (thisArtist.via === "soundcloud") {
      var soundcloudIcon = $('<button class="btn btn-play" id=' + id + '><i class="fa fa-soundcloud fa-lg"></i></button>');
      listItem.append(soundcloudIcon);
    } else {
      var linkIcon = $('<a href=' + thisArtist.url + ' class="link-icon"><i class="fa fa-link fa-lg"></i></a>');
        $(listItem).append(linkIcon);
    }

    $('ul').append(listItem);
    youtubeOnClick(thisArtist, id);
    vimeoOnClick(thisArtist, id);
    soundcloudOnClick(thisArtist, id);
  }
}

function showYoutube(url) {
  var frame = $("<iframe id='frame' width='448' height='252' src='' frameborder='0' autoplay='1' allowfullscreen></iframe>");
  $(".vid-frame").prepend(frame);
  url = url.replace("watch?v=", "/embed/");
  frame.attr("src", url + "?rel=0&autoplay=1");
}

// On click, show youtube
function youtubeOnClick(song, id) {
  $("#" + id).click(function(event) {
    event.preventDefault();

      if (song.via === "youtube") {
        $("iframe").remove();

        var frame = $("<iframe id='frame' width='448' height='252' src='' frameborder='0' allowfullscreen></iframe><br>");
        $("#" + id).append(frame);
        song.url = song.url.replace("watch?v=", "/embed/");
        frame.attr("src", song.url + "?rel=0");
      }
  });
}

function showVimeo(url) {
  var frame = $("<iframe id='frame' width='450' height='300' src='' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>");
  $(".vid-frame").prepend(frame);
  url = url.replace("http://vimeo.com", "https://player.vimeo.com/video");
  frame.attr("src", url);
}

// On click, show vimeo
function vimeoOnClick(song, id) {
  $("#" + id).click(function(event) {
    event.preventDefault();
    if (song.via === "vimeo") {

      $("iframe").remove();

      var frame = $("<iframe id='frame' width='450' height='300' src='' frameborder='0' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe><br>");
      $("#" + id).append(frame);
      song.url = song.url.replace("http://vimeo.com", "https://player.vimeo.com/video");
      frame.attr("src", song.url);
    }
  });
}

function hearSoundcloud(url) {
  var frame = $("<iframe id='frame' width='100%' scrolling='no' src=''></iframe>");
  // TODO: rename vid-frame
  $(".vid-frame").prepend(frame);
  url = url.replace("http:", "https://w.soundcloud.com/player/?url=https%3A");
  frame.attr("src", url);
}

// On click, show soundcloud player
function soundcloudOnClick(song, id) {
  $("#" + id).click(function(event) {
    event.preventDefault();
    if (song.via === "soundcloud") {

      $("iframe").remove();

      var frame = $("<iframe id='frame' width='450' scrolling='no' src=''></iframe><br>");
      $("#" + id).append(frame);
      song.url = song.url.replace("http:", "https://w.soundcloud.com/player/?url=https%3A");
      frame.attr("src", song.url);
    }
  });
}

function displayOne(result) {
  var title = $('<h4 class="first-song"></h4>');
  var anchor = $('<a></a>');
  anchor.text(result.artist + ", " + result.title);
  anchor.prop("href", result.url);
  title.append(anchor);
  $(".vid-frame").prepend(title);
}
