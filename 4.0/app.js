var debug = true;
var rounds = 1;
var lrwidthsub = 400;
var fullsize = false;
google.load('visualization','1.0', {'packages' :['corechart', 'bar']});
google.setOnLoadCallback(drawchart);

/*variables*/
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
		this.roundvolume = 0;
	 	this.clear = function(){
	 		this.volume=0;
	 		this.roundvolume = 0;
	 		this.acceptpercent = 0;
	 	}
	}
	var desktop = new device();
	var mobileweb = new device();
	var mobilevoice = new device();
	var phone = new device();
	function product(pname2){
		this.pname=pname2;
		this.enabled=false;
		this.containment=0;
		this.volume=0;
		this.roundvolume=0;
		this.cpi=0;
		this.cost=this.volume*this.cpi;
		this.clear = function(){
			this.enabled=false;
			this.containment=0;
			this.volume=0;
			this.cpi=0;
			this.cost=this.volume*this.cpi;
			this.roundvolume = 0;
		}
		this.calccost = function(){
			this.volume+=this.roundvolume;
			this.roundvolume=0;
			this.cost=this.volume*this.cpi;
		}
		this.print = function(){
			console.log("volume: "+this.volume+"  cost: "+this.cost);
		}
		this.printall = function(){
			console.log(this.pname+"\n\tenabled: "+this.enabled+"\n\tcontainment: "+this.containment+
				"\n\tvolume: "+this.volume+"\n\troundvolume: "+this.roundvolume+"\n\tcpi: "+this.cpi+"\n\tcost: "+this.cost);
		}
	}
	var before = {va:new product('va'),vs:new product('vs'),ivr:new product('ivr'),
	webagent:new product('webagent'),mobileagent:new product('mobileagent'),
	voiceagent:new product('voiceagent'),outcome:false};
	var after = {va:new product('va'),vs:new product('vs'),ivr:new product('ivr'),
	webagent:new product('webagent'),mobileagent:new product('mobileagent'),
	voiceagent:new product('voiceagent'),outcome:false};

