var NetworkAccess = navigator.onLine;
var action;
var value;
var trackingCalls = {
    "clicks" : [{
        "name": "clickButton1",
        "online": "1023-online",
    }, {
        "name": "clickButton2",
        "online": "1024-online",
    }]
}

function trackClick(name) {
    if (!NetworkAccess) {
        //No network - clicks won't fire
        return false;
    } else {
        var trackingID;
        var clickName;
    }

    for (var n = 0; n < trackingCalls.clicks.length; n++) {
        if (name == trackingCalls.clicks[n].name) {
            clickName = trackingCalls.clicks[n].name;
            trackingID = trackingCalls.clicks[n].online;
        }
    }

    if (trackingID){
        location.href = "http://clicks.someurl.com?clickName=" + clickName + "&trackingID=" + trackingID + "&r=" + cacheBust();
    }
}

function cacheBust () {
    var num = Math.random();
    return num;
}

function buttonClick (event) {
    var type = event.target.attributes.value.value;
    switch (type) {
        case "buttonOne" :
            trackClick("clickButton1");
            break;
        case "buttonTwo" :
            trackClick("clickButton2");
            break;
    }
    console.log(type)
}

function AdInit () {
    console.log("AdInit : NetworkAccess " + NetworkAccess)
    document.removeEventListener("DOMContentLoaded", AdInit);

    //set up Ad UI here

    document.getElementById('buttonOne').addEventListener('click', buttonClick, false);
    document.getElementById('buttonTwo').addEventListener('click', buttonClick, false);
}

document.addEventListener("DOMContentLoaded", AdInit, false);
