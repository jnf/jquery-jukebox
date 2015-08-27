$(function() {
  // set the container's minimum height based on the window's size
  var container = $('.container');
  var windowHeight = $(window).height();
  container.css({ "min-height": windowHeight + 'px' });

  // set default form padding based on window size, too
  var form = $('form');
  form.css({ "margin-bottom": windowHeight - 270 + 'px' });

  $("form").submit(function(event) {
    event.preventDefault();
    var button = $(":submit");
    var search = $(":text");
    var searchQuery = search.val();
    var form = $("form");
    var method = form.attr("method");
    var url = form.attr("action");

    $.ajax(url, {
      type: method,
      data: { 'artist': searchQuery },
      success: function(data) {
        if (data.length > 0)
          displayResults(data);
        else
          rickRoll(searchQuery);
      }
    });
  });

  function displayResults(data) {
    // oh hey! if we're displaying results, we don't need to see the jukebox anymore.
    form.css({ "margin-bottom": 25 + 'px' });
    // goodbye, jukebox.

    var results = $('#results');
    if ($('ul')) { $('ul').remove(); };
    var list = $('<ul></ul>');
    list.addClass('list-group');

    for(var i = 0; i < data.length; i++) {
      var result = data[i];
      var listItem = $('<li></li>');
      listItem.addClass('list-group-item');
      var link = $('<a></a>');
      link.text(result.artist + "'s " + result.title);
      link.prop('href', result.url);
      listItem.append(link);

      if (result.url.includes("youtube") || result.url.includes("vimeo")) {
        listItem.append("<br />");
        listItem.append(embedVideo(result.url));
      }

      list.append(listItem);
    }

    results.append(list);
  }

  function displayMessage(message) {
    if (!$("message")) {
      var messageElement = $("<div></div>");
      messageElement.addClass("message");
      var header = $("<h3></h3>");
      header.append(message);
      messageElement.append(header);
    }
  }

  function embedUrl(url) {
    url = url.replace("http://", "https://");
    if (url.includes("youtube")) {
      url = url.replace("watch?v=", "embed/");
    } else if (url.includes("vimeo")) {
      url = url.replace("/vimeo.com/", "/player.vimeo.com/video/");
    };

    return url;
  }

  function embedVideo(url) {
    var output = '<iframe width="560" height="315" src="';
    output += embedUrl(url);
    output += '" frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen></iframe>';
    return output;
  };

  function rickRoll(failedQuery) {
    var explanationText = "No results were found for " + failedQuery + ". Perhaps you will enjoy one of these musical selections."
    displayMessage(explanationText);

    var firstLink = {
      artist: "The Muppets",
      title: "Hilarious Muppet Bloopers!",
      url: "https://www.youtube.com/watch?v=3KANI2dpXLw"
    };

    var secondLink = {
      artist: "Chris Hadfield",
      title: "Space Oddity Cover",
      url: "https://www.youtube.com/watch?v=KaOC9danxNo"
    };

    var thirdLink = {
      artist: "Seremedy",
      title: "NO ESCAPE",
      url: "https://www.youtube.com/watch?v=BbTAMzgC7uU"
    };

    var fourthLink = {
      artist: "No Brain",
      title: "넌 내게 반했어",
      url: "https://www.youtube.com/watch?v=u_CQB1scYuw"
    };

    var fifthLink = {
      artist: "Weird Al",
      title: "Foil",
      url: "https://www.youtube.com/watch?v=w-0TEJMJOhk"
    };


    var weirdLinks = [firstLink, secondLink, thirdLink, fourthLink, fifthLink];

    displayResults(weirdLinks);
  }
});
