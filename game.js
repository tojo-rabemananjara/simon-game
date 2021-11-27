var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 3);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

//Event handling
$(".btn").on("click", function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

$(document).on("keydown", function() {
  if (level === 0) {
    $("#level-title").text("Level " + level);
    nextSequence();
  }
});

function playSound(name) {
  var randomSound = new Audio("sounds/" + name + ".mp3");
  randomSound.play();
}

function animatePress(currentColouor) {
  $("#" + currentColouor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColouor).removeClass("pressed");
  }, 200);
}

function checkAnswer(currentLevel) {
  //check if most recent user clicked pattern matches game's color at that index
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

    //check that user finished their sequence
    if (currentLevel === gamePattern.length - 1) {
      setTimeout(function() {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
