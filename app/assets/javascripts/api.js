$(function() {
  // set the container's minimum height based on the window's size
  var container = $('.container');
  var windowHeight = $(window).height();
  container.css({ "min-height": windowHeight + 'px' });

  // set default form padding based on window size, too
  var form = $('form');
  form.css({ "margin-bottom": windowHeight - 270 + 'px' });

  // handling for submitting the search form
  $("form").submit(function(event) {
    event.preventDefault(); // nopeing the form submit button's default behaviors
    var searchField = $(":text"); // grabbing the form's text field
    var searchQuery = searchField.val(); // grabbing the value from the text field
    var form = $("form"); // grabbing the form
    var method = form.attr("method"); // grabbing the form's method
    var url = form.attr("action"); // grabbing the form's url

    $.ajax(url, { // opening the ajax request and passing in said url
      type: method, // passing in the method
      data: { 'artist': searchQuery }, // mimicking the form params
      success: function(data) { // defining a function to call on successful form submission
        if (data.length > 0)
          displayResults(data); // calling display results on the results-- if there are results
        else
          rickRoll(searchQuery); // rickrolling the user if there aren't results
      }
    });
  });

  function displayResults(data) {
    // oh hey! if we're displaying results, we don't need to see the jukebox anymore.
    form.css({ "margin-bottom": 25 + 'px' });
    // goodbye, jukebox. ;_;

    var results = $('#results'); // grabbing the results div
    if ($('ul')) { $('ul').remove(); }; // removing any old results
    var list = $('<ul></ul>'); // making a new list to hold the results
    list.addClass('list-group');

    // iterating through the results
    for(var i = 0; i < data.length; i++) {
      var result = data[i];

      // creating a list item to hold the current result
      var listItem = $('<li></li>');
      listItem.addClass('list-group-item');

      // making a link to shove into the list item
      var link = $('<a></a>');
      link.text(result.artist + "'s " + result.title);
      link.prop('href', result.url);

      // moving the link into the list item
      listItem.append(link);

      // grabbing the code to embed a video if the url matches a supported provider
      if (result.url.includes("youtube") || result.url.includes("vimeo")) {
        // moving the embedded video into the list item
        listItem.append("<br />");
        listItem.append(embedVideo(result.url));
      }

      // moving the list item into the list
      list.append(listItem);
    }

    // adding the list to the results div
    results.append(list);
  }

  function displayMessage(message) {
    console.log(message); // !T test code, remove before PR
    // creating the message list item
    var messageListItem = $("<li></li>");
    messageListItem.addClass("message");
    messageListItem.addClass("list-group-item");

    // creating the message inside an h3
    var header = $("<h3></h3>");
    header.append(message);

    // moving the message into the list item
    messageListItem.append(header);

    // grabbing the results list & moving the message in at the top
    var results = $('ul');
    results.prepend(messageListItem);
  }

  function embedUrl(url) {
    // swapping in a more secure protocol, which vimeo and youtube prefer
    url = url.replace("http://", "https://");

    // making some other substitutions in the url to switch from a link to a video to the embedded video resource
    if (url.includes("youtube")) {
      url = url.replace("watch?v=", "embed/");
    } else if (url.includes("vimeo")) {
      url = url.replace("/vimeo.com/", "/player.vimeo.com/video/");
    };

    return url; // get out of here, url. go back from whence you came!
  }

  function embedVideo(url) {
    // setting up the iframe
    var output = '<iframe width="560" height="315" src="';
    // throwing in the modified url
    output += embedUrl(url);
    // finishing the iframe code
    output += '" frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen></iframe>';
    // sending it back to its origin
    return output;
  };

  function rickRoll(failedQuery) {
    // setting up a few dummy results
    var firstLink = { // the obligatory rickroll
      artist: "The Muppets",
      title: "Hilarious Muppet Bloopers!",
      url: "https://www.youtube.com/watch?v=3KANI2dpXLw"
    };

    var secondLink = { // a pretty sweet cover
      artist: "Chris Hadfield",
      title: "Space Oddity Cover",
      url: "https://www.youtube.com/watch?v=KaOC9danxNo"
    };

    var thirdLink = { // who can say no to Yohio? he made that dress himself!
      artist: "Seremedy",
      title: "NO ESCAPE",
      url: "https://www.youtube.com/watch?v=BbTAMzgC7uU"
    };

    var fourthLink = { // is k-punk a thing?
      artist: "No Brain",
      title: "넌 내게 반했어",
      url: "https://www.youtube.com/watch?v=u_CQB1scYuw"
    };

    var fifthLink = { // another pretty sweet cover
      artist: "Weird Al",
      title: "Foil",
      url: "https://www.youtube.com/watch?v=w-0TEJMJOhk"
    };

    // sending the dummy results to the display function
    var weirdLinks = [firstLink, secondLink, thirdLink, fourthLink, fifthLink];
    displayResults(weirdLinks);

    // sending a message to the top of the results
    var explanationText = "No results were found for " + failedQuery + ". Perhaps you will enjoy one of these musical selections:"
    displayMessage(explanationText);
  }
});
