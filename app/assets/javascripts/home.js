$(function () {

  $('input[type=submit]').click(function(event) {
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
        console.log(data);

        // var unorderedList = $("<ul></ul>");

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
          $('.results').append(listItem);
          // console.log(listItem);
          // var test = unorderedList.html;

          // unorderedList.html(test + listItem);
            //append vs prepend
            //replace (which will replace it with this node)
            //html <-- can replace raw HTML with other nodes
        }
        // $('body').append(unorderedList);
      }
    });
    //
    // success: function (data) {
    //       clubDiv.addClass("chosen");
    //     }
    //
    // var anchor = $("<a></a>"); //new anchor element
    // anchor.text("Text on the page.");
    // anchor.prop("href", "/link/to/stuff");
    //   //attr vs prop -- look up the difference
    //   //href belongs to anchors
    //   //prop is short for property
    // $('body').append(anchor); //=> <a href="link/to/stuff">Text on the page</a>
    //   //append vs prepend
    //   //replace (which will replace it with this node)
    //   //html <-- can replace raw HTML with other nodes

  });
  //
  //
  //
  //   var clubDiv = button.parents(".club");
  //   // console.log(parent);
  //   // console.log(parent.hasClass('club'));
  //   // parent.addClass("chosen");
  //   // clubDiv.toggleClass("chosen");
  //
  //   var formTag = button.parent('form');
  //   console.log(formTag);
  //   var url = formTag.attr("action");
  //   console.log(url);
  //   var method = formTag.attr("method");
  //
  //   $.ajax(url, {
  //     type: method,
  //     success: function (data) {
  //       clubDiv.addClass("chosen");
  //     }
  //   })

});
