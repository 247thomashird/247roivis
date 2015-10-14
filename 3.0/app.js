var debug = true;
google.load('visualization','1.0', {'packages' :['corechart', 'bar']});
google.setOnLoadCallback(drawchart);

/*variables*/
	var a4vcur=false, a4vfut=false;
	var lvs = 50, dvs = 50;
	var bsu = 0, asu = 0;
	
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
	function product(entname){
		this.printname = entname;
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
			console.log(this.printname+" enabled: "+this.enabled+" containment: "+this.containment+
				" volume: "+this.volume+" roundvolume: "+this.roundvolume+" cpi: "+this.cpi+" cost: "+this.cost);
		}
	}
	var before = {va:new product('before va'),vs:new product('before vs'),ivr:new product('before ivr'),
	webagent:new product('before webagent'),mobileagent:new product('before mobileagent'),voiceagent:new product('before voiceagent')};
	var after = {va:new product('after va'),vs:new product('after vs'),ivr:new product('after ivr'),
	webagent:new product('after webagent'),mobileagent:new product('after mobileagent'),voiceagent:new product('after voiceagent')};
	var beforeunweb = 0, beforeunvoice = 0;
	var afterunweb = 0, afterunvoice = 0;
	var beforeweb = 0, beforevoice = 0;
	var afterweb = 0, aftervoice = 0;

