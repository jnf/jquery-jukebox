$(function() {
  $(".search").click(function(event) {
    event.preventDefault();
    // var form = $("form").children("input");
    var input = $("#artist");
    console.log(input);
    var searchTerm = input.val();
    console.log(searchTerm);

    // var url = "/search/miranda";
    // console.log(url);

    // $.ajax(url, {
    //   type: "GET",
    //   success: function (data) {
    //     console.log(data);
    //   }

    // });

  });
});
