// $(document).ready(function() {
$(function() {
  $("form").submit(function(event) {
    event.preventDefault();

    var textField = $("#artist");
    var searchTerm = textField.val();
    console.log(searchTerm);

    var url = "/search/" + searchTerm;

    $.ajax(url, {
      type: "GET",
      success: function(data) {
        // console.log(data);
        var songs = data;
        console.log(songs[0]);
        for (i = 0; i < songs.length; i++) {
          makeSongAnchor(songs[i]);
        };
      }
    });
  });

  function makeSongAnchor(song) {
    var anchor = $("<a></a>"); // creates an anchor element
    anchor.text(song.title);
    anchor.prop("href", song.url);
    $("form").after(anchor); // this makes it appear on page
  }
});

