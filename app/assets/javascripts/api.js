$(function() {
  $('.search').click(function(event){
    event.preventDefault();

    var button = $(this);
    var formTag = button.parent();
    var method = formTag.attr("method");
    var url = formTag.attr("action");
    var chanceForm = $("form[action='/chance']")
    var chanceMethod = chanceForm.attr("method")
    var chanceUrl = chanceForm.attr("action")

    $.ajax(url, {
      type: method,
      data: { 'artist' : $("#artist").val() },
      success: function(data) {
        if (data.length == 0){
          $.ajax(chanceUrl, {
            type: chanceMethod,
            success: function(data) {
              console.log(data);
              showResults(data);
            }
          });
        } else {
          showResults(data);
        }
      }
    });

  });

  $('.popular').click(function(event){
    event.preventDefault();

    var button = $(this);
    var formTag = button.parent();
    var method = formTag.attr("method");
    var url = formTag.attr("action");

    $.ajax(url, {
      type: method,
      success: function(data){
        showResults(data);
      }
    });

  });

  $('.chance').click(function(event){
    event.preventDefault();

    var button = $(this);
    var formTag = button.parent();
    var method = formTag.attr("method");
    var url = formTag.attr("action");

    $.ajax(url, {
      type: method,
      success: function(data){
        showResults(data);
      }
    });

  });

  function showResults(data) {
    var list = $("<ul></ul>");
    $("ul").replaceWith(list);
    $("body").append(list);
    for (var i = 0; i < data.length; i++) {
      var result = data[i]
      var listItem = $("<li></li>");
      if (result.via == "youtube"){
        var iframe = $("<iframe></iframe>");
        var urlResult = result.url;
        var youtubeId = urlResult.substr(urlResult.indexOf('=') + 1);
        var src = "http://www.youtube.com/embed/" + youtubeId;
        iframe.prop("src", src);
        list.append(listItem);
        $("li:last").append(iframe);
      } else if (result.via == "vimeo"){
          var iframe = $("<iframe></iframe>");
          var urlResult = result.url;
          var vimeoId = urlResult.substr(urlResult.lastIndexOf('/') + 1);
          var src = "http://player.vimeo.com/video/" + vimeoId;
          iframe.prop("src", src);
          list.append(listItem);
          $("li:last").append(iframe);
      } else {
        var anchor = $("<a></a>");
        anchor.text(result.artist + ": " + result.title);
        anchor.prop("href", result.url);
        list.append(listItem);
        $("li:last").append(anchor);
      }
    };
  };

});
