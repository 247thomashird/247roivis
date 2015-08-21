var slider1val,slider2val;

var bvoion=false,bivron=false,bvson=false,bmcon=false,bwcon=false,bvaon=false;
var avoion=false,aivron=false,avson=false,amcon=false,awcon=false,avaon=false;
var bivre = 0,aivre=0,bvse=0,avse=0,bmce=0,amce=0,bwce=0,awce=0,bvae=0,avae=0;
var voicevolume=0,webvolume=0;
var bvoicpi=0,avoicpi=0, bivrcpi = 0,aivrcpi=0,bvscpi=0,avscpi=0,bmccpi=0,amccpi=0,bwccpi=0,awccpi=0,bvacpi=0,avacpi=0;
var bvoicost=0,avoicost=0, bivrcost=0,aivrcost=0,bvscost=0,avscost=0,bmccost=0,amccost=0,bwccost=0,awccost=0,bvacost=0,avacost=0;
var bvoinps=0,avoinps=0, bivrnps = 0,aivrnps=0,bvsnps=0,avsnps=0,bmcnps=0,amcnps=0,bwcnps=0,awcnps=0,bvanps=0,avanps=0;
var bvoiaht=0,avoiaht=0, bivraht = 0,aivraht=0,bvsaht=0,avsaht=0,bmcaht=0,amcaht=0,bwcaht=0,awcaht=0,bvaaht=0,avaaht=0;
var lvs=0.5,dvs=0.5;
var totalsavings = 0,beforetotal=0,aftertotal=0;

var bvoivol=0,bivrvol=0,bvsvol=0,bmcvol=0,bwcvol=0,bvavol=0;
var avoivol=0,aivrvol=0,avsvol=0,amcvol=0,awcvol=0,avavol=0;
var debug=false;
var startup=false;
var journeystring = "";

var state=0;


//setTimeout(function(){websiteinit();},300);
function websiteinit(){
	$("#svg").hide();
	if (startup){
		$("#leftside").hide();
		$("#rightside").hide();
		colorintroupdate();
	} else {
		$('#leftside').show();
		$("#rightside").show();
		if (debug){setuptest();} else {updatevars();}
		calcvalues();
		updatesummary();
		colorupdate();
		$("#intro").hide();
		newslide();
	}
}

//intro stuff
	function nextstate(){
		$("#state1top").hide();
		$("#state2top").hide();
		$("#state3top").hide();
		$("#state4top").hide();
		switch(state){
			case 0:
				$("#state1top").show();
				break;
			case 1:
				$("#state2top").show();
				break;
			case 2:
				$("#state3top").show();
				break;
			case 3:
				$("#state4top").show();
				break;
			case 4:
				startup=false;
				websiteinit();
		}
		state+=1;
		colorintroupdate();
	}

	function colorintroupdate(){
		var tmcolors = [];
		var mcolors = [];
		var off = "#bbbbbb";
		var on ="#666666";
		var halfon = "#049094";

		for (var i=0;i<29;i++){
			tmcolors[i]=0;
		}

		var state1 = []
		for (var i=0;i<29;i++){
			//mcolors[i] = ((tmcolors[i]) ? '#666666':off);
			switch(tmcolors[i]){
				case 0:
					mcolors[i]=off;
					break;
				case 1:
					mcolors[i]=on;
					break;
				case 2:
					mcolors[i]=halfon;
					break;
			}
			var color = mcolors[i];
			document.getElementsByClassName(i+"b")[0].setAttribute('stroke',color);
			//document.getElementsByClassName(name)[0].setAttribute('fill',color);
			console.log("num: "+i+" color: "+color);
		}
		function changecirclecolor(name,color){
			var parts = document.getElementsByClassName(name+"b");
			for(var i=0;i<parts.length;i++){
			parts[i].setAttribute('fill',color);
			}
		}
		changecirclecolor(0,mcolors[0]);
		changecirclecolor(4,mcolors[4]);
		changecirclecolor(5,mcolors[5]);
		changecirclecolor(6,mcolors[6]);
		changecirclecolor(10,mcolors[10]);
		changecirclecolor(14,mcolors[14]);
		changecirclecolor(15,mcolors[15]);
		changecirclecolor(16,mcolors[16]);
		changecirclecolor(24,mcolors[24]);
		changecirclecolor(25,mcolors[25]);
		changecirclecolor(28,mcolors[28]);
	}
	function addtojourneystring(stuff){
		journeystring+=stuff;
	}

function updatevars(){
	//figuriing out if products are turned on 
		bvoion = document.getElementById('bvoicb').checked;
		avoion = document.getElementById('avoicb').checked;
		bivron = document.getElementById('bivrcb').checked;
		aivron = document.getElementById('aivrcb').checked;
		bvson = document.getElementById('bvscb').checked;
		avson = document.getElementById('avscb').checked;
		bmcon = document.getElementById('bmccb').checked;
		amcon = document.getElementById('amccb').checked;
		bwcon = document.getElementById('bwccb').checked;
		awcon = document.getElementById('awccb').checked;
		bvaon = document.getElementById('bvacb').checked;
		avaon = document.getElementById('avacb').checked;

	//getting volumes
	voicevolume = Number(document.getElementById('247vvv').value)*1000000;
	webvolume = Number(document.getElementById('247wvv').value)*1000000;

	//getting effectivenesses
		bivre = ((bivron) ? document.getElementById('bivreff').value/100 : 0);
		aivre = ((aivron) ? document.getElementById('aivreff').value/100 : 0);
		bvse = ((bvson) ? document.getElementById('bvseff').value/100 : 0);
		avse = ((avson) ? document.getElementById('avseff').value/100 : 0);
		bmce = ((bmcon) ? document.getElementById('bmceff').value/100 : 0);
		amce = ((amcon) ? document.getElementById('amceff').value/100 : 0);
		bwce = ((bwcon) ? document.getElementById('bwceff').value/100 : 0);
		awce = ((awcon) ? document.getElementById('awceff').value/100 : 0);
		bvae = ((bvaon) ? document.getElementById('bvaeff').value/100 : 0);
		avae = ((avaon) ? document.getElementById('avaeff').value/100 : 0);

	//getting Cost Per Interaction
		bvoicpi = document.getElementById('bvoicpi').value;
		avoicpi = document.getElementById('avoicpi').value; 
		bivrcpi = document.getElementById('bivrcpi').value;
		aivrcpi = document.getElementById('aivrcpi').value;
		bvscpi = document.getElementById('bvscpi').value;
		avscpi = document.getElementById('avscpi').value;
		bmccpi = document.getElementById('bmccpi').value;
		amccpi = document.getElementById('amccpi').value;
		bwccpi = document.getElementById('bwccpi').value;
		awccpi = document.getElementById('awccpi').value;
		bvacpi = document.getElementById('bvacpi').value;
		avacpi = document.getElementById('avacpi').value;
	/*
	//getting NPS
		bvoinps = document.getElementById('bvoinps').value;
		avoinps = document.getElementById('avoinps').value; 
		bivrnps = document.getElementById('bivrnps').value;
		aivrnps = document.getElementById('aivrnps').value;
		bvsnps = document.getElementById('bvsnps').value;
		avsnps = document.getElementById('avsnps').value;
		bmcnps = document.getElementById('bmcnps').value;
		amcnps = document.getElementById('amcnps').value;
		bwcnps = document.getElementById('bwcnps').value;
		awcnps = document.getElementById('awcnps').value;
		bvanps = document.getElementById('bvanps').value;
		avanps = document.getElementById('avanps').value;

	//getting AHT
		bvoiaht = document.getElementById('bvoiaht').value;
		avoiaht = document.getElementById('avoiaht').value; 
		bivraht = document.getElementById('bivraht').value;
		aivraht = document.getElementById('aivraht').value;
		bvsaht = document.getElementById('bvsaht').value;
		avsaht = document.getElementById('avsaht').value;
		bmcaht = document.getElementById('bmcaht').value;
		amcaht = document.getElementById('amcaht').value;
		bwcaht = document.getElementById('bwcaht').value;
		awcaht = document.getElementById('awcaht').value;
		bvaaht = document.getElementById('bvaaht').value;
		avaaht = document.getElementById('avaaht').value;
	*/
}


