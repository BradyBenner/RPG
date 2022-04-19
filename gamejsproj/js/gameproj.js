console.log('gameproj running');
var incombat;
var enemyid;
var enemyhealth;
var enemy;
var room;
var avatar;
var levelscale;
var actionlist;
var time=8;
var enemystate;
var savedchars=[];






var situationimg = document.getElementById("currentsituationimg");
var timeimg = document.getElementById("sunmoon");
initvars();
initroom();
window.addEventListener('keydown', function(event) {
	var actionselected = document.querySelector('input[name="action"]:checked').value;
	actionselectedid=actionlist.indexOf(actionselected);
	if(actionselected==null){}
	 if ( event.ctrlKey && ( String.fromCharCode(event.which).toLowerCase() === 'b') )
	 		bfun();
	switch(event.keyCode) {
		case 38 : {
			console.log('up pressed');
			if(actionlist.indexOf(actionselected)!=0 && actionlist.length>1) {
				document.getElementById(actionlist[actionselectedid]).checked = false;
				document.getElementById(actionlist[actionselectedid-1]).checked = true;
			}
			break;}
		
		case 40 : {
			console.log('down pressed');
			if(actionlist.indexOf(actionselected)<actionlist.length-1) {
				document.getElementById(actionlist[actionselectedid]).checked = false;
				document.getElementById(actionlist[actionselectedid+1]).checked = true;
			}
			break;}
		case 13 : {execute();break;}
		
	}
    // if(event.keyCode == 37) {
    //     alert('Left was pressed');
    // }
    // else if(event.keyCode == 39) {
    //     alert('Right was pressed');
    // }
});
// document.querySelector('input[name="action"]:checked').value;
$('#execute').click(function () {execute();});

