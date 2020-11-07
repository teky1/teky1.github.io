
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

getQuote().then(function(result){
	console.log(result);
	quote = result
});

