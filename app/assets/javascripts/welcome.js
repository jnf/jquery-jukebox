$(document).ready(function() {
  $(".search").click(function(event) {
    event.preventDefault();
    var button = $(this);
    var searchBox = button.siblings("input[type=text]");
    var formTag = button.parent();
    var url = "/search/" + searchBox.val();
    var method = formTag.attr("method");

    $.ajax(url,{
      type: method,
      dataType: "json",
      success: function (data) {
      clearPreviousResults();
        var songArray = data;
        console.log(songArray);
        if (songArray.length<1) {
          $('body').append(defaultVideo);
      } else {
          for (var i = 0; i < songArray.length; i++){
            var anchor = $('<a></a>');
             anchor.text(songArray[i].title + " by " + songArray[i].artist);
             anchor.prop('href', songArray[i].url);
             $('body').append(anchor);
             $('a').wrap( "<div class='result'></div>" )
             $('body').append("<br>");
          }
        }
      }
    });
  });
});

function clearPreviousResults(){
  $("a").remove();
  $("br").remove();
};

var defaultVideo = '<iframe width="420" height="315" src="https://www.youtube.com/embed/PJQVlVHsFF8" frameborder="0" allowfullscreen></iframe>'
