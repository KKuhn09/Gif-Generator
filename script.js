//Initial buttons
var button_subjects = ["john cena", "dogs", "cats"];
//Creates and displays initial buttons
function addButtons(name){
	//Create the button
	var newButton = $("<button>");
	newButton.addClass("btn btn-primary");
	newButton.attr("name", name);
	newButton.text(name);
	//Display the button
	$("#button-area").append(newButton);
}
//Add a new gif button
function addNewButton(name){
	console.log(name);
}

$(document).ready(function(){
	//For each button
	for(var i=0;i<button_subjects.length;i++){
		//Display it
		addButtons(button_subjects[i]);
	}
	//When form-1 is submitted 
	$("#form-1").submit(function(){
		//Add a new button
		addNewButton($("#gif-name").val();
		event.preventDefault();
	});
});