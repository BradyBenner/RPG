console.log("loadchar running");
var saved=null;
var slots=document.getElementById("slotbox");
initload();
var avatar;



// slots.innerHTML="this is the slots box";

function initload() {
	// avatar=localStorage.getItem("avatar");
	// // avatar=JSON.parse(localStorage.getItem("avatar"));
	// if(avatar != null){
	// 	avatar=JSON.parse(localStorage.getItem("avatar"));
	// 	console.log("avatar roomid: " +avatar.roomid,avatar.name);
	// 	console.log("avatar url: "+ avatar.pic);}
	// if(avatar==null) {
	// 	var timestamp = new Date().toLocaleString();
	// 	console.log("no avatar info saved");
	// 	avatar = {
	// 	"name":"brady",
	// 	"pic":"images/hero1.png",
	// 	"desc":"a Hero",
	// 	"maxhealth":100,
	// 	"currenthealth":80,
	// 	"level":1,
	// 	"defense":10,
	// 	"damage":20,
	// 	"basedamage":20,
	// 	"xp":0,
	// 	"roomid":0,
	// 	"timecreated":timestamp
	// 	}
	// }
	
		saved=localStorage.getItem("saved");
		if(saved!=null) {
			console.log("saved not empty");
			saved=JSON.parse(localStorage.getItem("saved"));
			// saved.push({
			// 	"name":"defaultsavename",
			// 	"pic":"images/hero1.png",
			// 	"desc":"a Hero",
			// 	"maxhealth":100,
			// 	"currenthealth":80,
			// 	"level":1,
			// 	"defense":10,
			// 	"damage":20,
			// 	"basedamage":20,
			// 	"xp":0,
			// 	"roomid":0
			// 	});
			}
		else {
			console.log("saved empty");
			saved=[];
			// saved.push({
			// "name":"brady",
			// "pic":"images/hero1.png",
			// "desc":"a Hero",
			// "maxhealth":100,
			// "currenthealth":80,
			// "level":1,
			// "defense":10,
			// "damage":20,
			// "basedamage":20,
			// "xp":0,
			// "roomid":0
			// });
		}
	

	slots.innerHTML='<form id="slots" action="">';
	// slots.innerHTML='<input type="radio" name="slot" id="new" value="new" checked>New';
	console.log("saved length: "+saved.length);
	for (index=0;index<saved.length;index++)
			{
				console.log("saved name: "+saved[index].name);
				slots.innerHTML+='<input type="radio" class="selection" name="slot" id="'+index+'" value="'+index+'"><label for= "'+index+'">Name: '+saved[index].name+', Level: '+saved[index].level+', Created: '+saved[index].timecreated+'</label><br />';
			}

	slots.innerHTML+='</form>';	

}


function loadchar() {
	var checked= document.querySelector('input[name="slot"]:checked');
	if(checked== null) { alert("no character slot selected");return;}
	var slotselected = checked.value;
	
	avatar=saved[slotselected];
	localStorage.setItem("avatar", JSON.stringify(avatar));
	window.location="gameproject.html";
	

	

}

function deletechar() {
	var checked= document.querySelector('input[name="slot"]:checked');
	if(checked== null) { alert("no character slot selected");return;}
	var slotselected = checked.value;
	if(confirm("Are you sure you want to delete the selected character slot?"))
		{
	saved.splice(slotselected,1);
	localStorage.setItem("saved", JSON.stringify(saved));
	initload();
	}
	else
		alert("Delete cancelled");

}


// function savechar () {
// 	var slotselected = document.querySelector('input[name="slot"]:checked').value;
// 	console.log("slot selected: "+ slotselected);
// 	var timestamp = new Date().toLocaleString();
// 	avatar.timecreated=timestamp;
// 	if(slotselected=="new") saved.push(avatar);
// 		else
// 			saved[slotselected]=avatar;
// 	initsave();

// }
function loadcharcancel() {
	window.location="gameproject.html";
}

// function savecharfinalize () {
// 	if(saved != null)
// 	localStorage.setItem("saved", JSON.stringify(saved));
// 	window.location="gameproject.html";

// }