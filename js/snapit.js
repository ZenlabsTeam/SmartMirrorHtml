var subscriptionKey = "677a9fa1bda549a7a0dee3b90bba4a07";

makeblob = function (dataURL) {
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
        var parts = dataURL.split(',');
        var contentType = parts[0].split(':')[1];
        var raw = decodeURIComponent(parts[1]);
        return new Blob([raw], {
            type: contentType
        });
    }
    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], {
        type: contentType
    });
}

function detect() {
    var img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function () {
        //var c = document.getElementById('myCanvas');

        var max_size = 1024,
            width = this.naturalWidth,
            height = this.naturalHeight,
            c = document.createElement('canvas'),
            ctx = c.getContext("2d");

        if (width > height) {
            if (width > max_size) {
                height *= max_size / width;
                width = max_size;
            }
        } else {
            if (height > max_size) {
                width *= max_size / height;
                height = max_size;
            }
        }
        c.width = width;
        c.height = height;
        ctx.drawImage(this, 0, 0, width, height);
        var dataURL = c.toDataURL();
        console.log('DATA OK w' + width + ' h' + height);
        console.log('DATA OK ' + dataURL);

        $.ajax({
                url: "https://westus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=smile,emotion",
                beforeSend: function (xhrObj) {
                    // Request headers
                    xhrObj.setRequestHeader("Content-Type", "application/octet-stream");
                    xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
                    // xhrObj.setRequestHeader("Content-Length", img.fileSize);
                },
                type: "POST",
                processData: false,
                contentType: 'application/octet-stream',
                // Request body
                data: makeblob(dataURL),
            })
            .done(function (data) {
                alert("success");
            })
            .fail(function () {
                alert("error");
            });
    };
    img.src = photoURL;
}

function snapit() {
    detect();
    Materialize.toast('Snap it', 3000, 'rounded');
}
