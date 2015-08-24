google.load('visualization','1.0', {'packages' :['corechart', 'bar']});
google.setOnLoadCallback(drawchart);
var  products=['genre','Voice Agents','IVR','Vivid Speech', 'Virtual Assistant','Mobile Chat', 'Web Chat'];
var costbefore=['before',1,2,3,4,5,6];
var costafter=['after',6,5,4,3,2,1];

function drawchart(){
	var data = new google.visualization.arrayToDataTable([
		products,
		costbefore,
		costafter
		])
	var options = {
		width:990,
		height: 360,
		legend:{ position: 'bottom'},
		bar:{groupwidth:'75'},
		isStacked: true
	};
	var chart = new google.visualization.BarChart(document.getElementById('chart3'));
	chart.draw(data,options);
}
console.log("loaded app.js");
window.onload = function(){
	resize();
}
$(window).resize(function(){
	resize();
});
function resize(){
	console.log("resize");
	var height = $(window).height();
	$("#settingsbar").height(height-55-50);
}