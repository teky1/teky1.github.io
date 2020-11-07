var timer = document.getElementById("timerNum");

setInterval(function(){
	time = parseInt(timer.innerHTML);
	if(timerRunning){
		time++
	}
	timer.innerHTML = time;
}, 1000);