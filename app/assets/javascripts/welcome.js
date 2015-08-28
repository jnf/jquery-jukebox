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
        for (var i = 0; i < 10; i++){
          var anchor = $('<a></a>');
          anchor.text(rareSongs[i].title + " by " + rareSongs[i].artist);
          anchor.prop('href', rareSongs[i].url);
          if (rareSongs[i].via == "youtube"){
            songUrl = rareSongs[i].viaUrl;
            var urlChunk = songUrl.split('=')[1];
            $('<iframe>',{
              src: "https://www.youtube.com/embed/" + urlChunk,
              frameborder: 0,
              scrolling: 'no'
            }).appendTo('.content');
          }
          $('.content').append(anchor);
          $('a').wrap( "<div class='result'></div>" )
          $('.content').append("<br>");
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
      console.log(songArray);
      (songArray.length < 1) ? noResults() : console.log("");
      for (var i = 0; i < songArray.length; i++){
        if (songArray[i].via == "youtube"){
          songUrl = songArray[i].url;
          var urlChunk = songUrl.split('=')[1];
          $('<iframe>',{
            src: "https://www.youtube.com/embed/" + urlChunk,
            frameborder: 0,
            scrolling: 'no'
          }).appendTo('.content');
        }
      var anchor = $('<a></a>');
       anchor.text(songArray[i].title + " by " + songArray[i].artist);
       anchor.prop('href', songArray[i].url);
       $('.content').append(anchor);
       $('a').wrap( "<div class='result'></div>" )
       $('.content').append("<br>");
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
  $('.content').append('<p>Unfortunately your search did not return any results. Don\'t fret, David will keep you warm.</p>');
  $('.content').append('<br>');
  $('.content').append(defaultVideo);
}

var defaultVideo = '<iframe width="420" height="315" src="https://www.youtube.com/embed/PJQVlVHsFF8?autoplay=1" frameborder="0" allowfullscreen></iframe>'
