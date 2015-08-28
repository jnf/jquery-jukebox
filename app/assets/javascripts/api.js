// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

$(function(){
  $('#search').click(function(event){
    event.preventDefault();

    var button = $(this);
    var formTag = button.parent();
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

        var formattedJamItems = formatMedia(data);

        // add each of the embed list items to the list
        for(i = 0; i < formattedJamItems.length; i++) {
          list.append(formattedJamItems[i]);
        }

        $("#results").append(list);
      }
    });
  });

  $('#random').click(function(){
    var url = "/random";

    $.ajax(url, {
      type: "GET",
      success: function(data){
        removeResults();

        // create the list for the results
        var list = $("<ul></ul>");
        list.css("list-style-type", "none");

        var formattedJamItems = formatMedia(data);

        // add each of the embed list items to the list
        for(i = 0; i < formattedJamItems.length; i++) {
          list.append(formattedJamItems[i]);
        }

        $("#results").append(list);
      }
    });
  });
});

function removeResults(){
  var old_results = $("#results").children("ul");
  old_results.remove();
}

function formatAudioEmbed(audioJam){
  var url = "http://soundcloud.com/oembed";
  var query = {};
  query.format = "json";
  query.url = audioJam.url;

  var listItem = $("<li></li>");

  $.ajax(url, {
    type: "GET",
    data: query,
    success: function(data){
      var iframeTag = data.html;
      listItem.append(iframeTag);
    }
  });

  return listItem;
}

function formatVideoEmbed(videoJam){
  // create a list item & iframe
  var listItem = $("<li></li>");
  var iframeTag = $("<iframe></iframe>");
  var url = "";
  var mediaSource = videoJam.via;

  // build the URL for the iframe
  if(mediaSource === "youtube"){
    url = "http://www.youtube.com/embed/" + videoJam.url.slice(31);
  } else if (mediaSource === "vimeo"){
    url = "https://player.vimeo.com/video/" + videoJam.url.slice(17);
  }

  // assign properties
  iframeTag.prop("src", url);
  iframeTag.prop("width", "500");
  iframeTag.prop("height", "281");
  // put the iframe in the list item
  listItem.append(iframeTag);

  return listItem;
}

function formatMedia(data) {
  var formattedJamItems = [];

  for(var i = 0; i < data.length; i++) {
    var audioTypes = ["soundcloud"]; // ["hypemachine", "soundcloud", "webaudio"];
    var videoTypes = ["youtube", "vimeo"];

    if ($.inArray(data[i].via, audioTypes) > -1) {
      formattedJamItems.push(formatAudioEmbed(data[i]));
    } else if ($.inArray(data[i].via, videoTypes) > -1) {
      formattedJamItems.push(formatVideoEmbed(data[i]));
    }
  }

  return formattedJamItems;
}
