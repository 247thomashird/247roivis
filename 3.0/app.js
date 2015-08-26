google.load('visualization','1.0', {'packages' :['corechart', 'bar']});
google.setOnLoadCallback(drawchart);
var  products=['genre','Voice Agents','IVR','Vivid Speech', 'Virtual Assistant','Mobile Chat', 'Web Chat'];
var costbefore=['before',1,2,3,4,5,6];
var costafter=['after',6,5,4,3,2,1];
var chartw = window.innerWidth-300;
function drawchart(){
	var data = new google.visualization.arrayToDataTable([
		products,
		costbefore,
		costafter
		])
	var options = {
		width:chartw,
		height: 360,
		legend:{ position: 'bottom'},
		bar:{groupwidth:'75'},
		isStacked: true,
		colors: ['#049094','#f5b77a','#f29f4e','#ef8822','#a74e8c','#912370']
	};
	var chart = new google.visualization.BarChart(document.getElementById('chart3'));
	chart.draw(data,options);
}
function platform(){
	this.volume=0;
	this.clear = function(){
		this.volume=0;
	}
}
var web = new platform();
var voice = new platform();
function device(){
	this.volume = 0;
	this.acceptpercent = 0;
 	this.clear = function(){
 		this.volume=0;
 		this.acceptpercent = 0;
 	}
}
var desktop = new device();
var mobileweb = new device();
var mobilevoice = new device();
var phone = new device();
function product(){
	this.enabled=false;
	this.offers=0;
	this.effectiveness=0;
	this.containment=this.offers*this.effictiveness;
	this.volume=0;
	this.cpi=0;
	this.cost=this.volume*this.cpi;
	this.clear = function(){
		this.enabled=false;
		this.offers=0;
		this.effectiveness=0;
		this.containment=this.offers*this.effictiveness;
		this.volume=0;
		this.cpi=0;
		this.cost=this.volume*this.cpi;
	}
}
var before = {va:new product(),vs:new product,ivr:new product,
webagent:new product(),voiceagent:new product()};
// var web=new product();
// var voice=new product();
// var desktop=new product();
// var mobileweb = new product();
// var mobilevoice = new product();
// var phone = new product();
// var va = new product();
// var vs = new product();
// var ivr = new product();
// var webagent = new product();
// var voiceagent = new product();

function clearallproducts(){
	web.clear();
	voice.clear();
	desktop.clear();
	mobileweb.clear();
	mobilevoice.clear();
	phone.clear();

	before.va.clear();
	before.vs.clear();
	before.ivr.clear();
	before.webagent.clear();
	before.voiceagent.clear();
}

function calculate(boa){
	desktop.volume=web.volume*desktop.acceptpercent;
	mobileweb.volume=web.volume*mobileweb.acceptpercent;
	mobilevoice.volume = voice.volume*mobilevoice.acceptpercent;
	phone.volume = voice.volume*phone.acceptpercent;

	boa.

}


function scenario1(){
	before.web.volume=0;
	voice.volume=0;


}



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