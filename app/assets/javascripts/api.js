$(function() { // autoloads javascript into browser window for the rails window

  $("#searchartist").click(function(event) {
    $('#results').empty(); // clears result slate before querying API again
    event.preventDefault();
    // overrides default behavior normally associated with choose button

    var formTag = $(this).parent();
    var artist = $('input[type="text"]').val();
    var url = formTag.attr('action') + "/" + artist;
    var method = formTag.attr('method');

    if (artist.length == 0) {  // guard for if user has no input
      alert("Please enter an artist");
      return;
    }

    $.ajax(url, {
      type: method,
      success: function (data) {
        var list = $('<ul></ul>')

        if (data.length == 0) {
          defaultResult();
        } else {
          for(var i = 0; i < data.length-1; i ++) {
            result(i, data, list);
        }

      } // for loop
      $('#results').append(list)
      $("li:odd").css("color", "#552601");

    } // function
   });
 });

 var breaking = $('#breaking').parent()

 $(breaking).submit(function(event) {
    $('#results').empty(); // clears result slate before querying API again
    event.preventDefault();
    // overrides default behavior normally associated with choose button

    var formTag = $(this);
    var url = formTag.attr('action');
    var method = formTag.attr('method');

    $.ajax(url, {
      type: method,
      success: function (data) {
        var list = $('<ul></ul>')

        for(var i = 0; i < data.length-1; i ++) {
          result(i, data, list);

      } // for loop
      $('#results').append(list)
      $("li:odd").css("color", "#f69649");

    } // function
   });
 });

 var random = $('#rando').parent()


 $(random).submit(function(event) {
   $('#results').empty(); // clears result slate before querying API again
   event.preventDefault();
   // overrides default behavior normally associated with choose button

   var formTag = $(this);
   var url = formTag.attr('action');
   var method = formTag.attr('method');

   $.ajax(url, {
     type: method,
     success: function (data) {
       var list = $('<ul></ul>')

       for(var i = 0; i < data.length-1; i ++) {
         result(i, data, list);

     } // for loop
     $('#results').append(list)
     $("li:odd").css("color", "#2d1001");

   } // function
  });
});

  function result(i, data, list) {
    var title = data[i].title;
    var artist = data[i].artist;
    var listItem = $('<li></li>'); // new list element
    var anchor = $('<a></a>'); // new anchor element
    var sourceUrl = data[i].url;
    var via = data[i].via

    if (via == "youtube") {
      var content = embedYouTube(sourceUrl);
    }

    anchor.text(data[i].via);
    anchor.prop('href', sourceUrl);

    listItem.text(title + ", by: " + artist + " via " + via); // text within <li> tags
    listItem.append(anchor[0]); // link
    listItem.append(content)
    list.append(listItem);
  };

  function defaultResult() {
    var listItem = $('<li></li>'); // new list element
    var anchor = $('<a></a>'); // new anchor element
    list.append('<iframe width="420" height="315" src="https://www.youtube.com/embed/KmtzQCSh6xk" frameborder="0" allowfullscreen></iframe>');
  }

  function embedYouTube(sourceUrl) {
    var start = sourceUrl.lastIndexOf('=');
    var end = sourceUrl.length;
    var identity = sourceUrl.substr(start + 1)
    var video = "<iframe width='560' height='315' src='https://www.youtube.com/embed/" + identity + "' frameborder='0'></iframe>"
    console.log(sourceUrl)
    console.log(video)
    return video
    // var thisVideo = $(lastIndexOf(sourceUrl));
// <iframe width="560" height="315" src="https://www.youtube.com/embed/XeRSk_cpz2Y" frameborder="0" allowfullscreen>;
  }

}); // end
