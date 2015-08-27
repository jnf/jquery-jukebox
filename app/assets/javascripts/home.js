$(function () {
  // WAS TESTING CREATING AN ATTRIBUTE IN JAVASCRIPT
  function addAttr() {
    var button = document.getElementsByTagName("input");
    // gets the last possible attribute that is an input
    var button = button[(button.length - 1)];
    var att = document.createAttribute("search");
    att.value = "yes";
    button.setAttributeNode(att);
  };
  addAttr();

  $('input[search=yes]').click(function(event) {
    event.preventDefault();

    var button = $(this);
    var box = button.siblings('input[type=text]');
    var parent = button.parent();

    var url = '/search/' + box.val();
    var method = parent.attr("method");

    $(".results").empty(); // empties the previous results
    $.ajax(url, {
      type: method,
      success: function (data) {

        // To add unordered list tags around all the list items.
        var unorderedList = $("<ul></ul>");
        results = $('.results')
        results.append(unorderedList);
        insideList = results.children(':first-child');

        // To add all the list items for all the results.
        for (var i = 0; i < data.length; i++) {
          var anchor = $("<a></a>"); //new anchor element
          anchor.text(data[i].title);
          anchor.prop("href", data[i].url);
            // attr vs prop -- look up the difference
            // prop is short for property
          var listItem = $("<li></li>");
          listItem.html(anchor);
          insideList.append(listItem);

          // Adding the embeded video.
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
        }
      }
    });
  });
});
