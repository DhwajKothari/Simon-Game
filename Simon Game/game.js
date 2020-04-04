var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level =0;
var started =false;

$(document).keypress(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length-1);

});

function nextSequence(){
  userClickedPattern=[];
  level++;
  $("h1").text("LEVEL "+level);
  var randomNumber=Math.floor((Math.random())*4);
  var randomChosenColor=buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);
  buttonAnimation(randomChosenColor);


}

function buttonAnimation(randomChosenColor){
  $("#"+randomChosenColor).addClass("pressed");
  setTimeout(function () {
    $("#"+randomChosenColor).removeClass("pressed");
  }, 400);
}
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    buttonAnimation(gamePattern[currentLevel]);
    var sound= new Audio("sounds/"+gamePattern[currentLevel]+".mp3");
    sound.play();
    if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
  }
  else{
    var wrongSound= new Audio("sounds/wrong.mp3");
    wrongSound.play();
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart")

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 1000);
    startOver();
  }
}

function startOver(){
  gamePattern=[];
  userClickedPattern=[];
  level =0;
  started =false;
}
