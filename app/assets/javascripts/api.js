$(function() {
  $(".art").click(function(event) {
    event.preventDefault();

    var button = $(this);
    // console.log(button);
    var formTag = button.parent();
    // console.log(formTag);
    var something = button.siblings("#artist").val();
    console.log(something)
    var url = formTag.attr("action");
    // console.log(url);
    var method = formTag.attr("method");
    // console.log(method);


    // ajax makes an HTTP request from browser to server w/o changing the page
    // $.ajax(url, {
      // type: method,
      // data is a param that comes back from a success call
      // it is the response (which includes the view)
    // success: function (data) {
      // searchDiv.addClass("chosen");
        // console.log(data);
      // }
    // });
//
  });
});
