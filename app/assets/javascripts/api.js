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
    var anchor =  $("<a></a><br>");
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
      if(url.match("youtube")) {
        var code = url.split("").slice(-11).join("");
        var link = "https://www.youtube.com/embed/" + code;
      }else {
        var link = "Hello";
        //
      }
      return link
        // console. log(link);

    //   // console.log();
    //   // video(data[i]);
    // }
    // var oldValue = data.url
    // var newValue =
    //
    // "http://www.youtube.com/watch?v=gMqIuAJ92tM"
    // value="http://www.youtube.com/v/OdT9z-JjtJk&autoplay=1" /><embed height="350" src="http://www.youtube.com/v/OdT9z-JjtJk&autoplay=1" type="application/x-shockwave-flash" width="425"></embed></object>
    // <object height="350" width="425"><param name="movie"
    // <iframe width="560" height="315" src="https://www.youtube.com/embed/qLswMxgMg2s" frameborder="0" allowfullscreen></iframe>
  }
  // function getVideoCode(url) {
  //   var link = url.split("");
  //   var code = link.slice(-11).join("");
  // }
});
