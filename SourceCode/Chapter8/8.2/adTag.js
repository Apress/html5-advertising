var trackingUrl = escape('{SDC_CLICK_TAG}');// encode tracking URL; ex. "http%3A//TRACK_REDIRECT_SERVER.comcom%3FredirectUrl%3D"  
var frameHtml = '<iframe src="http://MY_AD_SERVER.com/myad.html?myparam=123&trackingUrl=' + trackingUrl + '" width="300" height="250" frameborder="0" marginheight="0" marginwidth="0" scrolling="no"></iframe>'  
document.write(frameHtml);  