function calculatebutton(){
	clearallproducts(before);
	clearallproducts(after);

	getvalues();
	colorupdate();
	
	roundequation(rounds);
	updatesummary();
	drawchart();
}
/*math*/
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
	function printvolumes(){
		console.log("web: "+web.volume);
		console.log("voice: "+voice.volume);
		console.log("desktop: "+desktop.volume);
		console.log("mobileweb: "+mobileweb.volume);
		console.log("mobilevoice: "+mobilevoice.volume);
		console.log("phone: "+phone.volume);
	}
	function printall(){
		console.log("before");
		before.va.printall();
		before.vs.printall();
		before.ivr.printall();
		before.webagent.printall();
		before.mobileagent.printall();
		before.voiceagent.printall();
		console.log("after");
		after.va.printall();
		after.vs.printall();
		after.ivr.printall();
		after.webagent.printall();
		after.mobileagent.printall();
		after.voiceagent.printall();
		console.log("\n\n")
	}
	function getvalues(){
		rounds = document.getElementById('rounds').value;
		if (rounds <1){
			rounds = 1;
		}
		before.outcome = document.getElementById('cbob1').checked;
		after.outcome = document.getElementById('cbob2').checked;

		web.volume=document.getElementById('webtraffic').value*1000000;
		voice.volume=document.getElementById('voicetraffic').value*1000000;

		desktop.acceptpercent = 1 - document.getElementById('websplit').value/100;
		mobileweb.acceptpercent = document.getElementById('websplit').value/100;
		mobilevoice.acceptpercent = document.getElementById('voicesplit').value/100;
		phone.acceptpercent = 1 - document.getElementById('voicesplit').value/100;

		function updateproduct(product,shorthand){
			if (debug){console.log("getting values"+product);}
			eval('before.'+product+'.enabled = document.getElementById("cb'+shorthand+'1").checked');
			eval('after.'+product+'.enabled = document.getElementById("cb'+shorthand+'2").checked');

			eval('before.'+product+'.cpi = document.getElementById("cpi'+shorthand+'1").value');
			eval('after.'+product+'.cpi = document.getElementById("cpi'+shorthand+'2").value');

			eval('before.'+product+'.containment = document.getElementById("con'+shorthand+'1").value/100');
			eval('after.'+product+'.containment = document.getElementById("con'+shorthand+'2").value/100');
		}
		updateproduct('ivr','ivr');
		updateproduct('voiceagent','voi');
		updateproduct('vs','vs');
		updateproduct('va','va');
		updateproduct('webagent','wc');
		updateproduct('mobileagent','mc');
		if (debug){console.log("post value gather printall\n\n");printall();};

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
	function roundequation(rounds){
		var desktopvolume=web.volume*desktop.acceptpercent;
		var mobilewebvolume=web.volume*mobileweb.acceptpercent;
		var mobilevoicevolume = voice.volume*mobilevoice.acceptpercent;
		var phonevolume = voice.volume*phone.acceptpercent;
		var remaining = rounds;

		calculateroundvolumes(before,desktopvolume,mobilewebvolume,mobilevoicevolume,phonevolume,remaining);
		calculateroundvolumes(after,desktopvolume,mobilewebvolume,mobilevoicevolume,phonevolume,remaining);
		if (debug){
			console.log("post cost printall\n");
			printall();
		}
	}
	function calculateroundvolumes(boa,desktopvolume,mobilewebvolume,mobilevoicevolume,phonevolume,remaining){
		if (remaining == 0){
			if (debug){console.log("unattended:\n\tdesktop: "+desktopvolume+"\n\tmobileweb: "+mobilewebvolume+"\n\tmobilevoice: "+mobilevoicevolume+"\n\tphone: "+phonevolume);}
			//boa.voiceagent.volume+=desktopvolume+mobilevoicevolume+mobilewebvolume+phonevolume;
			//boa.voiceagent.calccost();
			return 0;
		} else {
			if (debug){console.log("\nround number: "+remaining);}
			if (debug){console.log("volumes:\n\tdesktop: "+desktopvolume+"\n\tmobileweb: "+mobilewebvolume+"\n\tmobilevoice: "+mobilevoicevolume+"\n\tphone: "+phonevolume);}
			remaining -=1;
		}
		desktop.roundvolume = desktopvolume;
		mobileweb.roundvolume = mobilewebvolume;
		mobilevoice.roundvolume = mobilevoicevolume;
		phone.roundvolume = phonevolume;

		/*va*/
		if (boa.va.enabled){
			boa.va.roundvolume = (boa.outcome ? boa.va.containment*desktopvolume:desktopvolume);
			desktopvolume-=boa.va.containment*desktopvolume;
			boa.va.roundvolume+=(boa.outcome? boa.va.contaiment*mobilewebvolume:mobilewebvolume);
			mobilewebvolume-=boa.va.containment*mobilewebvolume;
			if (debug){
				console.log("VA roundvolume: "+boa.va.roundvolume+" totalvolume: "+boa.va.volume);
			}
			boa.va.calccost();
		}
		/*ivr*/
		if (boa.ivr.enabled){
			boa.ivr.roundvolume = (boa.outcome ? boa.ivr.containment*mobilevoicevolume:mobilevoicevolume);
			mobilevoicevolume-=boa.ivr.containment*mobilevoicevolume;
			boa.ivr.roundvolume+= (boa.outcome ? boa.ivr.containment*phonevolume:phonevolume);
			phonevolume-=boa.ivr.containment*phonevolume;
			if (debug){
				console.log("IVR roundvolume: "+boa.ivr.roundvolume+" totalvolume: "+boa.ivr.volume);
			}
			boa.ivr.calccost();
		}
		/*vs*/
		if (boa.vs.enabled){
			boa.vs.roundvolume= (boa.outcome ? boa.vs.containment*mobilevoicevolume:mobilevoicevolume);
			mobilevoicevolume-=boa.vs.containment*mobilevoicevolume;
			if (debug){
				console.log("VS roundvolume: "+boa.vs.roundvolume+" totalvolume: "+boa.vs.volume);
			}
			boa.vs.calccost();
		}
		/*mobileagent*/
		if (boa.mobileagent.enabled){
			boa.mobileagent.roundvolume = (boa.outcome ? boa.mobileagent.containment*mobilewebvolume:mobilewebvolume);
			mobilewebvolume-=boa.mobileagent.containment*mobilewebvolume;
			if (debug){
				console.log("MC roundvolume: "+boa.mobileagent.roundvolume+" totalvolume: "+boa.mobileagent.volume);
			}
			boa.mobileagent.calccost();
		}
		/*webagent*/
		if (boa.webagent.enabled){
			boa.webagent.roundvolume = (boa.outcome ? boa.webagent.containment*desktopvolume:desktopvolume);
			desktopvolume-=boa.webagent.containment*desktopvolume;
			if (debug){
				console.log("WC roundvolume: "+boa.webagent.roundvolume+" totalvolume: "+boa.webagent.volume);
			}
			boa.webagent.calccost();
		}
		if (boa.voiceagent.enabled){
			boa.voiceagent.roundvolume = (boa.outcome ? boa.voiceagent.containment*mobilevoicevolume:mobilevoicevolume);
			mobilevoicevolume-=boa.voiceagent.containment*mobilevoicevolume;
			boa.voiceagent.roundvolume +=(boa.outcome ? boa.voiceagent.containment*phonevolume:phonevolume);
			phonevolume-=boa.voiceagent.containment*phonevolume;
			if (debug){
				console.log("Voi roundvolume: "+boa.voiceagent.roundvolume+" totalvolume: "+boa.voiceagent.volume);
			}
			boa.voiceagent.calccost();
		}
		desktop.volume += desktop.roundvolume;
		mobileweb.volume += mobileweb.roundvolume;
		mobilevoice.volume += mobileweb.roundvolume;
		phone.volume += phone.roundvolume;
		calculateroundvolumes(boa,desktopvolume,mobilewebvolume,mobilevoicevolume,phonevolume,remaining);
	}	
function updatesummary(){
	function numberWithCommas(x) {
		if (x==0){return '';}
		var parens = (x>0 ? false:true);
	    var parts = Math.floor(Math.abs(x)).toString().split(".");
	    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	    if (parens){
	    return "($"+parts.join(".")+")";}
	    return "$"+parts.join(".");
	}
	var beforesum = 0,aftersum = 0, savingssum = 0;
	function updateline(tslot,pslot){
	document.getElementById(tslot+'b').innerHTML = numberWithCommas( eval('before.'+pslot+'.cost'));
	document.getElementById(tslot+'a').innerHTML = numberWithCommas( eval('after.'+pslot+'.cost'));
	document.getElementById(tslot+'s').innerHTML = numberWithCommas( eval('before.'+pslot+'.cost - after.'+pslot+'.cost'));
	beforesum+= eval('before.'+pslot+'.cost');aftersum+=eval('after.'+pslot+'.cost');savingssum+=eval('before.'+pslot+'.cost - after.'+pslot+'.cost');
	}

	updateline('voi','voiceagent');
	updateline('ivr','ivr');
	updateline('vs','vs');
	updateline('va','va');
	updateline('mc','mobileagent');
	updateline('wc','webagent');
	document.getElementById('totalb').innerHTML = numberWithCommas(beforesum);
	document.getElementById('totala').innerHTML = numberWithCommas(aftersum);
	document.getElementById('totals').innerHTML = numberWithCommas(savingssum);
	//console.log('beforesum:'+numberWithCommas(aftersum));
}

/*demos*/
	function scenario1(){
		document.getElementById("voicetraffic").value=1.25;
		document.getElementById('webtraffic').value=0;

		document.getElementById('websplit').value = 50;
		document.getElementById('voicesplit').value = 50;

		document.getElementById('cbvoi1').checked = true;
		document.getElementById('cbvoi2').checked = true;
		document.getElementById('cbivr1').checked = false;
		document.getElementById('cbivr2').checked = false;
		document.getElementById('cbvs1').checked = false;
		document.getElementById('cbvs2').checked = true;
		document.getElementById('cbva1').checked = false;
		document.getElementById('cbva2').checked = false;
		document.getElementById('cbmc1').checked = false;
		document.getElementById('cbmc2').checked = false;
		document.getElementById('cbwc1').checked = false;
		document.getElementById('cbwc2').checked = false;

		document.getElementById('cpivoi1').value = 11.60;
		document.getElementById('cpivoi2').value = 11.60;
		document.getElementById('cpiivr1').value = 0;
		document.getElementById('cpiivr2').value = 0;
		document.getElementById('cpivs1').value = 0;
		document.getElementById('cpivs2').value = 2.5;
		document.getElementById('cpiva1').value = 0;
		document.getElementById('cpiva2').value = 0;
		document.getElementById('cpimc1').value = 0;
		document.getElementById('cpimc2').value = 0;
		document.getElementById('cpiwc1').value = 0;
		document.getElementById('cpiwc2').value = 0;

		document.getElementById('convoi1').value = 100;
		document.getElementById('convoi2').value = 100;
		document.getElementById('conivr1').value = 0;
		document.getElementById('conivr2').value = 0;
		document.getElementById('convs1').value = 0;
		document.getElementById('convs2').value = 20;
		document.getElementById('conva1').value = 0;
		document.getElementById('conva2').value = 0;
		document.getElementById('conmc1').value = 0;
		document.getElementById('conmc2').value = 0;
		document.getElementById('conwc1').value = 0;
		document.getElementById('conwc2').value = 0;

		document.getElementById('rounds').value = 1;
		document.getElementById('cbob1').checked = false;
		document.getElementById('cbob2').checked = true;

		calculatebutton();
 	}
 	function scenario2(){
		document.getElementById("voicetraffic").value=0.029319;
		document.getElementById('webtraffic').value=0;

		document.getElementById('websplit').value = 50;
		document.getElementById('voicesplit').value = 50;

		document.getElementById('cbvoi1').checked = true;
		document.getElementById('cbvoi2').checked = true;
		document.getElementById('cbivr1').checked = false;
		document.getElementById('cbivr2').checked = true;
		document.getElementById('cbvs1').checked = false;
		document.getElementById('cbvs2').checked = false;
		document.getElementById('cbva1').checked = false;
		document.getElementById('cbva2').checked = false;
		document.getElementById('cbmc1').checked = false;
		document.getElementById('cbmc2').checked = false;
		document.getElementById('cbwc1').checked = false;
		document.getElementById('cbwc2').checked = false;

		document.getElementById('cpivoi1').value = 14.11;
		document.getElementById('cpivoi2').value = 14.11;
		document.getElementById('cpiivr1').value = 0;
		document.getElementById('cpiivr2').value = 0;
		document.getElementById('cpivs1').value = 0;
		document.getElementById('cpivs2').value = 0;
		document.getElementById('cpiva1').value = 0;
		document.getElementById('cpiva2').value = 0;
		document.getElementById('cpimc1').value = 0;
		document.getElementById('cpimc2').value = 0;
		document.getElementById('cpiwc1').value = 0;
		document.getElementById('cpiwc2').value = 0;

		document.getElementById('convoi1').value = 40;
		document.getElementById('convoi2').value = 50;
		document.getElementById('conivr1').value = 0;
		document.getElementById('conivr2').value = 20;
		document.getElementById('convs1').value = 0;
		document.getElementById('convs2').value = 0;
		document.getElementById('conva1').value = 0;
		document.getElementById('conva2').value = 0;
		document.getElementById('conmc1').value = 0;
		document.getElementById('conmc2').value = 0;
		document.getElementById('conwc1').value = 0;
		document.getElementById('conwc2').value = 0;

		document.getElementById('rounds').value = 1;
		document.getElementById('cbob1').checked = false;
		document.getElementById('cbob2').checked = false;

		calculatebutton();
 	}

/*charts*/
	function drawchart(){
		var  products=['genre','Voice Agents','IVR','Vivid Speech', 'Virtual Assistant','Mobile Chat', 'Web Chat'];
		var costbefore=['before',before.voiceagent.volume,before.ivr.volume,before.vs.volume,
		before.va.volume,before.mobileagent.volume,before.webagent.volume];
		var costafter=['after',after.voiceagent.volume,after.ivr.volume,after.vs.volume,
		after.va.volume,after.mobileagent.volume,after.webagent.volume];
		var chartw = window.innerWidth-400;
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

/*colors*/
	function colorupdate(){
		var onoroff = [];
		var off = "#bbbbbb";
		for (var i=0;i<29;i++){
			onoroff[i]=0;
		}
		function seton(product,array){
			if (eval('after.'+product+'.enabled')){
				for (var i=0;i<array.length;i++){
					var temp = array[i];
					onoroff[temp]=1;
				}
			}
		}
		seton('voiceagent',[0,2,3,5,6,8,9,10,13,16,23,25,27,28]);
		seton('ivr',[0,2,3,5,6,8,9,10,12,14,21,25,27,28]);
		seton('vs',[0,2,5,8,10,12,14,20,21,24,25,26,27,28]);
		seton('mobileagent',[0,2,5,8,10,11,15,19,24,26,28]);
		seton('webagent',[0,1,4,7,10,11,15,19,24,26,28]);
		seton('va',[0,1,2,4,5,7,8,10,12,14,20,24,26,28]);

		onoroff[0] = ((onoroff[0]) ? '#666666':off);
		onoroff[1] = ((onoroff[1]) ? '#666666':off);
		onoroff[2] = ((onoroff[2]) ? '#666666':off);
		onoroff[3] = ((onoroff[3]) ? '#666666':off);
		onoroff[4] = ((onoroff[4]) ? '#666666':off);
		onoroff[5] = ((onoroff[5]) ? '#666666':off);
		onoroff[6] = ((onoroff[6]) ? '#666666':off);
		onoroff[7] = ((onoroff[7]) ? '#666666':off);
		onoroff[8] = ((onoroff[8]) ? '#666666':off);
		onoroff[9] = ((onoroff[9]) ? '#666666':off);
		onoroff[10] = ((onoroff[10]) ? '#ef8822':off);
		onoroff[11] = ((onoroff[11]) ? '#ffb972':off);
		onoroff[12] = ((onoroff[12]) ? '#ef8822':off);
		onoroff[13] = ((onoroff[13]) ? '#ffb972':off);
		onoroff[14] = ((onoroff[14]) ? '#ef8822':off);
		onoroff[15] = ((onoroff[15]) ? '#ef8822':off);
		onoroff[16] = ((onoroff[16]) ? '#ef8822':off);
		onoroff[17] = ((onoroff[17]) ? '#ef8822':off);
		onoroff[18] = ((onoroff[18]) ? '#ef8822':off);
		onoroff[19] = ((onoroff[19]) ? '#912370':off);
		onoroff[20] = ((onoroff[20]) ? '#912370':off);
		onoroff[21] = ((onoroff[21]) ? '#049094':off);
		onoroff[22] = ((onoroff[22]) ? '#912370':off);
		onoroff[23] = ((onoroff[23]) ? '#049094':off);
		onoroff[24] = ((onoroff[24]) ? '#912370':off);
		onoroff[25] = ((onoroff[25]) ? '#049094':off);
		onoroff[26] = ((onoroff[26]) ? '#912370':off);
		onoroff[27] = ((onoroff[27]) ? '#049094':off);
		onoroff[28] = ((onoroff[28]) ? '#666666':off);

		for (var i=0;i<29;i++){
			var color = onoroff[i];
			document.getElementsByClassName(i+'a')[0].setAttribute('stroke',color);
		}
		function changecirclecolor(name,color){
			var parts = document.getElementsByClassName(name+ 'a');
			for(var i=0;i<parts.length;i++){
			parts[i].setAttribute('fill',color);
			}
		}
		changecirclecolor(0,onoroff[0]);
		changecirclecolor(4,onoroff[4]);
		changecirclecolor(5,onoroff[5]);
		changecirclecolor(6,onoroff[6]);
		changecirclecolor(10,onoroff[10]);
		changecirclecolor(14,onoroff[14]);
		changecirclecolor(15,onoroff[15]);
		changecirclecolor(16,onoroff[16]);
		changecirclecolor(24,onoroff[24]);
		changecirclecolor(25,onoroff[25]);
		changecirclecolor(28,onoroff[28]);
		}

function move2(){
	$("#lowerleft").animate({
    width: "toggle"
	},500,function(){});
	if (fullsize){
		//document.getElementsByClassName('lowerright')[0].style.width="calc(100% - 400px)";
		fullsize=false;
	} else{
	//document.getElementsByClassName('lowerright')[0].style.width="100%";
	fullsize = true;
	}
	var newwidth = ((fullsize) ? window.innerWidth:window.innerWidth - 400).toString();
	$('lowerright').animate({
		width: newwidth
	}, 500,function(){});
	
	resize();
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
	$("#settingsbar").height(height-65-76);
	drawchart();
	if (!fullsize){
		//document.getElementsByClassName('lowerright')[0].style.width=window.innerWidth-400;
		//document.getElementById('lowerright').style.width = (window.innerWidth - 400).toString()+"px";
		//console.log("fullsize width: "+document.getElementById('lowerright').style.width);
	} else {
		//document.getElementsByClassName('lowerright')[0].style.width=window.innerWidth;
		//setTimeout(function(){document.getElementById('lowerright').style.width = (window.innerWidth).toString()+"px";},400);
		//console.log("!fullsize width: "+document.getElementById('lowerright').style.width);
	}
}