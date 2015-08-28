$(function () {
  // All the forms in the div.wobsite. :D
  var forms = $('div.wobsite').children('form');

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
      if (embedableMedia(data[i].via)) {
        insideList.append(addingMedia(data[i]));
      }
    } // for
  } // formatResults


  function addingMedia(data, insideList) {
    var iFrame = $("<iframe></iframe>");

    switch(data.via) {
      // To add the embeded YouTube video.
      case "youtube":
        iFrame.prop("src", addingYouTubeURL(data));
        break;
      case "vimeo":
        iFrame.prop("src", addingVimeoURL(data));
        break;
      case "soundcloud":
        iFrame.prop("src", addingSoundCloudURL(data));
        break;
    }

    iFrame.prop({
      "id":"player",
      "type":"text/html",
      "width":"640",
      "height":"390",
      "frameborder":"0"
    });

    return iFrame;
  }

  function addingYouTubeURL(data) {
    var urlString = data.url;
    urlString = urlString.replace("https", "http");
    urlString = urlString.replace("watch?v=", "embed/");
    urlString = urlString + "?enablejsapi=1";
    return urlString;
  }

  function addingVimeoURL(data) {
    var urlString = data.url;
    urlString = urlString.replace("http://vimeo", "//player.vimeo");
    urlString = urlString.replace(".com/", ".com/video/");
    return urlString;
  }

  function addingSoundCloudURL(data) {
    var urlString = data.url;
    urlString = urlString.replace("https", "http");
    urlString = urlString.replace("soundcloud", "w.soundcloud");
    urlString = urlString.replace(".com/", ".com/player/?url=https%3A//soundcloud.com/")
    urlString = urlString + "&amp;auto_play=false&amp;show_user=true&amp;visual=true";
    return urlString;
  }

  function embedableMedia(data_via) {
    return (data_via == "youtube" || data_via == "vimeo" || data_via == "soundcloud");
  }

});