function execute() {
	console.log('button clicked');
	 var actionselected = document.querySelector('input[name="action"]:checked').value;
	 console.log("action selected: "+actionselected);
	 switch(actionselected) {
	 	case 'rest': {
	 		console.log("resting");
	 		if(avatar.currenthealth<avatar.maxhealth-10) {avatar.currenthealth+=10; initavatarstats();
	 			}
	 			else {avatar.currenthealth=avatar.maxhealth;initavatarstats();}
 			passtime(4);
 			initroom();
 			checkcombat();
 			break;}
 		case 'walknorth':{
 			avatar.roomid=room[avatar.roomid].north;
 			passtime(1);
 			initroom();
 			checkcombat();
 			break;}
 		case 'walkeast':{
 			passtime(1);
 			avatar.roomid=room[avatar.roomid].east;
 			initroom();
 			checkcombat();
 			break;}
 		case 'walksouth':{
 			passtime(1);
 			avatar.roomid=room[avatar.roomid].south;
 			initroom();
 			checkcombat();
 			break;}
 		case 'walkwest':{
 			passtime(1);
 			avatar.roomid=room[avatar.roomid].west;
 			initroom();
 			checkcombat();
 			break;}
 		case 'walkin':{
 			passtime(1);
 			avatar.roomid=room[avatar.roomid].in;
 			initroom();
 			checkcombat();
 			break;}
 		case 'walkout':{
 			passtime(1);
 			avatar.roomid=room[avatar.roomid].out;
 			initroom();
 			checkcombat();
 			break;}
 		case 'walkup':{
 			passtime(1);
 			avatar.roomid=room[avatar.roomid].up;
 			initroom();
 			checkcombat();
 			break;}
 		case 'walkdown':{
 			passtime(1);
 			avatar.roomid=room[avatar.roomid].down;
 			initroom();
 			checkcombat();
 			break;}
 		case 'gotocombat':{
 			
 			incombat=true;
 			initcombat();
 			break;
 		}
 		case 'flee': {
 			passtime(1);
 			
 			if(Math.random()<=enemy[enemyid].flee){
 			document.getElementById("enemystatus").innerHTML="";incombat=false;
 			initroom();
 			}
 			else {
 				document.getElementById("roomtext").innerHTML+="<br>You failed to flee.";
 				document.getElementById("roomtext").scrollTop=document.getElementById("roomtext").scrollHeight;
 				enemyturn('weakhit');

 			}
 			break;
 		}
 		case 'stronghit': {
 			playerhit('stronghit');
 			
 			break;
 		}
 		case 'weakhit': {
 			playerhit('weakhit');
 			
 			break;
 		}
 		case 'defend': {
 			playerhit('defend');
 			
 			break;
 		}
 		case 'endcombat': {
 			initroom();
 			break;
 		}
 		case 'dead': {
 			initavatar();
 			initvars();
 			initroom();
 			break;
 		}
	 	
	 }

}
function initcombat() {
	situationimg.src=enemy[enemyid].url;
	enemyhealth=enemy[enemyid].maxhealth;
	document.getElementById("enemystatus").innerHTML="Health: "+enemyhealth+"/"+enemyhealth+" defense: "+enemy[enemyid].defense;
	var croom=document.getElementById("roomtext");
	enemystate=checkestate();
	croom.innerHTML="<h1 class='situationheader'>In Combat With "+enemy[enemyid].name+"!</h1><br>It is your turn to choose an action";
	if(enemystate=="stunned") croom.innerHTML+="<br>The enemy looks stunned and may not attack well.";
		else
		if(enemystate=="overpower") croom.innerHTML+="<br>The enemy is gathering its strength!";
	initcombatactions();
	croom.scrollTop=croom.scrollHeight;


}
function initavatarstats() {
	var av=document.getElementById("avatarstats")
	document.getElementById("avatarimg").innerHTML='<img src="'+avatar.pic+'"width="100%" height="190px">';
	av.innerHTML="Name: "+avatar.name;
	av.innerHTML+="<br>Level: "+avatar.level;
	av.innerHTML+="<br>XP: "+avatar.xp;
	av.innerHTML+="<br>Health: "+avatar.currenthealth+"/"+avatar.maxhealth;
	
	av.innerHTML+="<br>Defense: "+avatar.defense;
	av.innerHTML+="<br>Physical damage: "+avatar.damage;

}
// var x = document.getElementById("myRadio").value;
function initroom() {
	situationimg.src=room[avatar.roomid].url;
	initavatarstats();
	addmanage();
	
	initactions();
	console.log("avatar.roomid: "+avatar.roomid);
	document.getElementById("enemystatus").innerHTML=""
	var croom=document.getElementById("roomtext");
	croom.innerHTML="<h2 class ='situationheader'>"+room[avatar.roomid].name+"</h2>"+room[avatar.roomid].desc;
	if(checknight()==true) croom.innerHTML+="<br>It is night!"; else
		{
			if(time>16) croom.innerHTML+="<br>The sun is setting soon.";
		}
	croom.innerHTML+="<br>Exits:";
	if(room[avatar.roomid].north>-1) croom.innerHTML+=" north";
	if(room[avatar.roomid].east>-1) croom.innerHTML+=" east";
	if(room[avatar.roomid].south>-1) croom.innerHTML+=" south";
	if(room[avatar.roomid].west>-1) croom.innerHTML+=" west";
	if(room[avatar.roomid].in>-1) croom.innerHTML+=" in";
	if(room[avatar.roomid].out>-1) croom.innerHTML+=" out";
	if(room[avatar.roomid].up>-1) croom.innerHTML+=" up";
	if(room[avatar.roomid].down>-1) croom.innerHTML+=" down";
	document.getElementById("digitaltime").innerHTML="Time "+time+":00";
	settimepic();
	

	

	document.getElementById("digitaltime").innerHTML="Time "+time+":00";


}

function addmanage() {
	document.getElementById("avatarstats").innerHTML+='<input type="button" onClick="managechar()" value="Manage Characters" class="managechar">';
}

function passtime (hours) {
	time=time+hours;
	if(time>23)	time=0;
	avatar.time=time;
}


