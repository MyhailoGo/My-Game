let doc = document;

let fight = doc.getElementById("fight"),
attacking = doc.querySelectorAll(".attack"),
defending = doc.querySelectorAll(".defend"),
greenHpPlayer = doc.querySelector(".playerHealthNow"),
redHpPlayer = doc.querySelector(".playerHealthLost"),
greenHpBot = doc.querySelector(".botHealthNow"),
redHpBot = doc.querySelector(".botHealthLost"),
log = doc.querySelector('.log'),
nameUser = prompt("Введіть своє ім'я", "Магістр Йода"); 
nameUser = nameUser === null || nameUser === "" ? "Магістр Йода" : nameUser.trim().split("").slice(0,15).join("");


bot = {
	name: "Darth Vader",
	health: 100,
	attack: rand,
	defend: rand,
	greenHp: greenHpBot,
	redHp: redHpBot,
},
player = {
	name: nameUser,
	health: 100,
	attack: playerAttacking,
	defend: playerDefending,
	greenHp: greenHpPlayer,
	redHp: redHpPlayer,
};
doc.querySelector(".playerName").innerHTML = nameUser;

function rand(){
return Math.floor(1 + Math.random() * 3);
}

function random(min, max) {
	let rand = min + Math.random() * (max + 1 - min);
  	return Math.floor(rand);
}

function boy(health,object){
	if(health<=0){
		object.greenHp.style.width = "0px";
		object.redHp.style.width = "250px";
		object.redHp.innerHTML = "0";
	}
	else	{
		object.greenHp.style.width = `${health*2.5}`+"px";
		object.redHp.style.width = `${250-health*2.5}`+"px";
		object.greenHp.innerHTML = `<b>${health}</b>`; 
	}
}
/* Рівень хп зеленим і червоним кольором*/

function showMsg(){

}
let a;
let b;

function playerAttacking(){
	for(let i=0; i<attacking.length; i++){
		if(attacking[i].checked){
			let botDefended;
			botDefended = bot.defend();
			
			if(+attacking[i].value !== +botDefended){
				let damage = random(5,10)
				let msgDamageLog;
					switch(+attacking[i].value){
						case 1:
							msgDamageLog = "в голову";
							break;
						case 2: 
							msgDamageLog = "в корпус";
							break;
						case 3: 
							msgDamageLog = "в ноги";
							break;
					}
				
				console.log(`${player.name} наносить боту ${bot.name} ${damage} урону ${msgDamageLog}`)
					 b = `${player.name} наносить  ${bot.name} ${damage} урону ${msgDamageLog}`
					 bot.health -= damage;
					 bot.health <= 0 ? 0 : bot.health;
					 boy(bot.health, bot);
					 break;
			}
					else switch(+botDefended){
						case 1:
							msgDamageLog = "в голову";
							break;
						case 2: 
							msgDamageLog = "в корпус";
							break;
						case 3: 
							msgDamageLog = "в ноги";
							break;
					}

						console.log(`${bot.name} заблокував удар ${msgDamageLog}`)
						b = `${bot.name} заблокував удар ${msgDamageLog}`;
					
		}
	}
}
/* Атака гравця */

function playerDefending(){
	for(let i=0; i<defending.length; i++){
		if(defending[i].checked){
			let botAttacked;
				botAttacked = bot.attack();
			let msgDamageLog;
				if (+defending[i].value !== +botAttacked){
					 damage = random(5,10);
						
					switch(+botAttacked){
						case 1:
							msgDamageLog = "в голову";
							break;
						case 2: 
							msgDamageLog = "в корпус";
							break;
						case 3: 
							msgDamageLog = "в ноги";
							break;
					}
				
					console.log(`${bot.name} наносить ${player.name} ${damage} урону ${msgDamageLog}`);
					 a = `${bot.name} наносить ${player.name} ${damage} урону ${msgDamageLog}`
						player.health -= damage;
						player.health <= 0 ? 0 : player.health;
						boy(player.health, player);
							break;
				}
						


			else switch(+defending[i].value){
				case 1:
					msgDamageLog = "в голову";
					break;
				case 2: 
					msgDamageLog = "в корпус";
					break;
				case 3: 
					msgDamageLog = "в ноги";
					break;
			}

				console.log(`${player.name} заблокував удар ${msgDamageLog} `)
				a = `${player.name} заблокував удар ${msgDamageLog} `;
		}
	}
}
/* Захист гравця */


function addDiv (a,b){
	let div = doc.createElement("div");
	div.classList.add("fightLog");
	div.insertAdjacentHTML(`afterbegin`,`
				${b}<br>
 				${a} <br>
 			Hp ${player.name}	${player.health} ${bot.health} Darth Vader Hp`)
	document.querySelector(".log").prepend(div)

}

function gameOver(player, bot){
	if(player.health <= 0 && bot.health <= 0){
		alert("Draw")
	}
	else if (player.health<=0){
		alert(bot.name + " winner!")
	}
	else if(bot.health<=0){
		alert(`Congratulation!!!! ${player.name}  winner!!` )
	}
}



fight.onclick = function(){
	playerAttacking()
	playerDefending()
	addDiv(a,b)
	gameOver(player,bot)
	console.log(player.health, bot.health)
}
