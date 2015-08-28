$(function() {
  // Generate first round of 'breaking jams' on page load
  $(document).ready(function() {
    getBreakingJams();
  });

  // Update breaking jams feed on button click
  $('.breaking_search').click(function(event) {
    event.preventDefault();
    clearResults("breaking_jams");
    getBreakingJams();
  })

  // Get search results on button click
  $('.submit').click(function(event) {
    event.preventDefault();
    clearResults("search");

    var button = $(this);
    var url = '/search/' + $('input:text').val();
    var type = $('form').attr('method');

    $.ajax( url , {
      type: type,
      dataType: "json",
      success: function(data) {
        console.log(data);
        parseResults(data, "search");
      }
    });
  })

  function clearResults(results_type) {
    var div_to_clear = "." + results_type
    $(div_to_clear).empty();
  };

  // Explicit ajax call (as required for the page render feature)
  function getBreakingJams() {
    $.ajax( '/breaking_jams' , {
      type: "get",
      dataType: "json",
      success: function(data) {
        console.log(data);
        parseResults(data, "breaking_jams");
      }
    });
  };

  function parseResults(data, results_type) {
    if (data == undefined ) {
      var no_results = $('<h3>Sorry, we do not have any results for your search. Please try another artist.</h3>')
      var div_to_append = '.' + results_type
      $(div_to_append).append(no_results);

    } else {

      for (i=0; i < data.length; i++) {
        var url = data[i].url;
        var image_url = data[i].image;
        var caption = data[i].combinedTruncated;

        generateHTML(url, image_url, caption, results_type);
      };
    };
  };

  function generateHTML(url, image_url, caption, results_type) {
    var anchor = $('<a></a>');
    anchor.prop("href", url);

    var image_tag = $('<img>');
    image_tag.prop("src",image_url);

    anchor.append(image_tag);

    var display_div = $('<div></div>');
    display_div.html(caption);
    display_div.prepend(anchor);

    var div_to_append = "." + results_type
    $(div_to_append).append(display_div)

  };

})


// Vimeo iframe
// <iframe src="https://player.vimeo.com/video/12345" width="500" height="375" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

// YouTube iframe
//<iframe width="560" height="315" src="https://www.youtube.com/embed/CztT_pBFQv8" frameborder="0" allowfullscreen></iframe>