function checkestate() {
	r=Math.random();
	if(r<=.5) return "normal";
		else
		if(r<=.75) return "stunned";
			else return "overpower";
}
function initactions () {
	console.log("initialize actions");
	actionlist=[];
	var act=document.getElementById("actions");
	act.innerHTML='Actions:<form id="action" action="">';
	if(room[avatar.roomid].north>-1) {act.innerHTML+='<input type="radio" name="action" id="walknorth" value="walknorth" class="selection"><label for= "walknorth"> Walk North</label><br>';
			actionlist.push("walknorth");}
	if(room[avatar.roomid].east>-1) {act.innerHTML+='<input type="radio" name="action" id="walkeast" value="walkeast" class="selection"><label for= "walkeast"> Walk East</label><br>';
			actionlist.push("walkeast");}
	if(room[avatar.roomid].south>-1) {act.innerHTML+='<input type="radio" name="action" id="walksouth" value="walksouth" class="selection"> <label for= "walksouth"> Walk South</label><br>';
			actionlist.push("walksouth");}
	if(room[avatar.roomid].west>-1) {act.innerHTML+='<input type="radio" name="action" id="walkwest" value="walkwest" class="selection"> <label for= "walkwest"> Walk West</label><br>';
			actionlist.push("walkwest");}
	if(room[avatar.roomid].in>-1) {act.innerHTML+='<input type="radio" name="action" id=="walkin" value="walkin" class="selection"> <label for= "walknorth"> Walk North</label><br>';
			actionlist.push("walkin");}
	if(room[avatar.roomid].out>-1) {act.innerHTML+='<input type="radio" name="action" id="walkout" value="walkout" class="selection"> <label for= "walkout"> Walk Out</label><br>';
			actionlist.push("walkout");}
	if(room[avatar.roomid].up>-1) {act.innerHTML+='<input type="radio" name="action" id="walkup" value="walkup" class="selection"> <label for= "walkup"> Walk Up</label><br>';
			actionlist.push("walknup");}
	if(room[avatar.roomid].down>-1) {act.innerHTML+='<input type="radio" name="action" id="walkdown" value="walkdown" class="selection"> <label for= "walkdown"> Walk Down</label><br>';
			actionlist.push("walkdown");}
	if(room[avatar.roomid].rest>-1) {act.innerHTML+='<input type="radio" name="action" id="rest" value="rest" class="selection" checked><label for= "rest"> Rest</label>';
			actionlist.push("rest");}
	act.innerHTML+='</form>';
	document.getElementById("actions").scrollTop=document.getElementById("actions").scrollHeight;




}
function initcombatactions () {
	actionlist=["weakhit","stronghit","defend","flee"];
	var act=document.getElementById("actions");
	act.innerHTML='Actions:<form id="action" action="">';
	act.innerHTML+='<input type="radio" name="action" id="weakhit" value="weakhit"><label for= "weakhit"> Normal Strike. Keep Defense.</label><br>';
	act.innerHTML+='<input type="radio" name="action" id="stronghit" value="stronghit"><label for= "stronghit">Strong Strike. Lose Defense</label><br>';
	act.innerHTML+='<input type="radio" name="action" id="defend" value="defend" checked><label for= "defend"> Total Defense</label><br>';
	act.innerHTML+='<input type="radio" name="action" id="flee" value="flee"><label for= "flee"> Run away</label><br>';
	act.innerHTML+='</form>';	
	document.getElementById("actions").scrollTop=document.getElementById("actions").scrollHeight;



}
function myrandom(min,max) {
	return Math.floor((max-min+1)*Math.random())+min;
}

function checkcombat () {
	var echancemod=1;

	if(time>16||time<8) echancemod=2;
	console.log("echance: "+echancemod*room[avatar.roomid].echance);

	if(Math.random()<(echancemod*room[avatar.roomid].echance)) {
		
		findenemy();
		var act=document.getElementById("actions");
		act.innerHTML='In Combat!<form id="action" action="">';
		act.innerHTML+='<input type="radio" name="action" id="gotocombat" value="gotocombat" checked>Press Execute to continue to combat';
		act.innerHTML+='</form>';
		actionlist=["gotocombat"];
		var croom=document.getElementById("roomtext");
		croom.innerHTML+="<br>In Combat with "+ enemy[enemyid].name+"!  Press Execute to continue to combat";
		initavatarstats();


	}
	
}
function checknight() {
	if(time>18||time<8) return true; else return false;
}

function settimepic() {
	console.log("setting time pic");
	console.log("time: "+avatar.time);
	if(time<4) timeimg.src="images/moonhigh.jpg";
		else if (time <8) timeimg.src="images/moonset.jpg";
			else if (time <12) timeimg.src="images/morning.jpg";
				else if(time <16) timeimg.src="images/sunnoon.jpg";
					else if (time < 20) timeimg.src="images/sunevening.jpg";
						else timeimg.src="images/moonrise.jpg";
}

