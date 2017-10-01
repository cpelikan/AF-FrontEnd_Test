
var modalHandler = {
	open : function(modalID){
		document.getElementById(modalID).className += ' open';
		document.getElementsByTagName('body')[0].className =  ' no-scroll';				
	},

	close : function(modalID){
		var modal = document.getElementById(modalID);
		var body = document.getElementsByTagName('body')[0];
		modal.className = modal.className.replace('open' , '');
		body.className =  body.className.replace('no-scroll', '');
	}
}
