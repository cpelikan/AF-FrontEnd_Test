
// common method 
function detectFirefox(){
	return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
}
//
///////

window.onload = function (){
	var video = document.getElementById('intro');
	initIntro(video);
	//modalHandler.open('introWrapper');
}

// add video listeners
function initIntro(video){
	
	var isFirefox = detectFirefox();

	video.addEventListener('ended',function(){
		showContent(video);
	}, false);
	video.addEventListener('canplay', hideLoader, false);

	if(isFirefox)
		hideLoader();		

}

function hideLoader(){
	document.getElementById('videoLoader').style.display='none';
	document.getElementById('videoWrap').className +=  ' loaded';
}

// hide modal and init exercise
function showContent(video) {

	var isFirstTime = !video.getAttribute('data-replay');
	modalHandler.close('introWrapper');
	
	video.currentTime = 0;

	if(isFirstTime){
		initExercise('list', 'canvas');
		document.getElementById('btnReplayIntro').addEventListener('click', function(){
			showIntro(video, true);
		}, false);
	}
	
}

// set DOM and listener for skip
function replayMode(video){
	var btnSkip = document.getElementById('btnExitModal');
	btnSkip.style.display = 'block';
	video.setAttribute('data-replay', true);	
	btnSkip.addEventListener('click', function(evt){
			evt.preventDefault();
			skipIntro(video);
		}, false);
}

// On replay mode enable skip btn
function showIntro(video, isReplay){

	if(isReplay)
		replayMode(video);	

	modalHandler.open('introWrapper');
	
	setTimeout(function(){	
		document.getElementById('intro').play();	
	},1000);
	
}

// set video on the beginning and stop it
function skipIntro(video){
	
	modalHandler.close('introWrapper');
	video.currentTime = 0;
	video.pause();
}