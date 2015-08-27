// $(document).ready(function() {
$(function() {
  $("form").submit(function(event) {
    event.preventDefault();

    removeOldInfo();

    var textField = $("#artist");
    var searchTerm = textField.val();

    var url = makeUrl(searchTerm);

    if (url) {
      $.ajax(url, {
        type: "GET",
        success: function(data) {
          var songs = data;
          if (songs.length > 0) {
            makeUL();
            for (i = 0; i < songs.length; i++) {
              makeSongAnchor(songs[i]);
            };
          } else {
            apologize();
          };
        }
      });
    } else {
      apologize();
    }
  });

  function makeUrl(searchTerm) {
    if (searchTerm.length > 0) {
      var url = "/search/" + searchTerm;
      return url;
    } else {
      return false;
    }
  }

  function makeSongAnchor(song) {
    makeLI();
    var anchor = $("<a></a>");
    anchor.text(song.title);
    anchor.prop("href", song.url);
    var lastLI = $("li:last-child");

    lastLI.append(anchor);
  }

  function removeOldInfo() {
    if ($("body").children(":last-child") != $("form")) {
      $("ul").remove();
      $("p").remove();
    }
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

