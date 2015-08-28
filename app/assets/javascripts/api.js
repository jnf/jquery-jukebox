$(function() {
  $(".artist-search").click(function(event) {
    event.preventDefault();

    var button = $(this);
    // console.log(button);
    var formTag = button.parent();
    // console.log(formTag);
    var myValue = button.siblings("#artist").val();
    // console.log(myValue)
    var url = formTag.attr("action");
    // console.log(url);
    var method = formTag.attr("method");
    // console.log(method);
    var artist_params = { artist: myValue };
    // console.log(artist_params);

    // ajax makes an HTTP request from browser to server w/o changing the page
    $.ajax(url, {
      type: method,
      data: artist_params,
      success: function (data) {
          for (var i = 0; i < data.length; i++){
            var anchor = $('<a></a>'); // new anchor element
            anchor.text("'" + data[i].title + "'" + '   by: ' + data[i].artist);
            anchor.prop('href', data[i].url);
            var br = document.createElement("br");
            anchor.append(br);
            $('body').append(anchor); // <a href="/link/to/stuff">Text on the page.</a>
                  }
        }
      });
    });

  $(".hot-songs").click(function(event) {
    event.preventDefault();

    var button = $(this);
    // console.log(button);
    var formTag = button.parent();
    // console.log(formTag);
    var url = formTag.attr("action");
    // console.log(url);
    var method = formTag.attr("method");
    // console.log(method);

    // <iframe width="420" height="315"
    // src="http://www.youtube.com/embed/XGSy3_Czz8k?autoplay=1">
    // </iframe>

    $.ajax(url, {
      type: method,
      success: function (data) {
        //function searchResults(data) {
          for (var i = 0; i < data.length; i++){
            if (data[i].via == "youtube"){
              var startCode = data[i].url.indexOf("=");
              var videoCode = "http://www.youtube.com/embed/" + data[i].url.substring(startCode + 1);
              var embedCode = document.createElement('iframe');
              embedCode.src = videoCode;
              $('body').append(embedCode).append('<br></br>'); // <a href="/link/to/stuff">Text on the page.</a>
            } else {
              var anchor = $('<a></a>');
              anchor.text("'" + data[i].title + "'" + '   by: ' + data[i].artist );
              anchor.prop('href', data[i].url);
              var br = document.createElement("br");
              anchor.append(br);
              $('body').append(anchor); // <a href="/link/to/stuff">Text on the page.</a>
            }
          }
      }
      });
  });

});
