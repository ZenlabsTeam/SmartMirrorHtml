function getTemp() {
    var isMetric = true;
    var language = "en";
    var locationKey = "204848"
    var apiKey = "hoArfRosT1215";
    var currentConditionsUrl = "http://apidev.accuweather.com/currentconditions/v1/" +
        locationKey + ".json?language=" + language + "&apikey=" + apiKey;
    $.ajax({
        type: "GET",
        url: currentConditionsUrl,
        dataType: "jsonp",
        cache: true, // Use cache for better reponse times
        jsonpCallback: "awxCallback", // Prevent unique callback name for better reponse times
        success: function (data) {
            console.log(JSON.stringify(data))
            var html;
            if (data && data.length > 0) {
                var conditions = data[0];
                var temp = isMetric ? conditions.Temperature.Metric : conditions.Temperature.Imperial;
                html = conditions.WeatherText + ", " + temp.Value + " " + temp.Unit;
                $("#currentTemp").text(temp.Value + String.fromCharCode(176) + temp.Unit);

                $('#tempPic').attr("src", '/icons/' + twodigits(conditions.WeatherIcon) + '-s.png');
            } else {
                $("#currentTemp").text('Error Finding Temp');
            }


        }
    });




}
