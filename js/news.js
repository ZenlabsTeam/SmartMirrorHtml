function getNews() {

    var newURL = "https://newsapi.org/v1/articles?source=techcrunch&sortBy=latest&apiKey=" + "9d0487877eb041ad8a246153a777cb3d";
    var list = "";
    $.ajax({
        type: "GET",
        url: newURL,
        dataType: "json",
        cache: true, // Use cache for better reponse times
        success: function (data) {
            if (data) {

                for (var i = 0; i < data.articles.length; i++) {
                    list += '<p class="white-text">' + data.articles[i].title + '</p><hr/>'

                }
                //console.log(list);
                $('#newsItems').html(list);

            }
        }
    });
}
