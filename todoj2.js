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

  $(".edit-text").on('keyup', function (e) {
      if (e.keyCode == 13) {
            var $list = $(this).parent();  
            alert($list + "Hey");
            var $input = $(this);
            var $label = $input.prev();
            editTask($list, $input, $label);
              }

  });

  $newCheckbox.change(function() {

   
    if ($($newCheckbox).hasClass('incompleted')) {
      $newCheckbox.removeClass("incompleted");
      $newCheckbox.addClass("completed");  
      $("#complete").append($newListItem);
      $("#complete label").animate({ fontSize: "12px" }, 1000);
    }else {
      $newCheckbox.addClass("incompleted");  
      $("#incomplete").append($newListItem);
      $("#incomplete label").animate({ fontSize: "16px" }, 1000);
    }



  });

  var radioValue = $('input[name=priority]:checked').val();
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


$addButton.on( "click", function(){
  var listItemToAdd = makeNewListItem($newTask.val());
  $incompletedTasks.append(listItemToAdd);
  $newTask.val("");

})


$("#addItem").on('keyup', function (e) {
    if (e.keyCode == 13) {
      var listItemToAdd = makeNewListItem($newTask.val());
      $incompletedTasks.append(listItemToAdd);
      $newTask.val("");
    }

});



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



$("#inClear").on("click", function(){
  $("#complete").empty();

});
 
var listLength = document.getElementById("incomplete");

$("#inFinish").on("click", function(){
  for ( var counter = 0; counter <listLength.length; counter += 1 ){
    alert("Hey");
  }
});


































