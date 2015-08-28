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

 var breaking = $('input[id="breaking"]').parent()

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

 $("#rando").parent().submit(function(event) {
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
    var sourceUrl = data[i].url;
    var title = data[i].title;
    var artist = data[i].artist;
    var listItem = $('<li></li>'); // new list element
    var anchor = $('<a></a>'); // new anchor element

    anchor.text(data[i].via);
    anchor.prop('href', sourceUrl);

    listItem.text(title + ", by: " + artist + " via "); // text within <li> tags
    listItem.append(anchor[0]); // link
    list.append(listItem);
  };

  function defaultResult() {
    var listItem = $('<li></li>'); // new list element
    var anchor = $('<a></a>'); // new anchor element
    list.append('<iframe width="420" height="315" src="https://www.youtube.com/embed/KmtzQCSh6xk" frameborder="0" allowfullscreen></iframe>');
  }

}); // end
