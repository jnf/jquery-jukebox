$(function () {
  $(".search").click(function(event) {
    event.preventDefault();
    var method = $(this).parent("form").attr("method");
    var artist = $(this).siblings("input[type=text]").val();
    var url = "/search/" + artist;

    $.ajax(url, {
      type: method,
      dataType: "json",
      success: function (data) {
        removePreviousResults();

        if (data.length < 1) {
          $("body").append("<p class='no-results-message'>NO HAY JAMS. SEARCH AGAIN.</p>");
        } else {
          listAllSongs(data);
        }
      }
    });
  });

  $(".random").click(function(event) {
    event.preventDefault();
    var url = $(this).attr("url");
    var method = $(this).attr("method");

    $.ajax(url, {
      type: method,
      dataType: "json",
      success: function (data) {
        removePreviousResults();

        listAllSongs(data);
      }
    });
  });

  $(document).on("click", ".click-for-video", function(event) {
    event.preventDefault();
    console.log("I worked!!!!");
    var song = $(this);
    $("iframe").remove();
    $('.media-body').prepend(youtubeVideoStructure(song));
  });
});

function removePreviousResults() {
  $('.media-body').remove();
  $('.no-results-message').remove();
}

function listAllSongs(data) {
  $("body").append("<div class='media-body row'></div>");
  data.forEach(printSong);
}

function printSong(element) {
  $('.media-body').append(songStructure(element));
}

function youtubeVideoStructure(song) {
  var url = song.attr("url");
  var iframe = $('<iframe width="640" height="360"></iframe>');
  var urlCode = url.slice(-11, url.length);
  var embedUrl = "http://www.youtube.com/embed/" + urlCode;
  iframe.prop("src", embedUrl);
  return iframe;
}

function songStructure(element) {
    var colSizeDiv = $("<div class='col-md-3'></div>");
      var thumbnailDiv = $("<div class='thumbnail'></div>");
        // if the media is youtube -> don't make a link, add a class that you can click on
        // if the media is not youtube -> make a link
        var img = $("<img>");
        img.prop("src", element.thumbnail);

        if (element.via == "youtube") {
          img.addClass("click-for-video");
          img.attr("url", element.url);
          thumbnailDiv.append(img);
        } else {
          var link = $("<a>");
          link.attr("href", element.url);
          link.append(img);
          thumbnailDiv.append(link);
        }

        var caption = $("<div class='caption'></div>");
          var title = $("<h3></h3>");
          title.text(element.title);
          var artist = $("<p></p>");
          artist.text(element.artist);
          caption.append(title);
          caption.append(artist);
        thumbnailDiv.append(caption);
      colSizeDiv.append(thumbnailDiv);
  return colSizeDiv;
}
