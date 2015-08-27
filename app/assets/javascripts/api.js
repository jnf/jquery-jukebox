// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

$(function() {

  $(".submit").click(function(event) {
    event.preventDefault();

    var searchButton = $(this);

    var formTag = searchButton.parents(".form");
    //console.log(formTag.hasClass("form"));

    var text_box = formTag.children(".text_box");
  // console.log(text_box.hasClass("text_box"));

    var search_input = text_box.val();

    var url = "/" + "search/" + search_input;

    var method = text_box.attr("method");

    var last_child = $('body').children(".results");

  $.ajax(url, {
    type: method,
    success: function (data) {

      if( $('.results').is(':empty') ) {
        displayData(data);
      } else {
        $('.results').empty().append(displayData(data));
      }
    }

  });

  function displayData(data) {
    for (var i = 0; i < data.length; i++) {
      artist_title = data[i].artist + ": " + data[i].title;
      url = data[i].url;

      var anchor = $('<a></a>');
      anchor.text(artist_title);
      anchor.prop('href', url);
      var p_tag = $('<p></p>');
      p_tag.append(anchor);
      $('.results').append(p_tag);

  }
  return data; //return artist will have console.log(displayData(data)); inside success function to be only the artist
}


  });
});
