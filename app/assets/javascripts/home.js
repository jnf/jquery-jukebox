$(function () {

  // var player;
  // function onYouTubeIframeAPIReady() {
  //   player = new YT.Player('player', {
  //     height: '390',
  //     width: '640',
  //     videoId: 'M7lc1UVf-VE',
  //     events: {
  //       'onReady': onPlayerReady,
  //       'onStateChange': onPlayerStateChange
  //     }
  //   });
  // }
  //
  // document.body.appendChild(onYouTubeIframeAPIReady());

  function addAttr() {
    var button = document.getElementsByTagName("input");
    var button = button[(button.length - 1)];
    var att = document.createAttribute("testing");
    att.value = "yes";
    button.setAttributeNode(att);

    // var embededThang = document.createElement("embed");
    // embededThang.setAttribute("src", "http://images.freeimages.com/images/previews/5b0/rubik-s-cube-1-1424892.jpg");
    // document.body.appendChild(embededThang);
  };
  addAttr();

  // $('input[type=submit]').click(function(event) {
  $('input[testing=yes]').click(function(event) {
    event.preventDefault();

    var button = $(this);
    var box = button.siblings('input[type=text]');
    // console.log(box);
    // console.log(box.val());
    var parent = button.parent();
    // console.log(parent);

    var url = 'http://localhost:3000/search/' + box.val();
    var method = parent.attr("method");

    $(".results").empty();
    $.ajax(url, {
      type: method,
      success: function (data) {
        // console.log(data);

        // To add unordered list tags around all the list items.
        var unorderedList = $("<ul></ul>");
        results = $('.results')
        results.append(unorderedList);
        insideList = results.children(':first-child');
        // console.log(insideList);

        // To add all the list items for all the results.
        for (var i = 0; i < data.length; i++) {
          var anchor = $("<a></a>"); //new anchor element
          anchor.text(data[i].title);
          anchor.prop("href", data[i].url);
            //attr vs prop -- look up the difference
            //href belongs to anchors
          //   prop is short for property
          var listItem = $("<li></li>");
          listItem.html(anchor);
          // var breaking = $("<br>"); //new anchor element
          // $('body').append(anchor); //=> <a href="link/to/stuff">Text on the page</a>
          // $('body').append(breaking);
          insideList.append(listItem);
          // console.log(listItem);
          // var test = unorderedList.html;

          // unorderedList.html(test + listItem);
            //append vs prepend
            //replace (which will replace it with this node)
            //html <-- can replace raw HTML with other nodes

          var urlString = data[i].url;
          if (urlString.search("youtube") != -1) {
            var embededThang = $("<iframe></iframe>");
            embededThang.prop("id", "player");
            embededThang.prop("type", "text/html");
            embededThang.prop("width", "640");
            embededThang.prop("height", "390");
            urlString = urlString.replace("https", "http");
            urlString = urlString.replace("watch?v=", "embed/");
            urlString = urlString + "?enablejsapi=1";
            console.log(urlString);
            embededThang.prop("src", urlString);
            // embededThang.setAttribute("src", data[i].url);
            embededThang.prop("frameborder", "0");
            insideList.append(embededThang);
          }
            //
            // <iframe id="player" type="text/html" width="640" height="390"
            // src="http://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1&origin=http://example.com"
            // frameborder="0"></iframe>
        }
        // $('body').append(unorderedList);
      }
    });
  });
});
