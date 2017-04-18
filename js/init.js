var videoURL = "notset";
var photoURL = "notset";
(function ($) {
    $(function () {

        $('.button-collapse').sideNav();
        $('.modal').modal();


        $('#camIP').val('172.16.10.43');
        $('#camPort').val('8080');
        setVideo();
        //$('#IPCamAddress').modal('open');

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

            Materialize.toast(text, 3000, 'rounded')

        };

        $.ajaxSetup({
            cache: true
        });
        $.getScript('//connect.facebook.net/en_US/sdk.js', function () {
            FB.init({
                appId: '282915688822584',
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
        //Materialize.toast('Loaded', 3000, 'rounded');

        snapit();
    }); // end of document ready
})(jQuery); // end of jQuery name space

function setVideo() {
    var ip = $('#camIP').val();
    var port = $('#camPort').val();
    videoURL = "http://" + ip + ":" + port + "/video";
    photoURL = "http://" + ip + ":" + port + "/photoaf.jpg";

    $('#videoImg').attr("src", videoURL);
}
