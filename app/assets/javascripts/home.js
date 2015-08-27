$(function() {
  $(".submit").click(function(event) {
    event.preventDefault();
    var form_tag = $(this).parent("form");
    var method = form_tag.attr("method");
    console.log(method);
    var search_field = $(this).siblings("input[type=text]").val();
    var url = form_tag.attr("action") + "/" + search_field;
    $(".results").empty();
    $.ajax(url, {
      type: method,
      success: function (data) {
        if (data.length == 0) {
          $(".results").append("Uhh, what's that you wanted?");
          $('<iframe />');
          $('<iframe />', {
            class: 'giphy',
            src: 'http://giphy.com/embed/tUmqyBrCWAyTC'
          }).appendTo(".results");

        } else {
          for (var i = 0; i < data.length; i++) {
            var nextline = $("<br><br>");
            if (data[i].via == 'youtube' ) {
              var url = data[i].url;
              var yt_link = url.substr(url.indexOf("=") + 1);
              $('<iframe />');
              $('<iframe />', {
                class: 'youtube',
                src: 'https://www.youtube.com/embed/' + yt_link
              }).appendTo(".results");
            } else if (data[i].via == 'vimeo' ) {
              var url = data[i].url;
              var vim_link = url.substr(url.lastIndexOf("/") + 1);
              $('<iframe />');
              $('<iframe />', {
                class: 'vimeo',
                src: 'https://player.vimeo.com/video/' + vim_link
              }).appendTo(".results");
            } else {
              var anchor = $("<a></a>");
              var url = data[i].url;
              var vim_link = url.substr(url.lastIndexOf("/") + 1);
              anchor.text("Artist: " + data[i].artist +
                          ", Song: " + data[i].title +
                          " via: " + data[i].via);
              anchor.prop("href", data[i].url); //look up diff between attr and prop
              anchor.attr('target','_blank');
              $(".results").append(anchor);
            }
            $(".results").append(nextline);
          }
        }
       $("input[type=text]").val("");
      }
    });
  });
});
//<iframe width="560" height="315" src="https://www.youtube.com/embed/spm5-SXo4Do" frameborder="0" allowfullscreen></iframe>
//<iframe src="https://player.vimeo.com/video/115917481" width="500" height="375" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> <p><a href="https://vimeo.com/115917481">Led Zeppelin - Immigrant Song - YouTube</a> from <a href="https://vimeo.com/bobsonlinemarktplace">Robert Tischner</a> on <a href="https://vimeo.com">Vimeo</a>.</p>
