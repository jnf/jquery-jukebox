$(document).ready(function() {
  $("form").submit(function(event) {
    event.preventDefault();

    var textField = $("#artist");
    var searchTerm = textField.val();
    console.log(searchTerm);

    var url = "/search/" + searchTerm;

    $.ajax(url, {
      type: "GET",
      success: function(data) {
        console.log(data);
      }
    });
  });
});
