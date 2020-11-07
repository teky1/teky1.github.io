var time = 0;
var timerRunning = false;
var quote = "";



async function getQuote(){
	var quoteData = "error";
	await axios.get("http://api.quotable.io/random")
		.then(response => {
			//console.log([response.data["content"], response.data["author"]]);
		 	quoteData = [response.data["content"], response.data["author"]];
		})
		.catch(error => console.error(error));
	return quoteData;
}

// getQuote().then(function(result){
// 	console.log(result);
// 	quote = result
// });

function showResources(){
	var resources = document.getElementById("resources");
	var showResourcesButton = document.getElementById("showResources");
	resources.style.display = "block";
	showResourcesButton.style.display = "none";
}

function hideResources(){
	var resources = document.getElementById("resources");
	var showResourcesButton = document.getElementById("showResources");
	resources.style.display = "none";
	showResourcesButton.style.display = "inline";
}

function beginProblem(){
	var problemDiv = document.getElementById("problem");
	var beginProblemButton = document.getElementById("startButton");
	problemDiv.style.display = "inline-block";
	beginProblemButton.style.display = "none";
	timerRunning = true;
}
