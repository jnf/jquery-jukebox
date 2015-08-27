$(function() { // this tricks rails into seeing our code
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

      if (result.url.includes("youtube")) {
        listItem.append("<br />");
        listItem.append(youtubeEmbed(result.url));
      }

      list.append(listItem);
    }
    results.append(list);
  }

  function displayMessage(message) {
    var messageElement = $('#message');
    var header = $("<h3></h3>");
    header.append(message);
    messageElement.append(header);
  }

  function youtubeEmbed(url) {
    url = url.replace("http://", "https://");
    url = url.replace("watch?v=", "embed/");

    var output = '<iframe width="560" height="315" src="';
    output += url;
    output += '" frameborder="0" allowfullscreen></iframe>';
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
