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
        // console.log(data[0].title);
        // console.log(data.length);
        //function searchResults(data) {
          for (var i = 0; i < data.length; i++){
            var anchor = $('<a></a>'); // new anchor element
            anchor.text("'" + data[i].title + "'" + '   by: ' + data[i].artist);
            anchor.prop('href', data[i].url);
            var br = document.createElement("br");
            anchor.append(br);
            $('body').append(anchor); // <a href="/link/to/stuff">Text on the page.</a>
                  }
                //};
        }
        // searchResults(data);
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

    $.ajax(url, {
      type: method,
      success: function (data) {
        //function searchResults(data) {
          for (var i = 0; i < data.length; i++){
            var anchor = $('<a></a>'); // new anchor element
            anchor.text("'" + data[i].title + "'" + '   by: ' + data[i].artist);
            anchor.prop('href', data[i].url);
            var br = document.createElement("br");
            anchor.append(br);
            $('body').append(anchor); // <a href="/link/to/stuff">Text on the page.</a>
          }
        //};
      }
      });
    // searchResults(data);
  });

});
