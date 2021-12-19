var gapikey = 'AIzaSyCEB0n7VFac0qP0DOSAZ4kLcGrbW6PfmZw';

$(function() {
        $(".fancyboxIframe").fancybox({
            maxWidth    : 900,
            maxHeight    : 600,
            fitToView    : false,
            width        : '90%',
            height        : '90%',
            autoSize    : false,
            closeClick    : false,
            openEffect    : 'auto',
            closeEffect    : 'none',
            iframe: {
                scrolling : 'auto',
                preload   : true
            }
        });
        $('#search-form').submit( function(e) {
            e.preventDefault();
        });
    });

function cariYoutube() {
        $('#hasil').html('<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><span class="sr-only">Mohon Tunggu...</span>');
        $('#buttons').html('');
        q = $('#search').val();  
        $.get(
            "https://www.googleapis.com/youtube/v3/search", {
                part: 'snippet, id',
                q: q,
                type: 'video',
                key: gapikey
            }, function(data) {
                var nextPageToken = data.nextPageToken;
                var prevPageToken = data.prevPageToken;
                console.log(data);
                $('#hasil').html('');
                $.each(data.items, function(i, item) {
                    var output = getOutput(item);
                    $('#hasil').append(output);
                });
                var buttons = getButtons(prevPageToken, nextPageToken);
                $('#buttons').append(buttons);
           });
    }
function prevPage() {
        var token = $('#prev-button').data('token');
        var q = $('#prev-button').data('query');
        $('#hasil').html('<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><span class="sr-only">Mohon Tunggu...</span>');
        $('#buttons').html('');
        q = $('#search').val(); 
        $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: q,
            pageToken: token,
            type: 'video',
            key: gapikey
        }, function(data) {
 
            var nextPageToken = data.nextPageToken;
            var prevPageToken = data.prevPageToken;

            console.log(data);
            $('#hasil').html('');
            $.each(data.items, function(i, item) {
 
                var output = getOutput(item);
                $('#hasil').append(output);
            });
 
            var buttons = getButtons(prevPageToken, nextPageToken);
            $('#buttons').append(buttons);
        });    
}

function getOutput(item) {
        var videoID = item.id.videoId;
        var title = item.snippet.title;
        var description = item.snippet.description;
        var thumb = item.snippet.thumbnails.high.url;
        var channelTitle = item.snippet.channelTitle;
        var videoDate = item.snippet.publishedAt;
 
        var output =        '<div class="col-md-6">' +
                            '<img src="' + thumb + '" class="img-responsive thumbnail" >' +
                        '</div>' +
                        '<div class="input-group col-md-6">' +
                            '<h3><a data-fancybox-type="iframe" class="fancyboxIframe" href="http://youtube.com/embed/' + videoID + '?rel=0">' + title + '</a></h3>' +
                            '<small>By <span class="channel">' + channelTitle + '</span> on ' + videoDate + '</small>' +
                            '<p>' + description + '</p>' +
                        '</div>' +
                    '<div class="clearfix"></div>';
        return output;
    }