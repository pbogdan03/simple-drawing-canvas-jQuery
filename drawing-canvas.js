//Problem: No user interaction causes no change to application
//Solution: When user interacts cause changes accordingly
var color = $(".selected").css('background-color');
var $canvas = $("canvas");
var context = $canvas[0].getContext("2d");  //document.getElementByTagName("canvas")[0]
var lastEvent;
var mouseDown = false;

//When clicking on li item 
$(".controls").on("click", 'li', function() {
  //deselect selected sibling
  $(this).siblings('.selected').removeClass('selected');
  //select the clicked item
  $(this).addClass('selected');

  //cache current color
  color = $(this).css('background-color');
});
  
//When "New color" is pressed 
$("#revealColorSelect").click(function() {
  //show/hide span with settings
  changeColor();
  $('#colorSelect').toggle();
});
  
//When color ranges change
$("input[type=range]").on("input", changeColor);
//update the new color span
function changeColor() {
  var r = $("#red").val();
  var g = $("#green").val();
  var b = $("#blue").val();
  $("#newColor").css('background-color', "rgb(" + r + "," + g + "," + b + ")");
}

//When "Add color" clicked
$("#addNewColor").click(function() {
  //append new color to ul
  var $newColor = $("<li></li>");
  $newColor.css("background-color", $("#newColor").css('background-color'));
  $(".controls ul").append($newColor);
  //select the new color
  $newColor.click();
})

//On mouse events on the canvas
$canvas.mousedown(function(e) {
  lastEvent = e;
  mouseDown = true;
}).mousemove(function(e) {
  //draw lines

  if(mouseDown) {
    //for Firefox compatibility
    lastEventXPos = lastEvent.offsetX?lastEvent.offsetX:(lastEvent.pageX - $canvas.offset().left);
    lastEventYPos = lastEvent.offsetY?lastEvent.offsetY:(lastEvent.pageY - $canvas.offset().top);
    elXPos = e.offsetX?e.offsetX:(e.pageX - $canvas.offset().left);
    elYPos = e.offsetY?e.offsetY:(e.pageY - $canvas.offset().top);

    context.beginPath();
    context.moveTo(lastEventXPos, lastEventYPos);
    context.lineTo(elXPos, elYPos);
    context.strokeStyle = color;
    context.stroke();
    lastEvent = e;
  }
}).mouseup(function() {
  mouseDown = false;
}).mouseleave(function() {
  $canvas.mouseup();
});

