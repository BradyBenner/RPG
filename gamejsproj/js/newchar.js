console.log("newchar running");
var imageselected=0;
var timestamp = new Date().toLocaleString();
var avatar = {
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
};
var images = ["images/angelhero.jpg","images/buffhero.jpg","images/wolverine.jpg","images/hero1.png","images/girl.jpg"];
displayimages();




function displayimages () {
	var img=document.getElementById("imageselector");
	img.innerHTML='Images:<form id="images" action="">';
	for (var index = 0; index < images.length; index++)  {
		if((index)%3==0) img.innerHTML+='<br />';
	img.innerHTML+='<input class="newcharradio" type="radio" name="imageurl" value="'+ index+ '" id="'+index+'"> <label for= "'+index+'"><img class="newimg" src="'+images[index]+'"></label>';
	}
	document.getElementById("0").checked=true;
}

function newchar () {
	avatar.name = document.getElementById("name").value;
	var url = document.querySelector('input[name="imageurl"]:checked').value;

	console.log(url);
	avatar.pic=images[url];
	avatar.desc=document.getElementById("description").value;
	localStorage.setItem("avatar", JSON.stringify(avatar));
	avatar=JSON.parse(localStorage.getItem("avatar"));
	console.log("avatar name: "+avatar.name);
	// console.log(avatar.name,avatar.pic,avatar.desc);
	// console.log("roomid: ", avatar.roomid);
	

	window.location="gameproject.html";

	
}

function newcharcancel () {
	alert("Returing to Main game Without creating a new character.");
	window.location="gameproject.html";
}