//iOS Site Events - local storage technique - platform.
function setiOSiteEvent (ad, placement, campaign, publisher) {
    var m = new Date().getMonth()
    var d = new Date().getDate();
    var y = new Date().getFullYear();
    var dom = window.location.href;
    var timeLoc = m + '/' + d + '/' + y + '&' + dom;
    var se = ad + '-' + placement + '-' + campaign + '-' + publisher + timeLoc;
	localStorage.setItem('SiteEvent', se);
}
setiOSiteEvent('advertiser', 'placement', 'campaign' , 'publisher');





//Advertisers Landing Page
setTimeout(getiOSiteEvent, 1000);

function getiOSiteEvent () {
	if(localStorage == '' || localStorage == null) {
		return;
	} else {
		//Grab Pr iOS Site Event
		console.log(localStorage.getItem('SiteEvent'));
		setTimeout(localStorage.clear(), 1000);//Local Testing
	}
}
