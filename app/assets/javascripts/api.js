$(function() {
  $(".btn-search").click(function(event) {
    event.preventDefault();

    var formTag = $(this).parent("form");
    var artist = document.getElementById("artist").value; // $("#artist").val();
    var url = ("/search/" + artist);

    console.log(url);
    $.getJSON(url, function(data) {
      for (var i = 0; i < data.length; i++) {
        var thisArtist = data[i];
        var listItem = $('<li></li>');

        var anchor = $('<a></a>');
        anchor.text(thisArtist.artist + ", " + thisArtist.title);
        anchor.prop("href", thisArtist.url);
        listItem.append(anchor);
        $('ul').append(listItem);
      }
      // $.each(data, function(data) {
        // var artistInfo = $("<a>data.artist</a>");
        // artistInfo.prop("href", data.url);
      // }
      // error: function(data) {
      //   console.log(errorThrown);
      // },
      // success: function(data) {
      //   console.log(data);
      // }
    }).fail(function() {
      alert( "error" );
    });
  });
});
