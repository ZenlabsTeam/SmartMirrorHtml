function getNews() {

    var newURL = "https://newsapi.org/v1/articles?source=google-news&sortBy=top&apiKey=" + "9d0487877eb041ad8a246153a777cb3d";
    $.ajax({
        type: "GET",
        url: newURL,
        dataType: "json",
        cache: true, // Use cache for better reponse times
        success: function (data) {
            if (data) {
                var list = "";
                for (var i = 0; i < data.articles.length; i++) {
                    $("#newsItems").append('<li class="collection-item  blue-grey-text text-darken-1">' + data.articles[i].title + '</li>');
                    if (i > 2) break;
                }

            }
        }
    });
}
