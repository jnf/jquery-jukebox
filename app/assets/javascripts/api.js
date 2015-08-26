$(function() {
  $(".search").click(function(event){
    event.preventDefault();

    var searchButton = $(this);

    var formTag = searchButton.parent("form");

    var url = formTag.attr("action");
    var method = formTag.attr("method");
    var children = formTag.children("#artist")
    var artistField = children.val()

    // console.log(value)

    // $.ajax(url, {
    //  type: method,
    //  success: function (data) {
    //   console.log(data)
    //   }
    // });

    // collect text in the field
    // assemble the correct url
    // snag the correct method
    // hit the controller
  });
});
