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
          // link(data[i]);
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
    var formTag = button.parent('form');
    var method = formTag.attr("method");
    var url = formTag.attr('action');

    $.ajax(url, {
        type: method,
        success: function (data) {
          for (i=0; i < data.length; i++) {
            // link(data[i]);
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
    var link;
    if(url.match("youtube")) {
      link = youtube(url);
    }else if (url.match("vimeo")){
      link = vimeo(url);
    }else if (url.match("soundcloud")){
      link = soundCloud(url);
    }else {
      link = url;
    }
    return link;
  }
// YouTube----------------------------------------------------------------------
  function youtube(url) {
    var link = youtubeEmbededUrl() + youtubeVideoCode(url);
    return link
  }

  function youtubeVideoCode(url){
    var videoCode = url.split("").slice(-11).join("");
    return videoCode
  }

  function youtubeEmbededUrl(){
    var link = "https://www.youtube.com/embed/";
    return link
  }

// Vimeo------------------------------------------------------------------------
  function vimeo(url) {
    var link = vimeoEmbededUrl() + vimeoVideoCode(url);
    return link
  }

  function vimeoVideoCode(url){
    if(url.split("").slice(-10)[0] === "/") {
      var videoCode = url.split("").slice(-9).join("");
    }else if (url.split("").slice(-8)[0] === "/"){
      var videoCode = url.split("").slice(-7).join("");
    }else {
      var videoCode = url.split("").slice(-8).join("");
    }
    return videoCode
  }

  function vimeoEmbededUrl(){
    var link = "https://player.vimeo.com/video/";
    return link
  }

// SoundCloud-------------------------------------------------------------------
  function soundCloud(url) {
    link = "https://w.soundcloud.com/player/?url=" + url + "&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true";
    return link
  }
});
