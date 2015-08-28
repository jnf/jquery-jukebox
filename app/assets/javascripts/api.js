$(function (){
 $(".btn").click(function(event){
    event.preventDefault();

      var button = $(this);
      var form  = button.parent();
      var method = form.attr("method");
      var url = form.attr("action");
      var results = $("#results")
      results.text("")
       
    $.ajax(url,{
        type: method,
        data:{'artist': $("#artist").val()},
        success: function(data){ 
        var jam = "";
          for (var i = 0; i < data.length;i++) {
                  
          jam += "<li>"+ data[i].artist + "</li>" ;
          jam += "<li>"+ "<a href="+ data[i].url + ">"+ data[i].title + "</a> "+ "</li>";
          jam += "<br>" ;
          
          }

          results.append(jam);

//  var anchor = $('<a> </a>'); // new anchor element
//  anchor.text('Text on the page.');
//  anchor.prop('href', '/link/to/stuff');
//  $('body').append(anchor); // <a href="/link/to/stuff">Text on the page.</a>
        }        


          // var "artist" = data[0]["artist"]
          // var "title" = datatitle
          // var "via" = data.via
          // var "url" = data.url
          // console.log(url)
     




    });

 });



// var anchor = $('<a> </a>'); // new anchor element
//  anchor.text('Text on the page.');
//  anchor.prop('href', '/link/to/stuff');
//  $('body').append(anchor); // <a href="/link/to/stuff">Text on the page.</a>


// });

// $(function() { // ties code into the rails pre-loaded magic 
//   $('".choose"').click(function(event) {
//     event.preventDefault(); //override whatever currently exists.
//     // select the (grand)parent div of `this` with a class of club
//     // add a class of `chosen` to that div
//     var button = $(this)
//     var clubDiv = button.parents(".club");   

//     var formTag = button.parent('form');
//     var url = formTag.attr("action");
//     var method = formTag.attr("method");
//     console.log(url);

//     $.ajax(url, {
//       type: method,
//       success: function (data) {
//         clubDiv.addClass("chosen");
//         console.log(data);
//   }
  });

// ajax: url -  the url from your form/view(search_path); if the button was working this is where you would go
        // method - the http restful method used to get the search_path
        // *note: ajax also needs access to params!!! to get access to artist or whatever input you are sending to the api
        // success: if et goes the way we want it to, do this