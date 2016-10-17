(function(window){
    var latestVersion = "1.8.2";
    var libraries = {
        pubJquery: window.jQuery || window.$,
        iFramePubJquery: window.parent.jQuery,
        googJquery: "https://ajax.googleapis.com/ajax/libs/jquery/" + latestVersion + "/jquery.min.js",
    }
    for (var libs in libraries) {
        var lib = libraries[libs];
        console.log("Possible Libs: " + lib);
    }
    if (libraries.pubJquery || libraries.iFramePubJquery) {
        console.log("Publisher Has JQuery - We're Good!");
    } else {
       loadScript(libraries.googJquery);
    }
    function loadScript(_script) {
        var script = document.createElement("script")
        script.type = "text/javascript";
        script.defer = true;
        script.src = _script;
        document.getElementsByTagName("head")[0].appendChild(script);
        console.log("We choose " + _script);
    } 
})(window);