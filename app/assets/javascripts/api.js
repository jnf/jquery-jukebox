$(function() {
  $("input[type='submit']").click(function(event) {
    event.preventDefault();

    var artist = $("input[type='text']").val();
    var url = "/search/" + artist;
    var method = $("form").attr("method")

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
});

// display each result as a link
function displayResults(result) {
  var anchor = $('<a></a>')
  anchor.text(result.artist + ": " + result.title);
  anchor.prop('href', result.url);
  $('body').append(anchor);
}
