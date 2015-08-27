$(function() {
  $("input[value='Search']").click(function(event) {
    event.preventDefault();

    var artist = $("input[type='text']").val();
    var url = "/search/" + artist;
    var method = $('form').attr("method")

    // removes current results, if any
    $('.result').remove();
    $('.no-result').remove();

    $.ajax(url, {
      type: method,
      success: function(data) {
        var results = data.forEach(displayResults)
        $('a').wrap( "<div class='result'></div>" );
        if (data.length == 0) {
          $('body').append("<div class='no-result'>no results found</div>");
        }
      }
    });
  });

  $("input[value='Popular Jams']").click(function(event) {
    event.preventDefault();

    var url = "/popular";
    var method = $('form').attr("method")

    // removes current results, if any
    $('.result').remove();

    $.ajax(url, {
      type: method,
      success: function(data) {
        var results = data.forEach(displayResults)
        $('a').wrap( "<div class='result'></div>" );
      }
    });
  });

  $("input[value='Random Jams']").click(function(event) {
    event.preventDefault();

    var url = "/random";
    var method = $('form').attr("method")

    // removes current results, if any
    $('.result').remove();

    $.ajax(url, {
      type: method,
      success: function(data) {
        var results = data.forEach(displayResults)
        $('a').wrap( "<div class='result'></div>" );
      }
    });
  });
});

// display each result as a link
function displayResults(result) {
  var anchor = $('<a></a>')
  anchor.text(result.artist + ": " + result.title);
  anchor.prop('href', result.url);
  $('body').append(anchor);
}
