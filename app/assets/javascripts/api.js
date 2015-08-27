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
    var body = $('body');
    if ($('div')) { $('div').remove(); };

    var div = $('<div></div>');
    for(var i = 0; i < data.length; i++) {
      var result = data[i];
      var paragraph = $('<p></p>');
      var link = $('<a></a>');
      link.text(result.artist + "'s " + result.title);
      link.prop('href', result.url);
      paragraph.append(link);

      if (result.url.includes("youtube")) {
        paragraph.append("<br />");
        paragraph.append(youtubeEmbed(result.url));
      }

      div.append(paragraph);
    }
    body.append(div);
  }

  function youtubeEmbed(url) {
    url = url.replace("http://", "https://");
    url = url.replace("watch?v=", "embed/");

    var output = '<iframe width="560" height="315" src="';
    output += url;
    output += '" frameborder="0" allowfullscreen></iframe>';
    return output;
  };

  function rickRoll(artist) {
    var explanationText = "No results were found for " + artist + ". Perhaps you would enjoy one of these musical selections:"
    var body = $('body');
    body.append("<p>" + explanationText + "</p>");

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
