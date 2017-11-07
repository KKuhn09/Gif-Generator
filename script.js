//Initial buttons
var button_subjects = ["john cena", "dogs", "cats"];
//Creates and displays initial buttons
function addButtons(name){
	//Create the button
	var newButton = $("<button>");
	newButton.addClass("btn btn-primary");
	newButton.attr("name", name);
	newButton.text(name.toUpperCase());
	//Display the button
	$("#button-area").append(newButton);
}
//Add a new gif button
function addNewButton(name){
	//Create the button
	var newButton = $("<button>");
	newButton.addClass("btn btn-primary");
	newButton.attr("name", name);
	newButton.text(name.toUpperCase());
	//Clear input area
	$("#gif-name").val("");
	//Display the button
	$("#button-area").append(newButton);
}
//Validate input
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
});