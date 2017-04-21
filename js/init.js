var videoURL = 'notset';
var photoURL = 'notset';
var matchItem = [
    'snap it',
    'click it'
];
(function ($) {
    $(function () {

        $('.button-collapse').sideNav();
        $('.modal').modal();
        $('#camIP').val('172.16.10.110');
        $('#camPort').val('8080');
        //setVideo();
        $('#IPCamAddress').modal('open');

        var recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = "en-US";
        recognition.start();


        recognition.onresult = function (event) {
            var text = "";
            for (var i = event.resultIndex; i < event.results.length; ++i) {
                text += event.results[i][0].transcript;
            }
            console.log(text + matchItem.indexOf(text));
            if (matchItem.indexOf(text) != -1) {
                console.log('IN');
                Materialize.toast('Snapping the Pic', 3000, 'rounded');
                snapit();
            }

        };
        $(window).keydown(function (event) {
            if (event.ctrlKey && (event.which == 83 || event.which == 115)) {
                console.log('IN');
                Materialize.toast('Snapping the Pic', 3000, 'rounded');
                snapit();
                event.preventDefault();
            }
        });
        $.ajaxSetup({
            cache: true
        });
        $.getScript('//connect.facebook.net/en_US/sdk.js', function () {
            FB.init({
                appId: getAppId(),
                version: 'v2.7' // or v2.1, v2.2, v2.3, ...
            });

            FB.login(function () {
                console.log('Log in Done');
            }, {
                scope: 'publish_actions'
            });

        });

        startTime();
        getTemp();
        getNews();

    }); // end of document ready
})(jQuery); // end of jQuery name space

function setVideo() {
    var ip = $('#camIP').val();
    var port = $('#camPort').val();
    videoURL = "http://" + ip + ":" + port + "/video";
    photoURL = "http://" + ip + ":" + port + "/photoaf.jpg";

    $('#videoImg').attr("src", videoURL);
}
