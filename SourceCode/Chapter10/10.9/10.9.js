//var NetworkAccess = false;
var NetworkAccess = navigator.onLine;
var trackingCalls = {
    'pings': [{
        'name': 'touchstart',
        'online': '1011-online',
        'offline': '1011-offline'
    }, {
        'name': 'touchmove',
        'online': '1012-online',
        'offline': '1012-offline'
    }]
}

function trackPing (name) {
    var activityName;
    var onlineTrackingID;
    var offlineTrackingID;

    for (var n = 0; n < trackingCalls.pings.length; n++) {
        if (name == trackingCalls.pings[n].name) {
            activityName = trackingCalls.pings[n].name;
            onlineTrackingID = trackingCalls.pings[n].online;
            offlineTrackingID = trackingCalls.pings[n].offline;
        }
    }

    if (NetworkAccess) {
        fire('http://tracking.someurl.com?trackingName=' + activityName + '&trackingID=' + onlineTrackingID + '&r=' + cacheBust(), false);
    } else {
        var t = new Date().getTime();
        var m = new Date().getMonth()
        var d = new Date().getDate();
        var y = new Date().getFullYear();
        var timeStampedName = activityName+t+m+d+y;
        //No network - storing offline tracking
        storeOffline(timeStampedName, offlineTrackingID);
    }
}

function storeOffline (name, id) {
    //store client side and add listeners for network events
    console.log('Storing Offline : ' + name + ' + ' + id)
    localStorage.setItem(name, id);
}

 //on reconnect fire off all the cached pings
function checkOfflineStorage () {
    if(NetworkAccess) {
        if (localStorage.length >= 1) {
            for (var i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);
                var value = localStorage[key];
                var offlineCall = 'http://tracking.someurl.com?trackingID=' + value + '&r=' + cacheBust();
                fire(offlineCall, true);
            }
        } else {
            console.log('No offline metrics stored')
        }
    }
    console.log('NetworkAccess ' + NetworkAccess)
}

//Tracking Utils
function fire(url, clear) {
    var trackingImg;
    if (clear === true) {
        trackingImg = new Image ().src = url;
        console.log(trackingImg);
        setTimeout(clearStorage, 3000);
    } else {
        trackingImg = new Image ().src = url;
    }
}

function clearStorage() {
    console.log('clearing storage');
    localStorage.clear();
}

function cacheBust () {
    var num = Math.random();
    return num;
}

function userAction (event) {
    var type = event.type;
    switch (type) {
        case 'touchstart' :
            trackPing('touchstart');
            break;
        case 'touchmove' :
            trackPing('touchmove');
            break;
    }
    console.log(type)
}

function AdInit () {
    console.log('AdInit')
    document.removeEventListener('DOMContentLoaded', AdInit);

    //set up Ad UI here
    window.addEventListener('touchstart', userAction, false);
    window.addEventListener('touchmove', userAction, false);

    checkOfflineStorage();
}

window.addEventListener('online', checkOfflineStorage);
window.addEventListener('offline', checkOfflineStorage);

document.addEventListener('DOMContentLoaded', AdInit, false);
