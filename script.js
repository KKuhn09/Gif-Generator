//Initial buttons
var button_subjects = ["Dogs", "Cats","John Cena", "Doge", "Dolphins"];
//Creates and displays initial buttons
function addButtons(name){
	var newButton = $("<button>");  //Create the button
	newButton.addClass("btn btn-primary");
	newButton.text(name.toUpperCase());
	var name_id = name.toLowerCase();  //Create the names id
	name_id = name.split(" ");	//If there are spaces
	name_id = name_id.join("+");
	newButton.attr("id", name_id);
	$("#button-area").append(newButton);  //Display the button
}
//Add a new gif button
function addNewButton(name){
	var newButton = $("<button>");	//Create the button
	newButton.addClass("btn btn-primary");
	newButton.text(name.toUpperCase());
	var name_id = name.toLowerCase();	//Create the names id
	name_id = name.split(" ");	//If there are spaces
	name_id = name_id.join("+");
	newButton.attr("id", name_id);
	$("#button-area").append(newButton);	//Display the button
	$("#gif-name").val("");		//Clear input area
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
				var gifDiv = $("<div>").addClass("gif");
				//Create img tag where gif will be displayed
				var gif = $("<img>");
				gif.attr({src: res.data[i].images.fixed_height_small_still.url, "data-toggle": res.data[i].images.fixed_height_small.url});
				//Create p tag where rating will be displayed
				var rating = $("<p>");
				rating.html("Rating: "+res.data[i].rating);//Display the rating
				//Append <img> and <p> to the gifDiv
				gifDiv.append(gif);
				gifDiv.append(rating);
				$("#gif-area").append(gifDiv);//Display gifDiv
			}
		},
		type: "GET"
	});
}
//Toggle the gif (not playing/playing)
function toggleGif(gif){
	//Store the gifs current src
	var currentToggle = gif.attr("src");
	//Switch gifs src to its data-toggle
	gif.attr("src", gif.attr("data-toggle"));
	//Switch gifs data-toggle to the old src
	gif.attr("data-toggle", currentToggle);
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
	var validInputs = "abcdefghijklmnopqrstuvwxyz1234567890 ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
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
	$("#error-message").html("<p class='alert alert-danger'>Input can only contain letters A-Z and numbers 1-9<p>");
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
	$("body").on("click", "#button-area button", function(){
		//Display the gifs
		displayGifs($(this).attr("id"));
	});
	//When a gif is clicked	
	$("body").on("click", "img", (function(){
		//Toggle the gif
		toggleGif($(this));
	}));
});