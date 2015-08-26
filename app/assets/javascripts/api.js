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

        var anchor = $("<a></a>");
        var arr    = data;
        for(i = 0; i < arr.length; i++) {
          console.log(arr[i].artist);
          form.after(arr[i].artist + " ");
        }
      }
    });

  });
});
