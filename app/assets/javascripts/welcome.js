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
  // if (element.via == "youtube") {
  //   $('.media-body').append(youtubeVideoStructure(element));
  // }
}

function youtubeVideoStructure(element) {
  var iframe = $('<iframe width="640" height="360"></iframe>');
  var urlCode = element.url.slice(-11, element.url.length);
  var embedUrl = "http://www.youtube.com/embed/" + urlCode;
  iframe.prop("src", embedUrl);
  return iframe;
}

function songStructure(element) {
    var colSizeDiv = $("<div class='col-md-3'></div>");
      var thumbnailDiv = $("<div class='thumbnail'></div>");
        var link = $("<a>");
        link.prop("href", element.url);
          var img = $("<img>");
          img.prop("src", element.thumbnail);
          link.append(img);
        var caption = $("<div class='caption'></div>");
          var title = $("<h3></h3>");
          title.text(element.title);
          var artist = $("<p></p>");
          artist.text(element.artist);
          caption.append(title);
          caption.append(artist);
        thumbnailDiv.append(link);
        thumbnailDiv.append(caption);
      colSizeDiv.append(thumbnailDiv);
  return colSizeDiv;
}
