// Creates variables for the most commonly used items 
var $newTask = $("#addItem");
var $incompletedTasks = $("#incomplete");
var $completedTasks = $("#completed");
var $addButton = $("#addButton1");



//generate a new list item
var makeNewListItem = function(taskToAdd) {

  var $newListItem = $("<li></li>");
  var $newCheckbox = $("<input type='checkbox' class='checkbox incompleted'>");
  var $newLabel = $("<label></label>");
  var $newEditInput = $("<input type='text' class='edit-text'>");
  var $newEditButton = $("<button class='edit-button'>Edit</button>");
  var $newDeleteButton = $("<button class='delete-button'>Delete</button>");

  $newListItem.append($newCheckbox)
  .append($newLabel.html(taskToAdd))
  .append($newEditInput)
  .append($newEditButton)
  .append($newDeleteButton);
/*
  $(".edit-text").on('keyup', function (e) {
      if (e.keyCode == 13) {
        var list = $(this).parent();
        list.removeClass("editMode");
        //var $input = $(this).prev();
        //var $input = $(".edit-text");
        //var label = $input.prev();
        //alert($input.val());
        alert("Hey now");
        //label.text($input.val());
        }
  });
*/

// On the change of the checkbox the task switches list and has styles applied via animation
  $newCheckbox.change(function() {
   
    if ($($newCheckbox).hasClass('incompleted')) {
      $newCheckbox.removeClass("incompleted");
      $newCheckbox.addClass("completed");  
      $("#complete").append($newListItem);
      $("#complete label").animate({ fontSize: "12px" }, 1000);
      lengthTracker();
    }else {
      $newCheckbox.addClass("incompleted");  
      $("#incomplete").append($newListItem);
      $("#incomplete label").animate({ fontSize: "16px" }, 1000);
      lengthTracker();
    }



  });

  // Checks to see which radio button is selected
  var radioValue = $('input[name=priority]:checked').val();
  // Adds classes to the label of the new task and styles are applied in the css
  if (radioValue === "high"){
    $($newLabel).addClass("high"); 
  }else if (radioValue === "medium"){
    $($newLabel).addClass("medium")
  } else if (radioValue === "low"){
    $($newLabel).addClass("low")
  } else {
    $($newLabel).addClass("default")
  };



  return $newListItem;
}

// Both functions below add items to the list when clicked or return is hit
$addButton.on( "click", function(){
  var listItemToAdd = makeNewListItem($newTask.val());
  $incompletedTasks.append(listItemToAdd);
  $newTask.val("");
  lengthTracker();
  if ($("#darkModeCheckbox").hasClass('lightMode')){
    toggleLightModePrefs();
  } else {
    toggleDarkModePrefs();
  }
})

$("#addItem").on('keyup', function (e) {
    if (e.keyCode == 13) {
      var listItemToAdd = makeNewListItem($newTask.val());
      $incompletedTasks.append(listItemToAdd);
      $newTask.val("");
      lengthTracker();
    }
    if ($("#darkModeCheckbox").hasClass('lightMode')){
      toggleLightModePrefs();
  } else {
      toggleDarkModePrefs();
  }

});


// Removes the item from their lisk when you click on delete
$incompletedTasks.on( "click", ".delete-button", function(){
  $(this).parent().remove();  
});


$completedTasks.on( "click", ".delete-button", function(){
  $(this).parent().remove();  
});




var editTask = function (list, input, label){
  if (list.hasClass("editMode")) {
    list.removeClass("editMode");
    label.text(input.val());
  } else {
    list.addClass("editMode");
    input.val(label.text());
  }
}


$incompletedTasks.on( "keyup", ".edit-text", function (e){
  if (e.keyCode == 13) {  
    var list = $(this).parent();
    list.removeClass("editMode");
    var $input = $(this);
    var $label = $(this).prev();
    $label.text($input.val());
    //editTask($list, $input, $label);
    }
})

$incompletedTasks.on( "click", ".edit-button", function(){
  var $list = $(this).parent();  
  var $input = $(this).prev();
  var $label = $input.prev();
  editTask($list, $input, $label);
})

$completedTasks.on( "click", ".edit-button", function(){
  var $list = $(this).parent();  
  var $input = $(this).prev();
  var $label = $input.prev();
  editTask($list, $input, $label);
})


// Erases all the items in complete when the user clicks the button
$("#inClear").on("click", function(){
  $("#complete").empty();
  lengthTracker();

});

//Triggers a click on all the inputs when the complete all button is clicked
$("#inFinish").on("click", function(){
  $("#incomplete input").trigger('click');;
});

