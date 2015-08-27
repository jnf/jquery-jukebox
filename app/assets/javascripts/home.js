$(function() {
  $('.submit').click(function(event) {
    event.preventDefault();
    clearList();

    var button = $(this);
    var url = '/search/' + $('input:text').val();
    var type = $('form').attr('method');

    $.ajax( url , {
      type: type,
      dataType: "json",
      success: function(data) {
        console.log(data);
        parseResults(data);
      }
    });
  })

  function parseResults(data) {
    if (data.length == 0) {
      var no_results = $('<h3>Sorry, we do not have any results for your search. Please try another artist.</h3>')
      $('ul').append(no_results);
    
    } else {

      for (i=0; i < data.length; i++) {
        var url = data[i].url;
        var artist = data[i].artist;
        var title = data[i].title;
        var image_url = data[i].image;

        var image_tag = $('<img>');
        image_tag.prop("src",image_url);
      
        var line_item = $('<li></li>');
        line_item.html( artist + " " + title + '--  <a>Watch Video</a>');
        var anchor = line_item.children('a');
        anchor.prop("href", url);
        line_item.prepend(image_tag);

        $('ul').append(line_item);
      };
    };
  };

  function clearList() {
    $('ul').empty();
  };


})



