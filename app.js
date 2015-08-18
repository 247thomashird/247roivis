google.load('visualization','1.0', {'packages' :['corechart', 'bar']});
google.setOnLoadCallback(drawchart);
var  products=['genre','Voice Agents','IVR','Vivid Speech', 'Virtual Assistant','Mobile Chat', 'Web Chat'];
var costbefore=['before',1,2,3,4,5,6];
var costafter=['after',6,5,4,3,2,1];

var graphdef = {
	categories: ['before','after'],
	dataset : {
		'before' : [
		{name: 'Voice Agents',value: 1 },
		{name: 'IVR',value:2},
		{name: 'Vivid Speech',value:3},
		{name: 'Virtual Assistant',value:4},
		{name: 'Web Chat',value:5},
		{name: 'Mobile Chat',value:6}
		],
		'after' : [
		{name: 'Voice Agents',value: 1 },
		{name: 'IVR',value:2},
		{name: 'Vivid Speech',value:3},
		{name: 'Virtual Assistant',value:4},
		{name: 'Web Chat',value:5},
		{name: 'Mobile Chat',value:6}
		]
	}
};
var chart = uv.chart('StackedBar',graphdef);
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
	$("#chart1").hide();
	$("#chart2").hide();
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