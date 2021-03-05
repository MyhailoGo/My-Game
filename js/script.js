const doc = document,
fight = doc.getElementById("fight"),
attacking = doc.querySelectorAll(".attack"),
defending = doc.querySelectorAll(".defend"),
greenHpPlayer = doc.querySelector(".playerHealthNow"),
redHpPlayer = doc.querySelector(".playerHealthLost"),
greenHpBot = doc.querySelector(".botHealthNow"),
redHpBot = doc.querySelector(".botHealthLost"),
log = doc.querySelector('.log');

let  nameUser = prompt("Введіть своє ім'я", "Магістр Йода");
nameUser = nameUser === null || nameUser === "" ? "Магістр Йода" : nameUser.trim().split("").slice(0,15).join("");


const bot = {
	name: "Darth Vader",
	health: 100,
	attack: ()=>getRandomValue(1,3),
	defend: ()=>getRandomValue(1,3),
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

function getRandomValue(min, max) {
  	return Math.floor(min + Math.random() * (max + 1 - min));
}

function showHealth(health,object){
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
let showMessageLog1;
let showMessageInput;

function playerAttacking(){
	for(let i=0; i<attacking.length; i++){
		if(attacking[i].checked){
			let botDefended = bot.defend();
			
			if(+attacking[i].value !== +botDefended){
				let damage = getRandomValue(5,10)
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
					 showMessageInput = `${player.name} наносить  ${bot.name} ${damage} урону ${msgDamageLog}`
					 bot.health -= damage;
					 bot.health <= 0 ? 0 : bot.health;
					 showHealth(bot.health, bot);
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
						showMessageInput = `${bot.name} заблокував удар ${msgDamageLog}`;
					
		}
	}
}
/* Атака гравця */

function playerDefending(){
	for(let i=0; i<defending.length; i++){
		if(defending[i].checked){
			let botAttacked = bot.attack();;
				
			let msgDamageLog;
				if (+defending[i].value !== +botAttacked){
					 damage = getRandomValue(5,10);
						
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
					 showMessageLog1 = `${bot.name} наносить ${player.name} ${damage} урону ${msgDamageLog}`
						player.health -= damage;
						player.health <= 0 ? 0 : player.health;
						showHealth(player.health, player);
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
				showMessageLog1 = `${player.name} заблокував удар ${msgDamageLog} `;
		}
	}
}
/* Захист гравця */


function addDiv (showMessageA,showMessageB){
	let div = doc.createElement("div");
	div.classList.add("fightLog");
	div.insertAdjacentHTML(`afterbegin`,`
				${showMessageB}<br>
 				${showMessageA} <br>
 			<span class = "playersHp"> Hp ${player.name}	${player.health}</span><span class ="botsHp"> ${bot.health} Darth Vader Hp </span>`);
	document.querySelector(".log").prepend(div);
};

function questionPlayAgain(){
	confirm("Play again?") ? location.reload() : alert("Good luck");
}

function gameOver(player, bot){
	if(player.health <= 0 && bot.health <= 0){
		alert("Draw");
		questionPlayAgain();
	}
	else if (player.health<=0){
		alert(bot.name + " winner!")
		questionPlayAgain();
	}
	else if(bot.health<=0){
		alert(`Congratulation!!!! ${player.name}  winner!!` )
		questionPlayAgain();
	}
};



fight.onclick = function(){
	playerAttacking();
	playerDefending();
	addDiv(showMessageLog1,showMessageInput);
	gameOver(player,bot);
	console.log(player.health, bot.health)
};
