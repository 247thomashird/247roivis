
window.onload = function(){
	resize();
}
$(window).resize(function(){
	resize();
});
function resize(){
	var height= $(window).height();
	var width= $(window).width();
	$("#settings").height(height-105);
	console.log("height: "+height);
}