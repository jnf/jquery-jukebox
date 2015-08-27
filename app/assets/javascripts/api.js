$(function() { // autoloads javascript into browser window for the rails window

 $('form').submit(function(event) {
    $('#results').empty(); // clears result slate before querying API again
    event.preventDefault();
    // overrides default behavior normally associated with choose button

    var formTag = $(this);
    var artist = $('input[type="text"]').val()

    var url = formTag.attr('action') + "/" + artist;
    var method = formTag.attr('method');

    $.ajax(url, {
      type: method,
      success: function (data) {
        var list = $('<ul></ul>')
        var listItem = $('<li></li>'); // new list element
        var anchor = $('<a></a>'); // new anchor element

        if (data.length == 0) {
          anchor.text('Try this on for size');
          anchor.prop('href', 'https://www.youtube.com/watch?v=KmtzQCSh6xk');
          list.append(anchor);
        } else {

          for(var i = 0; i < data.length-1; i ++) {
            var sourceUrl = data[i].url;
            var title = data[i].title;
            var artist = data[i].artist;

            anchor.text(data[i].via);
            anchor.prop('href', sourceUrl);

            listItem.text(title + ", by: " + artist + " via "); // text within <li> tags
            listItem.append(anchor[0]); // link

            list.append(listItem);

        }


      } // for loop
      $('#results').append(list)
      $("li:odd").css("color", "#552601");

    } // function
   });
 });
}); // end
