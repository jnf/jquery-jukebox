$(function() {
  $(".search").submit(function(event) {
    event.preventDefault();

    var formTag= $(this);
    var url = formTag.attr("action");
    var method = formTag.attr("method");
    var value = $("#search_artist").val();
    var query = { artist: value }
    $(".results").empty();

    $.ajax(url, {
      type: method,
      dataType: "json",
      data: query,
      complete: function() {},
      success: function (data) {
        if (data.length == 0) {
          alert("This artist doesn't exist");
      } else {

          for (i = 0; i < data.length; i++) {
            var url = data[i].url
            var anchor = $('<a></a>');
            $('ul').append('<li></li>');
            $('li').append(anchor);
            anchor.text(data[i].artist + "," + data[i].title);
            anchor.prop("href", url);

            if (data[i].via == "youtube") {
              var videoId = url.match(/=(.*)/)[1];
              getYouTube(videoId);
          } else if (data[i].via == "vimeo") {
              var videoId = url.match(/(\/(?=[^\/]*$).*)/)[1];
              getVimeo(videoId);

            }
          };
        }
      },
      error: function() {
        alert("This is not")
      }
    });

      function getYouTube(videoId) {
        $('li:last-child').append('<div></div>')
        // $('li:last-child div').addClass('embed-responsive embed-responsive-16by9');
        // $('.embed-responsive:last-child').append('<iframe />');
        $('div:last-child').append('<iframe />');
        $('iframe:last-child').addClass("embed-responsive-item");
        $("iframe:last-child").attr("src", "http://www.youtube.com/embed/" + (videoId));
      };

      function getVimeo(videoId) {
        $('li:last-child').append('<div></div>')
        // $('li:last-child div').addClass('embed-responsive embed-responsive-16by9');
        // $('.embed-responsive:last-child').append('<iframe />');
        $('div:last-child').append('<iframe />');
        $('iframe:last-child').addClass("embed-responsive-item");
        $("iframe:last-child").attr("src", "https://player.vimeo.com/video" + (videoId))
      };

      $("input[type=text]").val("");
    // })

    // $.ajax(url, {
    //   type: method;
    //   dataType: "json";
    //   success: function(data) {
    //     console.log(data)
    //   }
    // })
  });
})
