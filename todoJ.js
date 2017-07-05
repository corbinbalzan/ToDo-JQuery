// Main Goal: Add interactivity to the template

// Create a list to hold the Completed
// List for the incomplete 

var submitButton = $("#addButton1");
var complete = $("complete");
var incomplete = $("incomplete");


// Create a new item for the incomplete upon pressing Add

var creator = function (task){


  var $listItem = $("<li class='items items2'></li>");
	//create each part of added item
 // $("#incomplete").append("<li class='items'></li>");
  $($listItem ).append("<input type='checkbox'>");
  $($listItem ).append("<label class='insideText'> </label>");
  $($listItem ).append("<input type='text' class='editInput'> ");
  $($listItem ).append("<button class='edit'> Edit </button>");
  $($listItem ).append("<button class='delete'> Delete </button>");
  $($listItem ).append("<br>");

	// Modify the types of each item 

  $(".items label").text(task);
  $(".items input").value = task;
  $("#incomplete .items").removeClass("items");

  $(".delete").click(function(evt) {
      deleter();
  });

	// Make the label of this new item the input value
  return $listItem;

};

// Add the text to the incomplete 

$("#addButton1").click(function (evt){
  //var item = document.getElementById("addItem").value;
  var values = $("#addItem").val();
  var newItems = creator(values);
  $("#incomplete").append(newItems);

});
/*
$("#addButton1").on( "click", function(){
  $newTask = $("#addItem");
  var listItem = creator($newTask.val());
  $complete.append(listItem);
  $newTask.val("");
})
*/
// Move checked items to the complete section 


var complete = function (){

};

var incomplete = function (){

};

$(".edit").click(function(evt) {
    $(".editInput").toggleClass("editMode");

});

//function to edit tasks
var editTask = function (list, input, label){
 //if the list has the class of edit mode
  if (list.hasClass("editMode")) {
    //removes "editMode" class 
    list.removeClass("editMode");
    //makes the label's text the same as the input value
    label.text(input.val());
  } else {
    //adds the "editMode" class
    list.addClass("editMode");
    //makes the input's value the same as the label's text 
    input.val(label.text());
  }
}

// Edit the text when pressing the edit button 

    //if the class of the parent is .editMode 

      //switch from .editMode 
      //Make label text become the input's value

      //Switch to .editMode
      //input value becomes the label's text

    // Toggle .editMode on the parent



// Delete the item when pressing the Delete button 

var deleter = function (){
  $("li").remove();
};

// Mark a task as incompleted




