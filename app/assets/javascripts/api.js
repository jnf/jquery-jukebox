$(function() {
  $(".singer").click(function(event) {
    event.preventDefault();

  var button = $(this);
  var parent = button.parents('function');
  var formTag = button.parent('form');
  var method = formTag.attr("method");

  var artist = button.siblings('#artist').val();
  var url = formTag.attr('action');
  url = url + artist;

  $.ajax(url, {
      type: method,
      success: function (data) {
        for (i=0; i < data.length; i++) {
          link(data[i]);
          // video(data[i]);
        }
        console.log(data)
      }
    });
  });

  function link(data) {
    var anchor =  $("<a></a><br>");
    anchor.text(data.title);
    anchor.prop("href",data.url);
    $("body").append(anchor);
  }

  // function video(data){
  //   var iframe = document.createElement('iframe');
  //   document.body.appendChild(iframe);
  //   iframe.src = data.url

  // }
});
