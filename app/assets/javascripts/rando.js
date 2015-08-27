// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

$(function() {

  $(".rando").click(function(event) {
    event.preventDefault();

    var randoInput = $(this);

    var randoForm = randoInput.parents(".button_to");
    // console.log(randoForm);

    var url = "/rando";

    var last_child = $('body').children(".results");
    // console.log(searchButton.children());

  $.ajax(url, {
    type: "GET",
    success: function (data) {

      if( $('.results').is(':empty') ) {
        displayData(data);
      } else {
        $('.results').empty().append(displayData(data));
      } //console.log(displayData(data));
    }

  });

  function displayData(data) {
    for (var i = 0; i < 10; i++) {
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

//$('.results').children();
  });
});
