var videoURL = "notset";
var photoURL = "notset";
(function ($) {
    $(function () {

        $('.button-collapse').sideNav();
        $('.modal').modal();
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

             Materialize.toast(text, 3000, 'rounded')

        };



        startTime();
        getTemp();
        getNews();
        Materialize.toast('Loaded', 3000, 'rounded')
    }); // end of document ready
})(jQuery); // end of jQuery name space

function setVideo() {
    var ip = $('#camIP').val();
    var port = $('#camPort').val();
    videoURL = "http://" + ip + ":" + port + "/video";
    photoURL = "http://" + ip + ":" + port + "/photo.jpg";

    $('#videoImg').attr("src",videoURL);
}