// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

$(function(){
  $('#search').click(function(event){
    event.preventDefault();

    var button = $(this);
    var formTag = button.parent();
    // var url = formTag.attr("action");
    var value = formTag.children("input#artist").val();
    var url = "/search/" + value;
    var query = { 'artist' : value } ;

    $.ajax(url, {
      type: "GET",
      data: query,
      success: function(data){
        removeResults();

        // if there aren't any results
        if (data.length === 0){
          $("#results").append("<h2>Can you believe it? No jams. Dummies.</h2><img src='https://media.giphy.com/media/nXyx1m3mx2PxS/giphy.gif'>");
        }

        // create the list for the results
        var list = $("<ul></ul>");
        list.css("list-style-type", "none");

        // create outside functions to create video/audio tags
        // write a conditional to choose one
        // should return a <li> to append to the main list (<ul>)


        // selects all the video results
        var videos = $.map(data, function(obj){
          if (obj.via === "youtube" || obj.via == "vimeo") {
            return obj;
          }
        });

        var list = displayVideoResults(videos);
        $("#results").append(list);
      }
    });
  });
});

function removeResults(){
  var old_results = $("#results").children("a");
  old_results.append($("#results").children("br"));
  old_results.remove();
}

function displayVideoResults(data){
  // // create the list for the results
  // var list = $("<ul></ul>");
  // list.css("list-style-type", "none");

  for(var i = 0; i < data.length; i++) {
    // create a list item with an iframe inside it
    var listItem = $("<li></li>");
    var iframeTag = $("<iframe></iframe>");
    var url = "";
    var mediaSource = data[i].via;

    // build the URL for the iframe
    if(mediaSource === "youtube"){
      url = "http://www.youtube.com/embed/" + data[i].url.slice(31);
    } else if (mediaSource === "vimeo"){
      url = "https://player.vimeo.com/video/" + data[i].url.slice(17);
    }

    // connect everything
    iframeTag.prop("src", url);
    listItem.append(iframeTag);
    // add the completed list item to the list
    list.append(listItem);
  }

  // return list;
}

// function embedMedia(type, source){
//   var audioTypes = ["hypemachine", "soundcloud", "webaudio"];
//   var videoTypes = ["youtube", "vimeo"];
//   if ($.inArray(type, audioTypes) === 0) {
//     var audioTag = $("<audio></audio>");
//     audioTag.prop("src", source);
//     return audioTag;
//   } else if ($.inArray(type, videoTypes) === 1) {
//     var videoTag = $("<video></video>");
//     videoTag.prop("src", source);
//     return videoTag;
//   }
// }
