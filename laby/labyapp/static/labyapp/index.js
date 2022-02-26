//table = document.getElementById("maze");

timerElement = document.querySelector('#timer')
winMessage = document.querySelector('#win')
body = document.querySelector('body')
table = Array.from(document.getElementById("maze").getElementsByTagName("tr"));
playerModel = document.getElementById("player");

for(var i = 0; i < table.length; i++)
{
	table[i] = Array.from(table[i].getElementsByTagName("td"));
}

table[0][0].style.backgroundColor = "lime";

table[table.length-1][table[0].length-1].style.backgroundColor = "red";

x = 0;
y = 0;

function inmaze(x,y){
	return x >= 0 && y >= 0 && y < table.length && x < table[0].length;
}

function availableMove(x,y,direction) {
	return !table[y][x].className.includes(direction);
}

table[y][x].appendChild(playerModel);

function movePlayer(e) {
	if (!e.repeat){
		if (e.code == 'KeyD' || e.code == 'KeyL'){
			if (availableMove(x,y,'r')){
				x++;
				if (!inmaze(x,y))
					x--;
			}
		}
		else if (e.code == 'KeyA' || e.code == 'KeyH'){
			if (availableMove(x,y,'l')){
				x--;
				if (!inmaze(x,y))
					x++;
			}
		}
		else if (e.code == 'KeyS' || e.code == 'KeyJ'){
			if (availableMove(x,y,'b')){
				y++;
				if (!inmaze(x,y))
					y--;
			}
		}
		else if (e.code == 'KeyW' || e.code == 'KeyK'){
			if (availableMove(x,y,'t')){
				y--;
				if (!inmaze(x,y))
					y++;
			}
		}
		table[y][x].appendChild(playerModel);
		if (x + y != 0)
		{
			table[y][x].style.backgroundColor="white";
		}
	}
	if (x == table[0].length - 1 && y == table.length - 1) {
		body.removeEventListener('keydown', movePlayer);
		win();
	}
}

let timePassed = 0
timerId = setInterval(function(){
	timePassed += 100;
	timerElement.innerHTML = formatTime(timePassed);
}, 100)


function win(){
	winMessage.innerHTML = 'Win!';
	clearInterval(timerId);
    for (var x = 0; x < table[0].length; x++)
        for (var y = 0; y < table.length; y++)
            if (x+y!=0 && x+y!=table[0].length+table.lenth-2 && 
                table[y][x].style.backgroundColor != "white")
                table[y][x].style.backgroundColor = "lightgray";
}

function formatTime(time) {
	const minutes = Math.floor(time / 60000);
	let seconds = Math.floor(time / 1000) % 60;
	if (seconds < 10) {
		seconds = `0${seconds}`;
	}
	let milliseconds = Math.floor(time / 100) % 10;
	/*
	if (milliseconds < 10) {
		milliseconds = `00${milliseconds}`;
	}
	else if (milliseconds < 100) {
		milliseconds = `0${milliseconds}`;
	}
	*/
	return `${minutes}:${seconds}:${milliseconds}`;
}

body.addEventListener('keydown', movePlayer);
