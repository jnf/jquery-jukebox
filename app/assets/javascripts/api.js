$(function() {
// autoloads javascript into browser window for the rails window

 $('form').submit(function(event) {
   event.preventDefault();
   // overrides default behavior normally associated with choose button

   var formTag = $(this);
   var textBox = $('input[type="text"]')
   var artist = textBox.val()

   var url = formTag.attr('action') + "/" + artist;
   var method = formTag.attr('method');

   $.ajax(url, {
     type: method,
     success: function (data) {
      // loop through each result
      // for each key do something
      // put in unordered list

      var anchor = $('<a></a>'); // new anchor element
      anchor.text('text on the page');
      anchor.prop('href', '/link/to/stuff');
      $('body').append(anchor); // <a href="/link/to/stuff">Text on the page.</a>
     }
   });

   // console.log(clubDiv);
   // console.log(clubDiv.hasClass('club'));
 });


}); // end
