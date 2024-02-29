

// color arrays
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;
//pattern of clicked colours

$(document).keypress(function(){
   if (!started) {

      $("#level-title").text("level " + level);
      nextSequence();
      started = true;

   }
   
});


$(".btn").on("click",function() {

   var userChosenColour = $(this).attr("id");

   userClickedPattern.push(userChosenColour);
   
   playSound(userChosenColour);

   animatePress(userChosenColour);

   checkAnswer(userClickedPattern.length-1);
   
});

// funkcija za random broj od 0 do 3!
function nextSequence() {
   
    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level); 

    var randomNumber =  Math.floor(Math.random() * 4 );

    var randomChosenColour = buttonColours[randomNumber];
    
    gamePattern.push(randomChosenColour);
 // animacija za izabrane boje
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    
    
    
   

   


 // zvuk za izabrane boje
 // preporuceni kod 
 // var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
 // audio.play();

 /*if (randomNumber === 0  ) {
    var red = new Audio('sounds/red.mp3');
    red.play();
 } else if (randomNumber === 1) {
   var blue = new Audio('sounds/blue.mp3');
    blue.play();
 } else if (randomNumber === 2) {
   var green = new Audio('sounds/green.mp3');
    green.play();
 } else if (randomNumber === 3) {
   var yellow = new Audio('sounds/yellow.mp3');
    yellow.play();
 }*/
}

function playSound(name) {
   var audio = new Audio("sounds/" + name + ".mp3");
   audio.play();
}

//flash animation on click

function animatePress(currentColour) {
     $("#" + currentColour).addClass("pressed");
    
     setTimeout(function(){
      $("#" + currentColour).removeClass("pressed")
     }, 100);
}

function checkAnswer(currentLevel) {
   if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
      if (userClickedPattern.length === gamePattern.length) {
         setTimeout(function () {
            nextSequence();
          }, 1000);
      }

   } else if (userClickedPattern[currentLevel] != gamePattern[currentLevel]){
      console.log("wrong");
      var audio = new Audio("sounds/" + "wrong" + ".mp3");
      audio.play();

      $("body").addClass("game-over");
     setTimeout(function(){
      $("body").removeClass("game-over")
     }, 200);

     $("#level-title").text("Game Over, Press Any Key to Restart");

     startOver();

   }

}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;

}