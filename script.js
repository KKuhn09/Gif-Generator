//Initial buttons
var button_subjects = ["John Cena", "Dogs", "Cats"];
//Creates and displays initial buttons
function addButtons(name){
	//Create the button
	var newButton = $("<button>");
	newButton.addClass("btn btn-primary");
	newButton.text(name.toUpperCase());
	//Create the names id
	var name_id = name.toLowerCase();
	name_id = name.split(" ");
	name_id = name_id.join("+");
	newButton.attr("id", name_id);
	//Display the button
	$("#button-area").append(newButton);
}
//Add a new gif button
function addNewButton(name){
	//Create the button
	var newButton = $("<button>");
	newButton.addClass("btn btn-primary");
	newButton.text(name.toUpperCase());
	//Create the names id
	var name_id = name.toLowerCase();
	//If there are spaces
	name_id = name.split(" ");
	name_id = name_id.join("+");
	newButton.attr("id", name_id);
	//Clear input area
	$("#gif-name").val("");
	//Display the button
	$("#button-area").append(newButton);
}
//Display gifs
function displayGifs(name){
	//Using API key with Giphy, create the query
	var query = "https://api.giphy.com/v1/gifs/search?api_key=eb3cf537b6b04f779b9e19c56fb9ed05&q="+name+"&limit=10&offset=0&rating=PG-13&lang=en";
	//Query the Giphy API
	$.ajax({
		url: query,
		data: {
			format: "json"
		},
		success: function(res){
			//Clear the div in case previous gifs were displayed
			$("#gif-area").empty();
			//For each gif data was grabbed
			for(var i=0;i<res.data.length;i++){
				//Create img tag where gif will be displayed
				var gif = $("<img>");
				//Create p tag where rating will be displayed
				var rating = $("<p>");
				//Display the still image of the gif
				gif.attr({src: res.data[i].images.fixed_height_small_still.url, "data-toggle": res.data[i].images.fixed_height_small.url});
				$("#gif-area").append(gif);
				//Display the rating
				rating.append("Rating: "+res.data[i].rating);
				$("#gif-area").append(rating);
				$("#gif-area").append("<br>");
			}
		}
	});
}
//Toggle the gif (not playing/playing)
function toggleGif(gif){
	console.log("something");
}
/*
	Data Validation
*/
function validateInput(input){
	//If search area is empty
	if(input === ""){
		errorMessage();
		return false;
	}
	//Array with valid input characters
	var validInputs = "abcdefghijklmnopqrstuvwxyz1234567890".split("");
	//Check each character of input
	for(var i=0;i<input.length;i++){
		//If a character in input does not exist in valid inputs
		if(validInputs.indexOf(input.charAt(i)) === -1){
			errorMessage();
			return false;
		}
	}
	//If all is well, return true
	return true;
}
//Error message for invalid input
function errorMessage(){
	//Clear input area
	$("#gif-name").val("");
	//Display the error message
	$("#error-message").html("<p class='alert alert-danger'>Input can only contain letters A-Z and numbers 1-9");
	event.preventDefault();
}

$(document).ready(function(){
	//For each button
	for(var i=0;i<button_subjects.length;i++){
		//Display it
		addButtons(button_subjects[i]);
	}
	//When form-1 is submitted 
	$("#form-1").submit(function(){
		//If input is valid
		if(validateInput($("#gif-name").val())){
			//Add a new button
			addNewButton($("#gif-name").val());
			event.preventDefault();
		}
	});
	//When a gif button is clicked
	$("button").click(function(){
		displayGifs($(this).attr("id"));
	})

});