function calculatebutton(){
	$("#splash").hide();
	$("#table").show();

	var rounds = 1;
	clearallproducts(before);
	clearallproducts(after);

	getvalues();
	colorupdate();
	setbackgroundcolors();

	calculatevolumes(before);
	calculatevolumes(after);
	//roundequation(rounds);
	updatesummary();
	drawchart();
	//if (debug) {printall();}

}
function setbackgroundcolors(){
	var array = ['voi1','voi2','ivr1','ivr2','vs1','vs2','va1','va2','mc1','mc2','wc1','wc2'];
	for (tech of array){
	backgroundcolors(tech,document.getElementById('cb'+tech).checked);
	}
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
		// web.printall();
		// voice.printall();
		// desktop.printall();
		// mobileweb.printall();
		// mobilevoice.printall();
		// phone.printall();
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
	}
	function getvalues(){
		web.volume=document.getElementById('webtraffic').value*1000000;
		voice.volume=document.getElementById('voicetraffic').value*1000000;

		desktop.acceptpercent = (100-dvs)/100;//1 - document.getElementById('websplit').value/100;
		mobileweb.acceptpercent = dvs/100;//document.getElementById('websplit').value/100;
		mobilevoice.acceptpercent = lvs/100;//document.getElementById('voicesplit').value/100;
		phone.acceptpercent = (100 - lvs)/100;//document.getElementById('voicesplit').value/100;

		function updateproduct(product,shorthand){
			//if (debug){console.log("getting values"+product);}
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

		a4vfut = document.getElementById('a4vfuture').checked;
		bsu = Number(document.getElementById('cpisu1').value);
		asu = Number(document.getElementById('cpisu2').value);
	}

	function calculatevolumes(boa){
		console.log("webvolume: "+web.volume+"voicevolume: "+voice.volume);
		desktop.volume=web.volume*desktop.acceptpercent;
		var desktopvolume = desktop.volume;
		mobileweb.volume=web.volume*mobileweb.acceptpercent;
		var mobilewebvolume=mobileweb.volume;
		mobilevoice.volume = voice.volume*mobilevoice.acceptpercent;
		var mobilevoicevolume = mobilevoice.volume;
		phone.volume = voice.volume*phone.acceptpercent;
		var phonevolume = phone.volume;
		console.log("desktopvolume: "+desktopvolume+" mobilewebvolume: "+mobilewebvolume+" mobilevoicevolume: "
			+mobilevoicevolume+" phonevolume: "+ phonevolume);
		console.log("percents- desktop: "+desktop.acceptpercent+" mobileweb: "+mobileweb.acceptpercent+
			" mobilevoice: "+mobilevoice.acceptpercent+" phone: "+phone.acceptpercent);

		/*va*/
		if(boa.va.enabled){
			boa.va.volume=desktop.volume*boa.va.containment;
			desktopvolume-=boa.va.volume;
			boa.va.volume+=mobileweb.volume*boa.va.containment;
			mobilewebvolume-=mobileweb.volume*boa.va.containment;
			boa.va.calccost();
		}
		/*IVR*/
		if(boa.ivr.enabled){
			boa.ivr.volume=mobilevoice.volume*boa.ivr.containment;
			mobilevoicevolume-=mobilevoice.volume*boa.ivr.containment;
			boa.ivr.volume+=phone.volume*boa.ivr.containment;
			phonevolume-=phonevolume*boa.ivr.containment;
			boa.ivr.calccost();
		}
		/*vs*/
		if(boa.vs.enabled){
			boa.vs.volume=mobilevoicevolume*boa.vs.containment;
			mobilevoicevolume-=mobilevoicevolume*boa.vs.containment;
			boa.vs.calccost();
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
	 	if(boa.voiceagent.enabled){
	 		boa.voiceagent.volume = mobilevoicevolume*boa.voiceagent.containment;
	 		mobilevoicevolume-=mobilevoicevolume*boa.voiceagent.containment;
	 		boa.voiceagent.volume += phonevolume*boa.voiceagent.containment;
	 		phonevolume -= phonevolume*boa.voiceagent.containment;
	 		boa.voiceagent.calccost();
	 	}
	 	// boa.voiceagent.volume=desktopvolume+mobilewebvolume+mobilevoicevolume+phonevolume;
	 	// boa.voiceagent.calccost();
	 	if (boa == before){ 
	 		
		 	beforeweb = web.volume - (desktopvolume+mobilewebvolume);
		 	beforevoice = voice.volume - (mobilevoicevolume+phonevolume);
		 	beforeunweb = desktopvolume+mobilewebvolume;
		 	beforeunvoice = mobilevoicevolume+phonevolume;
		 	console.log('beforeunweb: '+beforeunweb+' beforeunvoice: '+beforeunvoice);
		}
		if (boa == after){
			console.log('boa=after');
		 	afterweb = web.volume - (desktopvolume+mobilewebvolume);
		 	aftervoice = voice.volume - (mobilevoicevolume+phonevolume);
		 	afterunweb = desktopvolume+mobilewebvolume;
		 	afterunvoice = mobilevoicevolume+phonevolume;
		 	console.log('afterunweb: '+afterunweb+' afterunvoice: '+afterunvoice);
		}
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
	function numberWithCommas2(x) {
		if (x==0){return '';}
		var parens = (x>0 ? false:true);
	    var parts = Math.floor(Math.abs(x)).toString().split(".");
	    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	    if (parens){
	    return "("+parts.join(".")+")";}
	    return ""+parts.join(".");
	}
	var beforesum = 0,aftersum = 0, savingssum = 0;
	var beforesum3 = 0,aftersum3 = 0, savingssum3 = 0;
	function updateline(tslot,pslot){
	document.getElementById(tslot+'b').innerHTML = numberWithCommas( eval('before.'+pslot+'.cost'));
	document.getElementById(tslot+'a').innerHTML = numberWithCommas( eval('after.'+pslot+'.cost'));
	document.getElementById(tslot+'s').innerHTML = numberWithCommas( eval('before.'+pslot+'.cost - after.'+pslot+'.cost'));
	beforesum+= eval('before.'+pslot+'.cost');aftersum+=eval('after.'+pslot+'.cost');savingssum+=eval('before.'+pslot+'.cost - after.'+pslot+'.cost');
	
	document.getElementById(tslot+'b3').innerHTML = numberWithCommas( eval('before.'+pslot+'.cost * 36'));
	document.getElementById(tslot+'a3').innerHTML = numberWithCommas( eval('after.'+pslot+'.cost * 36'));
	document.getElementById(tslot+'s3').innerHTML = numberWithCommas( eval('before.'+pslot+'.cost * 36 - after.'+pslot+'.cost * 36'));
	beforesum3+= eval('before.'+pslot+'.cost * 36');aftersum3+=eval('after.'+pslot+'.cost * 36');savingssum3+=eval('before.'+pslot+'.cost * 36 - after.'+pslot+'.cost * 36');
	}
	beforesum3-=bsu;
	aftersum3-=asu;
	savingssum3+= bsu - asu;
	updateline('voi','voiceagent');
	updateline('ivr','ivr');
	updateline('vs','vs');
	updateline('va','va');
	updateline('mc','mobileagent');
	updateline('wc','webagent');
	document.getElementById('totalb').innerHTML = numberWithCommas(beforesum);
	document.getElementById('totala').innerHTML = numberWithCommas(aftersum);
	document.getElementById('totals').innerHTML = numberWithCommas(savingssum);
	document.getElementById('totalb3').innerHTML = numberWithCommas(beforesum3);
	document.getElementById('totala3').innerHTML = numberWithCommas(aftersum3);
	document.getElementById('totals3').innerHTML = numberWithCommas(savingssum3);
	document.getElementById('setupb3').innerHTML = numberWithCommas(bsu);
	document.getElementById('setupa3').innerHTML = numberWithCommas(asu);
	document.getElementById('setups3').innerHTML = numberWithCommas(bsu-asu);
	document.getElementById('uvb').innerHTML = numberWithCommas2(beforevoice);
	document.getElementById('uva').innerHTML = numberWithCommas2(aftervoice);
	document.getElementById('uvs').innerHTML = numberWithCommas2(Number(aftervoice-beforevoice));
	document.getElementById('uwb').innerHTML = numberWithCommas2(beforeweb);
	document.getElementById('uwa').innerHTML = numberWithCommas2(afterweb);
	document.getElementById('uws').innerHTML = numberWithCommas2(Number(afterweb-beforeweb));
	//console.log('beforesum:'+numberWithCommas(aftersum));
}
function backgroundcolors(id,on){
	//document.getElementById('cpi'+id).style.borderColor= (on ? '#049094':'#cccccc');
	//document.getElementById('con'+id).style.borderColor= (on ? '#049094':'#cccccc');
	// document.getElementById('cpi'+id).style.backgroundColor= (on ? '#fafafa':'#ffffff');
	// document.getElementById('con'+id).style.backgroundColor= (on ? '#E6F4F4':'#ffffff');
	var time = 0;
	if (!on){
	// $("#cpi"+id).removeClass("form-teal").addClass("form-grey");
	// $("#con"+id).removeClass("form-teal").addClass("form-grey");
	$('#cpi'+id).switchClass("form-teal","form-grey",time);
	$('#con'+id).switchClass("form-teal","form-grey",time);
	} else {
	// $("#cpi"+id).removeClass("form-grey").addClass("form-teal");
	// $("#con"+id).removeClass("form-grey").addClass("form-teal");
	$('#cpi'+id).switchClass("form-grey","form-teal",time);
	$('#con'+id).switchClass("form-grey","form-teal",time);
	}
}


/*demos*/
	function scenario1(){
		document.getElementById("voicetraffic").value=1.25;
		document.getElementById('webtraffic').value=0;

		$( "#tealslider").slider('value',50);
		$( "#purpleslider").slider('value',50);

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
		calculatebutton();
		newslide();

 	}
 	function scenario2(){
		document.getElementById("voicetraffic").value=24;
		document.getElementById('webtraffic').value=15;

		$( "#tealslider").slider('value',50);
		$( "#purpleslider").slider('value',40);
		lvs =Number($("#tealslider").slider("option","value"));
		dvs=Number($("#purpleslider").slider("option","value"));
		
		document.getElementById('cbvoi1').checked = true;
		document.getElementById('cbvoi2').checked = true;
		document.getElementById('cbivr1').checked = true;
		document.getElementById('cbivr2').checked = true;
		document.getElementById('cbvs1').checked = false;
		document.getElementById('cbvs2').checked = false;
		document.getElementById('cbva1').checked = false;
		document.getElementById('cbva2').checked = true;
		document.getElementById('cbmc1').checked = false;
		document.getElementById('cbmc2').checked = false;
		document.getElementById('cbwc1').checked = true;
		document.getElementById('cbwc2').checked = true;

		document.getElementById('a4vfuture').checked = true;

		document.getElementById('cpivoi1').value = 9.60;
		document.getElementById('cpivoi2').value = 7.20;
		document.getElementById('cpiivr1').value = 1;
		document.getElementById('cpiivr2').value = 1;
		document.getElementById('cpivs1').value = 0;
		document.getElementById('cpivs2').value = 0;
		document.getElementById('cpiva1').value = 0;
		document.getElementById('cpiva2').value = 3;
		document.getElementById('cpimc1').value = 0;
		document.getElementById('cpimc2').value = 0;
		document.getElementById('cpiwc1').value = 4;
		document.getElementById('cpiwc2').value = 4;

		document.getElementById('convoi1').value = 40;
		document.getElementById('convoi2').value = 40;
		document.getElementById('conivr1').value = 10;
		document.getElementById('conivr2').value = 10;
		document.getElementById('convs1').value = 0;
		document.getElementById('convs2').value = 0;
		document.getElementById('conva1').value = 0;
		document.getElementById('conva2').value = 10;
		document.getElementById('conmc1').value = 0;
		document.getElementById('conmc2').value = 0;
		document.getElementById('conwc1').value = 5;
		document.getElementById('conwc2').value = 25;

		calculatebutton();
		

 	}
 	 	function reset(){
		document.getElementById("voicetraffic").value='';
		document.getElementById('webtraffic').value='';

		$( "#tealslider").slider('value',50);
		$( "#purpleslider").slider('value',50);

		document.getElementById('cbvoi1').checked = false;
		document.getElementById('cbvoi2').checked = false;
		document.getElementById('cbivr1').checked = false;
		document.getElementById('cbivr2').checked = false;
		document.getElementById('cbvs1').checked = false;
		document.getElementById('cbvs2').checked = false;
		document.getElementById('cbva1').checked = false;
		document.getElementById('cbva2').checked = false;
		document.getElementById('cbmc1').checked = false;
		document.getElementById('cbmc2').checked = false;
		document.getElementById('cbwc1').checked = false;
		document.getElementById('cbwc2').checked = false;

		document.getElementById('a4vfuture').checked = false;
		document.getElementById('a4vcurrent').checked = false;

		document.getElementById('cpivoi1').value = '';
		document.getElementById('cpivoi2').value = '';
		document.getElementById('cpiivr1').value = '';
		document.getElementById('cpiivr2').value = '';
		document.getElementById('cpivs1').value = '';
		document.getElementById('cpivs2').value = '';
		document.getElementById('cpiva1').value = '';
		document.getElementById('cpiva2').value = '';
		document.getElementById('cpimc1').value = '';
		document.getElementById('cpimc2').value = '';
		document.getElementById('cpiwc1').value = '';
		document.getElementById('cpiwc2').value = '';

		document.getElementById('convoi1').value = '';
		document.getElementById('convoi2').value = '';
		document.getElementById('conivr1').value = '';
		document.getElementById('conivr2').value = '';
		document.getElementById('convs1').value = '';
		document.getElementById('convs2').value = '';
		document.getElementById('conva1').value = '';
		document.getElementById('conva2').value = '';
		document.getElementById('conmc1').value = '';
		document.getElementById('conmc2').value = '';
		document.getElementById('conwc1').value = '';
		document.getElementById('conwc2').value = '';
		calculatebutton();
		newslide();

 	}

/*charts*/
	function drawchart(){
		var  products=['genre','Voice Agents','IVR','Vivid Speech', 'Virtual Assistant','Mobile Chat', 'Web Chat', 'Unresolved'];
		var costbefore=['before',before.voiceagent.volume,before.ivr.volume,before.vs.volume,
		before.va.volume,before.mobileagent.volume,before.webagent.volume,(beforeunweb+beforeunvoice)];
		var costafter=['after',after.voiceagent.volume,after.ivr.volume,after.vs.volume,
		after.va.volume,after.mobileagent.volume,after.webagent.volume,(afterunweb+afterunvoice)];
		var chartw = window.innerWidth-400;
		if (chartw < 800){chartw=800;}
		var charth = (window.innerHeight>850 ? 360: window.innerHeight/2-85);
		var data = new google.visualization.arrayToDataTable([
			products,
			costbefore,
			costafter
			])
		var options = {
			title: 'Volumes',
			width:chartw,
			height: charth,
			legend: 'none',//{ position: 'none'},
			bar:{groupwidth:'75'},
			isStacked: true,
			colors: ['#049094','#f5b77a','#f29f4e','#ef8822','#a74e8c','#912370','#bbbbbb']
		};
		var chart = new google.visualization.BarChart(document.getElementById('chart3'));
		chart.draw(data,options);
		var  productscost=['genre','Voice Agents','IVR','Vivid Speech', 'Virtual Assistant','Mobile Chat', 'Web Chat'];
		var volbefore=['before',before.voiceagent.cost,before.ivr.cost,before.vs.cost,
		before.va.cost,before.mobileagent.cost,before.webagent.cost];
		var volafter=['after',after.voiceagent.cost,after.ivr.cost,after.vs.cost,
		after.va.cost,after.mobileagent.cost,after.webagent.cost];
		var data2 = new google.visualization.arrayToDataTable([
			productscost,
			volbefore,
			volafter])
		var options2 = {
			title: 'Costs',
			width:chartw,
			height:charth,
			legend: 'none',//{position: 'none'},
			isStacked:true,
			colors: ['#049094','#f5b77a','#f29f4e','#ef8822','#a74e8c','#912370']
		};
		var chart2 = new google.visualization.BarChart(document.getElementById('volumechart'));
		chart2.draw(data2,options2);
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

		onoroff[22] = a4vfut;

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
window.onload = function(){
	$("#table").hide();
	$("#table2").hide();
	resize();
}
$(window).resize(function(){
	resize();
});
function resize(){
	drawchart();
	console.log("resize");
	var height = $(window).height();
	$("#settingsbar").height(height-65-76);
	
}
function newslide(){
		//console.log("newslide change");
		setTimeout(function(){lvs =Number($("#tealslider").slider("option","value"));
		dvs=Number($("#purpleslider").slider("option","value"));
		document.getElementById("showpercentteal").innerHTML = lvs+"% mobile";
		document.getElementById("showpercentpurple").innerHTML = dvs+"% mobile";
		//lvs=lvs/100;dvs=dvs/100;
		},10);
	}
