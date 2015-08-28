$(function() {
  // note: this function definition is at the bottom with the page title click event handling
  displayInstructions(); // give the user some helpful instructions

  //----------------- Searching for Jams by Artist -----------------------------

  // handling for submitting the search form
  $("form").submit(function(event) {
    event.preventDefault(); // nopeing the form submit button's default behaviors
    unpressButtons(); // unpress any buttons that were previously pressed!

    var searchField = $(":text"); // grabbing the form's text field
    var searchQuery = searchField.val(); // grabbing the value from the text field
    var form = $("form"); // grabbing the form
    var method = form.attr("method"); // grabbing the form's method
    var url = form.attr("action"); // grabbing the form's url

    ajaxRequest(url, searchQuery, method); // sending the url, search term, & method to the ajax request function
  });

  function ajaxRequest(url, searchQuery, method) {
    $.ajax(url, { // opening the ajax request and passing in said url
      type: method || "get", // passing in the method (or using default GET)
      data: {'artist': searchQuery}, // passing in the query
      success: function(data) { // defining a function to call on successful form submission
        if (data && data.length > 0)
          displayResults(data); // calling display results on the results-- if there are results
        else
          rickRoll(searchQuery); // rickrolling the user if there aren't results
      }
    });
  }

  function displayResults(data) {
    // oh hey! if we're displaying results, we don't need to see the jukebox anymore.
    var header = $('header');
    header.css({ "margin-bottom": 25 + 'px' });
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
      if (result.via == ("youtube") || result.via == ("vimeo")) {
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

  function embedUrl(url) {
    // swapping in a more secure protocol, which vimeo and youtube prefer
    url = url.replace("http://", "https://");

    // making some other substitutions in the url to switch from a link to a video to the embedded video resource
    url = url.replace("youtube.com/watch?v=", "youtube.com/embed/");
    url = url.replace("/vimeo.com/", "/player.vimeo.com/video/");

    return url; // get out of here, url. go back from whence you came!
  }

  function rickRoll(failedQuery) {
    //--- setting up a few dummy results ---
    var firstLink = { // the obligatory rickroll
      via: "youtube",
      artist: "The Muppets",
      title: "Hilarious Muppet Bloopers!",
      url: "https://www.youtube.com/watch?v=3KANI2dpXLw"
    };

    var secondLink = { // a pretty sweet cover
      via: "youtube",
      artist: "Chris Hadfield",
      title: "Space Oddity Cover",
      url: "https://www.youtube.com/watch?v=KaOC9danxNo"
    };

    var thirdLink = { // who can say no to Yohio? he made that dress himself!
      via: "youtube",
      artist: "Seremedy",
      title: "NO ESCAPE",
      url: "https://www.youtube.com/watch?v=BbTAMzgC7uU"
    };

    var fourthLink = { // is k-punk a thing?
      via: "youtube",
      artist: "No Brain",
      title: "넌 내게 반했어",
      url: "https://www.youtube.com/watch?v=u_CQB1scYuw"
    };

    var fifthLink = { // another pretty sweet cover
      via: "youtube",
      artist: "Weird Al",
      title: "Foil",
      url: "https://www.youtube.com/watch?v=w-0TEJMJOhk"
    };

    //--- sending the dummy results to the display function ---
    var weirdLinks = [firstLink, secondLink, thirdLink, fourthLink, fifthLink];
    displayResults(weirdLinks);

    // sending a message to the top of the results
    var explanationText = "No results were found for " + failedQuery + ". ";
    explanationText += "Perhaps you will enjoy one of these musical selections:";
    displayMessage(explanationText);
  }

  //----------------- Popular & Random Tracks ----------------------------------

  // handling for the user who clicks the little red button
  $('div.popular').click(function(event) {
    popular();
  });

  // handling for the user who clicks the little red button
  $('div.random').click(function(event) {
    rando();
  });

  // handling for the user who clicks the link
  $('a.popular').click(function(event) {
    event.preventDefault();
    popular();
  });

  // handling for the user who clicks the link
  $('a.random').click(function(event) {
    event.preventDefault();
    rando();
  });

  function popular() {
    unpressButtons("random"); // unpress the other button just in case
    var popular = $('div.popular'); // grab popular
    pressButton(popular, "popular"); // PRESS IT
  }

  function rando() {
    unpressButtons("popular"); // unpress the other button just in case
    var random = $('div.random'); // grab random
    pressButton(random, "random"); // PRESS IT
  }

  function unpressButtons(whichButton) {
    var popular = $('div.popular');
    var random = $('div.random');
    if (whichButton == "popular" || whichButton === undefined)
      unpress(popular);
    if (whichButton == "random" || whichButton === undefined)
      unpress(random);
  }

  function unpress(button) {
    button.removeClass('jukebox-button-inside-pressed');
    button.addClass('jukebox-button-inside-unpressed');
  }

  function pressButton(button, buttonType) {
    button.removeClass('jukebox-button-inside-unpressed');
    button.addClass('jukebox-button-inside-pressed');

    var buttonParent = button.parent(); // grab the div #button is inside
    var buttonLink = buttonParent.siblings('a'); // grab the link next to #button's parent
    var buttonUrl = buttonLink.attr('href'); // grab the url from the link
    ajaxRequest(buttonUrl, buttonType); // ajax that url
  }

  function displayMessage(message) {
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

  //----------------- Clicking the Page Title ----------------------------------

  function showcaseJukebox() {
    // set the container's minimum height based on the window's size
    var container = $('.container');
    var windowHeight = $(window).height();
    container.css({ "min-height": windowHeight + 'px' });

    // set default header margin based on window size, too
    var happyJukeboxAdjustment = 360;
    var header = $('header');
    header.css({ "margin-bottom": windowHeight - happyJukeboxAdjustment + 'px' });
  }

  function displayInstructions() {
    // oh hey! if we're displaying the instructions, bring us the jukebox! BRING US THAT THING.
    showcaseJukebox();
    // hi, jukebox. n_n

    var results = $('#results'); // grabbing the results div
    if ($('ul')) { $('ul').remove(); }; // removing any old results
    var list = $('<ul></ul>'); // making a new list to hold the results
    list.addClass('list-group');

    var listItem = $('<li></li>'); // creating a list item to hold the instructions
    listItem.addClass('list-group-item');

    // build up instructions
    var instructions = "<p>Search for your favorite artist in the box above!</p>";
    instructions += "<p>Find out what other people think is their best song.</p>";
    instructions += "<!-- shout out to source API -->";
    instructions += '<p>This service is powered by <a id="jam" href="https://www.thisismyjam.com/">This Is My Jam</a>.</p>'

    listItem.append(instructions); // move instructions into list item
    list.append(listItem); // move listItem into list
    results.append(list); // move list into the results div on the page
  }

  $('#title h1 a').click(function(event) {
    event.preventDefault(); // nope, you're not a real link anymore
    displayInstructions();
  })
});
