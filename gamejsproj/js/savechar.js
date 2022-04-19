console.log("savechar running");
var saved=null;
var slots=document.getElementById("slotbox");
initsave();

var timestamp = new Date().toLocaleString();
console.log("time: "+timestamp);

// slots.innerHTML="this is the slots box";

function initsave() {
	avatar=localStorage.getItem("avatar");
	// avatar=JSON.parse(localStorage.getItem("avatar"));
	if(avatar != null){
		avatar=JSON.parse(localStorage.getItem("avatar"));
		console.log("avatar roomid: " +avatar.roomid,avatar.name);
		console.log("avatar url: "+ avatar.pic);}
	if(avatar==null) {
		var timestamp = new Date().toLocaleString();
		console.log("no avatar info saved");
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
		"timecreated":timestamp
		}
	}
	if(saved == null) {

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
	}

	slots.innerHTML='Saved Slots:<form id="slots" action="">';
	slots.innerHTML='<input type="radio" name="slot" id="new" value="new" checked><label for="new"> New</label>';
	console.log("saved length: "+saved.length);
	for (index=0;index<saved.length;index++)
			{
				console.log("saved name: "+saved[index].name);
				slots.innerHTML+='<br /><input type="radio" name="slot" id="'+index+'" value="'+index+'"><label for= '+index+'>Name: '+saved[index].name+', Level: '+saved[index].level+', Created: '+saved[index].timecreated+'</label>';
			}

	slots.innerHTML+='</form>';	

}

function savechar () {
	var slotselected = document.querySelector('input[name="slot"]:checked').value;
	console.log("slot selected: "+ slotselected);
	var timestamp = new Date().toLocaleString();
	avatar.timecreated=timestamp;
	if(slotselected=="new") saved.push(avatar);
		else {
			if(confirm("Are you sure you want to overwrite the selected slot?"))
			saved[slotselected]=avatar;
			else alert("overwrite cancelled");
		}
	if(saved != null)
	localStorage.setItem("saved", JSON.stringify(saved));
	initsave();

}
function savecharcancel () {
	window.location="gameproject.html";
}

// function savecharfinalize () {
// 	if(saved != null)
// 	localStorage.setItem("saved", JSON.stringify(saved));
// 	window.location="gameproject.html";

// }