$(function () {
  // All the forms in the body. :D
  var forms = $('body').children('form');

  // WAS TESTING CREATING AN ATTRIBUTE IN JAVASCRIPT!
  var searchButton = $(forms[0]).children(':last-child');
  function addAttr() {
    searchButton.attr("search", "yes");
  };
  addAttr();

  $('input[search=yes]').click(function(event) {
    event.preventDefault();

    var button = $(this);
    var box = button.siblings('input[type=text]');
    var parent = button.parent();

    var url = '/search/' + box.val();
    var method = parent.attr("method");

    $(".results").empty(); // empties the previous results
    $.ajax(url, {
      type: method,
      success: function (data) {
        formatResults(data);
      }
    });
  });

  // The random button is in the second form on the page,
  // and is the last child in the form.
  var randomButton = $(forms[1]).children(':last-child');
  randomButton.click(function(event) {
    event.preventDefault();
    emptyResults();

    // Assigning variables.
    var form = $(this).parent();
    var url = form.attr("action"),
        method = form.attr("method");

    // Request.
    $.ajax(url, {
      type: method,
      success: function (data) {
        formatResults(data);
      }
    });
  });

  // Empties the previous results.
  function emptyResults() {
    $(".results").empty();
  }

  // Formats json results after the API search.
  function formatResults(data) {
    // To add an unordered list tag around all the list items.
    var unorderedList = $("<ul></ul>"),
        results = $('.results');
    results.append(unorderedList);
    var insideList = results.children(':first-child');

    // To add all the results as list items.
    for (var i = 0; i < data.length; i++) {
      var anchor = $("<a></a>");
      anchor.text(data[i].title);
      anchor.prop("href", data[i].url);
        // attr vs prop -- look up the difference
        // prop is short for property
        // attr is short for attribute
      var listItem = $("<li></li>");
      listItem.html(anchor);
      insideList.append(listItem);

      // To add the embeded YouTube video.
      if (data[i].via == "youtube") {
        var urlString = data[i].url,
            iFrame = $("<iframe></iframe>");
        urlString = urlString.replace("https", "http");
        urlString = urlString.replace("watch?v=", "embed/");
        urlString = urlString + "?enablejsapi=1";
        iFrame.prop({
          "id":"player",
          "type":"text/html",
          "width":"640",
          "height":"390",
          "src":urlString,
          "frameborder":"0"
        });
        insideList.append(iFrame);
      } // if
    } // for
  } // formatResults
});