// keeps track of the length of the main <ul>'s that hold list item 
var lengthTracker = function(){
  var $completeLen = $("#complete label").length;
  var $incompleteLen = $("#incomplete label").length;
  var totalLen = $completeLen + $incompleteLen; 
  var percentComplete = ($completeLen / totalLen) * 100;
  $("#progressTracker").text("The progress percent is : " + percentComplete);
  
  // Animates the progress tracker depending on the percent
  if (percentComplete === 0){
    $("#progressTrackerBar").text(" ");
  } else {
    $("#progressTrackerBar").text("-->");
  }
  $("#progressTrackerBar").animate({ "width" : percentComplete + "%"}, 1000);

  if (percentComplete === 100){
    $("#incomplete").append("<p id='doneText'>Congratulations! You have finished your tasks </p>");
  } 
  //$("#progressTrackerBar").css("width", percentComplete + "%");
  if ($incompleteLen > 0){
    $("#doneText").remove();
  }

}

//Default hides the items under the user preferencs div element
$("#prefsSettingsList").hide();

//On click the items are toggle shown 
$("#prefsButton").on("click", function(){
  $("#prefsSettingsList").slideToggle();


});

// The event handler for the dark mode settings 
$("#darkModeCheckbox").change(function() {
  //Turns on the dark mode if it has light mode and there is a click
  if ($("#darkModeCheckbox").hasClass('lightMode')) {
    $("#darkModeCheckbox").removeClass('lightMode');
    toggleDarkModePrefs();
  }else {
    // If it is not in light mode and there is a click then it goes light
    $("#darkModeCheckbox").addClass('lightMode');
    toggleLightModePrefs();
  }


});


// These are triggered when the class was present but is now absent
var toggleDarkModePrefs = function(){
  $("body").css("background-color", "#222");
  $("body h1,h3").css("color", "#FFF");
  $("body h1,h3").css("background-color", "#222");
  $("button").css("background-color", "#222");
  $(".edit-button").css("color", "orange");
  $(".delete-button").css("color", "red");
  $("label").css("color", "#fff");
  $("p").css("color", "#fff");
  //$("#inClear").css("color", "#fff");
  //$("#inFinish").css("color", "#fff");
  $("#inClear").css("background-color", "#42f48c");
  $("#inFinish").css("background-color", "#42f48c");
  //$("#progressTrackerBar").css("background-color", "#222");
  $("#progressTracker").css("background-color", "#222");
  $(".main-container").css("background-color", "#222");
  $("#progressTracker").css("color", "#FFF");
};
//Triggered on toggle of dark mode
var toggleLightModePrefs = function(){
  $("body").css("background-color", "#fff");
  $("body h1,h3").css("color", "#000");
  $("body h1,h3").css("background-color", "#FFF"); 
  $("button").css("background-color", "#fff"); 
  $(".edit-button").css("color", "#000");
  $(".delete-button").css("color", "#000");
  $("label").css("color", "#000");
  $("p").css("color", "#000");
  $("#addButton1").css("background-color", "#33b9f7");
  $("#inFinish").css("color", "#000");
  $("#inClear").css("color", "#000");
  $("#inClear").css("background-color", "#ddd");
  $("#inFinish").css("background-color", "#ddd");
  //$("#progressTrackerBar").css("background-color", "#fff");
  $("#progressTracker").css("background-color", "#fff");
  $(".main-container").css("background-color", "#fff");
  $("#progressTracker").css("color", "#000");
}



//These are toggled when the user checks the big text box
var toggleBigText = function(){
  $("body h1").css("font-size", "3em");
  $("body p, label").css("font-size", "1.6em");
  $("button").css("font-size", "1.3em");

}

var toggleRegularText = function(){
  $("body h1").css("font-size", "2em");
  $("body p, label").css("font-size", "1em");
  $("button").css("font-size", ".7em");
  $("#prefsButton").css("font-size", "1em");
  $("#inFinish").css("font-size", ".7em");
  $("#inClear").css("font-size", ".7em");
  $(".edit-button").css("font-size", "1em");
  $(".delete-button").css("font-size", "1em");
}

// An on change event listener for big text
$("#bigTextCheckbox").change(function() {

  if ($("#bigTextCheckbox").hasClass('regularMode')) {
    $("#bigTextCheckbox").removeClass('regularMode');
    toggleBigText();
  }else {
    $("#bigTextCheckbox").addClass('regularMode');
    toggleRegularText();
  }


});






























