$(function() {
  $('input[type=submit]').click( function() {
    event.preventDefault();
    var searchField = $(this).siblings('input[type=search]');
    var url = '/search/' + searchField.val();
    var type = $(this).parents('form').attr('method')

    $.ajax(url, {
      type: type,
      success: function(data) {
        var list = createSongList(data);
        $('main').append(list);
      },
      error: function(data) {
        alert('Sorry, something went wrong!');
      }
    });
  })

  $('button').click( function() {
    event.preventDefault();
    var url = '/box-of-chocolates';

    $.ajax(url, {
      type: 'get',
      success: function(data) {
        var list = createSongList(data);
        $('main').append(list);
      },
      error: function(data) {
        alert('Sorry, something went wrong!');
      }
    });
  })

  function createSongList(data) {
    removeOldSearchList();

    var list = $('<ul>');
    for (i = 0; i < data.length; i++) {
      var listItem = $('<li>');
      var song = data[i];
      console.log(song);

      var anchor = $('<a>');
      anchor.text(song.title);
      anchor.prop('href', song.url);

      listItem.append(anchor);
      listItem.append(' by ' + song.artist);

      appendVideo(listItem, song);
      list.append(listItem);
    }
    return list;
  }

  function appendVideo(listItem, song) {
    var media = $('<ul>');
    var mediaItem = $('<li>')
    appendIframe(song, mediaItem);

    media.append(mediaItem);
    listItem.append(media);
  }

  function removeOldSearchList() {
    $('ul').remove();
  }

  function appendIframe(song, mediaItem){
    var config = mediaConfig[song.via] ? mediaConfig[song.via] : mediaConfig.default;
    iframe = iframeGenerator[config.method](fetchUrl(song), config.iframeWidth, config.iframeHeight, mediaItem);
  }

  function fetchUrl(song) {
    return urlFormatter[song.via] ? urlFormatter[song.via](song.url) : song.url;
  }

  var mediaConfig = {
    youtube: {
      method: 'defaultMedia',
      iframeHeight: 315,
      iframeWidth: 560
    },
    vimeo: {
      method: 'defaultMedia',
      iframeHeight: 315,
      iframeWidth: 560
    },
    soundcloud: {
      method: 'soundcloudMedia',
      iframeHeight: 315,
      iframeWidth: 560
    },
    webaudio: {
      method: 'defaultMedia',
      iframeHeight: 315,
      iframeWidth: 560
    },
    hypemachine: {
      method: 'defaultMedia',
      iframeHeight: 75,
      iframeWidth: 500
    },
    default: {
      method: 'defaultMedia',
      iframeHeight: 315,
      iframeWidth: 560
    }
  }

  var iframeGenerator = {
    soundcloudMedia: function(url, width, height, mediaItem) {
      var iframe = ''
      // var url = decodeUnicode("\u003Ciframe width=\"100%\" height=\"400\" scrolling=\"no\" frameborder=\"no\" src=\"https://w.soundcloud.com/player/?visual=true\u0026url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F35256425\u0026show_artwork=true\u0026height=315\"\u003E\u003C/iframe\u003E")
      var get_url = ('http://soundcloud.com/oembed?' + 'format=json' + '&url=' + url + '&iframe=true' + '&maxwidth=' + width + '&maxheight=' + height);

      $.ajax(get_url, {
        type: 'get',
        success: function(data) {
          iframe = $(data['html']);
          mediaItem.append(iframe);
        }
      });
    },
    defaultMedia: function(url, width, height, mediaItem) {
      var iframe = $('<iframe>');

      iframe.prop('src', url);
      iframe.attr('width', width);
      iframe.attr('height', height);
      iframe.attr('frameborder', '0');
      iframe.attr('scrolling', 'no');

      mediaItem.append(iframe);
    }
  }

  var urlFormatter = {
    youtube: function(url) {
      return url.replace('watch?v=', 'embed/');
    },
    vimeo: function(url) {
      return url.replace('//vimeo.com/', '//player.vimeo.com/video/');
    }
    // soundcloud: function(url) {},
    // webaudio: function(url) {},
    // hypemachine: function(url) {}
  }

// // Not needed. It parses it for me >_>
// function decodeUnicode(str) {
//   var regex = /\\u([\d\w]{4})/gi;
//   str = str.replace(regex, function(match, grp) {
//     return String.fromCharCode(parseInt(grp, 16));
//   });
//   return str;
// }

});

// YOUTUBE
  // route from api
  // http://www.youtube.com/watch?v=MxawVMQ02dc
  // embed uri
  // https://www.youtube.com/embed/MxawVMQ02dc
    // width: 560, height: 315

// VIMEO
  // route from api
  // http://vimeo.com/22000862
  // embed uri
  // https://player.vimeo.com/video/22000862
    // width: 500, height: 281

// WEBAUDIO
  // route from api
  // http://www.yeyo.me/tracks/k4Gt

// SOUNDCLOUD
  // route from api
  // https://soundcloud.com/frenchkiss_records/01-i-dont-want-love
  // can use the track id #, if I can get it
  // 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + 35256425 + '&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true'
  // can use the track url from the api, as well
  // "http://soundcloud.com/oembed?format=json&url=" + "http://soundcloud.com/asthmatickitty/sufjan-stevens-fourth-of-july" + "&iframe=true&maxwidth=560&maxheight=315"
  // can also make another get request
  // var get_url = ('http://soundcloud.com/oembed?' + 'format=json' + '&url=' + url + '&iframe=true' + '&maxwidth=' + width + '&maxheight=' + height);
    // result from that
    // <iframe width="100%" height="450" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/35256425&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>
      // width: 100%, height: 450
