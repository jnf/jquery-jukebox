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
          video(data[i]);
        }
        console.log(data)
      }
    });
  });

  $(".popular").click(function(event) {
      event.preventDefault();

      var button = $(this);
      var parent = button.parents('function');
      console.log(parent);
      var formTag = button.parent('form');
      console.log(formTag);
      var method = formTag.attr("method");
      console.log(method);

      var url = formTag.attr('action');
      console.log(url);

      $.ajax(url, {
          type: method,
          success: function (data) {
            for (i=0; i < data.length; i++) {
              link(data[i]);
              video(data[i]);
            }
            console.log(data)
            console.log(embeded(data))
          }
        });
    })


  function link(data) {
    var anchor =  $("<a></a><br><br>");
    anchor.text(data.title);
    anchor.prop("href",data.url);
    $("body").append(anchor);
  }

  function video(data){
    var iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    iframe.src = embeded(data.url);
  }

  function embeded(url){
    var code;
    var link;
      if(url.match("youtube")) {
        code = url.split("").slice(-11).join("");
        link = "https://www.youtube.com/embed/" + code;
      }else if (url.match("vimeo")){
        code = url.split("").slice(-8).join("");
        link = "https://player.vimeo.com/video/" + code;
        // console.log(url);
      }else if (url.match("soundcloud")){
        // code = url.split("").slice(-8).join("");
        console.log(url);
        // var link = "https://w.soundcloud.com/player/" + code;
        link = "https://w.soundcloud.com/player/" + code;
      }
      return link;
  }
  });
