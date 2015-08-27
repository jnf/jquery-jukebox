$(function () {
  $(".button").click(function () {
    event.preventDefault();

    var button  = $(this);
    var body    = button.parents("body");
    var formDiv = button.parents(".form-block");
    var form    = button.parents("form");
    var artist  = $("#artist").val();
    var url     = "/search/" + artist;
    var method  = form.attr("method");

    $.ajax(url, {
      type: method,
      success: function (data, textStatus, jqHXR) {
        if (jqHXR.status == 200) {
          form.after("Results:");

          var songs    = data;
          for(i = 0; i < songs.length; i++) {
            var link = makeSong(songs[i]);
            formDiv.append(link);
          }
        }

        else if (jqHXR.status == 204) {
            sendApology();
            var song = suggestArtist();
            formDiv.append(song);
        }
      }
    });

    function sendApology() {
      apology = "There are no results for that artist, try this artist instead!";

      return form.after();
    }

    function suggestArtist() {
      var song   = new Object();
      song.title = "I Wanna Dance with Somebody";
      song.url   = "https://vimeo.com/36732042";

      return makeSong(song);
    }

    function makeListItem(link) {
      console.log(link)
      var li = $("<li></li>");
      li.html(link);

      return li;
    }

    function makeSong(song) {
      var anchor = $("<a></a>");
      anchor.text(song.title);
      anchor.prop("href", song.url);

      return makeListItem(anchor);
    }
  });
});
