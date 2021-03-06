var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var separator = ':';


function startTime() {

    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();

    m = twodigits(m);
    h = twodigits(h);

    $('#currentTime').text(h + nextSeprator('#currentTime') + m);
    var now = new Date(today.getTime() - (60000 * ((12 * 60) + 30)));
    h = now.getHours();
    m = now.getMinutes();
    m = twodigits(m);
    h = twodigits(h);

    $('#currentTimeUSA').text(h + nextSeprator('#currentTimeUSA') + m);
    var day = days[today.getDay()];
    var month = months[today.getMonth()];
    var date = today.getDate();
    $('#dateDisplay').text(day + '-' + month + ' ' + date);


    var t = setTimeout(startTime, 500);
}

function twodigits(i) {

    if (i < 10) {
        i = "0" + i
    }; // add zero in front of numbers < 10
    return i;
}

function nextSeprator(id) {

    separator = $(id).text().charAt(2);
    //console.log($(id).text() + '-' + separator);
    if (separator === ":") return ' '
    else return ':';
}
