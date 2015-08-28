$(function() {
  // Generate first round of 'breaking jams' on page load
  $(document).ready(function() {
    getBreakingJams();
  });

  // Update breaking jams feed on button click
  $('.breaking_search').click(function(event) {
    event.preventDefault();
    clearResults("breaking_jams");
    getBreakingJams();
  })

  // Get search results on button click
  $('.submit').click(function(event) {
    event.preventDefault();
    clearResults("search");

    var button = $(this);
    var url = '/search/' + $('input:text').val();
    var type = $('form').attr('method');

    $.ajax( url , {
      type: type,
      dataType: "json",
      success: function(data) {
        console.log(data);
        parseResults(data, "search");
      }
    });
  })

  $(document).on('click', '.jam', function(event) {
    var ref_num = $(this).attr("ref_num");
    var via = $(this).attr("via");

    populateActiveVideo(ref_num, via);
  })

  function clearResults(results_type) {
    var div_to_clear = "." + results_type
    $(div_to_clear).empty();
  };

  // Explicit ajax call (as required for the page render feature)
  function getBreakingJams() {
    $.ajax( '/breaking_jams' , {
      type: "get",
      dataType: "json",
      success: function(data) {
        console.log(data);
        parseResults(data, "breaking_jams");
      }
    });
  };

  function parseResults(data, results_type) {
    if (data == undefined ) {
      var no_results = $('<h3>Sorry, we do not have any results for your search. Please try another artist.</h3>')
      var div_to_append = '.' + results_type
      $(div_to_append).append(no_results);

    } else {

      for (i=0; i < data.length; i++) {
        var via = data[i].via;
        var url = data[i].url;
        var image_url = data[i].image;
        var caption = data[i].combinedTruncated;

        if (via == "youtube") {
          var ref_num = getYouTubeRefNum(url);
        } else if (via == "vimeo") {
          var ref_num = getVimeoRefNum(url);
        } else {
          var ref_num = ""
        }

        generateHTML(url, image_url, ref_num, via, caption, results_type);
      };
    };
  };

  function generateHTML(url, image_url, ref_num, via, caption, results_type) {
    // var anchor = $('<a></a>');
    // anchor.prop("href", url);

    var image_tag = $('<img>');
    image_tag.prop("src",image_url);

    // anchor.append(image_tag);

    var display_div = $('<div></div>');
    display_div.html(caption);
    display_div.attr("class", "jam");
    display_div.attr("ref_num", ref_num);
    display_div.attr("via", via)
    // display_div.prepend(anchor);
    display_div.prepend(image_tag);

    var div_to_append = "." + results_type
    $(div_to_append).append(display_div)
  };

  function getYouTubeRefNum(url) {
    var ref_num = url.substring(url.lastIndexOf("=")+1);
    return ref_num
  }

  function getVimeoRefNum(url) {
    var ref_num = url.substring(url.lastIndexOf("/")+1);
    return ref_num
  }

  function populateActiveVideo(ref_num, via) {
    $(".active_video").empty();

    if (via == "youtube") {
      var iframe = $('<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
      var iframe_url = "https://www.youtube.com/embed/" + ref_num;
      iframe.attr("src", iframe_url);
      iframe.attr("frameborder", 0);

    } else if (via == "vimeo") {
      var iframe = $('<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
      var iframe_url = "http://player.vimeo.com/video/" + ref_num;
      iframe.attr("src", iframe_url);
      iframe.attr("frameborder", 0);  

    } else {
      var iframe = $('<h3>Sorry, this embedded video is not supported.</h3>');
    }

    $('.active_video').append(iframe);
  }

})

// Click on video image
// add embedded video of image that was clicked on to .active_video div
// .active-video div height transition to 400px slow

// Vimeo iframe
// <iframe src="https://player.vimeo.com/video/12345" width="500" height="375" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

// YouTube iframe
//<iframe width="560" height="315" src="https://www.youtube.com/embed/CztT_pBFQv8" frameborder="0" allowfullscreen></iframe>

