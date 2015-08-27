$(function() {
  $('.search').click(function(event){
    event.preventDefault();

    var button = $(this);
    var formTag = button.parent();
    var method = formTag.attr("method");
    var url = formTag.attr("action");

    $.ajax(url, {
      type: method,
      data: { 'artist' : $("#artist").val() },
      success: function(data) {
        showResults(data);
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

  function showResults(data) {
    var list = $("<ul></ul>");
    $("ul").replaceWith(list);
    $("body").append(list);
    for (var i = 0; i < data.length; i++) {
      var listItem = $("<li></li>");
      var anchor = $("<a></a>");
      var result = data[i]
      anchor.text(result.artist + ": " + result.title);
      anchor.prop("href", result.url);
      list.append(listItem);
      $("li:last").append(anchor);
    };
  };

});
