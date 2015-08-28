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
    // note-to-self: routes to the api controller's search action not just the route
    var url = "/search/" + search_input;
    var method = formTag.attr("method");

    ajax_callback(url, method);

  });

  $(".rando").click(function(event) {
    event.preventDefault();

    var randoInput = $(this);
    var randoForm = randoInput.parents(".button_to");
    var url = "/rando";
    var method = randoForm.attr("method");

    ajax_callback(url, method);

  });

  function ajax_callback(url, method) {
    $.ajax(url, {
      type: method,
      success: newFunc // callback to this function on success
    });
  }

  function newFunc(data, url) {
    // if the user decided to retrieve a random song
    if(url === "/rando") {
      $( ".results" ).addClass( "jamz-background" );
      $('.results').removeClass("no-results-photo");

      if ($('.results').is(':empty')) {
        displayData(data.sort( randOrd).slice(0,10));
      } else {
        // '.empty().append()' prevents new calls for random songs to be appended on top of the old list
        $('.results').empty().append(displayData(data.sort(randOrd).slice(0,10)));
      }
    // if there were no prior results
    } else if ( $('.results').is(':empty')) {
        if (data.length > 0) {

          displayData(data);
          $( ".results" ).addClass( "jamz-background" );
          $('.results').removeClass("no-results-photo");

        } else {
          // this adds a photo if invalid search term & no prior results
          $( ".results" ).empty().addClass( "no-results-photo" ).append("<h2>Oops. No jamz from that artist were found.</h2>");
        }
    // if there are prior results, this prevents new search results from appending on top of the old ones
    } else {
      // if the new data gave results
      if (data.length > 0) {
        $('.results').removeClass("no-results-photo");
        $('.results').empty().append(displayData(data));
        $( ".results" ).addClass( "jamz-background" );
      } else {
        // if there were prior results and the new data gave 0 results
        $( ".results").empty().addClass( "no-results-photo").append("<h2>Oops. No jamz from that artist were found.</h2>");
      }
    }
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
      // note-to-self: return artist will have console.log(displayData(data)); inside success function to be only the artist
    }

    // for making the results for a random song to actually be random
    function randOrd(){
      return (Math.round(Math.random())-0.5);
    }

});
