google.load('visualization','1.0', {'packages' :['corechart', 'bar']});
google.setOnLoadCallback(drawchart);

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
	this.containment=0;
	this.volume=0;
	this.cpi=0;
	this.cost=this.volume*this.cpi;
	this.clear = function(){
		this.enabled=false;
		this.containment=0;
		this.volume=0;
		this.cpi=0;
		this.cost=this.volume*this.cpi;
	}
	this.calccost = function(){
		this.cost=this.volume*this.cpi;
	}
	this.print = function(){
		console.log("volume: "+this.volume+"  cost: "+this.cost);
	}
	this.printall = function(){
		console.log("enabled: "+this.enabled+" containment: "+this.containment+
			" volume: "+this.volume+" cpi: "+this.cpi+" cost: "+this.cost);
	}
}
var before = {va:new product(),vs:new product,ivr:new product,
webagent:new product(),mobileagent:new product(),voiceagent:new product()};
var after = {va:new product(),vs:new product,ivr:new product,
webagent:new product(),mobileagent:new product(),voiceagent:new product()};
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

function calculatebutton(){
	clearallproducts(before);
	clearallproducts(after);

	calculatevolumes(before);
	calculatevolumes(after);
}

function clearallproducts(boa){
	web.clear();
	voice.clear();
	desktop.clear();
	mobileweb.clear();
	mobilevoice.clear();
	phone.clear();

	boa.va.clear();
	boa.vs.clear();
	boa.ivr.clear();
	boa.webagent.clear();
	boa.mobileagent.clear();
	boa.voiceagent.clear();
}

function calculatevolumes(boa){

	desktop.volume=web.volume*desktop.acceptpercent;
	var desktopvolume = desktop.volume;
	mobileweb.volume=web.volume*mobileweb.acceptpercent;
	var mobilewebvolume=mobileweb.volume;
	mobilevoice.volume = voice.volume*mobilevoice.acceptpercent;
	var mobilevoicevolume = mobilevoice.volume;
	phone.volume = voice.volume*phone.acceptpercent;
	var phonevolume = phone.volume;

	/*va*/
	if(boa.va.enabled){
		boa.va.volume=desktop.volume*boa.va.containment;
		desktopvolume-=boa.va.volume;
		boa.va.volume+=mobileweb.volume*boa.va.containment;
		mobilewebvolume-=mobileweb.volume*boa.va.containment;
		boa.va.calccost();
	}
	/*vs*/
	if(boa.vs.enabled){
		boa.vs.volume=mobilevoice.volume*boa.vs.containment;
		mobilevoicevolume-=mobilevoice.volume*boa.vs.containment;
		boa.vs.calccost();
	}
	/*IVR*/
	if(boa.ivr.enabled){
		boa.ivr.volume=mobilevoice.volume*boa.ivr.containment;
		mobilevoicevolume-=mobilevoice.volume*boa.ivr.containment;
		boa.ivr.volume+=phone.volume*boa.ivr.containment;
		phonevolume-=phonevolume*boa.ivr.containment;
		boa.ivr.calccost();
	}
	/*web chat*/
 	if(boa.webagent.enabled){
 		boa.webagent.volume=desktopvolume*boa.webagent.containment;
 		desktopvolume-=desktopvolume*boa.webagent.containment;
 		boa.webagent.calccost();
 	}
 	/*mobile chat*/
 	if(boa.mobileagent.enabled){
 		boa.mobileagent.volume=mobilewebvolume*boa.mobileagent.containment;
 		mobilewebvolume-=mobilewebvolume*boa.mobileagent.containment;
 		boa.mobileagent.calccost();
 	}
 	boa.voiceagent.volume=desktopvolume+mobilewebvolume+mobilevoicevolume+phonevolume;
 	boa.voiceagent.calccost();
}


function scenario1(){
	web.volume=0;
	voice.volume=1250000;
	phone.acceptpercent = 0.5;
	mobilevoice.acceptpercent = 0.5;
	before.voiceagent.cpi=11.60;
	after.voiceagent.cpi=11.60;

	after.vs.enabled=true;
	after.vs.cpi=2.5;
	after.vs.containment=0.2;
	calculatevolumes(before);
	calculatevolumes(after);

	before.voiceagent.printall();
	after.voiceagent.printall();
	after.vs.printall();
	drawchart();
}




function drawchart(){
	var  products=['genre','Voice Agents','IVR','Vivid Speech', 'Virtual Assistant','Mobile Chat', 'Web Chat'];
	var costbefore=['before',before.voiceagent.volume,before.ivr.volume,before.vs.volume,
	before.va.volume,before.mobileagent.volume,before.webagent.volume];
	var costafter=['after',after.voiceagent.volume,after.ivr.volume,after.vs.volume,
	after.va.volume,after.mobileagent.volume,after.webagent.volume];
	var chartw = window.innerWidth-300;
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
		colors: ['#049094','#f5b77a','#f29f4e','#ef8822','#a74e8c','#912370'],
		hAxis: {
            maxValue: voice.volume
          }
	};
	var chart = new google.visualization.BarChart(document.getElementById('chart3'));
	chart.draw(data,options);
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
	drawchart();
}