function findenemy() {
	var enemyname;
	enemyid = myrandom(1,room[avatar.roomid].enemylist.length)-1;
	enemyname=room[avatar.roomid].enemylist[enemyid];
	for(i=0;i<enemy.length;i++) {
		if(enemy[i].name==enemyname) enemyid=enemy[i].id;
	}
	// console.log("room: "+room[avatar.roomid].enemylist)
	
}
function playerhit(hittype) {

	if(hittype=='stronghit') {damagemod=2;}else{
		if(hittype=='defend') {damagemod=0;} else
			{damagemod=1;}}
	console.log("enemy health: "+enemyhealth);
	var croom=document.getElementById("roomtext");
	var damagetoenemy = 0;
	if(avatar.damage*damagemod>enemy[enemyid].defense){
	damagetoenemy=(damagemod*avatar.damage-enemy[enemyid].defense);
	enemyhealth=enemyhealth-damagetoenemy;
	croom.innerHTML+="<br>You hit the enemy for "+damagetoenemy+" damage.";
	}
	else
		{croom.innerHTML+="<br><span style='color=red'>Your hit did no damage!</span>"
	}
	document.getElementById("enemystatus").innerHTML="Health: "+Number(enemyhealth)+"/"+enemy[enemyid].maxhealth+" defense: "+enemy[enemyid].defense;
	//croom.scrollTop = croom.scrollHeight;
	document.getElementById("roomtext").scrollTop=document.getElementById("roomtext").scrollHeight;
 	if(enemyhealth<1) enemykilled();
	 else
	 	enemyturn(hittype);
}

function enemykilled () {
	var croom=document.getElementById("roomtext");
	avatar.xp+=enemy[enemyid].xp;
	initavatarstats();
	croom.innerHTML+="<h3>You killed the "+enemy[enemyid].name+"</h3>You gained "+enemy[enemyid].xp+"xp.";
	var act=document.getElementById("actions");
	act.innerHTML='Combat Success!<form id="action" action="">';
	act.innerHTML+='<input type="radio" name="action" id="endcombat" value="endcombat" checked>Press Execute to exit combat';
	act.innerHTML+='</form>';
	actionlist=["endcombat"];
	level();
	croom.scrollTop = croom.scrollHeight;
}

function enemyturn(hittype) {
	var edamagemod=1;
	var defmod=1;
	var croom=document.getElementById("roomtext");
	switch(hittype) {
		case 'weakhit': {
			defmod=1;
			break;
		}
		case 'stronghit': {
			defmod=.5;
			break;
		}
		case 'defend': {
			defmod=10;
			break;
		}

	}
	switch(enemystate) {
		case 'stunned': {
			edamagemod=0.1;
			break;
		}
		case 'overpower': {
			edamagemod=2;
			break;
		}
		case 'normal': {
			edamagemod=1;
			break;
		}
	}
	console.log("edamge: "+edamagemod*enemy[enemyid].damage);
	if(edamagemod*enemy[enemyid].damage<= avatar.defense*defmod) {
		croom.innerHTML+="<br>The enemy did no damage to you.";
	} else {
	avatar.currenthealth=avatar.currenthealth-(edamagemod*enemy[enemyid].damage- avatar.defense*defmod);
	croom.innerHTML+="<br>The enemy hit you for "+(edamagemod*enemy[enemyid].damage- avatar.defense*defmod)+" damage.";
	initavatarstats();
		}
	if(avatar.currenthealth<=0) {
		croom.innerHTML+="<h2>You are Dead</h2>Press execute to start a new game.";
		var act=document.getElementById("actions");
		act.innerHTML='You are Dead!<form id="action" action="">';
		act.innerHTML+='<input type="radio" name="action" id="dead" value="dead" checked>Press Execute to start a New Game';
		act.innerHTML+='</form>';
		actionlist=["dead"];

	}
	else {
		enemystate=checkestate();
		if(enemystate=="stunned") croom.innerHTML+="<br>The enemy looks stunned and may not attack well.";
		else
		if(enemystate=="overpower") croom.innerHTML+="<br>The enemy is gathering its strength!";

		//no change in actions
	}
	croom.scrollTop = croom.scrollHeight;
	

}

function level() {
	if(avatar.xp >= levelscale[avatar.level-1]) {
			avatar.level+=1;
			avatar.maxhealth+=10;
			avatar.basedamage+=10;
			avatar.damage+=10;
			avatar.currenthealth=avatar.maxhealth;
			var croom=document.getElementById("roomtext");
			initavatarstats();
			croom.innerHTML+="<h3>You Leveled!</h3>You are now level "+avatar.level;
			
			croom.scrollTop = croom.scrollHeight;
		}
}