function calcvalues(){
	updatevars();
	if (debug){setuptest();}
	var bvvol = voicevolume,avvol=voicevolume;
	var awvol = webvolume,bwvol = webvolume;

	var atotalvoivolume=0,btotalvoivolume=0;
	var atotalchatvolume=0;btotalchatvolume=0;


	//landline

		var lbvvol = bvvol*lvs;
		var lavvol = avvol*lvs;
		var alivrvol = 0,blivrvol=0;
		if (debug){
			console.log("starting after volume: "+lavvol);
		}
		if (avoion){
			alivrvol = lavvol*aivre;
			lavvol-=alivrvol;
		}
		if (debug){
			console.log("new volume: "+lavvol);
			console.log("landline ivr: "+alivrvol);
		}
		if (bvoion){
			blivrvol = lbvvol*bivre;
			lbvvol-=blivrvol;
		}
		atotalvoivolume+=lavvol;
		btotalvoivolume+=lbvvol;



	//smartphone voice
		var sbvvol = bvvol*(1-lvs);
		var savvol = avvol*(1-lvs);
		var asivrvol=0;bsivrvol=0;
		var asvsvol=0;bsvsvol=0;
		if (avoion){
			asivrvol = savvol*aivre;
			savvol-=asivrvol;
		}
		if (bvoion){
			bsivrvol = sbvvol*bivre;
			sbvvol-=bsivrvol;
		}
		if (avson){
			asvsvol = savvol*avse;
			savvol-=asvsvol;
		}
		if (bvson){
			bsvsvol = sbvvol*bvse;
			sbvvol-=bsvsvol;
		}
		atotalvoivolume+=savvol;
		btotalvoivolume+=sbvvol;

	//smartphone web
		var sbwvol = bwvol * dvs;
		var sawvol = awvol * dvs;
		var bsvavol = 0,asvavol = 0;
		//var bmcvol = 0,amcvol=0;
		if (avaon){
			asvavol = sawvol * avae;
			sawvol-=asvavol;
		}
		if (bvaon){
			bsvavol = sbwvol * avae;
			sbwvol-=bsvavol;
		}
		if (amcon){
			amcvol=sawvol*amce;
			sawvol-=amcvol;
		}
		if (bmcon){
			bmcvol=sbwvol*bmce;
			sbwvol-=bmcvol;
		}
		atotalvoivolume+=sawvol;
		btotalvoivolume+=sbwvol;

	//desktop web
		var dbwvol = bwvol*(1-dvs);
		var dawvol = awvol*(1-dvs);
		var advavol = 0,bdvavol=0;
		//var bwcvol = 0, awcvol=0;
		if (avaon){
			advavol = dawvol * avae;
			dawvol-=advavol;
		}
		if (bvaon){
			bdvavol = dbwvol * avae;
			dbwvol-=bdvavol;
		}
		if (awcon){
			awcvol = dawvol*awce;
			dawvol-=awcvol
		}
		if (bwcon){
			bwcvol = dbwvol*bwce;
			dbwvol-=bwcvol;
		}
		atotalvoivolume+=dawvol;
		btotalvoivolume+=dbwvol;

	//agregate numbers:
	//console.log("For Before Voice:\nlandline ivr: "+blivrvol+" smartphone ivr: "+bsivrvol+" smartphone Vivid Speech: "+ bsvsvol+"\n");
	//console.log("For After Voice:\nlandline ivr: "+alivrvol+" smartphone ivr: "+asivrvol+" smartphone Vivid Speech: "+ asvsvol+"\n");
	//console.log("For Before Web:\nsmartphone va: "+bsvavol+" smartphone chat: "+bmcvol+" web va: "+bdvavol+" web chat: "+bwcvol+"\n");
	//console.log("For After Web:\nsmartphone va: "+asvavol+" smartphone chat: "+amcvol+" web va: "+advavol+" web chat: "+awcvol+"\n");
	//console.log("Voice Agents:\nbefore: "+btotalvoivolume+" after: "+atotalvoivolume);

	//set final nums
	bvoivol=btotalvoivolume;
	bivrvol=blivrvol+bsivrvol;
	bvsvol=bsvsvol;
	//bmcvol=bmcvol;bwcvol=bwcvol;
	bvavol=bsvavol+bdvavol;

	avoivol=atotalvoivolume;
	aivrvol=alivrvol+asivrvol;
	avsvol=asvsvol;
	//amcvol=amcvol;awcvol=awcvol;
	avavol=asvavol+advavol;
	
	updatesummary();
	updatecharts();
}
function updatesummary(){
	function numberWithCommas(x) {
		if (Number(x)>0){
			x=Math.floor(x);
			return "$"+x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
		} else{
			x=Math.floor(x);
			var newx = Number(x)*-1;
			return "($"+newx.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+")";
		}
	    
	}

	//update cost graphs
	//bvoicpi=0,avoicpi=0, bivrcpi = 0,aivrcpi=0,bvscpi=0,avscpi=0,bmccpi=0,amccpi=0,bwccpi=0,awccpi=0,bvacpi=0,avacpi=0;
	bvoicost=bvoivol*bvoicpi;avoicost=avoivol*avoicpi;
	if (bvoivol*bvoicpi!=0){document.getElementById('cvoi1').innerHTML =  numberWithCommas(bvoivol*bvoicpi);} else{document.getElementById('cvoi1').innerHTML = "";}
	if (avoivol*avoicpi!=0){document.getElementById('cvoi2').innerHTML =  numberWithCommas(avoivol*avoicpi);} else{document.getElementById('cvoi2').innerHTML = "";}
	if (avoivol*avoicpi-bvoivol*bvoicpi!=0){document.getElementById('cvoi3').innerHTML = numberWithCommas(-1*avoivol*avoicpi+bvoivol*bvoicpi);} else{document.getElementById('cvoi1').innerHTML = "";}
	
	bivrcost=bivrvol*bivrcpi;aivrcost=aivrvol*aivrcpi;
	if (bivrvol*bivrcpi!=0){document.getElementById('civr1').innerHTML =  numberWithCommas(bivrvol*bivrcpi);} else{document.getElementById('civr1').innerHTML = "";}
	if (aivrvol*aivrcpi!=0){document.getElementById('civr2').innerHTML = numberWithCommas(aivrvol*aivrcpi);} else{document.getElementById('civr2').innerHTML = "";}
	if (aivrvol*aivrcpi-bivrvol*bivrcpi!=0){document.getElementById('civr3').innerHTML = numberWithCommas(-1*aivrvol*aivrcpi+bivrvol*bivrcpi);} else{document.getElementById('civr3').innerHTML = "";}

	bmccost=bmcvol*bmccpi;amccost=amcvol*amccpi;
	if (bmcvol*bmccpi!=0){document.getElementById('cmc1').innerHTML = numberWithCommas(bmcvol*bmccpi);} else{document.getElementById('cmc1').innerHTML = "";}
	if (amcvol*amccpi!=0){document.getElementById('cmc2').innerHTML = numberWithCommas(amcvol*amccpi);} else{document.getElementById('cmc2').innerHTML = "";}
	if (amcvol*amccpi-bmcvol*bmccpi!=0){document.getElementById('cmc3').innerHTML = numberWithCommas(-1*amcvol*amccpi+bmcvol*bmccpi);} else{document.getElementById('cmc3').innerHTML = "";}

	bwccost=bwcvol*bwccpi;awccost=awcvol*awccpi;
	if (bwcvol*bwccpi!=0){document.getElementById('cwc1').innerHTML = numberWithCommas(bwcvol*bwccpi);} else{document.getElementById('cwc1').innerHTML = "";}
	if (awcvol*awccpi!=0){document.getElementById('cwc2').innerHTML = numberWithCommas(awcvol*awccpi);} else{document.getElementById('cwc2').innerHTML = "";}
	if (awcvol*awccpi-bwcvol*bwccpi!=0){document.getElementById('cwc3').innerHTML = numberWithCommas(-1*awcvol*awccpi+bwcvol*bwccpi);} else{document.getElementById('cwc3').innerHTML = "";}

	bvacost=bvavol*bvacpi;avacost=avavol*avacpi;
	if (bvavol*bvacpi!=0){document.getElementById('cva1').innerHTML = numberWithCommas(bvavol*bvacpi);} else{document.getElementById('cva1').innerHTML = "";}
	if (avavol*avacpi!=0){document.getElementById('cva2').innerHTML = numberWithCommas(avavol*avacpi);} else{document.getElementById('cva2').innerHTML = "";}
	if (avavol*avacpi-bvavol*bvacpi!=0){document.getElementById('cva3').innerHTML = numberWithCommas(-1*avavol*avacpi+bvavol*bvacpi);} else{document.getElementById('cva3').innerHTML = "";}
	
	bvscost=bvsvol*bvscpi;avscost=avsvol*avscpi;
	if (bvsvol*bvscpi!=0){document.getElementById('cvs1').innerHTML = numberWithCommas(bvsvol*bvscpi);} else{document.getElementById('cvs1').innerHTML = "";}
	if (avsvol*avscpi!=0){document.getElementById('cvs2').innerHTML = numberWithCommas(avsvol*avscpi);} else{document.getElementById('cvs2').innerHTML = "";}
	if (avsvol*avscpi-bvsvol*bvscpi!=0){document.getElementById('cvs3').innerHTML = numberWithCommas(-1*avsvol*avscpi+bvsvol*bvscpi);} else{document.getElementById('cvs3').innerHTML = "";}
	totalsavings = (avscost-bvscost+avacost-bvacost+awccost-bwccost+amccost-bmccost+aivrcost-bivrcost+avoicost-bvoicost)*-1;
	document.getElementById('costsavings').innerHTML = "You could save "+ numberWithCommas(totalsavings);
	
	//totals
	beforetotal = bvoicost+bivrcost+bmccost+bwccost+bvacost+bvscost;
	aftertotal = avoicost+aivrcost+amccost+awccost+avacost+avscost;
	if (beforetotal!=0){document.getElementById('ctotal1').innerHTML = numberWithCommas(beforetotal);} else{document.getElementById('ctotal1').innerHTML = "";}
	if (aftertotal!=0){document.getElementById('ctotal2').innerHTML = numberWithCommas(aftertotal);} else{document.getElementById('ctotal2').innerHTML = "";}
	if (totalsavings!=0){document.getElementById('ctotal3').innerHTML = numberWithCommas(totalsavings);} else{document.getElementById('ctotal3').innerHTML = "";}

	updatemetrics();
}
function updatemetrics(){
	function numberWithCommas(x) {
	    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	//update cost graphs
	//bvoicpi=0,avoicpi=0, bivrcpi = 0,aivrcpi=0,bvscpi=0,avscpi=0,bmccpi=0,amccpi=0,bwccpi=0,awccpi=0,bvacpi=0,avacpi=0;
	//bivre = 0,aivre=0,bvse=0,avse=0,bmce=0,amce=0,bwce=0,awce=0,bvae=0,avae=0;

	bvoicost=bvoivol*bvoicpi;avoicost=avoivol*avoicpi;
	document.getElementById('cvoi1m').innerHTML = "$" + numberWithCommas(bvoivol*bvoicpi);
	document.getElementById('cvoi2m').innerHTML = "$" + numberWithCommas(avoivol*avoicpi);
	
	bivrcost=bivrvol*bivrcpi;aivrcost=aivrvol*aivrcpi;
	document.getElementById('civr1m').innerHTML = "$" + numberWithCommas(bivrvol*bivrcpi);
	document.getElementById('civr2m').innerHTML = "$" + numberWithCommas(aivrvol*aivrcpi);
	document.getElementById('civr1mp').innerHTML = "%" + numberWithCommas(bivre*100);
	document.getElementById('civr2mp').innerHTML = "%" + numberWithCommas(aivre*100);

	bmccost=bmcvol*bmccpi;amccost=amcvol*amccpi;
	document.getElementById('cmc1m').innerHTML = "$" + numberWithCommas(bmcvol*bmccpi);
	document.getElementById('cmc2m').innerHTML = "$" + numberWithCommas(amcvol*amccpi);
	document.getElementById('cmc1mp').innerHTML = "%" + numberWithCommas(bmce*100);
	document.getElementById('cmc2mp').innerHTML = "%" + numberWithCommas(amce*100);

	bwccost=bwcvol*bwccpi;awccost=awcvol*awccpi;
	document.getElementById('cwc1m').innerHTML = "$" + numberWithCommas(bwcvol*bwccpi);
	document.getElementById('cwc2m').innerHTML = "$" + numberWithCommas(awcvol*awccpi);
	document.getElementById('cwc1mp').innerHTML = "%" + numberWithCommas(bwce*100);
	document.getElementById('cwc2mp').innerHTML = "%" + numberWithCommas(awce*100);

	bvacost=bvavol*bvacpi;avacost=avavol*avacpi;
	document.getElementById('cva1m').innerHTML = "$" + numberWithCommas(bvavol*bvacpi);
	document.getElementById('cva2m').innerHTML = "$" + numberWithCommas(avavol*avacpi);
	document.getElementById('cva1mp').innerHTML = "%" + numberWithCommas(bvae*100);
	document.getElementById('cva2mp').innerHTML = "%" + numberWithCommas(avae*100);
	
	bvscost=bvsvol*bvscpi;avscost=avsvol*avscpi;
	document.getElementById('cvs1m').innerHTML = "$" + numberWithCommas(bvsvol*bvscpi);
	document.getElementById('cvs2m').innerHTML = "$" + numberWithCommas(avsvol*avscpi);
	document.getElementById('cvs1mp').innerHTML = "%" + numberWithCommas(bvse*100);
	document.getElementById('cvs2mp').innerHTML = "%" + numberWithCommas(avse*100);
	
	var totalsavings = (avscost-bvscost+avacost-bvacost+awccost-bwccost+amccost-bmccost+aivrcost-bivrcost+avoicost-bvoicost)*-1;
	//document.getElementById('costsavings').innerHTML = "You could save $"+ numberWithCommas(totalsavings)+" per month";

}

function colorupdate(){
	var tmcolors = [];
	var mcolors = [];
	var off = "#bbbbbb";
	for (var i=0;i<29;i++){
		tmcolors[i]=0;
	}
	var voiarray = [0,2,3,5,6,8,9,10,13,16,23,25,27,28];
	if (bvoion){
		for (var i=0;i<voiarray.length;i++){
			var temp = voiarray[i];
			tmcolors[temp]=1;
		}
	}

	var ivrarray=[0,2,3,5,6,8,9,10,12,14,21,25,27,28];
	if (bivron){
		for (var i=0;i<ivrarray.length;i++){
			var temp = ivrarray[i];
			tmcolors[temp]=1;
		}
	}

	var vscarray = [0,2,5,8,10,12,14,20,21,24,25,26,27,28];
	if (bvson){
		for (var i=0;i<vscarray.length;i++){
			var temp = vscarray[i];
			tmcolors[temp]=1;
		}
	}

	var mccarray = [0,2,5,8,10,11,15,19,24,26,28];
	if (bmcon){
		for (var i = 0;i<mccarray.length;i++){
			var temp = mccarray[i];
			tmcolors[temp]=1;
		}
	}

	var dccarray = [0,1,4,7,10,11,15,19,24,26,28];
	if (bwcon){
		for (var i = 0;i<dccarray.length;i++){
			var temp = dccarray[i];
			tmcolors[temp]=1;
		}
	}

	var vacbarray = [0,1,2,4,5,7,8,10,12,14,20,24,26,28];
	if (bvaon){
		for (var i=0;i<vacbarray.length;i++){
			var temp = vacbarray[i];
			tmcolors[temp]=1;
		}
	}
	if(document.getElementById('ba4vcb').checked){
		tmcolors[22]=1;
	}
	mcolors[0] = ((tmcolors[0]) ? '#666666':off);
	mcolors[1] = ((tmcolors[1]) ? '#666666':off);
	mcolors[2] = ((tmcolors[2]) ? '#666666':off);
	mcolors[3] = ((tmcolors[3]) ? '#666666':off);
	mcolors[4] = ((tmcolors[4]) ? '#666666':off);
	mcolors[5] = ((tmcolors[5]) ? '#666666':off);
	mcolors[6] = ((tmcolors[6]) ? '#666666':off);
	mcolors[7] = ((tmcolors[7]) ? '#666666':off);
	mcolors[8] = ((tmcolors[8]) ? '#666666':off);
	mcolors[9] = ((tmcolors[9]) ? '#666666':off);
	mcolors[10] = ((tmcolors[10]) ? '#ef8822':off);
	mcolors[11] = ((tmcolors[11]) ? '#ffb972':off);
	mcolors[12] = ((tmcolors[12]) ? '#ef8822':off);
	mcolors[13] = ((tmcolors[13]) ? '#ffb972':off);
	mcolors[14] = ((tmcolors[14]) ? '#ef8822':off);
	mcolors[15] = ((tmcolors[15]) ? '#ef8822':off);
	mcolors[16] = ((tmcolors[16]) ? '#ef8822':off);
	mcolors[17] = ((tmcolors[17]) ? '#ef8822':off);
	mcolors[18] = ((tmcolors[18]) ? '#ef8822':off);
	mcolors[19] = ((tmcolors[19]) ? '#912370':off);
	mcolors[20] = ((tmcolors[20]) ? '#912370':off);
	mcolors[21] = ((tmcolors[21]) ? '#049094':off);
	mcolors[22] = ((tmcolors[22]) ? '#912370':off);
	mcolors[23] = ((tmcolors[23]) ? '#049094':off);
	mcolors[24] = ((tmcolors[24]) ? '#912370':off);
	mcolors[25] = ((tmcolors[25]) ? '#049094':off);
	mcolors[26] = ((tmcolors[26]) ? '#912370':off);
	mcolors[27] = ((tmcolors[27]) ? '#049094':off);
	mcolors[28] = ((tmcolors[28]) ? '#666666':off);
	for (var i=0;i<29;i++){
		mcolors[i] = ((tmcolors[i]) ? '#666666':off);
		var color = mcolors[i];
		document.getElementsByClassName(i)[0].setAttribute('stroke',color);
		//document.getElementsByClassName(name)[0].setAttribute('fill',color);
		//console.log("num: "+i+" color: "+color);
	}
	function changecirclecolor(name,color){
		var parts = document.getElementsByClassName(name);
		for(var i=0;i<parts.length;i++){
		parts[i].setAttribute('fill',color);
		}
	}
	changecirclecolor(0,mcolors[0]);
	changecirclecolor(4,mcolors[4]);
	changecirclecolor(5,mcolors[5]);
	changecirclecolor(6,mcolors[6]);
	changecirclecolor(10,mcolors[10]);
	changecirclecolor(14,mcolors[14]);
	changecirclecolor(15,mcolors[15]);
	changecirclecolor(16,mcolors[16]);
	changecirclecolor(24,mcolors[24]);
	changecirclecolor(25,mcolors[25]);
	changecirclecolor(28,mcolors[28]);

	for (var i=0;i<29;i++){
		tmcolors[i]=0;
	}
	var voiarray = [0,2,3,5,6,8,9,10,13,16,23,25,27,28];
	if (avoion){
		for (var i=0;i<voiarray.length;i++){
			var temp = voiarray[i];
			tmcolors[temp]=1;
		}
	}

	var ivrarray=[0,2,3,5,6,8,9,10,12,14,21,25,27,28];
	if (aivron){
		for (var i=0;i<ivrarray.length;i++){
			var temp = ivrarray[i];
			tmcolors[temp]=1;
		}
	}

	var vscarray = [0,2,5,8,10,12,14,20,21,24,25,26,27,28];
	if (avson){
		for (var i=0;i<vscarray.length;i++){
			var temp = vscarray[i];
			tmcolors[temp]=1;
		}
	}

	var mccarray = [0,2,5,8,10,11,15,19,24,26,28];
	if (amcon){
		for (var i = 0;i<mccarray.length;i++){
			var temp = mccarray[i];
			tmcolors[temp]=1;
		}
	}

	var dccarray = [0,1,4,7,10,11,15,19,24,26,28];
	if (awcon){
		for (var i = 0;i<dccarray.length;i++){
			var temp = dccarray[i];
			tmcolors[temp]=1;
		}
	}

	var vacbarray = [0,1,2,4,5,7,8,10,12,14,20,24,26,28];
	if (avaon){
		for (var i=0;i<vacbarray.length;i++){
			var temp = vacbarray[i];
			tmcolors[temp]=1;
		}
	}
	if(document.getElementById('aa4vcb').checked){
		tmcolors[22]=1;
	}
	mcolors[0] = ((tmcolors[0]) ? '#666666':off);
	mcolors[1] = ((tmcolors[1]) ? '#666666':off);
	mcolors[2] = ((tmcolors[2]) ? '#666666':off);
	mcolors[3] = ((tmcolors[3]) ? '#666666':off);
	mcolors[4] = ((tmcolors[4]) ? '#666666':off);
	mcolors[5] = ((tmcolors[5]) ? '#666666':off);
	mcolors[6] = ((tmcolors[6]) ? '#666666':off);
	mcolors[7] = ((tmcolors[7]) ? '#666666':off);
	mcolors[8] = ((tmcolors[8]) ? '#666666':off);
	mcolors[9] = ((tmcolors[9]) ? '#666666':off);
	mcolors[10] = ((tmcolors[10]) ? '#ef8822':off);
	mcolors[11] = ((tmcolors[11]) ? '#ffb972':off);
	mcolors[12] = ((tmcolors[12]) ? '#ef8822':off);
	mcolors[13] = ((tmcolors[13]) ? '#ffb972':off);
	mcolors[14] = ((tmcolors[14]) ? '#ef8822':off);
	mcolors[15] = ((tmcolors[15]) ? '#ef8822':off);
	mcolors[16] = ((tmcolors[16]) ? '#ef8822':off);
	mcolors[17] = ((tmcolors[17]) ? '#ef8822':off);
	mcolors[18] = ((tmcolors[18]) ? '#ef8822':off);
	mcolors[19] = ((tmcolors[19]) ? '#912370':off);
	mcolors[20] = ((tmcolors[20]) ? '#912370':off);
	mcolors[21] = ((tmcolors[21]) ? '#049094':off);
	mcolors[22] = ((tmcolors[22]) ? '#912370':off);
	mcolors[23] = ((tmcolors[23]) ? '#049094':off);
	mcolors[24] = ((tmcolors[24]) ? '#912370':off);
	mcolors[25] = ((tmcolors[25]) ? '#049094':off);
	mcolors[26] = ((tmcolors[26]) ? '#912370':off);
	mcolors[27] = ((tmcolors[27]) ? '#049094':off);
	mcolors[28] = ((tmcolors[28]) ? '#666666':off);
	for (var i=0;i<29;i++){
		//console.log("num: "+i);
		
		var color = mcolors[i];
		document.getElementsByClassName(i+"a")[0].setAttribute('stroke',color);
		//document.getElementsByClassName(name)[0].setAttribute('fill',color);
	}
	function changecirclecolor(name,color){
		var parts = document.getElementsByClassName(name);
		for(var i=0;i<parts.length;i++){
		parts[i].setAttribute('fill',color);
		}
	}
	changecirclecolor('0a',mcolors[0]);
	changecirclecolor('4a',mcolors[4]);
	changecirclecolor('5a',mcolors[5]);
	changecirclecolor('6a',mcolors[6]);
	changecirclecolor('10a',mcolors[10]);
	changecirclecolor('14a',mcolors[14]);
	changecirclecolor('15a',mcolors[15]);
	changecirclecolor('16a',mcolors[16]);
	changecirclecolor('24a',mcolors[24]);
	changecirclecolor('25a',mcolors[25]);
	changecirclecolor('28a',mcolors[28]);
}
function setuptest(){
	bvoion=true,bivron=true,bvson=true,bmcon=true,bwcon=true,bvaon=true;
	avoion=true,aivron=true,avson=true,amcon=true,awcon=true,avaon=true;
	bivre = 0.5,aivre=0.6,bvse=0.5,avse=0.6,bmce=0.5,amce=0.6,bwce=0.5,awce=0.6,bvae=0.5,avae=0.6;
	voicevolume=5000000,webvolume=5000000;
	bvoicpi=4,avoicpi=2, bivrcpi =0.15,aivrcpi=0.25,bvscpi=0.10,avscpi=0.20,bmccpi=2.3,amccpi=3.3,bwccpi=2.3,awccpi=3.3,bvacpi=.35,avacpi=.45;
	bvoinps=0,avoinps=0, bivrnps = 0,aivrnps=0,bvsnps=0,avsnps=0,bmcnps=0,amcnps=0,bwcnps=0,awcnps=0,bvanps=0,avanps=0;
	bvoiaht=0,avoiaht=0, bivraht = 0,aivraht=0,bvsaht=0,avsaht=0,bmcaht=0,amcaht=0,bwcaht=0,awcaht=0,bvaaht=0,avaaht=0;
	lvs=0.5,dvs=0.5;

	bvoivol=0,bivrvol=0,bvsvol=0,bmcvol=0,bwcvol=0,bvavol=0;
	avoivol=0,aivrvol=0,avsvol=0,amcvol=0,awcvol=0,avavol=0;

		document.getElementById('bvoicb').checked = bvoion;
		document.getElementById('avoicb').checked = avoion;
		document.getElementById('bivrcb').checked = bivron;
		document.getElementById('aivrcb').checked = aivron;
		document.getElementById('bvscb').checked = bvson;
		document.getElementById('avscb').checked = avson;
		document.getElementById('bmccb').checked = bmcon;
		document.getElementById('amccb').checked = amcon;
		document.getElementById('bwccb').checked = bwcon;
		document.getElementById('awccb').checked = awcon;
		document.getElementById('bvacb').checked = bvaon;
		document.getElementById('avacb').checked = avaon;

	//getting volumes
	//$("#tealslider").slider("option","value")=voicevolume;
	//$("#purpleslider").slider("option","value")=webvolume;

	//getting effectivenesses
		document.getElementById('bivreff').value = bivre*100;
		document.getElementById('aivreff').value = aivre*100;
		document.getElementById('bvseff').value = bvse*100;
		document.getElementById('avseff').value = avse*100;
		document.getElementById('bmceff').value = bmce*100;
		document.getElementById('amceff').value = amce*100;
		document.getElementById('bwceff').value = bwce*100;
		document.getElementById('awceff').value = awce*100;
		document.getElementById('bvaeff').value = bvae*100;
		document.getElementById('avaeff').value = avae*100;

		document.getElementById('bvoicpi').value=bvoicpi;
		document.getElementById('avoicpi').value=avoicpi; 
		document.getElementById('bivrcpi').value=bivrcpi;
		document.getElementById('aivrcpi').value=aivrcpi;
		document.getElementById('bvscpi').value=bvscpi;
		document.getElementById('avscpi').value=avscpi;
		document.getElementById('bmccpi').value=bmccpi;
		document.getElementById('amccpi').value=amccpi;
		document.getElementById('bwccpi').value=bwccpi;
		document.getElementById('awccpi').value=awccpi;
		document.getElementById('bvacpi').value=bvacpi;
		document.getElementById('avacpi').value=avacpi;

		document.getElementById('247vvv').value=5;
		document.getElementById('247wvv').value=5;
}
function scenario1(){
	bvoion=true,bivron=false,bvson=false,bmcon=false,bwcon=false,bvaon=false;
	avoion=true,aivron=false,avson=true,amcon=false,awcon=false,avaon=false;
	bivre = 0.0,aivre=0.0,bvse=0.0,avse=0.2,bmce=0.0,amce=0.0,bwce=0.0,awce=0.0,bvae=0.0,avae=0.0;
	voicevolume=1250000,webvolume=0;
	bvoicpi=11.60,avoicpi=11.60, bivrcpi =0.0,aivrcpi=0.0,bvscpi=0.0,avscpi=2.5,bmccpi=0.0,amccpi=0.0,bwccpi=0.0,awccpi=0.0,bvacpi=0.0,avacpi=0.0;
	bvoinps=0,avoinps=0, bivrnps = 0,aivrnps=0,bvsnps=0,avsnps=0,bmcnps=0,amcnps=0,bwcnps=0,awcnps=0,bvanps=0,avanps=0;
	bvoiaht=0,avoiaht=0, bivraht = 0,aivraht=0,bvsaht=0,avsaht=0,bmcaht=0,amcaht=0,bwcaht=0,awcaht=0,bvaaht=0,avaaht=0;
	lvs=0.5,dvs=0.5;

	bvoivol=0,bivrvol=0,bvsvol=0,bmcvol=0,bwcvol=0,bvavol=0;
	avoivol=0,aivrvol=0,avsvol=0,amcvol=0,awcvol=0,avavol=0;

		document.getElementById('bvoicb').checked = bvoion;
		document.getElementById('avoicb').checked = avoion;
		document.getElementById('bivrcb').checked = bivron;
		document.getElementById('aivrcb').checked = aivron;
		document.getElementById('bvscb').checked = bvson;
		document.getElementById('avscb').checked = avson;
		document.getElementById('bmccb').checked = bmcon;
		document.getElementById('amccb').checked = amcon;
		document.getElementById('bwccb').checked = bwcon;
		document.getElementById('awccb').checked = awcon;
		document.getElementById('bvacb').checked = bvaon;
		document.getElementById('avacb').checked = avaon;

	//getting volumes
	//$("#tealslider").slider("option","value")=voicevolume;
	//$("#purpleslider").slider("option","value")=webvolume;

	//getting effectivenesses
		document.getElementById('bivreff').value = bivre*100;
		document.getElementById('aivreff').value = aivre*100;
		document.getElementById('bvseff').value = bvse*100;
		document.getElementById('avseff').value = avse*100;
		document.getElementById('bmceff').value = bmce*100;
		document.getElementById('amceff').value = amce*100;
		document.getElementById('bwceff').value = bwce*100;
		document.getElementById('awceff').value = awce*100;
		document.getElementById('bvaeff').value = bvae*100;
		document.getElementById('avaeff').value = avae*100;

		document.getElementById('bvoicpi').value=bvoicpi;
		document.getElementById('avoicpi').value=avoicpi; 
		document.getElementById('bivrcpi').value=bivrcpi;
		document.getElementById('aivrcpi').value=aivrcpi;
		document.getElementById('bvscpi').value=bvscpi;
		document.getElementById('avscpi').value=avscpi;
		document.getElementById('bmccpi').value=bmccpi;
		document.getElementById('amccpi').value=amccpi;
		document.getElementById('bwccpi').value=bwccpi;
		document.getElementById('awccpi').value=awccpi;
		document.getElementById('bvacpi').value=bvacpi;
		document.getElementById('avacpi').value=avacpi;

		document.getElementById('247vvv').value=voicevolume/1000000;
		document.getElementById('247wvv').value=webvolume/1000000;
}
function scenario2(){
	bvoion=true,bivron=true,bvson=false,bmcon=false,bwcon=true,bvaon=false;
	avoion=true,aivron=true,avson=false,amcon=false,awcon=true,avaon=true;
	bivre = 0.6,aivre=0.6,bvse=0.0,avse=0.2,bmce=0.0,amce=0.0,bwce=0.05,awce=0.05,bvae=0.0,avae=0.1;
	voicevolume=24000000,webvolume=15000000;
	bvoicpi=9.60,avoicpi=9.60, bivrcpi =1.0,aivrcpi=1.0,bvscpi=0.0,avscpi=2.5,bmccpi=0.0,amccpi=0.0,bwccpi=4.0,awccpi=4.0,bvacpi=0.0,avacpi=3.0;
	bvoinps=0,avoinps=0, bivrnps = 0,aivrnps=0,bvsnps=0,avsnps=0,bmcnps=0,amcnps=0,bwcnps=0,awcnps=0,bvanps=0,avanps=0;
	bvoiaht=0,avoiaht=0, bivraht = 0,aivraht=0,bvsaht=0,avsaht=0,bmcaht=0,amcaht=0,bwcaht=0,awcaht=0,bvaaht=0,avaaht=0;
	lvs=0.4,dvs=0.5;

	bvoivol=0,bivrvol=0,bvsvol=0,bmcvol=0,bwcvol=0,bvavol=0;
	avoivol=0,aivrvol=0,avsvol=0,amcvol=0,awcvol=0,avavol=0;

		document.getElementById('bvoicb').checked = bvoion;
		document.getElementById('avoicb').checked = avoion;
		document.getElementById('bivrcb').checked = bivron;
		document.getElementById('aivrcb').checked = aivron;
		document.getElementById('bvscb').checked = bvson;
		document.getElementById('avscb').checked = avson;
		document.getElementById('bmccb').checked = bmcon;
		document.getElementById('amccb').checked = amcon;
		document.getElementById('bwccb').checked = bwcon;
		document.getElementById('awccb').checked = awcon;
		document.getElementById('bvacb').checked = bvaon;
		document.getElementById('avacb').checked = avaon;

	//getting volumes
	//$("#tealslider").slider("option","value")=voicevolume;
	//$("#purpleslider").slider("option","value")=webvolume;

	//getting effectivenesses
		document.getElementById('bivreff').value = bivre*100;
		document.getElementById('aivreff').value = aivre*100;
		document.getElementById('bvseff').value = bvse*100;
		document.getElementById('avseff').value = avse*100;
		document.getElementById('bmceff').value = bmce*100;
		document.getElementById('amceff').value = amce*100;
		document.getElementById('bwceff').value = bwce*100;
		document.getElementById('awceff').value = awce*100;
		document.getElementById('bvaeff').value = bvae*100;
		document.getElementById('avaeff').value = avae*100;

		document.getElementById('bvoicpi').value=bvoicpi;
		document.getElementById('avoicpi').value=avoicpi; 
		document.getElementById('bivrcpi').value=bivrcpi;
		document.getElementById('aivrcpi').value=aivrcpi;
		document.getElementById('bvscpi').value=bvscpi;
		document.getElementById('avscpi').value=avscpi;
		document.getElementById('bmccpi').value=bmccpi;
		document.getElementById('amccpi').value=amccpi;
		document.getElementById('bwccpi').value=bwccpi;
		document.getElementById('awccpi').value=awccpi;
		document.getElementById('bvacpi').value=bvacpi;
		document.getElementById('avacpi').value=avacpi;

		document.getElementById('247vvv').value=voicevolume/1000000;
		document.getElementById('247wvv').value=webvolume/1000000;
}
/****************************/
/***********Charts***********/
/****************************/
function updatecharts(){
	// Make monochrome colors and set them as default for all pies
    Highcharts.getOptions().plotOptions.pie.colors = (function () {
        var colors = [],
            base = '#ef8822',
            i;

        for (i = 0; i < 10; i += 1) {
            // Start out with a darkened base color (negative brighten), and end
            // up with a much brighter color
            colors.push(Highcharts.Color(base).brighten((i - 3) / 20).get());
        }
        return colors;
    }());

	$(function () {
	    $('#pie1').highcharts({
	        chart: {
	            plotBackgroundColor: null,
	            plotBorderWidth: null,
	            plotShadow: false,
	            type: 'pie',
	            width: 380,
	            height:280
	        },
	        title: {
	            text: 'Before'
	        },
	        tooltip: {
	            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	        },
	        plotOptions: {
	            pie: {
	                allowPointSelect: true,
	                cursor: 'pointer',
	                dataLabels: {
	                    enabled: false,
	                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
	                    style: {
	                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
	                    }
	                },
	                showInLegend: true
	            }
	        },
	        legend: {
	        	enabled: false
	        },
	        credits: {
	            enabled: false
	        },
	        series: [{
	            colorByPoint: true,
	            data: [{
	                name: "Voice Agents",
	                y: bvoicost
	            }, {
	                name: "IVR",
	                y: bivrcost
	            }, {
	                name: "Vivid Speech",
	                y: bvscost
	            }, {
	                name: "Mobie Chat",
	                y: bmccost
	            }, {
	                name: "Web Chats",
	                y: bwccost
	            }, {
	                name: "Virtual Assistant",
	                y: bvacost
	            }]
	        }]
	    });
	});
	$(function () {
	    $('#pie2').highcharts({
	        chart: {
	            plotBackgroundColor: null,
	            plotBorderWidth: null,
	            plotShadow: false,
	            type: 'pie',
	            width: 580,
	            height:280
	        },
	        title: {
	            text: 'After'
	        },
	        tooltip: {
	            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	        },
	        plotOptions: {
	            pie: {
	                allowPointSelect: true,
	                cursor: 'pointer',
	                dataLabels: {
	                    enabled: false,
	                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
	                    style: {
	                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
	                    }
	                },
	                    showInLegend: true
	            }
	        },
	        legend: {
	        	align:'right',
	        	floating:'true',
	        	width:150,

	        	
	        },
	        credits: {
	            enabled: false
	        },
	        series: [{
	            colorByPoint: true,
	            data: [{
	                name: "Voice Agents",
	                y: avoicost
	            }, {
	                name: "IVR",
	                y: aivrcost
	            }, {
	                name: "Vivid Speech",
	                y: avscost
	            }, {
	                name: "Mobie Chat",
	                y: amccost
	            }, {
	                name: "Web Chats",
	                y: awccost
	            }, {
	                name: "Virtual Assistant",
	                y: avacost
	            }, {
	            	name: "Savings",
	            	y:totalsavings,
	            	color:'transparent'
	            }]
	        }]
	    });
	 });
	$(function () {
	    $('#costchart').highcharts({
	        chart: {
	            style:{
	            	fontFamily:'Arial'
	            },
	            width: 920,
	            height:305
	        },
	        title: {
	            text: ''
	        },
	        xAxis: {
	            categories: ['Voice Agents', 'IVR', 'Vivid Speech', 'Mobile Chat', 'Web Chat','Virtual Assistant'],
	            title: {
	                text: null
	            }
	        },
	        yAxis: {
	        	min: 0,
	            title: {
	            	text: ''
	            },
	            
	            labels: {
	                overflow: 'justify'
	            }
	        },
	        tooltip: {
	            valuePrefix: ' $'
	        },
	        plotOptions: {
	            bar: {
	                dataLabels: {
	                    enabled: true
	                }
	            }
	        },
	        legend: {
	            layout: 'vertical',
	            align: 'right',
	            verticalAlign: 'top',
	            x: 0,
	            y: 0,
	            floating: true,
	            borderWidth: 1,
	            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
	            shadow: false
	        },
	        labels: {
	        	items:{
	        	style: {
	        		width:200
	        	}}
	        },
	        credits: {
	            enabled: false
	        },
	        series: [{
	        	type: 'column',
	            name: 'Before',
	            data: [bvoicost, bivrcost, bvscost, bmccost, bwccost,bvacost],
	            color: '#aaaaaa'
	        }, {
	        	type: 'column',
	            name: 'After',
	            data: [avoicost, aivrcost, avscost, amccost, awccost,avacost],
	            color: '#ef8822'
	        }]
	    });
	});	
	$(function () {
	    $('#volumechart').highcharts({
	        chart: {
	            style:{
	            	fontFamily:'Arial',
	            	fontSize:'99px'
	            },
	            width: 920,
	            height:250
	        },
	        title: {
	            text: ''
	        },
	        xAxis: {
	            categories: ['Voice Agents', 'IVR', 'Vivid Speech', 'Mobile Chat', 'Web Chat','Virtual Assistant'],
	            title: {
	                text: null
	            }
	            
	        },
	        yAxis: {
	            min: 0,
	            title: {
	                text: ''
	            },
	            labels: {
	                overflow: 'justify'
	     		}
	    	},
	        tooltip: {
	            valueSuffix: ' Interactions'
	        },
	        plotOptions: {
	            bar: {
	                dataLabels: {
	                    enabled: false
	                }
	            }
	        },
	        legend: {
	            layout: 'vertical',
	            align: 'right',
	            verticalAlign: 'top',
	            x: 0,
	            y: 0,
	            floating: true,
	            borderWidth: 1,
	            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
	            shadow:false
	        },
	        labels: {
	        	items:{
	        	style: {
	        		width:200
	        	}}
	        },
	        credits: {
	            enabled: false
	        },
	        series: [{
	        	type: 'column',
	        	name: 'Before',
	        	data: [bvoivol, bivrvol, bvsvol, bmcvol, bwcvol,bvavol],
	            color: '#aaaaaa'
	        },{
	        	type: 'column',
	        	name: 'After',
	        	data: [avoivol, aivrvol, avsvol, amcvol, awcvol,avavol],
	            color: '#ef8822'
	        }]
	    });
	});
	$(function () {
	    $('#stackedcost').highcharts({
	        chart: {
	            style:{
	            	fontFamily:'Arial',
	            	fontSize:'99px',
	            },
	            width: 840,
	            height:275,
	            type: 'bar'
	        },
	        title: {
	            text: ''
	        },
	        xAxis: {
	            categories: ['Before','After'],
	            title: {
	                text: null
	            }
	            
	        },
	        yAxis: {
	            min: 0,
	            title: {
	                text: ''
	            },
	            labels: {
	                overflow: 'justify'
	     		},
	     		reversedStacks:false
	    	},
	        tooltip: {
	            valuePrefix: '$'
	        },
	        legend: {
	        	reversed: false,
	        	// layout: 'vertical',
	         //    align: 'right',
	         //    verticalAlign: 'bottom',
	         //    x: 50,
	         //    y: 0,
	         //    floating: true,
	         //    borderWidth: 1,
	         //    backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
	         //    shadow:false,
	        	enabled: true
	        },
	        plotOptions: {
	            series: {
	            	stacking:'normal'
	            }
	        },
	        credits: {
	            enabled: false
	        },
	        series: [{
	        	name:'Voice Agents',
	        	data: [bvoicost,avoicost],
	        	color: '#049094',
	        	visible: (bvoion | avoion)
	        },
	        {
	        	name: 'IVR',
	        	data: [bivrcost,aivrcost],
	        	color: '#f5b77a',
	        	visible: (bivron | aivron)
	        },
	        {
	        	name: 'Vivid Speech',
	        	data: [bvscost,avscost],
	        	color: '#f29f4e',
	        	visible: (bvson | avson)
	        },
	        {
	        	name: 'Virtual Assistant',
	        	data: [bvacost,avacost],
	        	color: '#ef8822',
	        	visible: (bvaon | avaon)
	        },
	        {
	        	name: 'Mobile Chat',
	        	data: [bmccost,amccost],
	        	color: '#a74e8c',
	        	visible: (bmcon | amcon)
	        },
	        {
	        	name: 'Web Chat',
	        	data: [bwccost,awccost],
	        	color: '#912370',
	        	visible: (bwcon | awcon)
	        }]
	    });
	});
$(function () {
	    $('#stackedvol').highcharts({
	        chart: {
	            style:{
	            	fontFamily:'Arial',
	            	fontSize:'99px'
	            },
	            width: 840,
	            height:275,
	            type: 'bar'
	        },
	        title: {
	            text: ''
	        },
	        xAxis: {
	            categories: ['Before','After'],
	            title: {
	                text: null
	            },
	            labels:{
	            	useHTML:true
	            }
	        },
	        yAxis: {
	            min: 0,
	            title: {
	                text: ''
	            },
	            labels: {
	                overflow: 'justify'
	     		},
	     		reversedStacks: false
	    	},
	        tooltip: {
	            valueSuffix: ' Interactions'
	        },
	        legend: {
	        	reversed: false,
	        	layout: 'vertical',
	            align: 'right',
	            verticalAlign: 'top',
	            x: 0,
	            y: 0,
	            floating: true,
	            borderWidth: 1,
	            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
	            shadow:false,
	            enabled:false
	        },
	        plotOptions: {
	            series: {
	            	stacking:'normal'
	            },
	            bar: {
	            	stacking: 'percent'
	            }
	        },
	        credits: {
	            enabled: false
	        },
	        series: [{
	        	name:'Voice Agents',
	        	data: [bvoivol,avoivol],
	        	color: '#049094',
	        	visible: (bvoion | avoion)
	        },
	        {
	        	name: 'IVR',
	        	data: [bivrvol,aivrvol],
	        	color: '#f5b77a',
	        	visible: (bivron | aivron)
	        },
	        {
	        	name: 'Vivid Speech',
	        	data: [bvsvol,avsvol],
	        	color: '#f29f4e',
	        	visible: (bvson | avson)
	        },
	        {
	        	name: 'Virtual Assistant',
	        	data: [bvavol,avavol],
	        	color: '#ef8822',
	        	visible: (bvaon | avaon)
	        },
	        {
	        	name: 'Mobile Chat',
	        	data: [bmcvol,amcvol],
	        	color: '#a74e8c',
	        	visible: (bmcon | amcon)
	        },
	        {
	        	name: 'Web Chat',
	        	data: [bwcvol,awcvol],
	        	color: '#912370',
	        	visible: (bwcon | awcon)
	        }]
	    });
	});

}
/****************************/
/***********Misc*************/
/****************************/
	function onslide(){
		//setTimeout(function(){document.getElementById('247vvv').value = Number($("#tealslider").slider("option","value"));
		//document.getElementById('247wvv').value = Number($("#purpleslider").slider("option","value"));},100);
	}
	function oninput(){
		//$("#purpleslider").slider("value",document.getElementById('247wvv').value);
		//$("#tealslider").slider("value",document.getElementById('247vvv').value);
	}
	function showmain(){
		$("#tohide2").show();
		$("#splash").hide();

	}
	function newslide(){
		console.log("newslide change");
		setTimeout(function(){lvs =Number($("#tealslider").slider("option","value"));
		dvs=Number($("#purpleslider").slider("option","value"));
		document.getElementById("showpercentteal").innerHTML = lvs+"% mobile";
		document.getElementById("showpercentpurple").innerHTML = dvs+"% mobile";
		lvs=lvs/100;dvs=dvs/100;},10);
	}
	$(".scrollportion2").scroll(function() {
		console.log("fdsf");
    if ($(this).scrollTop() == 0) {
        $('#scrollportion').css({
                'box-shadow': 'none',
                '-moz-box-shadow' : 'none',
                '-webkit-box-shadow' : 'none' });
    }
    else {
        $('#scrollportion').css({
                'box-shadow': 'inset 0px 10px 10px #888',
                '-moz-box-shadow' : 'inset 0px 10px 10px #888',
                '-webkit-box-shadow' : 'inset 0px 10px 10px #888' });
    }
});






