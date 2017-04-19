//http://gorigins.com/posting-a-canvas-image-to-facebook-and-twitter/
function getAppId() {
    return '1285554161522293';
}

function postImageToFacebook(token, filename, mimeType, imageData, message) {
    var fd = new FormData();
    fd.append("access_token", token);
    fd.append("source", imageData);
    fd.append("no_story", true);
    console.log('postImageToFacebook start');
    // Upload image to facebook without story(post to feed)
    $.ajax({
        url: "https://graph.facebook.com/me/photos?access_token=" + token,
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            console.log("success: ", data);
            FB.init({
                appId: getAppId(),
                version: 'v2.7' // or v2.1, v2.2, v2.3, ...
            });
            // Get image source url
            FB.api(
                "/" + data.id + "?fields=images",
                function (response) {
                    console.log('postImageToFacebook API IN' + response);
                    if (response && !response.error) {
                        //console.log(response.images[0].source);
                        $.getScript('//connect.facebook.net/en_US/sdk.js', function () {
                            // Create facebook post using image
                            console.log('postImageToFacebook feed');
                            FB.api(
                                "/me/feed",
                                "POST", {
                                    "message": "",
                                    "picture": response.images[0].source,
                                    "link": window.location.href,
                                    "name": 'Look at the cute panda!',
                                    "description": message,
                                    "privacy": {
                                        value: 'SELF'
                                    }
                                },
                                function (response) {
                                    if (response && !response.error) {
                                        /* handle the result */
                                        console.log("Posted story to facebook");
                                        console.log(response);
                                    }
                                }
                            );
                        });
                    }
                }
            );
        },
        error: function (shr, status, data) {
            console.log("error " + data + " Status " + shr.status);
        },
        complete: function (data) {
            console.log('Post to facebook Complete');
            Materialize.toast('Post to facebook Complete', 3000, 'rounded');
        }
    });
}

function postPic(blob) {
    console.log('posting pic');
    $.getScript('//connect.facebook.net/en_US/sdk.js', function () {
        console.log('posting pic 2');
        FB.init({
            appId: getAppId(),
            version: 'v2.7' // or v2.1, v2.2, v2.3, ...
        });
        FB.getLoginStatus(function (response) {
            console.log('posting pic RSPONSE');
            console.log(response);
            if (response.status === "connected") {
                postImageToFacebook(response.authResponse.accessToken, "Canvas to Facebook/Twitter", "image/png", blob, window.location.href);
            } else if (response.status === "not_authorized") {
                console.log('posting pic 3-1');
                FB.login(function (response) {
                    console.log('posting pic 4-1');

                    postImageToFacebook(response.authResponse.accessToken, "Canvas to Facebook/Twitter", "image/png", blob, window.location.href);
                }, {
                    scope: "publish_actions"
                });
            } else {
                console.log('posting pic 3-2');
                FB.login(function (response) {
                    console.log('posting pic 4-2');
                    postImageToFacebook(response.authResponse.accessToken, "Canvas to Facebook/Twitter", "image/png", blob, window.location.href);
                }, {
                    scope: "publish_actions"
                });
            }
        });

    });

};