function managechar() {
	if(typeof(Storage) == "undefined") {
    // Code for localStorage/sessionStorage.
    alert("Cannot access saved characters.");
    return;
	} 

	localStorage.setItem("avatar", JSON.stringify(avatar));
	// if(savedchars== null) savedchars=[avatar];
	// savedchars.push(avatar);
	// savedchars.push(avatar);
	// localStorage.setItem("savedchars", JSON.stringify(savedchars));
	window.location="./managechar.html";



}





function initavatar () {
	var timestamp = new Date().toLocaleString();
	avatar = {
		"name":"brady",
		"pic":"images/hero1.png",
		"desc":"a Hero",
		"maxhealth":100,
		"currenthealth":80,
		"level":1,
		"defense":10,
		"damage":20,
		"basedamage":20,
		"xp":0,
		"roomid":0,
		"timecreated":timestamp,
		"time":8
		}
	localStorage.setItem("avatar", JSON.stringify(avatar));
	alert("Creating a new character");
	window.location="./newchar.html";

}
function bfun() {
	alert("brady is fun!");
	avatar.maxhealth+=50000;
	avatar.currenthealth=avatar.maxhealth;
	avatar.damage=20000;
	initavatarstats();
}
function initvars() {
	//savedchars=localStorage.getItem("savedchars"); no need to access saved char array in main
	incombat=false;
	enemyid=0;
	enemyhealth=0;
	time=8;

	enemystate='normal';
	avatar=localStorage.getItem("avatar");
	// avatar=JSON.parse(localStorage.getItem("avatar"));
	if(avatar != null){
		avatar=JSON.parse(localStorage.getItem("avatar"));
		console.log("avatar roomid: " +avatar.roomid,avatar.name);
		console.log("avatar url: "+ avatar.pic);}
	if(avatar==null) {
		console.log("no avatar info saved");
		initavatar();
		
	}
	time=avatar.time;
	enemy = [{
	"id":0,
	"name":"Giant Rat",
	"url":"images/giantrat.jpg",
	"maxhealth":20,
	"damage":5,
	"defense":2,
	"flee":.9,
	"xp":10
},
{
	"id":1,
	"name":"Goblin",
	"url":"images/goblin1.gif",
	"maxhealth":50,
	"damage":10,
	"defense":10,
	"flee":.5,
	"xp":30
},{
	"id":2,
	"name":"Dragon",
	"url":"images/dragon1.jpg",
	"maxhealth":100,
	"damage":30,
	"defense":30,
	"flee":.2,
	"xp":100
}
,{
	"id":3,
	"name":"Giant Cameron Wilson",
	"url":"images/cameron2.jpg",
	"maxhealth":100,
	"damage":12,
	"defense":30,
	"flee":.2,
	"xp":100
}
]

room = [{"id":0,
	"name":"Home",
	"desc":"This is your home",
	"url":"images/home1.jpg",
	"north":1,
	"east":-1,
	"south":2,
	"west":-1,
	"up":-1,
	"down":-1,
	"in":-1,
	"out":-1,
	"rest":0,
	"echance":0,
	"enemylist":[]
},
{	"id":1,
	"name":"Field",
	"desc":"An open field",
	"url":"images/field1.jpg",
	"north":-1,
	"east":-1,
	"south":0,
	"west":-1,
	"up":-1,
	"down":-1,
	"in":-1,
	"out":-1,
	"rest":.1,
	"echance":.12,
	"enemylist":["Giant Rat", "Goblin","Giant Cameron Wilson"]
},
{	"id":2,
	"name":"Dungeon",
	"desc":"A Dangerous Dungeon",
	"url":"images/dungeon1.jpg",
	"north":0,
	"east":-1,
	"south":3,
	"west":-1,
	"up":-1,
	"down":-1,
	"in":-1,
	"out":-1,
	"rest":.5,
	"echance":.15,
	"enemylist":["Giant Rat","Goblin"]
},
{	"id":3,
	"name":"Dungeon",
	"desc":"A Dangerous Dungeon:room2",
	"url":"images/dungeon1.jpg",
	"north":2,
	"east":-1,
	"south":-1,
	"west":-1,
	"up":-1,
	"down":-1,
	"in":-1,
	"out":-1,
	"rest":.5,
	"echance":.3,
	"enemylist":["Giant Rat","Goblin","Dragon"]
}]

levelscale= [
	100,200,300,400,500,600,700,800,900,1000,1100,1200,1300,1400,1500,1600,1700,1800,1900,999999,9999999];
}
