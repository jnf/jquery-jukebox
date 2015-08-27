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
        (songArray.length < 1) ? noResults();
          for (var i = 0; i < songArray.length; i++){
          var anchor = $('<a></a>');
           anchor.text(songArray[i].title + " by " + songArray[i].artist);
           anchor.prop('href', songArray[i].url);
           $('body').append(anchor);
           $('a').wrap( "<div class='result'></div>" )
           $('body').append("<br>");
        }
      }
    });
  });
});

function clearPreviousResults(){
  $("a").remove();
  $("br").remove();
  $("iframe").remove();
  $("p").remove();
};

function noResults(){
  $('body').append('<p>Unfortunately your search did not return any results, don\'t fret, David will keep you warm.</p>');
  $('body').append('<br>');
  $('body').append(defaultVideo);
}


var defaultVideo = '<iframe width="420" height="315" src="https://www.youtube.com/embed/PJQVlVHsFF8?autoplay=1" frameborder="0" allowfullscreen></iframe>'
