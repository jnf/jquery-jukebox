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
        var songs = data;
        makeUL();
        if (songs.length > 0) {
          for (i = 0; i < songs.length; i++) {
            makeSongAnchor(songs[i]);
          };
        } else {
          apologize();
        };
      }
    });
  });

  function makeSongAnchor(song) {
    makeLI();
    var anchor = $("<a></a>");
    anchor.text(song.title);
    anchor.prop("href", song.url);
    var lastLI = $("li:last-child");

    lastLI.append(anchor);
  }

  function makeUL() {
    var list = $("<ul></ul>");
    $("form").after(list);
  }

  function makeLI() {
    var listItem = $("<li></li>");
    $("ul").append(listItem);
  }

  function apologize() {
    var p = $("<p></p>");
    p.text("That is not anyone else's jam.");
    $("form").after(p);
  }
});

