// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

$(function() {

  $(".search").click(function(event) {
    event.preventDefault();

    var searchButton = $(this);

    var formTag = searchButton.parents(".form");

    var text_box = formTag.children(".text_box");

    var search_input = text_box.val();

    var url = "/search/" + search_input; // routes to controller then action which

    var method = formTag.attr("method");

    ajax(url, method);

  });


  $(".rando").click(function(event) {
    event.preventDefault();

    var randoInput = $(this);

    var randoForm = randoInput.parents(".button_to");

    var url = "/rando";

    var method = randoForm.attr("method");

    ajax(url, method);

  });

  function ajax(url, method) {

    $.ajax(url, {
      type: method,
      success: function (data) {

        // if the user decided to retrieve a random song
        if(url === "/rando") {
          if ($('.results').is(':empty')) {
            displayData(data.sort( randOrd).slice(0,10));
          } else {
            // '.empty().append()' prevents new calls for random songs to be appended on top of the old list
            $('.results').empty().append(displayData(data.sort(randOrd).slice(0,10)));
          }
        // if the user searched for an artist & if there were no prior results
        } else if ( $('.results').is(':empty')) {
          displayData(data);
        // this prevents new search results from appending on top of the old results
        } else {
          $('.results').empty().append(displayData(data));
        }
      }
    });
  }

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
      return data;
      // for future ref: return artist will have console.log(displayData(data)); inside success function to be only the artist
    }

    // for making the results for a random song to actually be random
    function randOrd(){
      return (Math.round(Math.random())-0.5); }

});
