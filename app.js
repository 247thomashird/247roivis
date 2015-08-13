google.load('visualization','1.0', {'packages' :['corechart', 'bar']});
//google.setOnLoadCallback(drawchart);
var  products=['Voice Agent','IVR','Vivid Speech', 'Virtual Assistant','Mobile Chat', 'Web Chat'];
var costbefore=[1,2,3,4,5,6];
var costafter=[6,5,4,3,2,1];

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
//function drawchart(){
	// var data = new google.visualization.arrayToDataTable([
	// 	products,
	// 	costbefore,
	// 	costafter
	// 	])
	// var options = {
	// 	width:640,
	// 	height: 360,
	// 	legend:{ position: 'bottom'},
	// 	bar:{groupwidth:'75'},
	// 	isStacked: true
	// };
// 	var data = google.visualization.arrayToDataTable([
//         ['Genre', 'Fantasy & Sci Fi', 'Romance', 'Mystery/Crime', 'General',
//          'Western', 'Literature', { role: 'annotation' } ],
//         ['2010', 10, 24, 20, 32, 18, 5, ''],
//         ['2020', 16, 22, 23, 30, 16, 9, ''],
//         ['2030', 28, 19, 29, 30, 12, 13, '']
//       ]);

//       var options = {
//         width: 600,
//         height: 400,
//         legend: { position: 'top', maxLines: 3 },
//         bar: { groupWidth: '75%' },
//         bars: 'horizontal',
//         isStacked: true
//       };
//        var options_stacked = {
//           isStacked: true,
//           height: 300,
//           legend: {position: 'top', maxLines: 3},
//           hAxis: {minValue: 0}
//         };
// 	var material = new google.charts.Bar(document.getElementById('chart1'));
// 	material.draw(data,options);
// }