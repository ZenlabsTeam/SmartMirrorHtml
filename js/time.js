function startTime() {

    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = twodigits(m);
    s = twodigits(s);
    $('#currentTime').text(h + ":" + m);
    var now = new Date(today.getTime() - (60000 * ((12 * 60) + 30)));
    h = now.getHours();
    m = now.getMinutes();
    s = now.getSeconds();
    m = twodigits(m);
    s = twodigits(s);
    $('#currentTimeUSA').text(h + ":" + m);
    var t = setTimeout(startTime, 500);
}

function twodigits(i) {
    if (i < 10) {
        i = "0" + i
    }; // add zero in front of numbers < 10
    return i;
}
