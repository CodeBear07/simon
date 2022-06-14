var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = []
var userClickedPattern = []
var blue = new Audio("sounds/blue.mp3")
var green = new Audio("sounds/green.mp3")
var red = new Audio("sounds/red.mp3")
var yellow = new Audio("sounds/yellow.mp3")
var level = 1
var started = false;
var wrong = new Audio("sounds/wrong.mp3")



function levelUp() {
  $("h1").text("Level" + " " + level);
}

function nextSequence() {
  userClickedPattern = [];

  var n = Math.random();
  var n = Math.floor(n * 4);
  var randomChosenColour = buttonColors[n];
gamePattern.push(randomChosenColour);
var randomChosenColourID = ("#" + randomChosenColour)
$(randomChosenColourID).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);
levelUp();
level++;
return level;

}

$(".btn").click(function() {
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {
  switch (name) {
    case "blue":
      blue.play();
      break;

    case "green":
      green.play();
      break;

    case "red":
      red.play();
      break;

    case "yellow":
      yellow.play();
      break;

    default:
    }
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
          $("#" + currentColour).removeClass("pressed");
      }, 100);
}

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");

      if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");
      wrong.play();
      $(document.body).addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      setTimeout(function () {
        $(document.body).removeClass("game-over");
      }, 200);
      startOver();
    }
}
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
