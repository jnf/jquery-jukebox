$(function() {
  $("input[value='Search']").click(function(event) {
    event.preventDefault();

    var artist = $("input[type='text']").val();
    var url = "/search/" + artist;
    var method = $('form').attr("method")

    $('.result').remove();
    $('.no-result').remove();

    $.ajax(url, {
      type: method,
      success: function(data) {
        var results = data.forEach(displayResults)
        $('a').wrap( "<div class='result'></div>" );
        $('iframe').wrap("<span class='result'></span>");
        // display no results found
        if (data.length == 0) {
          $('body').append("<div class='no-result'>no results found</div>");
        }
      }
    });
  });

  $("input[value='Hot']").click(function(event) {
    event.preventDefault();

    var url = "/popular";
    var method = $('form').attr("method")

    $('.result').remove();
    $('.no-result').remove();

    $.ajax(url, {
      type: method,
      dataType: "json",
      success: function(data) {
        var result = data[Math.floor(Math.random() * data.length)];
        displayResults(result);
        $('a').wrap("<div class='result'></div>");
        $('iframe').wrap("<span class='result'></span>");
      }
    });
  });

  $("input[value='Rand']").click(function(event) {
    event.preventDefault();

    var url = "/random";
    var method = $('form').attr("method")

    $('.result').remove();
    $('.no-result').remove();

    $.ajax(url, {
      type: method,
      dataType: "json",
      success: function(data) {
        var result = data[Math.floor(Math.random() * data.length)];
        displayResults(result);
        $('a').wrap( "<div class='result'></div>" );
        $('iframe').wrap("<span class='result'></span>");
      }
    });
  });
});

// display each result as a video or link
function displayResults(result) {
  var iframe = $('<iframe width="300" height="170"></iframe>')

  if (result.via == 'youtube') {
    var yt_video_id = result.url.slice(31)
    var youtube = "//www.youtube.com/embed/"
    var youtube_link = youtube + yt_video_id
    iframe.prop("src", youtube_link)
    $('div').append(iframe);
  } else if (result.via == 'vimeo') {
    var vim_video_id = result.url.slice(17)
    var vimeo = "//player.vimeo.com/video/"
    var vimeo_link = vimeo + vim_video_id
    console.log(vimeo_link)
    iframe.prop("src", vimeo_link)
    $('div').append(iframe);
  } else {
    var anchor = $('<a></a>')
    anchor.text(result.artist + ": " + result.title);
    anchor.prop('href', result.url);
    $('div').append(anchor);
  }
}
