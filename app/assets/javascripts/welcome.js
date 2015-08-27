$(document).ready(function() {
  $(".rare").click(function(event) {
    event.preventDefault();
    var rareButton = $(this);
    var url = "/rare";
    var method = rareButton.attr("method");

    $.ajax(url,{
      type: method,
      dataType: "json",
      success: function(data) {
        clearPreviousResults();
        var rareSongs = data.jams;
        for (var i = 0; i < 20; i++){
          var anchor = $('<a></a>');
          anchor.text(rareSongs[i].title + " by " + rareSongs[i].artist);
          anchor.prop('href', rareSongs[i].url);
          if (rareSongs[i].via == "youtube"){
            songUrl = rareSongs[i].viaUrl;
            var urlChunk = songUrl.split('=')[1];
            console.log(urlChunk);
            $('<iframe>',{
              src: "https://www.youtube.com/embed/" + urlChunk,
              frameborder: 0,
              scrolling: 'no'
            }).appendTo('body');
          }
          $('body').append(anchor);
          $('a').wrap( "<div class='result'></div>" )
          $('body').append("<br>");
        }
      }
      });
  });

  $(".search").click(function(event) {
    event.preventDefault();
    var searchButton = $(this);
    var searchBox = searchButton.siblings("input[type=text]");
    var formTag = searchButton.parent();
    var url = "/search/" + searchBox.val();
    var method = formTag.attr("method");

    $.ajax(url,{
      type: method,
      dataType: "json",
      success: function (data) {
      clearPreviousResults();
      var songArray = data;
      (songArray.length < 1) ? noResults() : console.log("");
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
  $(".result").remove();
  $("br").remove();
  $("iframe").remove();
  $("p").remove();
};

function noResults(){
  $('body').append('<p>Unfortunately your search did not return any results. Don\'t fret, David will keep you warm.</p>');
  $('body').append('<br>');
  $('body').append(defaultVideo);
}

// function populateResults(){
//   for (var i = 0; i < songArray.length; i++){
//   var anchor = $('<a></a>');
//    anchor.text(songArray[i].title + " by " + songArray[i].artist);
//    anchor.prop('href', songArray[i].url);
//    $('body').append(anchor);
//    $('a').wrap( "<div class='result'></div>" )
//    $('body').append("<br>");
//  }
// }

var defaultVideo = '<iframe width="420" height="315" src="https://www.youtube.com/embed/PJQVlVHsFF8?autoplay=1" frameborder="0" allowfullscreen></iframe>'
