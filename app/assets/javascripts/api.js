$(function () {
  $(".button").click(function () {
    event.preventDefault();

    var button = $(this);
    var body   = button.parents("body");
    var form   = button.parents("form");
    var artist = $("#artist").val();
    var url    = "/search/" + artist;
    var method = form.attr("method");


    console.log(artist);
    console.log(url);

    $.ajax(url, {
      type: method,
      success: function (data) {
        form.append("Artist Results: ");

        var songs    = data;
        for(i = 0; i < songs.length; i++) {
          makeSong(songs[i]);
        }
      }
    });

    function makeSong(song) {
      var anchor = $("<a></a>");
      anchor.text(song.title);
      anchor.prop("href", song.url);
      $("form").after(anchor);
    }

  });
});
