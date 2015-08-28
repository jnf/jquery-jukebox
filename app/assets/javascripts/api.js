$(function() {
  $('.search').click(function(event){
    event.preventDefault();

    var button = $(this);
    var formTag = button.parent();
    var method = formTag.attr("method");
    var url = formTag.attr("action");
    var resultsTitle = "Jams with " + $("#artist").val();

    var chanceForm = $("form[action='/chance']");
    var chanceMethod = chanceForm.attr("method");
    var chanceUrl = chanceForm.attr("action");
    var chanceResultsTitle = chanceForm.children().attr("value");

    $.ajax(url, {
      type: method,
      data: { 'artist' : $("#artist").val() },
      success: function(data) {
        if (data.length == 0){
          $.ajax(chanceUrl, {
            type: chanceMethod,
            success: function(data) {
              showResults(data, chanceResultsTitle);
            }
          });
        } else {
          showResults(data, resultsTitle);
        }
      }
    });

  });

  $('.popular').click(function(event){
    event.preventDefault();
    var button = $(this);
    getJams(button);
  });

  $('.chance').click(function(event){
    event.preventDefault();
    var button = $(this);
    getJams(button);
  });


  function getJams(button) {
    var formTag = button.parent();
    var method = formTag.attr("method");
    var url = formTag.attr("action");
    var resultsTitle = button.attr("value");

    $.ajax(url, {
      type: method,
      success: function(data){
        showResults(data, resultsTitle);
      }
    });
  };

  function showResults(data, resultsTitle) {
    var list = $("<ul>");
    var listTitle = $("<h2>");
    listTitle.text(resultsTitle);
    $("h2").replaceWith(listTitle);
    $(".results").prepend(listTitle);
    $("ul").replaceWith(list);
    $(".results").append(list);
    for (var i = 0; i < data.length; i++) {
      var result = data[i]
      var listItem = $("<li>");
      var urlResult = result.url;
      var iframe = $("<iframe>");
      list.append(listItem);
      if (result.via == "youtube"){
        var youtubeId = urlResult.substr(urlResult.indexOf('=') + 1);
        var src = "http://www.youtube.com/embed/" + youtubeId;
        iframe.prop("src", src);
        var songTitle = $("<h4>");
        songTitle.text(result.artist + ": " + result.title);
        $("li:last").append(songTitle);
        $("li:last").append(iframe);
      } else if (result.via == "vimeo"){
          var vimeoId = urlResult.substr(urlResult.lastIndexOf('/') + 1);
          var src = "http://player.vimeo.com/video/" + vimeoId;
          iframe.prop("src", src);
          var songTitle = $("<h4>");
          songTitle.text(result.artist + ": " + result.title);
          $("li:last").append(songTitle);
          $("li:last").append(iframe);
      } else if (result.via == "soundcloud"){
          var sdclId = urlResult.substr(22);
          var src = "http://w.soundcloud.com/player/?url=https%3A//soundcloud.com/" + sdclId;
          iframe.prop("src", src);
          var songTitle = $("<h4>");
          songTitle.text(result.artist + ": " + result.title);
          $("li:last").append(songTitle);
          $("li:last").append(iframe);
      } else {
        var anchor = $("<a>");
        anchor.text(result.artist + ": " + result.title);
        anchor.prop("href", result.url);
        $("li:last").append(anchor);
      }
    };
  };

});
