var subscriptionKey = "677a9fa1bda549a7a0dee3b90bba4a07";
var emotionItems = ['anger', 'contempt', 'disgust', 'fear', 'happiness', 'neutral', 'sadness', 'surprise'];
var startedSnapping = 'Started Snapping';

function makeblob(dataURL) {
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

function showPersonName(personId, emotion) {
    $.ajax({
            url: "https://westus.api.cognitive.microsoft.com/face/v1.0/persongroups/usergroup/persons/" + personId,
            beforeSend: function (xhrObj) {
                // Request headers
                xhrObj.setRequestHeader("Content-Type", "application/JSON");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
                // xhrObj.setRequestHeader("Content-Length", img.fileSize);
            },
            type: "GET",
            processData: false,
            contentType: 'application/JSON',

        }).done(function (data) {
            var name = data['name'];
            if (name === 'srini1') {
                name = 'Srini';
            }
            // console.log(name, emotion);
            var currentString = $('#snapStatus').html();
            if (currentString === startedSnapping) {
                currentString = 'In the last snap we found';
            }
            //currentString += '<br/><b>' + name + '</b> Seems to be <b>' + emotion + '</b> in emotion';
            //$('#snapStatus').html(currentString);
            Materialize.toast(name + ' Seems to be ' + emotion + ' in emotion', 3000, 'rounded');
        })
        .fail(function () {
            alert("error showPersonName");
        });
}

function identifyPersionId(faceIdsList, emoMap) {
    // console.log(faceIdsList);
    var params = {
        "personGroupId": "usergroup",
        "faceIds": faceIdsList,
        "maxNumOfCandidatesReturned": 1,
        "confidenceThreshold": 0.5
    };
    $.ajax({
            url: "https://westus.api.cognitive.microsoft.com/face/v1.0/identify",
            beforeSend: function (xhrObj) {
                // Request headers
                xhrObj.setRequestHeader("Content-Type", "application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
                // xhrObj.setRequestHeader("Content-Length", img.fileSize);
            },
            type: "POST",
            dataType: "json",
            // Request body
            data: JSON.stringify(params)
        })
        .done(function (data) {
            // console.log(emoMap)
            for (var k = 0; k < data.length; k++) {
                // console.log(data[k]['faceId'])
                showPersonName(data[k]['candidates'][0]['personId'], emoMap[data[k]['faceId']]);
            }

        })
        .fail(function () {
            alert("error identifyPersionId");
        });

}

function detect(blobData) {

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
            data: blobData,
        })
        .done(function (data) {
            var faceIds = [];
            var emoMap = {};
            for (var i = 0; i < data.length; i++) {
                console.log(data[i].faceId);
                var stats = data[i]['faceAttributes']['emotion'];
                //console.log(emotionItems.length);
                var emotionName = emotionItems[0];
                var emotionValue = stats[emotionItems[0]];
                for (var j = 1; j < emotionItems.length; j++) {
                    // console.log(emotionValue + '_' + stats[emotionItems[j]])
                    if (emotionValue < stats[emotionItems[j]]) {
                        emotionValue = stats[emotionItems[j]];
                        emotionName = emotionItems[j];
                    }
                }
                emoMap[data[i].faceId] = emotionName;
                faceIds.push(data[i].faceId);
            }
            if (faceIds.length > 0) {
                identifyPersionId(faceIds, emoMap)
            } else {
                Materialize.toast('No User Identified in snap', 3000, 'rounded');
            }
        })
        .fail(function () {
            alert("error detect");
        });
}

function processDetect(img) {
    var max_size = 1024,
        width = img.naturalWidth,
        height = img.naturalHeight;


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

    c = document.createElement('canvas'),
        ctx = c.getContext("2d");
    c.width = width;
    c.height = height;
    ctx.drawImage(img, 0, 0, width, height);
    var dataURL = c.toDataURL();
    //console.log('DATA OK w' + width + ' h' + height);
    blobData = makeblob(dataURL);

    detect(blobData);
}

function processFB(img) {
    var width = img.naturalWidth,
        height = img.naturalHeight;


    c = document.createElement('canvas'),
        ctx = c.getContext("2d");
    c.width = width;
    c.height = height;
    ctx.drawImage(img, 0, 0, width, height);
    var dataURL = c.toDataURL();
    //console.log('DATA OK w' + width + ' h' + height);
    blobData = makeblob(dataURL);

    postPic(blobData);
}

function snapit() {
    console.log('in side snapit' + photoURL)
    // $('#snapStatus').html(startedSnapping);
    var img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function () {
        var c = document.getElementById('myCanvas');
        processFB(img);
        processDetect(img);
    }
    img.src = photoURL;
    //img.src = '/ZenLabslogo_Final.png';
}
